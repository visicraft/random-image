# random-image

## Description

`random-image` is an aggregate Javascript module for generating different customizable styles of images, to use as placeholders or other use cases. As-well as supporting different encodings like JPEG and PNG.

## Quick-Start

...

## How to Use

...

### Generators

...

#### "Columns"

> Based on code from: [MonoMisch/random-jpeg](ttps://github.com/MonoMisch/random-jpeg)

> **NOTE**: "Columns" generator is not async (even though it returns a `Promise`)

...

### Encoders

...

#### JPEG

> Uses [`visicraft/jpeg-js`](https://github.com/visicraft/jpeg-js) for JPEG encoding
> `npm install jpeg-js`

> **NOTE**: JPEG encoder is not async (even though it returns a `Promise`)

...

## References

-   [darkskyapp/string-hash](https://github.com/darkskyapp/string-hash) - Source of modified source code for `src/util/crypto.ts -> generate_hash`
-   [eugeneware/jpeg-js](https://github.com/eugeneware/jpeg-js) - Pure Javascript encoder used for JPEG encoding. Utilizing the [visicraft/jpeg-js](https://github.com/visicraft/jpeg-js) fork, for specific use case.
-   [MonoMisch/random-jpeg](ttps://github.com/MonoMisch/random-jpeg) - Source of modified source code for `ColumnsGenerator`
-   [saveryanov/avatars](https://github.com/saveryanov/avatars) - Source of modified source code for `src/util/colors.ts -> generate_hashed_colors`
