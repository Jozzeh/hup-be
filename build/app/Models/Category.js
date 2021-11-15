"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const luxon_1 = require("luxon");
const Orm_1 = global[Symbol.for('ioc.use')]("Adonis/Lucid/Orm");
const Company_1 = __importDefault(require("./Company"));
const User_1 = __importDefault(require("./User"));
const Link_1 = __importDefault(require("./Link"));
class Category extends Orm_1.BaseModel {
}
__decorate([
    Orm_1.column({ isPrimary: true }),
    __metadata("design:type", Number)
], Category.prototype, "id", void 0);
__decorate([
    Orm_1.column(),
    __metadata("design:type", String)
], Category.prototype, "name", void 0);
__decorate([
    Orm_1.column(),
    __metadata("design:type", Number)
], Category.prototype, "companyId", void 0);
__decorate([
    Orm_1.column(),
    __metadata("design:type", Number)
], Category.prototype, "createdBy", void 0);
__decorate([
    Orm_1.column(),
    __metadata("design:type", Number)
], Category.prototype, "updatedBy", void 0);
__decorate([
    Orm_1.column(),
    __metadata("design:type", Boolean)
], Category.prototype, "active", void 0);
__decorate([
    Orm_1.belongsTo(() => Company_1.default, {
        localKey: 'id',
        foreignKey: 'companyId',
    }),
    __metadata("design:type", Object)
], Category.prototype, "company", void 0);
__decorate([
    Orm_1.belongsTo(() => User_1.default, {
        localKey: 'id',
        foreignKey: 'createdBy',
    }),
    __metadata("design:type", Object)
], Category.prototype, "creator", void 0);
__decorate([
    Orm_1.belongsTo(() => User_1.default, {
        localKey: 'id',
        foreignKey: 'updatedBy',
    }),
    __metadata("design:type", Object)
], Category.prototype, "editor", void 0);
__decorate([
    Orm_1.hasMany(() => Link_1.default, {
        foreignKey: 'categoryId',
    }),
    __metadata("design:type", Object)
], Category.prototype, "links", void 0);
__decorate([
    Orm_1.column.dateTime({ autoCreate: true }),
    __metadata("design:type", luxon_1.DateTime)
], Category.prototype, "createdAt", void 0);
__decorate([
    Orm_1.column.dateTime({ autoCreate: true, autoUpdate: true }),
    __metadata("design:type", luxon_1.DateTime)
], Category.prototype, "updatedAt", void 0);
exports.default = Category;
//# sourceMappingURL=Category.js.map