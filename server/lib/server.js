"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const register_route_1 = __importDefault(require("./routes/register.route"));
const login_route_1 = __importDefault(require("./routes/login.route"));
const Event_route_1 = __importDefault(require("./routes/Event.route"));
const Payment_route_1 = __importDefault(require("./routes/Payment.route"));
const app = (0, express_1.default)();
const PORT = 3000;
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use("/register", register_route_1.default);
app.use("/login", login_route_1.default);
app.use("/event", Event_route_1.default);
app.use("/payment", Payment_route_1.default);
//new routes
app.use("/", (req, res) => {
    res.send("Univo Server");
});
app.use((err, req, res, next) => {
    res.status(500).json({ success: false, message: err.message });
});
// if (require.main === module) {
//   app.listen(PORT, () => {
//     console.log(`🔧 Local server running at http://localhost:${PORT}`);
//   });
// }
exports.default = app;
