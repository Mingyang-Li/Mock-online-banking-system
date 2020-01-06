//get money str
var chequeStr = document.getElementById("chequeBalance").innerHTML;
var onlineStr = document.getElementById("onlineBalance").innerHTML; 
var usdStr =document.getElementById("usdBalance").innerHTML; 

//function to get num str from "NZD $..." type of str
function getAmount(moneyStr){
    let dollarIndex = moneyStr.lastIndexOf("$");
    return moneyStr.slice(dollarIndex+1, moneyStr.length);
}

//get get num str from "NZD $..." type of str
var chequeBalance = getAmount(chequeStr);
var onlineBalance = getAmount(onlineStr);
var usdBalance = getAmount(usdStr);

//convert each num str into int
chequeBalance = parseFloat(chequeBalance);
onlineBalance = parseFloat(onlineBalance);
usdBalance = parseFloat(usdBalance);

//function for compounding interest, loop again once any of the balance reached $10,000,000
function compoundInterest(chqBal, onlBal, chqStr, onlStr){
    while (chqBal < 10000000 && onlBal < 1000000){
        chqBal = chqBal * 1.02;
        onlBal = onlBal * 1.02;
        let chequeDollarIndex = chqStr.indexOf("$");
        let onlineDollarIndex = onlStr.indexOf("$");
        //update money str
        chqStr = chqStr.slice(0, chequeDollarIndex +1) + chqBal.toString();
        onlStr = onlStr.slice(0, onlineDollarIndex +1) + onlBal.toString();
    }
}

//the chq&online balance compounds every 1000ms by calling the compound interest function
setTimeout(compoundInterest(chequeBalance, onlineBalance, chequeStr, onlineStr, 1000));

//function for money transfer
function transfer(){
    let date = new Date();
    let usdToNzd = 1.5;
    let nzdToUsd = 0.67;
    let amount = parseFloat(input.innerHTML);
    let fromAcc = fromField.innerHTML;
    let toAcc = toField.innerHTML;
    while (fromAcc === "cheque"){
        if (toAcc == "online"){
            chequeBalance -= amount; 
            onlineBalance += amount;
        }
        else if (toAcc == "usd"){
            let conversionFee = chequeBalance * 0.04;
            chequeBalance -= conversionFee;
            let convertedUsd = chequeBalance * nzdToUsd;
            usdBalance += convertedUsd;
        }
        break;
        //manupulate the dom to show transaction date and time on both accounts
    }
    while (fromAcc == "online"){
        if (toAcc == "cheque"){
            onlineBalance -= amount;
            chequeBalance += amount; 
        }
        else if (toAcc == "usd"){
            conversionFee = onlineBalance * 0.04;
            onlineBalance -= conversionFee;
            convertedUsd = onlineBalance * nzdToUsd;
            usdBalance += convertedUsd;
        }
        break;
    }
    while (fromAcc == "usd"){
        if (toAcc == "cheque"){
            conversionFee = usdBalance * 0.04;
            usdBalance -= conversionFee;
            let convertedNzd = usdBalance * usdToNzd;
            chequeBalance += convertedNzd;
        }
        else if (toAcc == "online"){
            conversionFee = usdBalance * 0.04;
            usdBalance -= conversionFee;
            convertedNzd = usdBalance * usdToNzd;
            onlineBalance += convertedNzd;
        }
        break;
    }
    if (fromAcc === toAcc){
        alert("You need to transfer fund to a different account!")
    }
    if (fromAcc === ""){
        alert("Please select an account to transfer funds from")
    }
    if (toAcc === ""){
        alert("Please select an account to deposit funds")
    }
    if (amount === ""){
        alert("Please enter an amount")
    }
    if (amount === NaN){
        alert("Please enter a valid amount")
    }
}

//function for 