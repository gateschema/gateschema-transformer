import * as I from './interface';

const existances = {
  required: true,
  optional: false
} as any;

const types = {
  boolean: true,
  binary: true,
  number: true,
  string: true,

  list: true,
  map: true,

  enum: true,
  enumList: true
} as any;

const transformer: I.Transformer = {
  extend({
    transformers
  }: {
    transformers?: I.KeywordTransformer[];
  }): I.Transformer {
    const rendererExtend = Object.create(this);

    if (transformers) {
      transformers.forEach(item => {
        rendererExtend[this.getTransformerKey(item.name)] = item.transform;
      });
    }

    return rendererExtend;
  },

  getTransformerKey(keywordName: string): string {
    return '_transformer_' + keywordName;
  },

  transform(
    schema: I.GateSchema,
    {
      path = '/',
      value,
      rootData,
      state,
      node,
      validationOptions,
      pathValidationOptions = {},
      transform,
      parentNode
    }: I.TransformOptions,
    cb: I.TransformCallback
  ) {
    validationOptions = pathValidationOptions[path] || validationOptions;

    const currentNode =
      node ||
      ({
        value,
        error: undefined,
        path,
        rootData,
        schema,
        constraints: {} as I.Node['constraints'],
        children: []
      } as I.Node);

    if (typeof state === 'undefined') {
      state = {
        types: {},
        values: {},
        mapDefinitions: {},
        mapAllowAdditional: {},
        cache: {},
        childrenIndexed: {},
        GateSchema: schema.constructor as I.GateSchemaBaseConstructor
      };
    }

    const constraints = schema.constraints;
    const length = constraints.length;
    let index = 0;
    const done = () => {
      (state as I.TransformState).GateSchema.validate(
        currentNode.value,
        {
          schema,
          path,
          rootData,
          state: state as any,
          options: validationOptions
        },
        (err?: any) => {
          if (err && err.path === path) {
            currentNode.error = err;
          }
          cb(transform ? transform(currentNode, parentNode) : currentNode);
        }
      );
    };
    const next = () => {
      if (index < length) {
        const constraint = constraints[index++];
        const keywordName =
          typeof constraint === 'string' ? constraint : constraint.keyword;
        if (existances[keywordName] !== undefined) {
          currentNode.constraints.required = existances[keywordName];
        } else if (types[keywordName]) {
          currentNode.constraints.type = keywordName as I.Node['constraints']['type'];
        }

        const transformerKey = this.getTransformerKey(keywordName);
        if (this[transformerKey]) {
          this[transformerKey](
            {
              node: currentNode,
              constraint,
              state,
              validationOptions,
              pathValidationOptions,
              transform
            },
            next
          );
        } else {
          next();
        }
      } else {
        done();
      }
    };
    next();
  }
};

export default transformer;
