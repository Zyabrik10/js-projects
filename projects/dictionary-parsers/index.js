import fs from "node:fs/promises";
import {
  txtParserV1,
  txtParserV1Checker,
  txtParserV2,
  txtParserV2Checker,
} from "./custom-parsers/index.js";

// try {
//   const txt = await fs.readFile("./v1/txt-parser-v1.txt", "utf8");

//   const parsed = txtParserV1(txt, ")");

//   console.log(parsed);
// } catch (e) {
//   console.log(e);
// }

// try {
//   const txt = await fs.readFile("./v1/txt-parser-v1.txt", "utf8");

//   const parsed = txtParserV1Checker(txt, ")");

//   console.log(parsed);
// } catch (e) {
//   console.log(e);
// }

// try {
//   const txt = await fs.readFile("./v1/txt-parser-v1-2.txt", "utf8");

//   const parsed = txtParserV1Checker(txt, "");

//   console.log(parsed);
// } catch (e) {
//   console.log(e);
// }

// try {
//   const txt = await fs.readFile("./v1/txt-parser-v1-bad.txt", "utf8");

//   const parsed = txtParserV1Checker(txt, ")");

//   console.log(parsed);
// } catch (e) {
//   console.log(e);
// }

// Parser 2

// try {
//   const txt = await fs.readFile("./v2/txt-parser-v2.txt", "utf8");

//   const parsed = textParserV2(txt, "|");

//   console.log(parsed);
// } catch (e) {
//   console.log(e);
// }

// try {
//   const txt = await fs.readFile("./v2/txt-parser-v2-2.txt", "utf8");

//   const parsed = textParserV2(txt, ";", ["word1", "word2", "word3"]);

//   console.log(parsed);
// } catch (e) {
//   console.log(e);
// }

// try {
//   const txt = await fs.readFile("./v2/txt-parser-v2.txt", "utf8");

//   const parsed = txtParserV2Checker(txt, "|");

//   console.log(parsed);
// } catch (e) {
//   console.log(e);
// }

// try {
//   const txt = await fs.readFile("./v2/txt-parser-v2-2.txt", "utf8");

//   const parsed = txtParserV2Checker(txt, ";", [
//     "word1",
//     "word2",
//     "word3",
//     "word4",
//   ]);
//   const parsed2 = txtParserV2Checker(txt, ";", [
//     "word1",
//     "word2",
//     "word3",
//     "word3",
//   ]);

//   console.log(parsed);
//   console.log(parsed2);
// } catch (e) {
//   console.log(e);
// }

// try {
//   const txt = await fs.readFile("./v2/txt-parser-v2-bad.txt", "utf8");

//   const parsed = txtParserV2Checker(txt, "|");

//   console.log(parsed);
// } catch (e) {
//   console.log(e);
// }

// ANKI

// try {
//   const txt = await fs.readFile("./anki/日本語の辞書.txt", "utf8");

//   const parsed = txtParserV2(txt, "\t");

//   console.log(parsed);
// } catch (e) {
//   console.log(e);
// }
