"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var sharp_1 = __importDefault(require("sharp"));
var image_1 = require("../../utilities/image");
var thumb_1 = require("../../utilities/thumb");
var imagesRootPath = './assets/images';
var thumbRootPath = './assets/thumb';
var image = express_1.default.Router();
var middleswares = [image_1.checkParams, image_1.checkImageExist, image_1.checkImageWidthParmas, image_1.checkImageHeightParams, thumb_1.checkThumbExist];
image.get('/', middleswares, function (req, res) {
    var image = {
        name: req.query.filename,
        width: Number(req.query.width),
        height: Number(req.query.height)
    };
    sharp_1.default(imagesRootPath + "/" + image.name + ".jpg")
        .resize(image.width, image.height)
        .toFile(thumbRootPath + "/" + req.query.filename + "_" + req.query.width + "_" + req.query.height + "_thumb.jpg", function (err) {
        if (err === null) {
            res.sendFile(thumbRootPath + "/" + image.name + "_" + image.width + "_" + image.height + "_thumb.jpg", { root: '.' });
        }
        else {
            var newError = {
                status: res.statusCode,
                errorCode: 6,
                errorMessage: err.message
            };
            res.send(newError);
        }
    });
});
exports.default = image;
