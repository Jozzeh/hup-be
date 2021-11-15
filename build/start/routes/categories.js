"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Route_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Core/Route"));
Route_1.default.group(() => {
    Route_1.default.get('/', 'CategoriesController.index');
    Route_1.default.post('/', 'CategoriesController.insert');
    Route_1.default.get('/:id', 'CategoriesController.single');
    Route_1.default.put('/:id', 'CategoriesController.update');
    Route_1.default.delete('/:id', 'CategoriesController.delete');
})
    .prefix('/api/v1/categories')
    .middleware('auth');
//# sourceMappingURL=categories.js.map