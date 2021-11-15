"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Validator_1 = global[Symbol.for('ioc.use')]("Adonis/Core/Validator");
class InsertValidator {
    constructor(ctx) {
        this.ctx = ctx;
        this.schema = Validator_1.schema.create({
            name: Validator_1.schema.string(),
            link: Validator_1.schema.string(),
            active: Validator_1.schema.boolean.optional(),
        });
        this.messages = {};
    }
}
exports.default = InsertValidator;
//# sourceMappingURL=InsertValidator.js.map