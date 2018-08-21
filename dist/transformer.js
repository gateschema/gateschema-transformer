"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var existances = {
    required: true,
    optional: false
};
var types = {
    boolean: true,
    binary: true,
    number: true,
    string: true,
    list: true,
    map: true,
    enum: true,
    enumList: true
};
var transformer = {
    extend: function (_a) {
        var _this = this;
        var transformers = _a.transformers;
        var rendererExtend = Object.create(this);
        if (transformers) {
            transformers.forEach(function (item) {
                rendererExtend[_this.getTransformerKey(item.name)] = item.transform;
            });
        }
        return rendererExtend;
    },
    getTransformerKey: function (keywordName) {
        return '_transformer_' + keywordName;
    },
    transform: function (schema, _a, cb) {
        var _this = this;
        var _b = _a.path, path = _b === void 0 ? '/' : _b, value = _a.value, rootData = _a.rootData, state = _a.state, node = _a.node, validationOptions = _a.validationOptions, _c = _a.pathValidationOptions, pathValidationOptions = _c === void 0 ? {} : _c, transform = _a.transform, parentNode = _a.parentNode;
        validationOptions = pathValidationOptions[path] || validationOptions;
        var currentNode = node ||
            {
                value: value,
                error: undefined,
                path: path,
                rootData: rootData,
                schema: schema,
                constraints: {},
                children: []
            };
        if (typeof state === 'undefined') {
            state = {
                types: {},
                values: {},
                mapDefinitions: {},
                mapAllowAdditional: {},
                cache: {},
                childrenIndexed: {},
                GateSchema: schema.constructor
            };
        }
        var constraints = schema.constraints;
        var length = constraints.length;
        var index = 0;
        var done = function () {
            state.GateSchema.validate(currentNode.value, {
                schema: schema,
                path: path,
                rootData: rootData,
                state: state,
                options: validationOptions
            }, function (err) {
                if (err && err.path === path) {
                    currentNode.error = err;
                }
                cb(transform ? transform(currentNode, parentNode) : currentNode);
            });
        };
        var next = function () {
            if (index < length) {
                var constraint = constraints[index++];
                var keywordName = typeof constraint === 'string' ? constraint : constraint.keyword;
                if (existances[keywordName] !== undefined) {
                    currentNode.constraints.required = existances[keywordName];
                }
                else if (types[keywordName]) {
                    currentNode.constraints.type = keywordName;
                }
                var transformerKey = _this.getTransformerKey(keywordName);
                if (_this[transformerKey]) {
                    _this[transformerKey]({
                        node: currentNode,
                        constraint: constraint,
                        state: state,
                        validationOptions: validationOptions,
                        pathValidationOptions: pathValidationOptions,
                        transform: transform
                    }, next);
                }
                else {
                    next();
                }
            }
            else {
                done();
            }
        };
        next();
    }
};
exports.default = transformer;
//# sourceMappingURL=transformer.js.map