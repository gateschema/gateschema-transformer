"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    name: 'list',
    transform: function (options, done) {
        var _this = this;
        var state = options.state, node = options.node, constraint = options.constraint, validationOptions = options.validationOptions, pathValidationOptions = options.pathValidationOptions, transform = options.transform;
        var rootData = node.rootData, _a = node.value, value = _a === void 0 ? [] : _a;
        var schema = constraint.args[0];
        var parentPath = node.path;
        var count = value.length;
        state.types[parentPath] = 'list';
        if (count === 0) {
            return done();
        }
        var ret = function () {
            count--;
            if (count === 0) {
                done();
            }
        };
        value.forEach(function (item, idx) {
            _this.transform(schema, {
                path: parentPath === '/' ? "/" + idx : parentPath + "/" + idx,
                value: item,
                rootData: rootData,
                state: state,
                validationOptions: validationOptions,
                pathValidationOptions: pathValidationOptions,
                transform: transform,
                parentNode: node
            }, function (childNode) {
                node.children.push(childNode);
                ret();
            });
        });
    }
};
//# sourceMappingURL=list.js.map