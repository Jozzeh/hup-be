"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Role_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/Role"));
class RolesController {
    async index() {
        const roles = await Role_1.default.all();
        return roles;
    }
}
exports.default = RolesController;
//# sourceMappingURL=RolesController.js.map