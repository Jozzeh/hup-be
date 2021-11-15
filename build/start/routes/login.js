"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Route_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Core/Route"));
Route_1.default.group(() => {
    Route_1.default.post('/login', 'LoginController.login');
    Route_1.default.post('/logout', 'LoginController.logout');
    Route_1.default.post('/forgot', 'LoginController.forgotPassword');
    Route_1.default.post('/reset', 'LoginController.resetPassword');
}).prefix('/api/v1');
//# sourceMappingURL=login.js.map