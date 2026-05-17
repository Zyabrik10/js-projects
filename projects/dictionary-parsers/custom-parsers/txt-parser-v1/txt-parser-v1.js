export function txtParserV1(
  txt = "",
  del = ".",
  del2 = "-",
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

    const del2Index = line.indexOf(del2);

    const parts = [line.substring(0, del2Index), line.substring(del2Index + 1)];
    let expression = "";

    if (del.length === 0) {
      expression = parts[0].trim();
    } else {
      expression = parts[0].split(del)[1].trim();
    }

    const translation = parts[1].trim();

    expressions.push({
      expression,
      translation,
    });
  }

  return expressions;
}
