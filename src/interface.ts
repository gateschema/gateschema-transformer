import {
  Constraint,
  ConstraintHighOrder,
  GateSchema,
  GateSchemaBaseConstructor,
  ValidationOptions,
  ValidationState
} from 'gateschema/dist/cjs/interface/index';

export {
  Constraint,
  ConstraintHighOrder,
  GateSchemaBaseConstructor,
  GateSchema
};

export interface Node {
  value: any;
  error?: string;
  path: string;
  schema: GateSchema;
  rootData: any;
  children: Node[];
  constraints: {
    required?: boolean;
    type?:
      | 'boolean'
      | 'binary'
      | 'number'
      | 'string'
      | 'list'
      | 'map'
      | 'enum'
      | 'enumList';
    length?: number;
    maxLength?: number;
    minLength?: number;
    format?: string;
    oneOf?: {
      [key: number]: any;
    };
    option?: {
      [key: string]: number;
    };
    other?: {
      form?: {
        [key: string]: any;
      };
      [key: string]: any;
    };
  };

  [key: string]: any;
}

export interface TransformState extends ValidationState {
  GateSchema: GateSchemaBaseConstructor;
  childrenIndexed: {
    [key: string]: any;
  };
}

export interface TransformOptions {
  path?: string;
  value?: any;
  rootData?: any;
  node?: Node;
  state?: TransformState;
  validationOptions?: ValidationOptions;
  pathValidationOptions?: {
    [key: string]: ValidationOptions;
  };
  transform?: (node: Node, parentNode?: Node) => any;
  parentNode?: Node;
}

export type TransformCallback = (node: Node) => any;

export interface Transformer {
  extend(options: { transformers?: KeywordTransformer[] }): Transformer;
  getTransformerKey(keywordName: KeywordTransformer['name']): string;
  transform(
    schema: GateSchema,
    options: TransformOptions,
    cb: TransformCallback
  ): void;
  [key: string]: any;
}

export interface KeywordTransformer {
  name: string;
  transform(
    options: {
      node: Node;
      constraint: Constraint;
      state: TransformState;
      validationOptions: TransformOptions['validationOptions'];
      pathValidationOptions: TransformOptions['pathValidationOptions'];
      transform: TransformOptions['transform'];
    },
    done: () => void
  ): void;
}
