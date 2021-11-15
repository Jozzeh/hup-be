"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Company_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/Company"));
const InsertAndUpdateValidator_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Validators/Companies/InsertAndUpdateValidator"));
class CompaniesController {
    async index() {
        const companies = await Company_1.default.all();
        return companies;
    }
    async single({ request }) {
        const id = request.params().id;
        const company = await Company_1.default.findOrFail(id);
        await company.load('users');
        return company;
    }
    async insert({ request }) {
        const req = await request.validate(InsertAndUpdateValidator_1.default);
        const company = new Company_1.default();
        company.name = req.name;
        await company.save();
        return company;
    }
    async update({ request }) {
        const id = request.params().id;
        const req = await request.validate(InsertAndUpdateValidator_1.default);
        const company = await Company_1.default.findOrFail(id);
        company.name = req.name;
        await company.save();
        return company;
    }
}
exports.default = CompaniesController;
//# sourceMappingURL=CompaniesController.js.map