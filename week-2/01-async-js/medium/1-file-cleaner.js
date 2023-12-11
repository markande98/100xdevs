const fs = require("fs");

function writeToFile(data) {
  fs.writeFile("a.txt", data, "utf-8", function (err) {
    if (err) {
      console.log(err);
    } else {
      console.log(fs.readFileSync("a.txt", "utf-8"));
    }
  });
}

function fileCleaner() {
  const data = fs.readFileSync("a.txt", "utf-8");

  const joinedDataWithSingleSpace = data.replace(/\s+/g, " ");

  writeToFile(joinedDataWithSingleSpace);
}

fileCleaner();
