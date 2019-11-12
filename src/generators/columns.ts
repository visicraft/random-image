/**
 * Modified from:
 *  - https://github.com/MonoMisch/random-jpeg
 */

import {IGeneratorOptions, Generator, GeneratorOptions} from "./generator";

import {RGB_COLOR, generate_hashed_colors} from "../util/colors";

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

function compare_numbers(a: number, b: number): number {
    return a - b;
}

function create_buffer(selectedColors: RGB_COLOR[], xs: number[], ys: number[]): Uint8Array {
    const width = xs[xs.length - 1];
    const height = ys[ys.length - 1];
    const fieldsPerPixel = 4;
    const buffer = new Uint8Array(width * height * fieldsPerPixel);

    let bufferPos = 0;
    let currentTile = 0;

    for (let i = 0; i < ys.length - 1; i++) {
        for (let currentY = ys[i]; currentY < ys[i + 1]; currentY++) {
            currentTile = i * (xs.length - 1);
            for (let k = 0; k < xs.length - 1; k++) {
                for (let currentX = xs[k]; currentX < xs[k + 1]; currentX++) {
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
export class ColumnsGeneratorOptions extends GeneratorOptions implements IColumnsGeneratorOptions {
    colors: RGB_COLOR[] = [];

    color_touch = false;

    columns = 5;

    max_colors = 3;

    rows = 5;

    /**
     * Constructor for `ColumnsGeneratorOptions`
     */
    constructor(options: IColumnsGeneratorOptions = {}) {
        super(options);

        const colors = options.colors
            ? options.colors
            : generate_hashed_colors(this.hash, this.max_colors);

        this.colors = colors;
    }
}

/**
 * Represents the a generator for rendering random "blochy" columns and rows
 */
export class ColumnsGenerator extends Generator {
    // @ts-ignore
    options: ColumnsGeneratorOptions;

    /**
     * Constructor for `ColumnsGenerator`
     * @param {IColumnsGeneratorOptions} options
     */
    constructor(options: IColumnsGeneratorOptions = {}) {
        super(options, ColumnsGeneratorOptions);

        // @ts-ignore
        this.create_generator(this.options.seed);
    }

    /**
     * Returns the rendered JPEG binary data for the current RNG increment
     */
    async render(): Promise<Uint8Array> {
        const {columns, height, rows, width} = this.options;
        const color_array = this.generate_extended_color_array();

        const x_grid = this.generate_dim_array(width, columns);
        const y_grid = this.generate_dim_array(height, rows);

        return create_buffer(color_array, x_grid, y_grid);
    }

    generate_dim_array(dimlenght: number, nrOfTilesInDim: number): number[] {
        const result = [0];

        result.push(dimlenght);
        for (var i = 0; i < nrOfTilesInDim - 1; i++) {
            result.push(Math.floor(this.next() * dimlenght));
        }

        return result.sort(compare_numbers);
    }

    generate_extended_color_array(): RGB_COLOR[] {
        const {colors, color_touch, columns, rows} = this.options;

        let extColors = [];
        let nrOfTiles = columns * rows;
        let index;

        if (color_touch) {
            for (let i = 0; i < nrOfTiles; i++) {
                index = Math.floor(this.next() * colors.length);
                extColors.push(colors[index]);
            }
        } else {
            let indexTileLeft = -667;
            let columnPos;
            const indicesTilesRowAbove = new Array(columns);

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
    }
}
