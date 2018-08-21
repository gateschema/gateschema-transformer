"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    name: 'map',
    transform: function (options, done) {
        var _this = this;
        var state = options.state, node = options.node, constraint = options.constraint, validationOptions = options.validationOptions, pathValidationOptions = options.pathValidationOptions, transform = options.transform;
        var parentPath = node.path, rootData = node.rootData, value = node.value;
        var obj = constraint.args[0];
        var childrenIndexed = (state.childrenIndexed[parentPath] =
            state.childrenIndexed[parentPath] || {});
        state.types[parentPath] = 'map';
        var keys = Object.keys(obj);
        var count = keys.length;
        if (count === 0) {
            return done();
        }
        var ret = function () {
            count--;
            if (count === 0) {
                done();
            }
        };
        keys.forEach(function (item) {
            var path = parentPath === '/' ? "/" + item : parentPath + "/" + item;
            _this.transform(obj[item], {
                path: path,
                value: value && value[item],
                rootData: rootData,
                state: state,
                validationOptions: validationOptions,
                pathValidationOptions: pathValidationOptions,
                transform: transform,
                parentNode: node
            }, function (childNode) {
                if (childrenIndexed[path]) {
                    Object.assign(childrenIndexed[path], childNode);
                }
                else {
                    node.children.push(childNode);
                    childrenIndexed[path] = childNode;
                }
                ret();
            });
        });
    }
};
//# sourceMappingURL=map.js.map