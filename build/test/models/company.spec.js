"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const japa_1 = __importDefault(require("japa"));
const Company_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/Company"));
japa_1.default.group('Companies test', () => {
    japa_1.default('ensure company name is properly saved', async (assert) => {
        const company = new Company_1.default();
        company.name = 'Test';
        await company.save();
        assert.equal(company.name, 'Test');
    });
});
//# sourceMappingURL=company.spec.js.map