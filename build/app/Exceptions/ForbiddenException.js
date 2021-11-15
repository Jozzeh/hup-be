"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const standalone_1 = require("@adonisjs/core/build/standalone");
class ForbiddenException extends standalone_1.Exception {
    async handle(error, ctx) {
        ctx.response.status(403).send({
            errors: [
                {
                    message: error.message,
                    code: 'E_ROLE_NOT_AUTHORISED',
                },
            ],
        });
    }
}
exports.default = ForbiddenException;
//# sourceMappingURL=ForbiddenException.js.map