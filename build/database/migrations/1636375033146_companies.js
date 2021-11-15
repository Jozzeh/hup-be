"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Schema_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Lucid/Schema"));
class Companies extends Schema_1.default {
    constructor() {
        super(...arguments);
        this.tableName = 'companies';
    }
    async up() {
        this.schema.createTable(this.tableName, (table) => {
            table.increments('id');
            table.string('name', 255);
            table.timestamp('created_at', { useTz: true });
            table.timestamp('updated_at', { useTz: true });
        });
        this.defer(async (db) => {
            const companies = ['Empty', 'Sweet Mustard'];
            await Promise.all(companies.map((element) => {
                return db.table('companies').insert({
                    name: element,
                    created_at: this.now(),
                    updated_at: this.now(),
                });
            }));
        });
    }
    async down() {
        this.schema.dropTable(this.tableName);
    }
}
exports.default = Companies;
//# sourceMappingURL=1636375033146_companies.js.map