"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Route_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Core/Route"));
Route_1.default.group(() => {
    Route_1.default.get('/', 'UsersController.index');
    Route_1.default.post('/', 'UsersController.insert').middleware('role:Admin');
    Route_1.default.get('/profile', 'UsersController.profile');
    Route_1.default.get('/:id', 'UsersController.single');
    Route_1.default.put('/:id', 'UsersController.update');
    Route_1.default.delete('/:id', 'UsersController.delete').middleware('role:Admin');
})
    .prefix('/api/v1/users')
    .middleware('auth');
//# sourceMappingURL=users.js.map