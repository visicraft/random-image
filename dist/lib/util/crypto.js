"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Returns a hashed string as hex values
 * @param {string} seed - String to hash
 */
function generate_hash(seed) {
    // source: https://github.com/darkskyapp/string-hash
    var index = seed.length;
    var hash = 5381;
    while (index) {
        hash = (hash * 33) ^ seed.charCodeAt(--index);
    }
    return (hash >>> 0).toString(16);
}
exports.generate_hash = generate_hash;
//# sourceMappingURL=crypto.js.map