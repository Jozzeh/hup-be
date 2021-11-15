"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Helpers_1 = global[Symbol.for('ioc.use')]("Adonis/Core/Helpers");
const User_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/User"));
const InsertValidator_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Validators/Users/InsertValidator"));
const UpdateAdminValidator_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Validators/Users/UpdateAdminValidator"));
const UpdateUserValidator_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Validators/Users/UpdateUserValidator"));
class UsersController {
    async index() {
        const users = User_1.default.all();
        return users;
    }
    async single({ request }) {
        const user = await User_1.default.query()
            .preload('role')
            .preload('company')
            .where('id', request.params().id)
            .firstOrFail();
        return user;
    }
    async insert({ request }) {
        const req = await request.validate(InsertValidator_1.default);
        const user = new User_1.default();
        user.email = req.email;
        user.companyId = req.company_id;
        user.name = req.name;
        user.oneTimeKey = Helpers_1.cuid();
        if (req.role_id) {
            user.roleId = req.role_id;
        }
        await user.save();
        return user;
    }
    async update({ request, response, auth }) {
        const authUser = await auth.use('api').user;
        await authUser?.load('role');
        if (authUser) {
            if (authUser?.role.name === 'Admin') {
                const req = await request.validate(UpdateAdminValidator_1.default);
                const user = await User_1.default.findOrFail(request.params().id);
                user.name = req.name;
                user.roleId = req.role_id;
                user.companyId = req.company_id;
                user.active = req.active;
                if (req.email) {
                    user.email = req.email;
                }
                await user.save();
                return user;
            }
            else {
                const req = await request.validate(UpdateUserValidator_1.default);
                const user = await User_1.default.findOrFail(authUser.id);
                user.name = req.name;
                user.active = req.active;
                await user.save();
                return user;
            }
        }
        response.badRequest({
            errors: [{ message: 'User id is required in path.' }],
        });
    }
    async delete({ request, response }) {
        if (request.params().id) {
            const user = await User_1.default.query().where('id', request.params().id).firstOrFail();
            user.active = false;
            user.save();
            return response.noContent();
        }
        else {
            response.badRequest({
                errors: [{ message: 'User id is required in path.' }],
            });
        }
    }
    async profile({ auth }) {
        const user = await auth.use('api').user;
        await user?.load('role');
        await user?.load('company');
        return user;
    }
}
exports.default = UsersController;
//# sourceMappingURL=UsersController.js.map