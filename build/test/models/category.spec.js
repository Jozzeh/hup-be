"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Category_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/Category"));
const japa_1 = __importDefault(require("japa"));
japa_1.default.group('Category test', () => {
    japa_1.default('ensure category name is properly saved', async (assert) => {
        const category = new Category_1.default();
        category.name = 'Test';
        category.companyId = 1;
        category.createdBy = 1;
        category.updatedBy = 1;
        category.active = false;
        await category.save();
        assert.equal(category.name, 'Test');
        assert.equal(category.active, false);
    });
});
//# sourceMappingURL=category.spec.js.map