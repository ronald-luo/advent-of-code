class AlmanacEntry {
  constructor(mapName) {
    this.categoryList = [];
    this.mapName = mapName;
  }

  addMap = (dstStart, srcStart, rangeLength) => {
    this.categoryList.push([
      Number(dstStart),
      Number(srcStart),
      Number(rangeLength),
    ]);
  };

  getConversion = (srcVal) => {
    srcVal = Number(srcVal);
    for (let [dstStart, srcStart, rangeLength] of this.categoryList) {
      let difference = srcVal - srcStart;
      let srcRangeMax = srcStart + rangeLength;
      let srcRangeMin = srcStart;
      if (difference >= 0 && srcVal >= srcRangeMin && srcVal <= srcRangeMax) {
        return dstStart + difference;
      }
    }
    return srcVal;
  };
}

let processData = () => {
  const fs = require("fs");

  let data = fs.readFileSync("large.txt").toString();
  let dataByLines = data.split("\n");

  let seeds = dataByLines[0]
    .trim()
    .split(":")[1]
    .split(" ")
    .filter((node) => node != "");

  let almanacs = [];

  for (let line of dataByLines) {
    line = line.trim();
    if (line.includes("-to-")) {
      let mapName = line.split(" ")[0];
      let currentAlmancEntry = new AlmanacEntry(mapName);
      almanacs.push(currentAlmancEntry);
    }
    if (line != "") {
      let temp = line.split(" ");

      if (temp.length === 3) {
        let dstStart = temp[0];
        let srcStart = temp[1];
        let rangeLength = temp[2];
        almanacs.at(-1).addMap(dstStart, srcStart, rangeLength);
      }
    }
  }

  return { seeds, almanacs };
};

let main = () => {
  let { seeds, almanacs } = processData();

  let seedData = {};

  for (let seed of seeds) {
    seedData[seed] = {};

    let prevConversion = seed;
    for (let almanac of almanacs) {
      let mapName = almanac.mapName;
      let conversion = almanac.getConversion(prevConversion);
      prevConversion = conversion;

      seedData[seed][mapName] = conversion;
    }
  }

  let minLocation = Infinity;

  let temp = Object.values(seedData);
  temp.map((node) => {
    minLocation = Math.min(node["humidity-to-location"], minLocation);
  });

  console.log(minLocation);
};

main();
