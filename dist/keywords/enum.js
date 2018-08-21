"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    name: 'enum',
    transform: function (_a, done) {
        var node = _a.node, constraint = _a.constraint;
        node.constraints.option = constraint.args[0];
        done();
    }
};
//# sourceMappingURL=enum.js.map