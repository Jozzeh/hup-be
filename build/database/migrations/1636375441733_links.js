"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Schema_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Lucid/Schema"));
class Links extends Schema_1.default {
    constructor() {
        super(...arguments);
        this.tableName = 'links';
    }
    async up() {
        this.schema.createTable(this.tableName, (table) => {
            table.increments('id');
            table.string('name').notNullable();
            table.string('link').notNullable();
            table.integer('category_id').unsigned().references('id').inTable('categories').notNullable();
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
exports.default = Links;
//# sourceMappingURL=1636375441733_links.js.map