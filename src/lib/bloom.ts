const SIZE = 256;
const K = 3;

function fnv1a(str: string, seed: number): number {
  let hash = 0x811c9dc5 ^ seed;
  for (let i = 0; i < str.length; i++) {
    hash ^= str.charCodeAt(i);
    hash = Math.imul(hash, 0x01000193);
  }
  return hash >>> 0;
}

function hashes(key: string): number[] {
  const normalized = key.trim().toLowerCase();
  const h1 = fnv1a(normalized, 0);
  const h2 = fnv1a(normalized, 0x9e3779b9);
  return Array.from({ length: K }, (_, i) => (h1 + i * h2) % SIZE);
}

export function createFilter(items: string[]): Uint8Array {
  const bits = new Uint8Array(SIZE);
  for (const item of items) {
    for (const idx of hashes(item)) {
      bits[idx] = 1;
    }
  }
  return bits;
}

export function mightContain(filter: Uint8Array, key: string): boolean {
  return hashes(key).every((idx) => filter[idx] === 1);
}
