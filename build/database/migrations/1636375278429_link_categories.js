"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Schema_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Lucid/Schema"));
class LinkCategories extends Schema_1.default {
    constructor() {
        super(...arguments);
        this.tableName = 'categories';
    }
    async up() {
        this.schema.createTable(this.tableName, (table) => {
            table.increments('id');
            table.string('name', 255).notNullable();
            table.integer('company_id').unsigned().references('id').inTable('companies').notNullable();
            table.integer('created_by').unsigned().references('id').inTable('users').notNullable();
            table.integer('updated_by').unsigned().references('id').inTable('users').notNullable();
            table.boolean('active').defaultTo(true);
            table.timestamp('created_at', { useTz: true });
            table.timestamp('updated_at', { useTz: true });
        });
    }
    async down() {
        this.schema.dropTable(this.tableName);
    }
}
exports.default = LinkCategories;
//# sourceMappingURL=1636375278429_link_categories.js.map