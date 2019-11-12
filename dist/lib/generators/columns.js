"use strict";
/**
 * Modified from:
 *  - https://github.com/MonoMisch/random-jpeg
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
var generator_1 = require("./generator");
var colors_1 = require("../util/colors");
function compare_numbers(a, b) {
    return a - b;
}
function create_buffer(selectedColors, xs, ys) {
    var width = xs[xs.length - 1];
    var height = ys[ys.length - 1];
    var fieldsPerPixel = 4;
    var buffer = new Uint8Array(width * height * fieldsPerPixel);
    var bufferPos = 0;
    var currentTile = 0;
    for (var i = 0; i < ys.length - 1; i++) {
        for (var currentY = ys[i]; currentY < ys[i + 1]; currentY++) {
            currentTile = i * (xs.length - 1);
            for (var k = 0; k < xs.length - 1; k++) {
                for (var currentX = xs[k]; currentX < xs[k + 1]; currentX++) {
                    buffer[bufferPos++] = selectedColors[currentTile][0]; // red
                    buffer[bufferPos++] = selectedColors[currentTile][1]; // green
                    buffer[bufferPos++] = selectedColors[currentTile][2]; // blue
                    buffer[bufferPos++] = 0xff; // alpha
                }
                currentTile++;
            }
        }
    }
    return buffer;
}
/**
 * Represents all the normalized options that can be passed into `ColumnsGenerator`
 */
var ColumnsGeneratorOptions = /** @class */ (function (_super) {
    __extends(ColumnsGeneratorOptions, _super);
    /**
     * Constructor for `ColumnsGeneratorOptions`
     */
    function ColumnsGeneratorOptions(options) {
        if (options === void 0) { options = {}; }
        var _this = _super.call(this, options) || this;
        _this.colors = [];
        _this.color_touch = false;
        _this.columns = 5;
        _this.max_colors = 3;
        _this.rows = 5;
        var colors = options.colors
            ? options.colors
            : colors_1.generate_hashed_colors(_this.hash, _this.max_colors);
        _this.colors = colors;
        return _this;
    }
    return ColumnsGeneratorOptions;
}(generator_1.GeneratorOptions));
exports.ColumnsGeneratorOptions = ColumnsGeneratorOptions;
/**
 * Represents the a generator for rendering random "blochy" columns and rows
 */
var ColumnsGenerator = /** @class */ (function (_super) {
    __extends(ColumnsGenerator, _super);
    /**
     * Constructor for `ColumnsGenerator`
     * @param {IColumnsGeneratorOptions} options
     */
    function ColumnsGenerator(options) {
        if (options === void 0) { options = {}; }
        var _this = _super.call(this, options, ColumnsGeneratorOptions) || this;
        // @ts-ignore
        _this.create_generator(_this.options.seed);
        return _this;
    }
    /**
     * Returns the rendered JPEG binary data for the current RNG increment
     */
    ColumnsGenerator.prototype.render = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, columns, height, rows, width, color_array, x_grid, y_grid;
            return __generator(this, function (_b) {
                _a = this.options, columns = _a.columns, height = _a.height, rows = _a.rows, width = _a.width;
                color_array = this.generate_extended_color_array();
                x_grid = this.generate_dim_array(width, columns);
                y_grid = this.generate_dim_array(height, rows);
                return [2 /*return*/, create_buffer(color_array, x_grid, y_grid)];
            });
        });
    };
    ColumnsGenerator.prototype.generate_dim_array = function (dimlenght, nrOfTilesInDim) {
        var result = [0];
        result.push(dimlenght);
        for (var i = 0; i < nrOfTilesInDim - 1; i++) {
            result.push(Math.floor(this.next() * dimlenght));
        }
        return result.sort(compare_numbers);
    };
    ColumnsGenerator.prototype.generate_extended_color_array = function () {
        var _a = this.options, colors = _a.colors, color_touch = _a.color_touch, columns = _a.columns, rows = _a.rows;
        var extColors = [];
        var nrOfTiles = columns * rows;
        var index;
        if (color_touch) {
            for (var i = 0; i < nrOfTiles; i++) {
                index = Math.floor(this.next() * colors.length);
                extColors.push(colors[index]);
            }
        }
        else {
            var indexTileLeft = -667;
            var columnPos = void 0;
            var indicesTilesRowAbove = new Array(columns);
            while (extColors.length < nrOfTiles) {
                columnPos = extColors.length % columns;
                index = Math.floor(this.next() * colors.length);
                if (index != indexTileLeft && index != indicesTilesRowAbove[columnPos]) {
                    indexTileLeft = index;
                    indicesTilesRowAbove[columnPos] = index;
                    extColors.push(colors[index]);
                }
            }
        }
        return extColors;
    };
    return ColumnsGenerator;
}(generator_1.Generator));
exports.ColumnsGenerator = ColumnsGenerator;
//# sourceMappingURL=columns.js.map