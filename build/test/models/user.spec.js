"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const japa_1 = __importDefault(require("japa"));
const User_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/User"));
japa_1.default.group('Users test', () => {
    japa_1.default('ensure user password gets hashed during save', async (assert) => {
        const user = new User_1.default();
        user.name = 'Jos User';
        user.email = 'jos@adonis.be';
        user.password = 'secret';
        user.companyId = 2;
        user.roleId = 2;
        await user.save();
        assert.notEqual(user.password, 'secret');
    });
});
//# sourceMappingURL=user.spec.js.map