import {
  U8_MAX_NUMBER,
  U32_MAX_NUMBER,
  U64_MAX_NUMBER,
  U128_MAX_NUMBER,
  U16_MAX_NUMBER,
} from "./types";
import { Varuint, decodeBigVaruint } from "./varuint";

export class U8 extends Varuint {
  constructor(n: bigint) {
    super(n, U8_MAX_NUMBER);
  }

  static fromString(nStr: string) {
    return new U8(BigInt(nStr));
  }

  static fromNumber(nNum: number) {
    return new U8(BigInt(nNum));
  }

  static fromVaruint(buff: Buffer){
    return new U8(decodeBigVaruint(buff))
  }
}

export class U16 extends Varuint {
  constructor(n: bigint) {
    super(n, U16_MAX_NUMBER);
  }

  static fromString(nStr: string) {
    return new U16(BigInt(nStr));
  }

  static fromNumber(nNum: number) {
    return new U16(BigInt(nNum));
  }

  static fromVaruint(buff: Buffer){
    return new U16(decodeBigVaruint(buff))
  }
}

export class U32 extends Varuint {
  constructor(n: bigint) {
    super(n, U32_MAX_NUMBER);
  }

  static fromString(nStr: string) {
    return new U32(BigInt(nStr));
  }

  static fromNumber(nNum: number) {
    return new U32(BigInt(nNum));
  }

  static fromVaruint(buff: Buffer){
    return new U32(decodeBigVaruint(buff))
  }
}

export class U64 extends Varuint {
  constructor(n: bigint) {
    super(n, U64_MAX_NUMBER);
  }

  static fromString(nStr: string) {
    return new U64(BigInt(nStr));
  }

  static fromVaruint(buff: Buffer){
    return new U64(decodeBigVaruint(buff))
  }
}

export class U128 extends Varuint {
  constructor(n: bigint) {
    super(n, U128_MAX_NUMBER);
  }

  static fromString(nStr: string) {
    return new U128(BigInt(nStr));
  }

  static fromVaruint(buff: Buffer){
    return new U128(decodeBigVaruint(buff))
  }
}
