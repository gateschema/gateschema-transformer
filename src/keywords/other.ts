import * as I from '../interface';
export default {
  name: 'other',
  transform({ node, constraint }, cb) {
    const constraints = node.constraints;
    const [type, params] = (constraint as I.ConstraintHighOrder).args;
    const other = (constraints.other = constraints.other || {});
    if (type === 'form') {
      other.form = other.form || {};
      Object.assign(other.form, params);
    }
    cb();
  }
} as I.KeywordTransformer;
