"use strict";
/**
 * NOTE:
 *  - Even though `JPEGEncoder.encode` returns a `Promise<Uint8Array>` value, it is NOT non-blocking
 */
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
// HACK: for some reason I couldn't get function declarition to work in `jpeg-js/index.d.ts`,
// so changed it to an `export type encode = ...` instead
var jpeg_js_1 = require("jpeg-js");
var encoder_1 = require("./encoder");
/**
 * Represents the class for defaults and normalizing options passed into `JPEGEncoder`
 */
var JPEGEncoderOptions = /** @class */ (function () {
    /**
     * Constructor for `JPEGEncoderOptions`
     */
    function JPEGEncoderOptions(options) {
        if (options === void 0) { options = {}; }
        this.quality = 100;
        Object.assign(this, options);
    }
    return JPEGEncoderOptions;
}());
exports.JPEGEncoderOptions = JPEGEncoderOptions;
/**
 * Represents the `Encoder` used for encoding raw image data into JPEG files
 */
var JPEGEncoder = /** @class */ (function (_super) {
    __extends(JPEGEncoder, _super);
    /**
     * Constructor for `JPEGEncoder`
     */
    function JPEGEncoder(options) {
        if (options === void 0) { options = {}; }
        var _this = _super.call(this, options) || this;
        /**
         * Represents JPEG mime type for the encoder
         */
        _this.mime_type = "image/jpeg";
        _this.options = new JPEGEncoderOptions(options);
        return _this;
    }
    /**
     * Returns the raw image data encoded into a JPEG binary
     */
    JPEGEncoder.prototype.encode = function (data, height, width) {
        return __awaiter(this, void 0, void 0, function () {
            var quality, encode_data, buffer;
            return __generator(this, function (_a) {
                quality = this.options.quality;
                encode_data = { data: data, height: height, width: width };
                buffer = jpeg_js_1.encode(encode_data, quality);
                return [2 /*return*/, new Uint8Array(buffer.data)];
            });
        });
    };
    return JPEGEncoder;
}(encoder_1.Encoder));
exports.JPEGEncoder = JPEGEncoder;
//# sourceMappingURL=jpeg.js.map