"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Schema_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Lucid/Schema"));
class Roles extends Schema_1.default {
    constructor() {
        super(...arguments);
        this.tableName = 'roles';
    }
    async up() {
        this.schema.createTable(this.tableName, (table) => {
            table.increments('id');
            table.string('name', 255);
        });
        this.defer(async (db) => {
            const roles = ['Admin', 'User'];
            await Promise.all(roles.map((element) => {
                return db.table('roles').insert({
                    name: element,
                });
            }));
        });
    }
    async down() {
        this.schema.dropTable(this.tableName);
    }
}
exports.default = Roles;
//# sourceMappingURL=1636375028510_roles.js.map