"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Schema_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Lucid/Schema"));
const Env_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Core/Env"));
class UsersAdminUpdates extends Schema_1.default {
    constructor() {
        super(...arguments);
        this.tableName = 'users';
    }
    async up() {
        this.defer(async (db) => {
            const AdminUser = await db
                .query()
                .select('id')
                .from(this.tableName)
                .where('email', Env_1.default.get('ADMIN_EMAIL'))
                .firstOrFail();
            await db
                .query()
                .from(this.tableName)
                .where('id', AdminUser.id)
                .update({ name: Env_1.default.get('ADMIN_NAME'), role_id: 1, company_id: 2 });
        });
    }
    async down() { }
}
exports.default = UsersAdminUpdates;
//# sourceMappingURL=1636376115735_users_admin_updates.js.map