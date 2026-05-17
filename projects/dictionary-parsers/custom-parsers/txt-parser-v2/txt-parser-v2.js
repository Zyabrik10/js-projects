export function txtParserV2(
  txt = "",
  del = "|",
  fields = ["expression", "translation"],
  comments = ["#"],
  ignoreLines = [],
) {
  const lines = txt.trim().split("\n");

  const expressions = [];

  for (let i = 0; i < lines.length; i++) {
    const chunk = lines[i];
    const line = chunk.trim();

    if (
      line.length === 0 ||
      comments.some((commentChar) => line.startsWith(commentChar)) ||
      ignoreLines.includes(i + 1)
    ) {
      continue;
    }

    const parts = line.split(del);

    let obj = {};

    for (let i = 0; i < fields.length; i++) {
      obj[fields[i]] = parts[i];
    }

    expressions.push(obj);
  }

  return expressions;
}
