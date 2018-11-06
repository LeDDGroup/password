export function generate(str1: string, str2: string, amount = 10) {
  let password = "";
  let seed = getSeed(str1) + getSeed(str2);
  for (let i = 0; i < amount; i++) {
    seed = generator(seed);
    password += alphabet[seed % alphabet.length];
  }
  return password;
}

const alphabet = getAlph("a", "z").concat(getAlph("A", "Z"), getAlph("0", "9"));

function getAlph(ch1: string, ch2: string) {
  const v1 = ch1.charCodeAt(0);
  const v2 = ch2.charCodeAt(0);
  return new Array(v2 - v1 + 1).fill(0).map(function(_, i) {
    return String.fromCharCode(i + v1);
  });
}
function generator(seed: number) {
  return seed * 37 + 31;
}

function getSeed(str: string) {
  let value = 0;
  Array.prototype.forEach.call(str, function(c: string) {
    const n = c.charCodeAt(0);
    value = value * 41 + n;
  });
  return value;
}

export default generate;
