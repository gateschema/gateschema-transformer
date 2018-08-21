import * as I from '../interface';
export default {
  name: 'map',
  transform(options, done) {
    const {
      state,
      node,
      constraint,
      validationOptions,
      pathValidationOptions,
      transform
    } = options;

    const { path: parentPath, rootData, value } = node;

    const [obj] = (constraint as I.ConstraintHighOrder).args;
    const childrenIndexed = (state.childrenIndexed[parentPath] =
      state.childrenIndexed[parentPath] || {});
    state.types[parentPath] = 'map';
    const keys = Object.keys(obj);
    let count = keys.length;
    if (count === 0) {
      return done();
    }
    const ret = () => {
      count--;
      if (count === 0) {
        done();
      }
    };
    keys.forEach(item => {
      const path = parentPath === '/' ? `/${item}` : `${parentPath}/${item}`;
      (this as I.Transformer).transform(
        obj[item],
        {
          path,
          value: value && value[item],
          rootData,
          state,
          validationOptions,
          pathValidationOptions,
          transform,
          parentNode: node
        },
        childNode => {
          if (childrenIndexed[path]) {
            // merge
            Object.assign(childrenIndexed[path], childNode);
          } else {
            node.children.push(childNode);
            childrenIndexed[path] = childNode;
          }
          ret();
        }
      );
    });
  }
} as I.KeywordTransformer;
