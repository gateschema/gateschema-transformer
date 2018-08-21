"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var enum_1 = __importDefault(require("./keywords/enum"));
var enumList_1 = __importDefault(require("./keywords/enumList"));
var length_1 = __importDefault(require("./keywords/length"));
var list_1 = __importDefault(require("./keywords/list"));
var map_1 = __importDefault(require("./keywords/map"));
var other_1 = __importDefault(require("./keywords/other"));
var switch_1 = __importDefault(require("./keywords/switch"));
var transformer_1 = __importDefault(require("./transformer"));
var transformer = transformer_1.default.extend({
    transformers: [enum_1.default, enumList_1.default, length_1.default, list_1.default, map_1.default, other_1.default, switch_1.default]
});
exports.default = transformer;
//# sourceMappingURL=index.js.map