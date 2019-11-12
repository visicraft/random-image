/**
 * NOTE:
 *  - Even though `JPEGEncoder.encode` returns a `Promise<Uint8Array>` value, it is NOT non-blocking
 */

// HACK: for some reason I couldn't get function declarition to work in `jpeg-js/index.d.ts`,
// so changed it to an `export type encode = ...` instead
import {RawImageData, encode} from "jpeg-js";

import {Encoder} from "./encoder";

/**
 * Represents all the passable options into `JPEGEncoder`
 */
export interface IJPEGEncoderOptions {
    /**
     * Represents the resulting image quality of the encoded image data
     */
    quality?: number;
}

/**
 * Represents the class for defaults and normalizing options passed into `JPEGEncoder`
 */
export class JPEGEncoderOptions implements IJPEGEncoderOptions {
    quality = 100;

    /**
     * Constructor for `JPEGEncoderOptions`
     */
    constructor(options: IJPEGEncoderOptions = {}) {
        Object.assign(this, options);
    }
}

/**
 * Represents the `Encoder` used for encoding raw image data into JPEG files
 */
export class JPEGEncoder extends Encoder {
    /**
     * Represents JPEG mime type for the encoder
     */
    mime_type: string = "image/jpeg";

    /**
     * Represents the normalized options passed into `JPEGEncoder`
     */
    options: JPEGEncoderOptions;

    /**
     * Constructor for `JPEGEncoder`
     */
    constructor(options: IJPEGEncoderOptions = {}) {
        super(options);

        this.options = new JPEGEncoderOptions(options);
    }

    /**
     * Returns the raw image data encoded into a JPEG binary
     */
    async encode(data: Uint8Array, height: number, width: number): Promise<Uint8Array> {
        const {quality} = this.options;
        const encode_data = {data, height, width};

        const buffer: RawImageData<Uint8Array> = encode(encode_data, quality);

        return new Uint8Array(buffer.data);
    }
}
