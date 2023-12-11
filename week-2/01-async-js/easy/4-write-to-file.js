const fs = require("fs");

function writeToFile() {
  fs.writeFile("a.txt", "file content updated2!", "utf-8", function (err) {
    if (err) {
      console.log(err);
    } else {
      console.log("Content has been updated!");
      console.log(fs.readFileSync("a.txt", "utf-8"));
    }
  });
}

writeToFile();
