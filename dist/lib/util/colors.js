"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var crypto_1 = require("./crypto");
/**
 * Returns an array of N number of RGB colors, based off hashing the `seed` value
 * @param {String} seed - String to start hashing with
 * @param {Number} max_colors - Amount of colors to generate
 */
function generate_hashed_colors(seed, max_colors) {
    // source: https://github.com/saveryanov/avatars/blob/master/index.js#L48-L64
    var colors = new Array(max_colors);
    var hash = crypto_1.generate_hash(seed);
    for (var i = 0; i < max_colors; i++) {
        var sliceInd = i % 5; // 32 chars in hash, 6 chars per color
        var offset = sliceInd * 6;
        colors[i] = [
            parseInt(hash[offset + 0] + hash[offset + 1], 16),
            parseInt(hash[offset + 2] + hash[offset + 3], 16),
            parseInt(hash[offset + 4] + hash[offset + 5], 16) // blue
        ];
        if (sliceInd == 0 && i != 0) {
            hash = crypto_1.generate_hash(hash);
        }
    }
    return colors;
}
exports.generate_hashed_colors = generate_hashed_colors;
//# sourceMappingURL=colors.js.map