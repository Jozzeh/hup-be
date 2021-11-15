"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ForbiddenException_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Exceptions/ForbiddenException"));
const Role_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/Role"));
class Roles {
    async authorize(user, validRoles) {
        const allRoles = await Role_1.default.all();
        for (let i = 0; i < allRoles.length; i++) {
            if (user?.roleId === allRoles[i].id && validRoles?.indexOf(allRoles[i].name) !== -1) {
                return true;
            }
        }
        const errormessage = 'User is forbidden to do this action';
        throw new ForbiddenException_1.default(errormessage);
    }
    async handle({ auth }, next, validRoles) {
        const user = auth.use('api').user;
        await this.authorize(user, validRoles);
        await next();
    }
}
exports.default = Roles;
//# sourceMappingURL=Roles.js.map