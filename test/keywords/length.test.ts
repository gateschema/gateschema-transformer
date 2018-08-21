import _ from "gateschema";
import { transformSchema } from "../util";

test('length(n)', () => {
  const length = 8
  const schema = _.string.length(length)
  transformSchema(schema, null, (node) => {
    expect(node.constraints.length).toBe(length)
  })
})

test('length(range)', () => {
  const minLength = 3
  const maxLength = 30
  const schemaMin = _.string.length([minLength])
  transformSchema(schemaMin, null, (node) => {
    expect(node.constraints.minLength).toBe(minLength)
    expect(node.constraints.maxLength).toBeUndefined()
  })
  const schemaMax = _.string.length([, maxLength])
  transformSchema(schemaMax, null, (node) => {
    expect(node.constraints.minLength).toBeUndefined()
    expect(node.constraints.maxLength).toBe(maxLength)
  })
  
  const schemaRange = _.string.length([minLength, maxLength])
  transformSchema(schemaRange, null, (node) => {
    expect(node.constraints.minLength).toBe(minLength)
    expect(node.constraints.maxLength).toBe(maxLength)
  })
})