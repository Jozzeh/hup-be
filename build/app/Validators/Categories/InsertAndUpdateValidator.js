"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Validator_1 = global[Symbol.for('ioc.use')]("Adonis/Core/Validator");
class InsertAndUpdateValidator {
    constructor(ctx) {
        this.ctx = ctx;
        this.schema = Validator_1.schema.create({
            name: Validator_1.schema.string(),
            company_id: Validator_1.schema.number.optional(),
            active: Validator_1.schema.boolean.optional(),
        });
        this.messages = {};
    }
}
exports.default = InsertAndUpdateValidator;
//# sourceMappingURL=InsertAndUpdateValidator.js.map