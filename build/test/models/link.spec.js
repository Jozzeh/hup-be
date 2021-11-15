"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Link_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/Link"));
const japa_1 = __importDefault(require("japa"));
japa_1.default.group('Category test', () => {
    japa_1.default('ensure link name is properly saved', async (assert) => {
        const link = new Link_1.default();
        link.name = 'Test';
        link.link = 'https://josdeberdt.be';
        link.categoryId = 1;
        link.createdBy = 1;
        link.updatedBy = 1;
        link.active = false;
        await link.save();
        assert.equal(link.name, 'Test');
        assert.equal(link.link, 'https://josdeberdt.be');
        assert.equal(link.active, false);
    });
});
//# sourceMappingURL=link.spec.js.map