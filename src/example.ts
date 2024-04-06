import {
  U128_MAX_NUMBER,
  U16_MAX_NUMBER,
  U32_MAX_NUMBER,
  U64_MAX_NUMBER,
  U8_MAX_NUMBER,
} from "./types";
import { U128, U16, U32, U64, U8 } from "./uint";
import { Varuint } from "./varuint";

async function main() {
  const examples: Varuint[] = [
    new U8(U8_MAX_NUMBER),
    new U16(U16_MAX_NUMBER),
    new U32(U32_MAX_NUMBER),
    new U64(U64_MAX_NUMBER),
    new U128(U128_MAX_NUMBER),
  ];

  // encode
  for (let i = 0; i < examples.length; i += 1) {
    console.log(examples[i].toString());
    console.log(examples[i].toVaruint());
  }

  // encode then decode
  for (let i = 0; i < examples.length; i += 1) {
    console.log(examples[i].toString());
    if (examples[i] instanceof U8) {
      const buff = examples[i].toVaruint();
      console.log(U8.fromVaruint(buff).toString());
    }
    if (examples[i] instanceof U16) {
      const buff = examples[i].toVaruint();
      console.log(U16.fromVaruint(buff).toString());
    }
    if (examples[i] instanceof U32) {
      const buff = examples[i].toVaruint();
      console.log(U32.fromVaruint(buff).toString());
    }
    if (examples[i] instanceof U64) {
      const buff = examples[i].toVaruint();
      console.log(U64.fromVaruint(buff).toString());
    }
    if (examples[i] instanceof U128) {
      const buff = examples[i].toVaruint();
      console.log(U128.fromVaruint(buff).toString());
    }
  }

  const value = U128_MAX_NUMBER;
  const encoded = new U128(value).toVaruint();
  console.log({ encoded });

  const buff = Buffer.from([
    255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255,
    255, 255, 255, 3,
  ]);
  const decoded = U128.fromVaruint(buff).toValue();
  console.log(decoded);

  const u32 = new U32(32n)
  console.log(JSON.stringify(u32))
}

main();
