let inputList = document.getElementById('input');
let outputList = document.getElementById('output');

let inputTimes = [ "14:41", "00:00", "01:30", "12:05", "14:01", "14:01", "20:29", "21:00", "23:59", "32:12", "10:99", "banana", "-32.14", "00:00", "00:01", "00:02", "00:03", "00:04", "00:05", "00:06", "00:07", "00:08", "00:09", "00:10", "00:11", "00:12", "00:13", "00:14", "00:15", "00:16", "00:17", "00:18", "00:19", "00:20", "00:21", "00:22", "00:23", "00:24", "00:25", "00:26", "00:27", "00:28", "00:29", "00:30", "00:31", "00:32", "00:33", "00:34", "00:35", "00:36", "00:37", "00:38", "00:39", "00:40", "00:41", "00:42", "00:43", "00:44", "00:45", "00:46", "00:47", "00:48", "00:49", "00:50", "01:35", "01:36", "01:37", "01:38", "01:39", "01:40", "01:41", "01:42", "01:43", "01:44", "01:45", "01:46", "01:47", "01:48", "01:49", "01:50", "01:51", "01:52", "01:53", "01:54", "01:55", "01:56", "01:57", "01:58", "01:59", "02:00", "02:01", "02:02", "02:03", "02:04", "02:05", "02:06", "02:07", "02:08", "02:09", "02:10", "02:11", "02:12", "02:13", "02:14", "02:15", "02:59", "00:00" ];

let words = {
  0: "oh",
  1: "one",
  2: "two",
  3: "three",
  4: "four",
  5: "five",
  6: "six",
  7: "seven",
  8: "eight",
  9: "nine",
  10: "ten",
  11: "eleven",
  12: "twelve",
  13: "thirteen",
  14: "fourteen",
  15: "fifteen",
  16: "sixteen",
  17: "seventeen",
  18: "eighteen",
  19: "nineteen",
  20: "twenty",
  30: "thirty",
  40: "forty",
  50: "fifty",
  60: "sixty",
};

// regex pattern to ensure all input values fall between "00:00" and "23:59"
let regexMatch = /^([0-1]?[0-9]|2[0-3]):([0-5][0-9])$/;

function testInput(item) {
  let match = regexMatch.exec(item);
  if (!match) {
    console.error(`${item} does not appear to be a valid input value!`);
    return false
  } else {
    // console.log(`Ok, ${match[0]} appears to be a valid input value`);
    return match
  }
}

function doTheThing(item) {
  let timeInput = testInput(item);

  if ( timeInput === false ) {
    return false
  }

  let d = new Date();
  let n = [];

  d.setHours(parseInt(timeInput[1]));
  d.setMinutes(parseInt(timeInput[2]));

  n[0] = d.getHours();
  n[1] = d.getMinutes();

  // hours and am, pm
  if (n[0] > 0 && n[0] < 12) {
    n[0] = words[n[0]];
    n[2] = "am";
  } else if (n[0] > 12) {
    let h = n[0] - 12;
    n[0] = words[h];
    n[2] = "pm";
  } else if (n[0] === 0) {
    n[0] = words[12];
    n[2] = "am";
  } else {
    n[0] = words[12];
    n[2] = "pm";
  }

  // minutes
  if (n[1] > 0 && n[1] <= 9) {
    n[1] = words[0] + "\xa0" + words[n[1]];
    return `It's ${n[0]} ${n[1]} ${n[2]}`;
  } else if (n[1] > 9 && n[1] <= 19) {
    n[1] = words[n[1]];
    return `It's ${n[0]} ${n[1]} ${n[2]}`;
  } else if (n[1] > 19 && n[1] <= 59) {
    let r = n[1] / 10;
    let t = Math.floor(r) * 10;
    let s = n[1].toString();
    let c = s.charAt(1);
    let i = parseInt(c);
    if (i === 0) {
      n[1] = words[t];
      return `It's ${n[0]} ${n[1]} ${n[2]}`;
    } else {
      n[1] = words[t] + "\xa0" + words[i];
      return `It's ${n[0]} ${n[1]} ${n[2]}`;
    }
  } else if (n[1] === 60) {
    n[1] = words[60];
    return `It's ${n[0]} ${n[1]} ${n[2]}`;
  } else {
    return `It's ${n[0]} ${n[2]}`;
  }
}

inputTimes.forEach((item) => { inputList.innerHTML+=`<li>${item}</li>` });
inputTimes.forEach((item) => { outputList.innerHTML+=`<li>${doTheThing(item)}</li>`});
