function myOwnSetInterval(fn, duration) {
  setInterval(fn, duration);
}

myOwnSetInterval(function () {
  console.log("logging after every 1 second");
}, 1000);
