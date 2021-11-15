"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Validator_1 = global[Symbol.for('ioc.use')]("Adonis/Core/Validator");
class InsertValidator {
    constructor(ctx) {
        this.ctx = ctx;
        this.schema = Validator_1.schema.create({
            email: Validator_1.schema.string({ trim: true }, [
                Validator_1.rules.email(),
                Validator_1.rules.unique({ table: 'users', column: 'email' }),
            ]),
            role_id: Validator_1.schema.number.optional([Validator_1.rules.exists({ table: 'roles', column: 'id' })]),
            company_id: Validator_1.schema.number([Validator_1.rules.exists({ table: 'companies', column: 'id' })]),
            name: Validator_1.schema.string(),
        });
        this.messages = {};
    }
}
exports.default = InsertValidator;
//# sourceMappingURL=InsertValidator.js.map