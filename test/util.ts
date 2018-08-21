import transformer from '../src/index'
import * as I from '../src/interface'

export function transformSchema(
  schema: I.GateSchema,
  rootData: I.TransformOptions['rootData'] = {},
  cb: (node: I.Node) => any
) {
  transformer.transform(schema, {
    path: '/',
    value: rootData,
    rootData 
  }, cb)
}