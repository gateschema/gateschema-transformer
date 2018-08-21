import * as I from '../interface';
export default {
  name: 'enum',
  transform({ node, constraint }, done) {
    node.constraints.option = (constraint as I.ConstraintHighOrder).args[0];
    done();
  }
} as I.KeywordTransformer;
