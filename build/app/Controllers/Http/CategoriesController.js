"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Category_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/Category"));
const InsertAndUpdateValidator_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Validators/Categories/InsertAndUpdateValidator"));
class CategoriesController {
    async index({ auth }) {
        const user = auth.use('api').user;
        await user?.load('role');
        let categories;
        if (user) {
            if (user?.role.name === 'Admin') {
                categories = await Category_1.default.all();
            }
            else {
                categories = await Category_1.default.query().where('company_id', user?.companyId);
            }
        }
        return categories;
    }
    async single({ request, auth }) {
        const user = auth.use('api').user;
        await user?.load('role');
        let category = new Category_1.default();
        if (user) {
            if (user?.role.name === 'Admin') {
                category = await Category_1.default.query()
                    .where('id', request.params().id)
                    .preload('links')
                    .preload('creator')
                    .preload('editor')
                    .preload('company')
                    .firstOrFail();
            }
            else {
                category = await Category_1.default.query()
                    .where('company_id', user?.companyId)
                    .where('id', request.params().id)
                    .preload('links')
                    .preload('creator')
                    .preload('editor')
                    .preload('company')
                    .firstOrFail();
            }
        }
        return category;
    }
    async insert({ request, auth }) {
        const req = await request.validate(InsertAndUpdateValidator_1.default);
        const user = auth.use('api').user;
        await user?.load('role');
        const category = new Category_1.default();
        category.name = req.name;
        if (user) {
            if (user?.role.name === 'Admin') {
                category.companyId = req.company_id ? req.company_id : user?.companyId;
            }
            else {
                category.companyId = user.companyId;
            }
            category.createdBy = user.id;
            category.updatedBy = user.id;
        }
        if (req.active) {
            category.active = req.active;
        }
        await category.save();
        return category;
    }
    async update({ request, response, auth }) {
        const req = await request.validate(InsertAndUpdateValidator_1.default);
        const user = auth.use('api').user;
        await user?.load('role');
        let category = new Category_1.default();
        if (user) {
            if (user.role.name === 'Admin') {
                category = await Category_1.default.query()
                    .where('id', request.params().id)
                    .andWhere('company_id', req.company_id ? req.company_id : user?.companyId)
                    .firstOrFail();
            }
            else {
                category = await Category_1.default.query()
                    .where('id', request.params().id)
                    .andWhere('company_id', user?.companyId)
                    .firstOrFail();
            }
            category.name = req.name;
            category.updatedBy = user.id;
            if (req.active) {
                category.active = req.active;
            }
            await category.save();
            return category;
        }
        return response.badRequest({ errors: [{ message: 'Category not found' }] });
    }
    async delete({ request, auth, response }) {
        const user = auth.use('api').user;
        await user?.load('role');
        let category = new Category_1.default();
        if (user) {
            if (user?.role.name === 'Admin') {
                category = await Category_1.default.query()
                    .where('id', request.params().id)
                    .preload('links')
                    .firstOrFail();
            }
            else {
                category = await Category_1.default.query()
                    .where('company_id', user?.companyId)
                    .where('id', request.params().id)
                    .preload('links')
                    .firstOrFail();
            }
            category.active = false;
            category.updatedBy = user?.id;
            category.save();
        }
        return response.noContent();
    }
}
exports.default = CategoriesController;
//# sourceMappingURL=CategoriesController.js.map