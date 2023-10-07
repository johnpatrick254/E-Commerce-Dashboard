"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadImgae = void 0;
const multer_1 = __importDefault(require("multer"));
const path_1 = require("path");
const uploadImgae = (req, res) => {
    const storage = multer_1.default.diskStorage({
        destination: './uploads',
        filename(_req, file, callback) {
            const randomname = Math.random().toString(20).substring(2, 12);
            return callback(null, `${randomname}${(0, path_1.extname)(file.originalname)}`);
        }
    });
    var upload = (0, multer_1.default)({
        storage: storage
    }).single('image');
    upload(req, res, (err) => {
        if (err) {
            return res.status(400).send({ message: err });
        }
        res.status(200).send({
            url: "http://localhost:3000/api/upload/" + `${req.file?.filename}`
        });
    });
};
exports.uploadImgae = uploadImgae;
