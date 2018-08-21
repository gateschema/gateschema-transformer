import _ from 'gateschema'
import { transformSchema } from './util'

test('render()', () => {
  const schema = _.required
  transformSchema(schema, null, (node) => {
    expect(node.value).toBeDefined()
    expect(node.path).toBeDefined()
    expect(node.error).toBeDefined()
    expect(node.schema).toBeDefined()
    expect(node.children).toBeDefined()
    expect(node.constraints).toBeDefined()
    expect(node.constraints.required).toBeDefined()
  })
})