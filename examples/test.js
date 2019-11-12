const {writeFileSync} = require("fs");

const {ColumnsGenerator, JPEGEncoder} = require("../dist/random-image.umd");

const gen = (() => {
    const encoder = new JPEGEncoder({quality: 100});

    const generator = new ColumnsGenerator({
        encoder: encoder,

        height: 256,
        width: 256,

        seed: "human-alliance"
    });

    let i = 0;

    return async () => {
        const image_blob = await generator.render_blob();
        const [data, mime_type] = await image_blob.encode_image_data();

        i++;
        writeFileSync(`test-${i}.jpeg`, data);
    };
})();

gen();
gen();
gen();
gen();
gen();
gen();
