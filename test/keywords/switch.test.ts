import _ from "gateschema";
import { transformSchema } from "../util";

test('switch', () => {
  const schema = _.map({
    name: _.optional.string,
    password: _.optional.string
  }).switch('/password', [
    {
      case: _.required,
      schema: _.map({
        repassword: _.equal('/password')
      })
    },
    {
      case: _.any,
      schema: _.map({
        name: _.required
      })
    }
  ])

  transformSchema(schema, {
    password: '123456'
  }, (node) => {
    const children = node.children
    expect(children).toBeInstanceOf(Array)
    // name, password, repassword
    expect(children).toHaveLength(3)
  })

  transformSchema(schema, {
  }, (node) => {
    const children = node.children
    expect(children).toBeInstanceOf(Array)
    // name, password
    expect(children).toHaveLength(2)
    // name: required = true
    expect(children[0].constraints.required).toBe(true)
  })

})


test('switch in switch', () => {
  const schema = _.map({
    name: _.optional.string,
    password: _.optional.string,
  }).switch('/name', [
    {
      case: _.required,
      schema: _.switch('/password', [
        {
          case: _.required,
          schema: _.map({
            repassword: _.required.string
          })
        }
      ]),
    },
    {
      case: _.any,
      schema: _.map({
        name: _.required
      })
    }
  ])

  transformSchema(schema, {
    name: '123456',
    password: '123456'
  }, (node) => {
    const children = node.children
    expect(children).toBeInstanceOf(Array)
    // name, password, repassword
    expect(children).toHaveLength(3)
    // name: required = false
    expect(children[0].constraints.required).toBe(false)
  })

  transformSchema(schema, {
  }, (node) => {
    const children = node.children
    expect(children).toBeInstanceOf(Array)
    // name, password 
    expect(children).toHaveLength(2)
    // name: required = true
    expect(children[0].constraints.required).toBe(true)
  })

})