import seedrandom, {prng} from "seedrandom";

import {generate_hash} from "../util/crypto";
import {IS_BROWSER} from "../util/constants";
import {Encoder} from "../encoders/encoder";

/**
 * Represents the return array members returned by `ImageBlob.create_*`
 */
export type BLOB_URL = [string, () => void];

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
 * Performs Base64 encoding on the given `string`, using `window.btoa` on Browsers and `Buffer` on NodeJS platforms
 */
function _btoa(string: string): string {
    if (typeof btoa === "function") return btoa(string);

    return Buffer.from(string).toString("base64");
}

/**
 * Represents a wrapper class for ease-of-use handling of an image `Blob` instance
 */
export class ImageBlob {
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
    constructor(data: Uint8Array, generator: Generator) {
        this.data = data;
        this.generator = generator;
    }

    /**
     * Returns the current raw image data encoded with the given `Encoder` instance
     */
    async encode_image_data(): Promise<[Uint8Array, string]> {
        const {data, generator} = this;
        const {height, width} = generator.options;

        const encoder = generator.options.get_encoder();
        const encoded_data = await encoder.encode(data, height, width);

        return [encoded_data, encoder.mime_type];
    }

    /**
     * Returns a URL and callback on both Browser and NodeJS runtimes, called `ImageBlob.create_object_url` on Browsers `ImageBlob.create_data_uri` on NodeJS
     */
    create_isomorphic_url(): Promise<BLOB_URL> {
        if (IS_BROWSER) return this.create_object_url();

        return this.create_data_uri();
    }

    /**
     * Returns a Data URI with the encoded image data as Base64
     */
    async create_data_uri(): Promise<BLOB_URL> {
        const [data, mime_type] = await this.encode_image_data();
        const base64_data = _btoa(data.join());

        return [`data:${mime_type};base64,${base64_data}`, () => undefined];
    }

    /**
     * Returns an Object URL created with `URL.createObjectURL`, along with a deconstructor callback
     */
    async create_object_url(): Promise<BLOB_URL> {
        const [data, mime_type] = await this.encode_image_data();

        const blob = new Blob([data], {type: mime_type});
        let url = URL.createObjectURL(blob);

        const callback = () => {
            if (!url) {
                throw new Error(
                    "bad dispatch to 'ImageBlob.create_object_url.callback' (URL already deconstructed)"
                );
            }

            URL.revokeObjectURL(url);
            url = "";
        };

        return [url, callback];
    }
}

/**
 * Represents the normalized options passed into `Generator`
 */
export class GeneratorOptions implements IGeneratorOptions {
    encoder?: Encoder = undefined;

    hash = "";

    height = 256;

    seed = "";

    width = 256;

    /**
     * Constructor for `GeneratorOptions`
     * @param options -
     */
    constructor(options: IGeneratorOptions = {}) {
        // If the end-developer provided a `.seed` option and no hash,
        // we should automatically hash their seed for them
        if (options.seed && !options.hash) options.hash = generate_hash(options.seed);

        Object.assign(this, options);
    }

    /**
     * Returns an `Encoder` instanced passed into `Generator`
     */
    get_encoder(): Encoder {
        if (this.encoder) return this.encoder;

        throw new Error("bad dispatch to 'GeneratorOptions.get_encoder' (encoder not provided)");
    }
}

/**
 * Represents the base for all image generators
 */
export class Generator {
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
    constructor(
        options: IGeneratorOptions = {},
        Options: typeof GeneratorOptions = GeneratorOptions
    ) {
        this.options = new Options(options);
    }

    /**
     * Makes and seeds a new RNG generator
     * @param seed - String to seed with
     */
    create_generator(seed: string): void {
        this.generator = seedrandom(seed);
    }

    /**
     * Returns the next value in the RNG generator
     */
    next(): number {
        if (!this.generator) {
            throw new Error("bad dispatch to 'Generator.next' (RNG not seeded)");
        }

        return this.generator();
    }

    /**
     * Returns the rendered `ImageBlob` for the current RNG step
     */
    async render_blob(): Promise<ImageBlob> {
        const data = await this.render();

        return new ImageBlob(data, this);
    }

    /**
     * Returns the rendered binary data for the current RNG step
     */
    async render(): Promise<Uint8Array> {
        throw new Error("bad dispatch to 'Generator.render' (not implemented)");
    }
}
