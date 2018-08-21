"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    name: 'length',
    transform: function (_a, done) {
        var node = _a.node, constraint = _a.constraint;
        var length = constraint.args[0];
        var constraints = node.constraints;
        if (Array.isArray(length)) {
            var minLength = length[0], maxLength = length[1];
            constraints.minLength = minLength;
            constraints.maxLength = maxLength;
        }
        else {
            constraints.length = length;
        }
        done();
    }
};
//# sourceMappingURL=length.js.map