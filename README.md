# zod-to-ts

> ⚠️ **WORK IN PROGRESS** ⚠️
>
> This project is currently under development. Not of much use yet.

## Introduction

`zod-to-ts` is a utility tool designed to transform Zod schemas into TypeScript interfaces.

## Why not use zod inference?

This does not replace z.infer. It's particularly useful in projects where there's an existing zod schema, and for some reason you need the TypeScript interface as well. Normally you would just use zod's type inference rather than hand writing the TypeScript interface. However, there may be situations where you have a recursive zod schema and need to type the schema to quell some type error:

```TypeScript
const MySchema = z.object({
  foo: MySchema
})
// TypeScript complains with an error about MySchema not having a type
```

To get around the error, we can give `MySchema` a type, but to type it, we need a matching interface. That is what zod-to-ts will help generate.

```TypeScript
interface MyInterface {
  foo: MyInterface;
}
const MySchema: z.ZodSchema<MyInterface> = z.object({
  foo: MySchema
})
```

## Prerequisites

Before you begin, ensure you have [Bun](https://bun.sh) installed on your system. Bun is a fast, modern JavaScript runtime similar to Node.js, but with a number of performance improvements and additional features. This project uses Bun v1.0.11.

## Installation

To install the necessary dependencies for `zod-to-ts`, run the following command in the root directory of the project:

```bash
bun install
```

This command fetches and installs all the required packages as specified in the package.json file.

## Running the Project

To run `zod-to-ts`, use the following command:

```bash
bun run index.ts
```

This will execute the index.ts file using Bun, processing any Zod schemas defined within and outputting the corresponding TypeScript interfaces. Eventually, if this is useful, it will be a web tool instead of having to be run manually.
