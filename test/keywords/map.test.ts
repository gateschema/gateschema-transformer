import _ from "gateschema";
import { transformSchema } from "../util";

test('map', () => {
  const schema = _.map({
    name: _.required.string,
    password: _.required.string
  })

  const rootData = {
    name: 'foo'
  }

  transformSchema(schema, rootData, (node) => {
    const children = node.children

    expect(children).toBeInstanceOf(Array)
    expect(children).toHaveLength(2)
    expect(children[0].value).toBe(rootData.name)
    expect(children[0].schema).toBeDefined()
    expect(children[0].path).toBe('/name')

    expect(children[1].value).toBeUndefined()
    expect(children[1].schema).toBeDefined()
    expect(children[1].path).toBe('/password')
  })
})