/**
 * Represents the base `Encoder` class for all image encoders to inherit from
 */
export declare class Encoder {
    /**
     * Represents the mime type of the `Encoder`
     */
    mime_type: string;
    /**
     * Represents the options passed into `Encoder`
     */
    options: object;
    /**
     * Constructor for `Encoder`
     */
    constructor(options?: object);
    /**
     * Encodes the given image data and returns the encoded results
     */
    encode(data: Uint8Array, height: number, width: number): Promise<Uint8Array>;
}
