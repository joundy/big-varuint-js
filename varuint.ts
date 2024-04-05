import { BUFFER_MAX_LENGTH, U128_MAX_NUMBER } from "./types";

export abstract class Varuint {
  protected n: bigint;
  protected maxNumber: bigint;

  constructor(n: bigint, maxNumber: bigint) {
    this.n = n;
    this.maxNumber = maxNumber;

    this.baseValidation();
  }

  private baseValidation() {
    if (this.n < 0n) {
      throw new Error("Value must be positive");
    }

    if (this.n > this.maxNumber) {
      throw new Error(`Value must be less than ${this.maxNumber}`);
    }
  }

  get MAX() {
    return this.maxNumber;
  }

  toVaruint(): Buffer {
    return encodeBigVarint(this.n);
  }

  toString(): string {
    return this.n.toString();
  }
}

function encodeBigVarint(n: bigint) {
  if (n < 0n) {
    throw new Error("Value must be positive");
  }

  const buff = Buffer.alloc(BUFFER_MAX_LENGTH);

  let i = 0;
  while (n >> 7n > 0) {
    if (i >= BUFFER_MAX_LENGTH) {
      throw new Error("Buff length more than limit");
    }

    buff[i] = Number((n & 0b1111_1111n) | 0b1000_0000n);
    n >>= 7n;
    i += 1;
  }
  buff[i] = Number(n);

  return buff.subarray(0, i + 1);
}

export function decodeBigVaruint(buff: Buffer) {
  if (
    buff.length > BUFFER_MAX_LENGTH ||
    (buff.length === BUFFER_MAX_LENGTH && buff[buff.length - 1] > 3)
  ) {
    throw new Error(
      `Can't process value more than ${U128_MAX_NUMBER}, buffer overflow`,
    );
  }

  let finalValue = BigInt(0);
  for (let i = 0; i < buff.length; i += 1) {
    const byte = buff[i];
    const value = byte & 0b0111_1111;
    finalValue = finalValue | (BigInt(value) << (7n * BigInt(i)));
  }

  if (finalValue < 0n) {
    throw new Error("Value is minus, something wrong");
  }

  return finalValue;
}
