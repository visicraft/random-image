/**
 * Modified from:
 *  - https://github.com/MonoMisch/random-jpeg
 */
import { IGeneratorOptions, Generator, GeneratorOptions } from "./generator";
import { RGB_COLOR } from "../util/colors";
/**
 * Represents the default options for `ColumnsGeneratorOptions`
 */
export interface IColumnsGeneratorOptions extends IGeneratorOptions {
    /**
     * Represents an array of `RGB_COLOR` values, that the generator can select from as a palette
     */
    colors?: RGB_COLOR[];
    /**
     * Represents if renders of color can be same as previous selection
     */
    color_touch?: boolean;
    /**
     * Represents the number of columns the generator will render
     */
    columns?: number;
    /**
     * Represents the max number of colors to generate as the palette, if `.colors` is not provided
     */
    max_colors?: number;
    /**
     * Represents the number of rows the generator will render
     */
    rows?: number;
}
/**
 * Represents all the normalized options that can be passed into `ColumnsGenerator`
 */
export declare class ColumnsGeneratorOptions extends GeneratorOptions implements IColumnsGeneratorOptions {
    colors: RGB_COLOR[];
    color_touch: boolean;
    columns: number;
    max_colors: number;
    rows: number;
    /**
     * Constructor for `ColumnsGeneratorOptions`
     */
    constructor(options?: IColumnsGeneratorOptions);
}
/**
 * Represents the a generator for rendering random "blochy" columns and rows
 */
export declare class ColumnsGenerator extends Generator {
    options: ColumnsGeneratorOptions;
    /**
     * Constructor for `ColumnsGenerator`
     * @param {IColumnsGeneratorOptions} options
     */
    constructor(options?: IColumnsGeneratorOptions);
    /**
     * Returns the rendered JPEG binary data for the current RNG increment
     */
    render(): Promise<Uint8Array>;
    generate_dim_array(dimlenght: number, nrOfTilesInDim: number): number[];
    generate_extended_color_array(): RGB_COLOR[];
}
