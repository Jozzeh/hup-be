"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Schema_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Lucid/Schema"));
class UsersAlters extends Schema_1.default {
    constructor() {
        super(...arguments);
        this.tableName = 'users';
    }
    async up() {
        this.schema.alterTable('users', (table) => {
            table.string('name').notNullable().defaultTo('');
            table
                .integer('role_id')
                .unsigned()
                .references('id')
                .inTable('roles')
                .notNullable()
                .defaultTo(2);
            table
                .integer('company_id')
                .unsigned()
                .references('id')
                .inTable('companies')
                .notNullable()
                .defaultTo(1);
            table.string('one_time_key');
            table.boolean('active').defaultTo(true);
        });
    }
    async down() { }
}
exports.default = UsersAlters;
//# sourceMappingURL=1636375112518_users_alters.js.map