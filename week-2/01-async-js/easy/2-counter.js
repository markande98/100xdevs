function setTimeoutWithoutSetInterval() {
  setTimeout(function onDone() {
    console.log("logged after every 1 second");
    setTimeout(onDone, 1000);
  }, 1000);
}

setTimeoutWithoutSetInterval();
