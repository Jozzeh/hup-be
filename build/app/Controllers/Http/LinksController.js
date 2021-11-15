"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Category_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/Category"));
const Link_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/Link"));
const InsertValidator_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Validators/Link/InsertValidator"));
class LinksController {
    async index({ request, auth, response }) {
        const categoryId = request.params().catid;
        const user = auth.use('api').user;
        await user?.load('role');
        let links;
        if (user) {
            if (user?.role.name === 'Admin') {
                links = await Link_1.default.query().where('category_id', categoryId);
            }
            else {
                links = await Link_1.default.query()
                    .where('category_id', categoryId)
                    .with('category', (category) => {
                    category.where('company_id', user.companyId);
                });
            }
        }
        if (links) {
            return links;
        }
        response.forbidden({ errors: [{ message: 'Links and category not found' }] });
    }
    async single({ request, auth, response }) {
        const id = request.params().id;
        const categoryId = request.params().catid;
        const user = auth.use('api').user;
        await user?.load('role');
        let link;
        if (user) {
            if (user?.role.name === 'Admin') {
                link = await Link_1.default.query().where('category_id', categoryId).where('id', id).firstOrFail();
            }
            else {
                link = await Link_1.default.query()
                    .where('category_id', categoryId)
                    .andWhere('id', id)
                    .with('category', (category) => {
                    category.where('company_id', user.companyId);
                })
                    .firstOrFail();
            }
        }
        if (link) {
            return link;
        }
        response.forbidden({ errors: [{ message: 'Links and category not found' }] });
    }
    async insert({ request, auth, response }) {
        const req = await request.validate(InsertValidator_1.default);
        const categoryId = request.params().catid;
        const user = auth.use('api').user;
        await user?.load('role');
        if (categoryId && user) {
            let category = new Category_1.default();
            if (user?.role.name !== 'Admin') {
                category = await Category_1.default.query()
                    .where('id', categoryId)
                    .andWhere('company_id', user.companyId)
                    .firstOrFail();
            }
            console.log(category);
            const link = new Link_1.default();
            link.name = req.name;
            link.link = req.link;
            link.categoryId = categoryId;
            if (user) {
                link.createdBy = user.id;
                link.updatedBy = user.id;
            }
            if (req.active) {
                link.active = req.active;
            }
            await link.save();
            return link;
        }
        else {
            return response.badRequest();
        }
    }
    async update({ request, auth }) {
        const req = await request.validate(InsertValidator_1.default);
        const categoryId = request.params().catid;
        const id = request.params().id;
        const user = auth.use('api').user;
        await user?.load('role');
        let link = new Link_1.default();
        if (user) {
            if (user.role.name === 'Admin') {
                link = await Link_1.default.query().where('id', id).firstOrFail();
            }
            else {
                link = await Link_1.default.query()
                    .where('id', id)
                    .with('category', (category) => {
                    category.where('company_id', user.companyId);
                })
                    .firstOrFail();
            }
            link.name = req.name;
            link.link = req.link;
            link.categoryId = categoryId;
            if (user) {
                link.updatedBy = user.id;
            }
            if (req.active) {
                link.active = req.active;
            }
            await link.save();
        }
        return link;
    }
    async delete({ request, auth, response }) {
        const categoryId = request.params().catid;
        const id = request.params().id;
        const user = auth.use('api').user;
        await user?.load('role');
        let link = new Link_1.default();
        if (user) {
            if (user?.role.name === 'Admin') {
                link = await Link_1.default.query().where('id', id).firstOrFail();
            }
            else {
                if (parseInt(categoryId) === user.companyId) {
                    link = await Link_1.default.query()
                        .where('id', id)
                        .andWhere('company_id', user.companyId)
                        .firstOrFail();
                }
                else {
                    response.badRequest({ errors: [{ message: 'Category not found' }] });
                }
            }
            link.active = false;
            await link.save();
        }
        return response.noContent();
    }
}
exports.default = LinksController;
//# sourceMappingURL=LinksController.js.map