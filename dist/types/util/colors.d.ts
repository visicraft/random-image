/**
 * Represents an array of RGB values
 */
export declare type RGB_COLOR = [number, number, number];
/**
 * Returns an array of N number of RGB colors, based off hashing the `seed` value
 * @param {String} seed - String to start hashing with
 * @param {Number} max_colors - Amount of colors to generate
 */
export declare function generate_hashed_colors(seed: string, max_colors: number): RGB_COLOR[];
