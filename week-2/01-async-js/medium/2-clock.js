function padZero(number) {
  return (number < 10 ? "0" : "") + number;
}

function getFormattedTime(showAmPm = false) {
  const date = new Date();

  const hr = date.getHours();
  const min = date.getMinutes();
  const sec = date.getSeconds();

  const am_pm = date.toLocaleTimeString();

  let formattedTime = padZero(hr) + ":" + padZero(min) + ":" + padZero(sec);

  if (showAmPm) formattedTime += " " + date.toLocaleTimeString().split(" ")[1];

  return formattedTime;
}

function machineCurrentTimeWithAmPm() {
  console.log(getFormattedTime(true));
  setTimeout(machineCurrentTimeWithAmPm, 1000);
}

function machineCurrentTime() {
  console.log(getFormattedTime());
  setTimeout(machineCurrentTime, 1000);
}

// machineCurrentTime();
machineCurrentTimeWithAmPm();
