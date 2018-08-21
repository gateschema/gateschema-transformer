import * as I from '../interface';
export default {
  name: 'list',
  transform(options, done) {
    const {
      state,
      node,
      constraint,
      validationOptions,
      pathValidationOptions,
      transform
    } = options;

    const { rootData, value = [] } = node;

    const [schema] = (constraint as I.ConstraintHighOrder).args;
    const parentPath = node.path;
    let count = value.length;
    state.types[parentPath] = 'list';
    if (count === 0) {
      return done();
    }
    const ret = () => {
      count--;
      if (count === 0) {
        done();
      }
    };
    value.forEach((item: any, idx: number) => {
      (this as I.Transformer).transform(
        schema,
        {
          path: parentPath === '/' ? `/${idx}` : `${parentPath}/${idx}`,
          value: item,
          rootData,
          state,
          validationOptions,
          pathValidationOptions,
          transform,
          parentNode: node
        },
        childNode => {
          node.children.push(childNode);
          ret();
        }
      );
    });
  }
} as I.KeywordTransformer;
