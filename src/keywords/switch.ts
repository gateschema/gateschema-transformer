import * as I from '../interface';
export default {
  name: 'switch',
  transform(options, done) {
    const {
      state,
      node,
      constraint,
      validationOptions,
      pathValidationOptions,
      transform
    } = options;
    const { path, rootData, schema, value } = node;
    const schemaCtor = schema.constructor as I.GateSchemaBaseConstructor;
    const transformer = this as I.Transformer;
    const args = (constraint as I.ConstraintHighOrder).args;
    const getMatchSchema = schemaCtor._getMatchSchema.switch;
    getMatchSchema.call(
      schemaCtor,
      {
        path,
        args,
        rootData,
        state
      },
      (targetSchema: I.GateSchema) => {
        if (targetSchema) {
          transformer.transform(
            targetSchema,
            {
              path,
              value,
              rootData,
              node,
              state,
              validationOptions,
              pathValidationOptions,
              transform
            },
            done
          );
        } else {
          // no matching case
          done();
        }
      }
    );
  }
} as I.KeywordTransformer;
