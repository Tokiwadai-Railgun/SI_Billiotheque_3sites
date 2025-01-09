"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const testRoute_1 = __importDefault(require("./routes/testRoute"));
const login_1 = __importDefault(require("./routes/login"));
app.use(express_1.default.json());
// login route is special, no login required so we define it here
app.use('/login', login_1.default);
function checkLoginMiddleware(request, response, next) {
    console.log('Checking login state');
    next();
}
app.use(checkLoginMiddleware);
app.use('/test', testRoute_1.default);
// Lancement de express sur le port 3000
const port = 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
