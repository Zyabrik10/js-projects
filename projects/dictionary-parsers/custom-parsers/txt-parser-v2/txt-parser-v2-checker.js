export function txtParserV2Checker(
  txt = "",
  del = "|",
  fields = ["expression", "translation"],
  comments = ["#"],
) {
  const errorHeader = "Txt Parser V2 Checker Error: ";

  if (!txt.includes("\n")) {
    return {
      error: true,
      line: 1,
      message: errorHeader + "There are no new lines",
    };
  }

  const fieldsMap = {};

  for (let i = 0; i < fields.length; i++) {
    if (fields[i] in fieldsMap)
      return {
        error: true,
        message:
          errorHeader +
          `There is a duplication of "${fields[i]}" on ${fieldsMap[fields[i]]} and ${i} positions`,
        chunk: fields,
      };
    else {
      fieldsMap[fields[i]] = i;
    }
  }

  const lines = txt.trim().split("\n");

  for (let i = 0; i < lines.length; i++) {
    const chunk = lines[i];
    const line = chunk.trim();

    if (
      line.length === 0 ||
      comments.some((commentChar) => line.startsWith(commentChar))
    ) {
      continue;
    }

    if (!line.includes(del)) {
      return {
        error: true,
        line: i + 1,
        message: errorHeader + `There is no "${del}" on the ${i + 1} line`,
        chunk: line.substring(0, 100),
      };
    }

    const parts = line.split(del);

    for (let i = 0; i < fields.length; i++) {
      if (parts[i] === undefined) {
        return {
          error: true,
          line: i + 1,
          message:
            errorHeader +
            `There is no separation for "${fields[i]}" field on the ${i + 1} line`,
          chunk: line.substring(0, 100),
        };
      }
    }
  }

  return {
    error: false,
  };
}
