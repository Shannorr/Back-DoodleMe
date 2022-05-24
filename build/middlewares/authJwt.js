"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = void 0;
const auht_config_json_1 = __importDefault(require("../configs/auht.config.json"));
const jwt = require("jsonwebtoken");
function verifyToken(req, res, next) {
    let authorizationHeader = req.headers.authorization;
    if (!authorizationHeader) {
        const message = `Vous n'avez pas fourni de jeton d'authentification. Ajoutez-en un dans l'en-tête de la requête.`;
        return res.status(401).json({ message });
    }
    const token = authorizationHeader.split(' ')[1];
    const decodedToken = jwt.verify(token, auht_config_json_1.default.secret, (error, decodedToken) => {
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
