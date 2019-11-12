/**
 * NOTE:
 *  - Even though `JPEGEncoder.encode` returns a `Promise<Uint8Array>` value, it is NOT non-blocking
 */
import { Encoder } from "./encoder";
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
export declare class JPEGEncoderOptions implements IJPEGEncoderOptions {
    quality: number;
    /**
     * Constructor for `JPEGEncoderOptions`
     */
    constructor(options?: IJPEGEncoderOptions);
}
/**
 * Represents the `Encoder` used for encoding raw image data into JPEG files
 */
export declare class JPEGEncoder extends Encoder {
    /**
     * Represents JPEG mime type for the encoder
     */
    mime_type: string;
    /**
     * Represents the normalized options passed into `JPEGEncoder`
     */
    options: JPEGEncoderOptions;
    /**
     * Constructor for `JPEGEncoder`
     */
    constructor(options?: IJPEGEncoderOptions);
    /**
     * Returns the raw image data encoded into a JPEG binary
     */
    encode(data: Uint8Array, height: number, width: number): Promise<Uint8Array>;
}
