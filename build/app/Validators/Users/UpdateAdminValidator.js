"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Validator_1 = global[Symbol.for('ioc.use')]("Adonis/Core/Validator");
class UpdateAdminValidator {
    constructor(ctx) {
        this.ctx = ctx;
        this.schema = Validator_1.schema.create({
            name: Validator_1.schema.string(),
            email: Validator_1.schema.string.optional({ trim: true }, [Validator_1.rules.email()]),
            role_id: Validator_1.schema.number([Validator_1.rules.exists({ table: 'roles', column: 'id' })]),
            company_id: Validator_1.schema.number([Validator_1.rules.exists({ table: 'companies', column: 'id' })]),
            active: Validator_1.schema.boolean(),
        });
        this.messages = {};
    }
}
exports.default = UpdateAdminValidator;
//# sourceMappingURL=UpdateAdminValidator.js.map