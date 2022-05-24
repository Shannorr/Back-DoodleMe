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
exports.verifyToken = void 0;
const config = __importStar(require("../configs/auth.config.json"));
const jwt = require("jsonwebtoken");
function verifyToken(req, res, next) {
    let authorizationHeader = req.headers.authorization;
    if (!authorizationHeader) {
        const message = `Vous n'avez pas fourni de jeton d'authentification. Ajoutez-en un dans l'en-tête de la requête.`;
        return res.status(401).json({ message });
    }
    const token = authorizationHeader.split(' ')[1];
    const decodedToken = jwt.verify(token, config.secret, (error, decodedToken) => {
        if (error) {
            const message = `L'utilisateur n'est pas autorisé à accèder à cette ressource.`;
            return res.status(401).json({ message, data: error });
        }
        const userId = decodedToken.userId;
        if (req.body.userId && req.body.userId !== userId) {
            const message = `L'identifiant de l'utilisateur est invalide.`;
            res.status(401).json({ message });
        }
        else {
            next();
        }
    });
}
exports.verifyToken = verifyToken;
;
