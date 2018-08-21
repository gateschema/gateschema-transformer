"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    name: 'other',
    transform: function (_a, cb) {
        var node = _a.node, constraint = _a.constraint;
        var constraints = node.constraints;
        var _b = constraint.args, type = _b[0], params = _b[1];
        var other = (constraints.other = constraints.other || {});
        if (type === 'form') {
            other.form = other.form || {};
            Object.assign(other.form, params);
        }
        cb();
    }
};
//# sourceMappingURL=other.js.map