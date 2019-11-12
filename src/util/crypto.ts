/**
 * Returns a hashed string as hex values
 * @param {string} seed - String to hash
 */
export function generate_hash(seed: string): string {
    // source: https://github.com/darkskyapp/string-hash

    let index = seed.length;
    let hash = 5381;

    while (index) {
        hash = (hash * 33) ^ seed.charCodeAt(--index);
    }

    return (hash >>> 0).toString(16);
}
