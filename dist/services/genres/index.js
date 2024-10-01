"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const models_1 = require("../../models");
class GenresService {
    constructor() { }
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const genres = yield models_1.GenreModel.find();
            return genres;
        });
    }
    getById(_id) {
        return __awaiter(this, void 0, void 0, function* () {
            const genre = yield models_1.GenreModel.findById({ _id });
            if (!genre) {
                throw new Error("Genre not found");
            }
            return genre;
        });
    }
    create(body) {
        return __awaiter(this, void 0, void 0, function* () {
            const genre = yield models_1.GenreModel.create(body);
            return genre;
        });
    }
    updateById(_id, body) {
        return __awaiter(this, void 0, void 0, function* () {
            const genre = yield models_1.GenreModel.findByIdAndUpdate({ _id }, body, {
                new: true,
            });
            if (!genre) {
                throw new Error("Genre not found");
            }
            return genre;
        });
    }
    deleteById(_id) {
        return __awaiter(this, void 0, void 0, function* () {
            const genre = yield models_1.GenreModel.findByIdAndDelete({ _id });
            if (!genre) {
                throw new Error("Genre not found");
            }
            return genre;
        });
    }
}
exports.default = GenresService;
