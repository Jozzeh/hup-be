"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Validator_1 = global[Symbol.for('ioc.use')]("Adonis/Core/Validator");
class ResetValidator {
    constructor(ctx) {
        this.ctx = ctx;
        this.schema = Validator_1.schema.create({
            one_time_key: Validator_1.schema.string({}, [Validator_1.rules.minLength(12)]),
            password: Validator_1.schema.string(),
        });
        this.messages = {};
    }
}
exports.default = ResetValidator;
//# sourceMappingURL=ResetValidator.js.map