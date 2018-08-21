import _ from "gateschema";
import { transformSchema } from "../util";

test('enum', () => {
  const schema = _.enum({
    Opt1: 1,
    Opt2: 2
  })
  const rootData = ['a', 'b']
  transformSchema(schema, rootData, (node) => {
    expect(node.constraints.option).toBeInstanceOf(Object)
  })
})