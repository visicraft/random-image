import { prng } from "seedrandom";
import { Encoder } from "../encoders/encoder";
/**
 * Represents the return array members returned by `ImageBlob.create_*`
 */
export declare type BLOB_URL = [string, () => void];
/**
 * Represents all properties that can be passed into `Generator`
 */
export interface IGeneratorOptions {
    /**
     * Represents an instance of a `Encoder` derived class
     */
    encoder?: Encoder;
    /**
     * Represents the initialized hash value
     */
    hash?: string;
    /**
     * Represents the height of the final image render
     */
    height?: number;
    /**
     * Represents the seed used to initialize the RNG with, also is hashed for `.hash`
     */
    seed?: string;
    /**
     * Represents the width of the final image render
     */
    width?: number;
}
/**
 * Represents a wrapper class for ease-of-use handling of an image `Blob` instance
 */
export declare class ImageBlob {
    /**
     * Represents an array view of the given raw image data
     */
    data: Uint8Array;
    /**
     * Represents the `Generator` instance used to initialize the `ImageBlob`
     */
    generator: Generator;
    /**
     * Constructor for `ImageBlob`
     */
    constructor(data: Uint8Array, generator: Generator);
    /**
     * Returns the current raw image data encoded with the given `Encoder` instance
     */
    encode_image_data(): Promise<[Uint8Array, string]>;
    /**
     * Returns a URL and callback on both Browser and NodeJS runtimes, called `ImageBlob.create_object_url` on Browsers `ImageBlob.create_data_uri` on NodeJS
     */
    create_isomorphic_url(): Promise<BLOB_URL>;
    /**
     * Returns a Data URI with the encoded image data as Base64
     */
    create_data_uri(): Promise<BLOB_URL>;
    /**
     * Returns an Object URL created with `URL.createObjectURL`, along with a deconstructor callback
     */
    create_object_url(): Promise<BLOB_URL>;
}
/**
 * Represents the normalized options passed into `Generator`
 */
export declare class GeneratorOptions implements IGeneratorOptions {
    encoder?: Encoder;
    hash: string;
    height: number;
    seed: string;
    width: number;
    /**
     * Constructor for `GeneratorOptions`
     * @param options -
     */
    constructor(options?: IGeneratorOptions);
    /**
     * Returns an `Encoder` instanced passed into `Generator`
     */
    get_encoder(): Encoder;
}
/**
 * Represents the base for all image generators
 */
export declare class Generator {
    /**
     * Represents an initialized RNG generator
     */
    generator?: prng;
    /**
     * Represents the normalized options passed into the constructor
     */
    options: GeneratorOptions;
    /**
     * Constructor for `Generator`
     * @param options -
     */
    constructor(options?: IGeneratorOptions, Options?: typeof GeneratorOptions);
    /**
     * Makes and seeds a new RNG generator
     * @param seed - String to seed with
     */
    create_generator(seed: string): void;
    /**
     * Returns the next value in the RNG generator
     */
    next(): number;
    /**
     * Returns the rendered `ImageBlob` for the current RNG step
     */
    render_blob(): Promise<ImageBlob>;
    /**
     * Returns the rendered binary data for the current RNG step
     */
    render(): Promise<Uint8Array>;
}
