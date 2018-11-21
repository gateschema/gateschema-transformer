"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    name: 'switch',
    transform: function (options, done) {
        var state = options.state, node = options.node, constraint = options.constraint, validationOptions = options.validationOptions, pathValidationOptions = options.pathValidationOptions, transform = options.transform;
        var path = node.path, rootData = node.rootData, schema = node.schema, value = node.value;
        var schemaCtor = schema.constructor;
        var transformer = this;
        var args = constraint.args;
        var getMatchSchema = schemaCtor._getMatchSchema.switch;
        getMatchSchema.call(schemaCtor, {
            path: path,
            args: args,
            rootData: rootData,
            state: state
        }, function (targetSchema) {
            if (targetSchema) {
                transformer.transform(targetSchema, {
                    path: path,
                    value: value,
                    rootData: rootData,
                    node: node,
                    state: state,
                    validationOptions: validationOptions,
                    pathValidationOptions: pathValidationOptions,
                    transform: transform
                }, done);
            }
            else {
                done();
            }
        });
    }
};
//# sourceMappingURL=switch.js.map