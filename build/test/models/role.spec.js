"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const japa_1 = __importDefault(require("japa"));
const Role_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/Role"));
japa_1.default.group('Roles test', () => {
    japa_1.default('ensure role name is properly saved', async (assert) => {
        const role = new Role_1.default();
        role.name = 'Test';
        await role.save();
        assert.equal(role.name, 'Test');
    });
});
//# sourceMappingURL=role.spec.js.map