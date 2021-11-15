"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Route_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Core/Route"));
Route_1.default.group(() => {
    Route_1.default.get('/', 'CompaniesController.index');
    Route_1.default.post('/', 'CompaniesController.insert');
    Route_1.default.get('/:id', 'CompaniesController.single');
    Route_1.default.put('/:id', 'CompaniesController.update');
})
    .prefix('/api/v1/companies')
    .middleware('auth')
    .middleware('role:Admin');
//# sourceMappingURL=companies.js.map