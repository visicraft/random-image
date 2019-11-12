import {generate_hash} from "./crypto";

/**
 * Represents an array of RGB values
 */
export type RGB_COLOR = [number, number, number];

/**
 * Returns an array of N number of RGB colors, based off hashing the `seed` value
 * @param {String} seed - String to start hashing with
 * @param {Number} max_colors - Amount of colors to generate
 */
export function generate_hashed_colors(seed: string, max_colors: number): RGB_COLOR[] {
    // source: https://github.com/saveryanov/avatars/blob/master/index.js#L48-L64

    const colors = new Array(max_colors);
    let hash = generate_hash(seed);

    for (let i = 0; i < max_colors; i++) {
        const sliceInd = i % 5; // 32 chars in hash, 6 chars per color
        const offset = sliceInd * 6;

        colors[i] = [
            parseInt(hash[offset + 0] + hash[offset + 1], 16), // red
            parseInt(hash[offset + 2] + hash[offset + 3], 16), // green
            parseInt(hash[offset + 4] + hash[offset + 5], 16) // blue
        ];

        if (sliceInd == 0 && i != 0) {
            hash = generate_hash(hash);
        }
    }

    return colors;
}
