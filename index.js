var a = "345++3456----++-++45645+--+++-4565";

function SimplifyAS(str) {
  do {
    newLen = str.length 
    str = str.replace(/(\+\+)/g, '')
      .replace(/\+-/g, '-')
      .replace(/-\+/g, '-')
      .replace(/--/g, '+');
  } while (str.length != newLen);
  str = "+" + str;
  return str;
}

function CalcAS(str) {
  nums = str.split(/[\+-]/g);
  currentIndex = 0;
  total = 0;
  for (var num of nums) {
    operator = str[str.indexOf(num, currentIndex) - 1];
    if (operator == '+') {
      total += parseFloat(num);
    } else if (operator == '-') {
      total -= parseFloat(num);
    }
    currentIndex = str.indexOf(num, currentIndex) + num.length + 1;
  }
  return total;
}

function AS(str){
  return CalcAS(SimplifyAS(str));
}

function CheckkDM(str) {
  if (str.match(/[\*\/]{2,}/))
    return false;
  return true;
}

function CalcDM(str) {
  firstArray = str.match(/\d+\*/g);
  console.log(firstArray);
  if (firstArray) {
    lastArray = str.match(/\*\d+/g);
    for (var i in firstArray) {
      first = firstArray[i].substr(0, firstArray[i].length - 1);
      last = lastArray[i].substr(1, lastArray[i].length);
      console.log(first + last);
      str.replace(new RegExp(/[0-9]+\+/ + last), (parseFloat(first)  * parseFloat(first)).toString() );
    }
  }
  
  firstArray = str.match(/\/\d+/g);
  if (firstArray) {
    lastLast = str.match(/\d+\//g);
    for (var i in firstArray) {
      first = firstArray[i].substr(0, firstArray[i].length - 1);
      last = lastArray[i].substr(1, lastArray[i].length);
      str.replace(new RegExp(/[0-9]+\+/ + last), p(parseFloat(first)  / parseFloat(first)).toString() );
    }
  }
  
  return str;
}

function DM(str){
  if (!CheckkDM(str))
    throw "Cannot use ** or //";
  return CalcAS(SimplifyAS(str));
}