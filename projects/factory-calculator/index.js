const blocks = [];

const block1 = createBlock("Iron ore", 0, 15, "1m");

const block2 = createBlock("Melting iron ore", 1, 1, "2s");

blocks.push(block1, block2);

blocks.forEach(printBlock);

console.log(calculateOutput(blocks));

function calculateOutput(blocks) {
  let timeInSeconds = 0;

  for (const block of blocks) {
    if (Array.isArray(block)) {
      continue;
    }

    timeInSeconds += block.outputTime;
  }

  return timeInSeconds;
}

function createBlock(detailName, detailsInput, detailsOutput, outputTime) {
  let time = +outputTime.substring(0, outputTime.length - 1);
  const unitTime = outputTime[outputTime.length - 1];

  // dt / 1[time]
  if (time > 1) {
    detailsOutput /= time;
    time = 1;
  }

  // dt / 1s
  if (unitTime === "m") {
    detailsOutput /= 60;
  }

  return {
    detailName,
    detailsInput,
    detailsOutput,
    outputTime: time,
  };
}

function printBlock(block) {
  console.log(`${block.detailsOutput}d / ${block.outputTime}s`);
}
