import _ from "gateschema";
import { transformSchema } from "../util";

test('other', () => {
  const key = Symbol.for('key')
  const value = Symbol.for('value')
  const schema = _.other('form', {
    key: value
  })
  transformSchema(schema, null, (node) => {
    const other = node.constraints.other
    expect(other).toBeInstanceOf(Object)
    expect(other.form).toBeInstanceOf(Object)
    expect(other.form.key).toBe(value)
  })
})