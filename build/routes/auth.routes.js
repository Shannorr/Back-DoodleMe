"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.routesLogin = void 0;
const auth_controller_1 = require("../controllers/auth.controller");
const verifySignUp_1 = require("../middlewares/verifySignUp");
function routesLogin(app) {
    app.use(function (req, res, next) {
        res.header("Access-Control-Allow-Headers", "x-access-token, Origin, Content-Type, Accept");
        next();
    });
    app.post("/api/auth/signup", verifySignUp_1.checkDuplicateUsernameOrEmail, auth_controller_1.signup);
    // app.post("/api/auth/signin", signin);
}
exports.routesLogin = routesLogin;
;
