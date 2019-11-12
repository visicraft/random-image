/**
 * Represents the base `Encoder` class for all image encoders to inherit from
 */
export class Encoder {
    /**
     * Represents the mime type of the `Encoder`
     */
    mime_type: string = "";

    /**
     * Represents the options passed into `Encoder`
     */
    options: object;

    /**
     * Constructor for `Encoder`
     */
    constructor(options: object = {}) {
        this.options = options;
    }

    /**
     * Encodes the given image data and returns the encoded results
     */
    async encode(data: Uint8Array, height: number, width: number): Promise<Uint8Array> {
        throw new Error("bad dispatch to 'Encoder.encode' (unimplemented encoder)");
    }
}
