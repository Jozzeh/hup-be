"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Route_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Core/Route"));
Route_1.default.group(() => {
    Route_1.default.get('/:catid/links/:id', 'LinksController.single');
    Route_1.default.put('/:catid/links/:id', 'LinksController.update');
    Route_1.default.delete('/:catid/links/:id', 'LinksController.delete');
    Route_1.default.get('/:catid/links', 'LinksController.index');
    Route_1.default.post('/:catid/links', 'LinksController.insert');
})
    .prefix('/api/v1/categories')
    .middleware('auth');
//# sourceMappingURL=links.js.map