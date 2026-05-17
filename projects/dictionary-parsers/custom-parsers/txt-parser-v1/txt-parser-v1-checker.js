export function txtParserV1Checker(
  txt = "",
  del = ".",
  del2 = "-",
  comments = ["#"],
) {
  const errorHeader = "Txt Parser V1 Checker Error: ";

  if (!txt.includes("\n")) {
    return {
      error: true,
      line: 1,
      message: errorHeader + "There are no new lines",
    };
  }

  const lines = txt.split("\n");

  for (let i = 0; i < lines.length; i++) {
    const chunk = lines[i];
    const line = chunk.trim();

    if (
      line.length === 0 ||
      comments.some((commentChar) => line.startsWith(commentChar))
    ) {
      continue;
    }

    const del2Index = line.indexOf(del2);

    if (del2Index === -1) {
      return {
        error: true,
        line: i + 1,
        message: errorHeader + `There is no "${del2}" on the ${i + 1} line`,
        chunk: line.substring(0, 100),
      };
    }

    const parts = [line.substring(0, del2Index), line.substring(del2Index + 1)];

    if (!parts[0].includes(del)) {
      return {
        error: true,
        line: i + 1,
        message: errorHeader + `There is no "${del}" on the ${i + 1} line`,
        chunk: line.substring(0, 100),
      };
    }
  }

  return {
    error: false,
  };
}
