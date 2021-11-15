"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Route_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Core/Route"));
require("./routes/login");
require("./routes/companies");
require("./routes/roles");
require("./routes/users");
require("./routes/links");
require("./routes/categories");
Route_1.default.get('/', async () => {
    return { nothing: 'here' };
});
//# sourceMappingURL=routes.js.map