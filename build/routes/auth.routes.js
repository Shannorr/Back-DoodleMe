"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.routesLogin = void 0;
const auth_controller_1 = require("../controllers/auth.controller");
const verifySignUp_1 = require("../middlewares/verifySignUp");
const authJwt_1 = require("../middlewares/authJwt");
const controller = __importStar(require("../controllers/user.controller"));
function routesLogin(app) {
    app.use(function (req, res, next) {
        res.header("Access-Control-Allow-Headers", "x-access-token, Origin, Content-Type, Accept");
        next();
    });
    app.post("/api/auth/signup", verifySignUp_1.checkBody, verifySignUp_1.checkDuplicateUsername, auth_controller_1.signup);
    app.post("/api/auth/signin", auth_controller_1.signin);
    app.get("/api/test/user", authJwt_1.verifyToken, controller.userBoard);
}
exports.routesLogin = routesLogin;
;
