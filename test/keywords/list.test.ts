import _ from "gateschema";
import { transformSchema } from "../util";

test('list', () => {
  const nodeSchema = _.required.string 
  const schema = _.list(nodeSchema)
  const rootData = ['a', 'b']
  transformSchema(schema, rootData, (node) => {
    const children = node.children

    expect(children).toBeInstanceOf(Array)
    expect(children).toHaveLength(2)
    expect(children[0].path).toBe('/0')
    expect(children[0].value).toBe(rootData[0])
    expect(children[0].rootData).toBe(rootData)
    expect(children[0].schema).toBe(nodeSchema)

    expect(children[1].value).toBe(rootData[1])
    expect(children[1].path).toBe('/1')
    expect(children[1].schema).toBe(nodeSchema)

  })
})