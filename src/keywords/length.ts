import * as I from '../interface';
export default {
  name: 'length',
  transform({ node, constraint }, done) {
    const length = (constraint as I.ConstraintHighOrder).args[0];
    const constraints = node.constraints;
    if (Array.isArray(length)) {
      const [minLength, maxLength] = length;
      constraints.minLength = minLength;
      constraints.maxLength = maxLength;
    } else {
      constraints.length = length;
    }
    done();
  }
} as I.KeywordTransformer;
