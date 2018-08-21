# gateschema-transformer [![Build Status](https://travis-ci.org/GateSchema/gateschema-transformer.svg?branch=master)](https://travis-ci.org/GateSchema/gateschema-transformer)  [![Coverage Status](https://coveralls.io/repos/github/GateSchema/gateschema-transformer/badge.svg)](https://coveralls.io/github/GateSchema/gateschema-transformer)
A transformer for GateSchema using in [gateschema-form-vue](https://github.com/GateSchema/gateschema-form-vue) and [gateschema-form-react](https://github.com/GateSchema/gateschema-form-react)  

It transforms a gateschema to tree-like json object.

Interface 
```ts  

interface Node {
  value: any;
  error?: string;
  path: string;
  schema: GateSchema;
  rootData: any;
  children: Node[];
  constraints: {
    required?: boolean;
    type?:
      | 'boolean'
      | 'binary'
      | 'number'
      | 'string'
      | 'list'
      | 'map'
      | 'enum'
      | 'enumList';
    length?: number;
    maxLength?: number;
    minLength?: number;
    format?: string;
    oneOf?: {
      [key: number]: any;
    };
    option?: {
      [key: string]: number;
    };
    other?: {
      form?: {
        [key: string]: any;
      };
      [key: string]: any;
    };
  };

  [key: string]: any;
}
```


## Install  
```
npm install gateschema-transformer --save  
```

## API  
### `transform(schema: GateSchema, options: TransformOptions, cb: TransformCallback)`  
see [interface.ts](https://github.com/GateSchema/gateschema-transformer/blob/master/src/interface.ts) for more details

### `extend(options: { transformers?: KeywordTransformer[] })`  
see [interface.ts](https://github.com/GateSchema/gateschema-transformer/blob/master/src/interface.ts) for more details

## License  
MIT