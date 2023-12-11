const fs = require("fs");

// async way to read content from file

fs.readFile("a.txt", "utf8", function (err, data) {
  console.log("reading data from file!");
  if (err) {
    console.log(err);
  } else console.log(data);
});

let a = 0;

for (let i = 1; i < 10000000; i++) {
  a = a + 1;
}

console.log(a);

console.log("expensive operation 1 done!");

for (let i = 1; i < 100000000; i++) {
  a = a + 1;
}

console.log(a);

console.log("expensive operation 2 done!");
