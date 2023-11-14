import { z } from "zod";
import { transformZodToTypeScript } from ".";
import { expect, test } from "bun:test";

const testSchema = z.object({
  myStr: z.string(),
  myNum: z.number(),
  myBool: z.boolean(),
  myNumOpt: z.number().optional(),
  myNumNull: z.number().nullable(),
  myNumOptNull: z.number().optional().nullable(),
  myNumNullOpt: z.number().nullable().optional(),
  myArr: z.array(z.string()),
  myArrNested: z.array(z.array(z.string())),
  myUnion: z.union([z.number(), z.string()]),
});

const expected = `
interface MyInterface {
  myStr: string;
  myNum: number;
  myBool: boolean;
  myNumOpt: number | undefined;
  myNumNull: number | null;
  myNumOptNull: unknown | null | undefined;
  myNumNullOpt: unknown | null | undefined;
  myArr: Array<string>;
  myArrNested: Array<Array<string>>;
  myUnion: number | string;
}
`;

const actual = transformZodToTypeScript(testSchema, "MyInterface");

test("Correctly transform schema", () => {
  expect(expected).toBe(actual);
});
