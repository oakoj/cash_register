// declare a function that takes in three arguments: price, cash, cid (cash-in-drawer)
function checkCashRegister(price, cash, cid) {
  // declare a variable change to be the difference between cash and price
  let change = cash - price;
  // declare a variable cidTotal initialized as 0
  let cidTotal = 0;
  // declare a unitValue object of currency values to calculate change
  const unitValue = {
    "PENNY": .01,
    "NICKEL": .05,
    "DIME": .10,
    "QUARTER": .25,
    "ONE": 1.00,
    "FIVE": 5.00,
    "TEN": 10.00,
    "TWENTY": 20.00,
    "ONE HUNDRED": 100.00
  }
  // declare an array changeGiven to hand out change in bills and coins initialized as empty
  const changeGiven = [];
  // loop through cid
  for (let i = 0; i < cid.length; i++) {
    // sum each total value of bills/coins into cidTotal
    cidTotal += cid[i][1];
  }
  // round cidTotal to the correct decimal point (2)
  cidTotal = cidTotal.toFixed(2);
  // if cash paid is less than price (i.e. change is negative) OR cidTotal is less than change
  if (change < 0 || cidTotal < change) {
    // return {status: "INSUFFICIENT_FUNDS", change: []}
    return {status: "INSUFFICIENT_FUNDS", change: changeGiven};
  }
  // if change equal to cidTotal (i.e. the cash in drawer is equal to the change)
  if (change == cidTotal) {
    // return {status: "CLOSED", change: [...]}
    return {status: "CLOSED", change: cid};
    // else
  } else {
    // loop backwards through cid
    for (let j = cid.length - 1; j >= 0; j--) {
      // declare a temporary array initialized with [cid[index][0] ("ONE HUNDRED", "TWENTY"), 0]
      let tempArr = [cid[j][0], 0]
      // while each number of bills/coins is greater than 0 && change >= unitValue[cid[index][0]]
      while (cid[j][1] > 0 && change >= unitValue[cid[j][0]]) {
        // increase tempArr[1] by the respective bill/coin value
        tempArr[1] += unitValue[cid[j][0]];
        // decrease cid[index][1] by the respective bill/coin value
        cid[j][1] -= unitValue[cid[j][0]];
        // decrease change by the respective bill/coin value
        change -= unitValue[cid[j][0]];
        // round to 2 decimal places
        change = change.toFixed(2);
      }
      // if (after each bill or coin for cid) tempArr[1] > 0 (i.e. the number of bills or coins of a certain value given is greater than 0)
      if (tempArr[1] > 0) {
        // push the temporary array into changeGiven
        changeGiven.push(tempArr);
      }
    }
    // after exiting the cid loop, if change is greater than 0 (i.e. exact change has not been given)
    if (change > 0) {
      // return {status: "INSUFFICIENT_FUNDS", change: []}
      return {status: "INSUFFICIENT_FUNDS", change: []};
    }
  }
  // return {status: "OPEN", change: changeGiven}
  return {status: "OPEN", change: changeGiven};
}

checkCashRegister(3.26, 100, [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]]);

// there are a couple of caveats for this challenge:
// the math is wonky and needs to be rounded to 2 decimal places using toFixed()
// need to make sure that exact change is able to be given, otherwise the function should return {status: "INSUFFICIENT_FUNDS", change: []}
