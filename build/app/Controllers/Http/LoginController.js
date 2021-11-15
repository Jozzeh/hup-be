"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Hash_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Core/Hash"));
const Helpers_1 = global[Symbol.for('ioc.use')]("Adonis/Core/Helpers");
const User_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/User"));
const LoginValidator_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Validators/Login/LoginValidator"));
const ResetValidator_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Validators/Login/ResetValidator"));
const ForgotValidator_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Validators/Login/ForgotValidator"));
class LoginController {
    async forgotPassword({ request, response }) {
        const req = await request.validate(ForgotValidator_1.default);
        const user = await User_1.default.query().where('email', req.email).first();
        if (user) {
            user.oneTimeKey = Helpers_1.cuid();
            await user.save();
        }
        return response.noContent();
    }
    async resetPassword({ request, response }) {
        const req = await request.validate(ResetValidator_1.default);
        const user = await User_1.default.query().where('one_time_key', req.one_time_key).firstOrFail();
        user.password = req.password;
        user.oneTimeKey = '';
        await user.save();
        return response.noContent();
    }
    async login({ request, response, auth }) {
        const req = await request.validate(LoginValidator_1.default);
        const email = req.email;
        const password = req.password;
        const rememberme = req.rememberme;
        const user = await User_1.default.query().where('email', email).andWhere('active', true).firstOrFail();
        if (user.password !== '') {
            if (!(await Hash_1.default.verify(user.password, password))) {
                return response.badRequest({
                    messages: [
                        {
                            message: 'Invalid credentials',
                            stack: 'LoginController',
                            code: 'E_INVALID_CREDENTIALS',
                        },
                    ],
                });
            }
        }
        else {
            return response.badRequest({
                messages: [
                    {
                        message: 'Invalid credentials',
                        stack: 'LoginController',
                        code: 'E_INVALID_CREDENTIALS',
                    },
                ],
            });
        }
        if (rememberme === 1) {
            const token = await auth.use('api').generate(user);
            return token;
        }
        else {
            const token = await auth.use('api').generate(user, {
                expiresIn: '1days',
            });
            return token;
        }
    }
    async logout({ auth, response }) {
        await auth.use('api').revoke();
        return response.noContent();
    }
}
exports.default = LoginController;
//# sourceMappingURL=LoginController.js.map