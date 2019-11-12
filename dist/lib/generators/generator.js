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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var seedrandom_1 = require("seedrandom");
var crypto_1 = require("../util/crypto");
var constants_1 = require("../util/constants");
/**
 * Performs Base64 encoding on the given `string`, using `window.btoa` on Browsers and `Buffer` on NodeJS platforms
 */
function _btoa(string) {
    if (typeof btoa === "function")
        return btoa(string);
    return Buffer.from(string).toString("base64");
}
/**
 * Represents a wrapper class for ease-of-use handling of an image `Blob` instance
 */
var ImageBlob = /** @class */ (function () {
    /**
     * Constructor for `ImageBlob`
     */
    function ImageBlob(data, generator) {
        this.data = data;
        this.generator = generator;
    }
    /**
     * Returns the current raw image data encoded with the given `Encoder` instance
     */
    ImageBlob.prototype.encode_image_data = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, data, generator, _b, height, width, encoder, encoded_data;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _a = this, data = _a.data, generator = _a.generator;
                        _b = generator.options, height = _b.height, width = _b.width;
                        encoder = generator.options.get_encoder();
                        return [4 /*yield*/, encoder.encode(data, height, width)];
                    case 1:
                        encoded_data = _c.sent();
                        return [2 /*return*/, [encoded_data, encoder.mime_type]];
                }
            });
        });
    };
    /**
     * Returns a URL and callback on both Browser and NodeJS runtimes, called `ImageBlob.create_object_url` on Browsers `ImageBlob.create_data_uri` on NodeJS
     */
    ImageBlob.prototype.create_isomorphic_url = function () {
        if (constants_1.IS_BROWSER)
            return this.create_object_url();
        return this.create_data_uri();
    };
    /**
     * Returns a Data URI with the encoded image data as Base64
     */
    ImageBlob.prototype.create_data_uri = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, data, mime_type, base64_data;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.encode_image_data()];
                    case 1:
                        _a = _b.sent(), data = _a[0], mime_type = _a[1];
                        base64_data = _btoa(data.join());
                        return [2 /*return*/, ["data:" + mime_type + ";base64," + base64_data, function () { return undefined; }]];
                }
            });
        });
    };
    /**
     * Returns an Object URL created with `URL.createObjectURL`, along with a deconstructor callback
     */
    ImageBlob.prototype.create_object_url = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, data, mime_type, blob, url, callback;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.encode_image_data()];
                    case 1:
                        _a = _b.sent(), data = _a[0], mime_type = _a[1];
                        blob = new Blob([data], { type: mime_type });
                        url = URL.createObjectURL(blob);
                        callback = function () {
                            if (!url) {
                                throw new Error("bad dispatch to 'ImageBlob.create_object_url.callback' (URL already deconstructed)");
                            }
                            URL.revokeObjectURL(url);
                            url = "";
                        };
                        return [2 /*return*/, [url, callback]];
                }
            });
        });
    };
    return ImageBlob;
}());
exports.ImageBlob = ImageBlob;
/**
 * Represents the normalized options passed into `Generator`
 */
var GeneratorOptions = /** @class */ (function () {
    /**
     * Constructor for `GeneratorOptions`
     * @param options -
     */
    function GeneratorOptions(options) {
        if (options === void 0) { options = {}; }
        this.encoder = undefined;
        this.hash = "";
        this.height = 256;
        this.seed = "";
        this.width = 256;
        // If the end-developer provided a `.seed` option and no hash,
        // we should automatically hash their seed for them
        if (options.seed && !options.hash)
            options.hash = crypto_1.generate_hash(options.seed);
        Object.assign(this, options);
    }
    /**
     * Returns an `Encoder` instanced passed into `Generator`
     */
    GeneratorOptions.prototype.get_encoder = function () {
        if (this.encoder)
            return this.encoder;
        throw new Error("bad dispatch to 'GeneratorOptions.get_encoder' (encoder not provided)");
    };
    return GeneratorOptions;
}());
exports.GeneratorOptions = GeneratorOptions;
/**
 * Represents the base for all image generators
 */
var Generator = /** @class */ (function () {
    /**
     * Constructor for `Generator`
     * @param options -
     */
    function Generator(options, Options) {
        if (options === void 0) { options = {}; }
        if (Options === void 0) { Options = GeneratorOptions; }
        this.options = new Options(options);
    }
    /**
     * Makes and seeds a new RNG generator
     * @param seed - String to seed with
     */
    Generator.prototype.create_generator = function (seed) {
        this.generator = seedrandom_1.default(seed);
    };
    /**
     * Returns the next value in the RNG generator
     */
    Generator.prototype.next = function () {
        if (!this.generator) {
            throw new Error("bad dispatch to 'Generator.next' (RNG not seeded)");
        }
        return this.generator();
    };
    /**
     * Returns the rendered `ImageBlob` for the current RNG step
     */
    Generator.prototype.render_blob = function () {
        return __awaiter(this, void 0, void 0, function () {
            var data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.render()];
                    case 1:
                        data = _a.sent();
                        return [2 /*return*/, new ImageBlob(data, this)];
                }
            });
        });
    };
    /**
     * Returns the rendered binary data for the current RNG step
     */
    Generator.prototype.render = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                throw new Error("bad dispatch to 'Generator.render' (not implemented)");
            });
        });
    };
    return Generator;
}());
exports.Generator = Generator;
//# sourceMappingURL=generator.js.map