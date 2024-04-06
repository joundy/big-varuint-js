import { describe, expect, test } from "bun:test";
import { decodeBigVaruint, encodeBigVaruint } from "./varuint";
import {
  BUFFER_MAX_LENGTH,
  U128_MAX_NUMBER,
  U16_MAX_NUMBER,
  U32_MAX_NUMBER,
  U64_MAX_NUMBER,
  U8_MAX_NUMBER,
} from "./types";
import { U128, U16, U32, U64, U8 } from "./uint";

describe("Varuint", () => {
  // 340282366920938463463374607431768211455n
  const BUFFER_U128_MAX_VALUE = Buffer.from([
    255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255,
    255, 255, 255, 3,
  ]);

  // 340282366920938463463374607431768211456n
  const BUFFER_U128_MAX_VALUE_PLUS_1 = Buffer.from([
    255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255,
    255, 255, 255, 4,
  ]);

  describe("encode", () => {
    test("max u128 value", () => {
      expect(encodeBigVaruint(U128_MAX_NUMBER)).toStrictEqual(
        BUFFER_U128_MAX_VALUE,
      );
    });

    test("value overflow", () => {
      expect(() => encodeBigVaruint(U128_MAX_NUMBER + 1n)).toThrow(
        `Can't encode value more than ${U128_MAX_NUMBER}`,
      );
    });

    test("minus value", () => {
      expect(() => encodeBigVaruint(-1n)).toThrow("Value must be positive");
    });
  });

  describe("decode", () => {
    test("test decode max u128 value", () => {
      expect(decodeBigVaruint(BUFFER_U128_MAX_VALUE)).toStrictEqual(
        U128_MAX_NUMBER,
      );
    });

    test("buffer overflow", () => {
      expect(() =>
        decodeBigVaruint(Buffer.alloc(BUFFER_MAX_LENGTH + 1)),
      ).toThrow(
        `Can't decode value more than ${U128_MAX_NUMBER}, buffer overflow`,
      );
    });

    test("buffer overflow, u128 max plus 1", () => {
      expect(() => decodeBigVaruint(BUFFER_U128_MAX_VALUE_PLUS_1)).toThrow(
        `Can't decode value more than ${U128_MAX_NUMBER}, buffer overflow`,
      );
    });
  });

  describe("uint", () => {
    describe("u8", () => {
      test("encode max value", () => {
        expect(new U8(U8_MAX_NUMBER).toVaruint()).toStrictEqual(
          Buffer.from([255, 1]),
        );
      });

      test("decode max value", () => {
        expect(U8.fromVaruint(Buffer.from([255, 1])).toValue()).toStrictEqual(
          U8_MAX_NUMBER,
        );
      });

      test("negative value", () => {
        expect(() => new U8(-1n).toVaruint()).toThrow("Value must be positive");
      });

      test("more than max value", () => {
        expect(() => new U8(U8_MAX_NUMBER + 1n).toVaruint()).toThrow(
          `Value must be less than ${U8_MAX_NUMBER}`,
        );
      });
    });
    describe("u16", () => {
      test("encode max value", () => {
        expect(new U16(U16_MAX_NUMBER).toVaruint()).toStrictEqual(
          Buffer.from([255, 255, 3]),
        );
      });

      test("decode max value", () => {
        expect(
          U16.fromVaruint(Buffer.from([255, 255, 3])).toValue(),
        ).toStrictEqual(U16_MAX_NUMBER);
      });

      test("negative value", () => {
        expect(() => new U16(-1n).toVaruint()).toThrow(
          "Value must be positive",
        );
      });

      test("more than max value", () => {
        expect(() => new U16(U16_MAX_NUMBER + 1n).toVaruint()).toThrow(
          `Value must be less than ${U16_MAX_NUMBER}`,
        );
      });
    });
    describe("u32", () => {
      test("encode max value", () => {
        expect(new U32(U32_MAX_NUMBER).toVaruint()).toStrictEqual(
          Buffer.from([255, 255, 255, 255, 15]),
        );
      });

      test("decode max value", () => {
        expect(
          U32.fromVaruint(Buffer.from([255, 255, 255, 255, 15])).toValue(),
        ).toStrictEqual(U32_MAX_NUMBER);
      });

      test("negative value", () => {
        expect(() => new U32(-1n).toVaruint()).toThrow(
          "Value must be positive",
        );
      });

      test("more than max value", () => {
        expect(() => new U32(U32_MAX_NUMBER + 1n).toVaruint()).toThrow(
          `Value must be less than ${U32_MAX_NUMBER}`,
        );
      });
    });
    describe("u64", () => {
      test("encode max value", () => {
        expect(new U64(U64_MAX_NUMBER).toVaruint()).toStrictEqual(
          Buffer.from([255, 255, 255, 255, 255, 255, 255, 255, 255, 1]),
        );
      });

      test("decode max value", () => {
        expect(
          U64.fromVaruint(
            Buffer.from([255, 255, 255, 255, 255, 255, 255, 255, 255, 1]),
          ).toValue(),
        ).toStrictEqual(U64_MAX_NUMBER);
      });

      test("negative value", () => {
        expect(() => new U64(-1n).toVaruint()).toThrow(
          "Value must be positive",
        );
      });

      test("more than max value", () => {
        expect(() => new U64(U64_MAX_NUMBER + 1n).toVaruint()).toThrow(
          `Value must be less than ${U64_MAX_NUMBER}`,
        );
      });
    });
    describe("u128", () => {
      test("encode max value", () => {
        expect(new U128(U128_MAX_NUMBER).toVaruint()).toStrictEqual(
          Buffer.from([
            255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255,
            255, 255, 255, 255, 255, 3,
          ]),
        );
      });

      test("decode max value", () => {
        expect(
          U128.fromVaruint(
            Buffer.from([
              255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255,
              255, 255, 255, 255, 255, 3,
            ]),
          ).toValue(),
        ).toStrictEqual(U128_MAX_NUMBER);
      });

      test("negative value", () => {
        expect(() => new U128(-1n).toVaruint()).toThrow(
          "Value must be positive",
        );
      });

      test("more than max value", () => {
        expect(() => new U128(U128_MAX_NUMBER + 1n).toVaruint()).toThrow(
          `Value must be less than ${U128_MAX_NUMBER}`,
        );
      });
    });
  });
});
