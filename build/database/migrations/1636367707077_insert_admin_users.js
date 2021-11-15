"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Schema_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Lucid/Schema"));
const Env_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Core/Env"));
const Hash_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Core/Hash"));
class InsertAdminUsers extends Schema_1.default {
    async up() {
        const password = await Hash_1.default.make(Env_1.default.get('ADMIN_PASSWORD'));
        this.defer(async (db) => {
            await db.table('users').insert({
                email: Env_1.default.get('ADMIN_EMAIL'),
                password: password,
                created_at: this.now(),
                updated_at: this.now(),
            });
        });
    }
    async down() { }
}
exports.default = InsertAdminUsers;
//# sourceMappingURL=1636367707077_insert_admin_users.js.map