//get money str
var chequeStr = document.getElementById("chequeBalance").innerHTML;
var onlineStr = document.getElementById("onlineBalance").innerHTML; 
var usdStr =document.getElementById("usdBalance").innerHTML; 

//get num str from "NZD $..." type of str
function getAmount(moneyStr){
    let dollarIndex = moneyStr.indexOf("$");
    return moneyStr.slice(dollarIndex+1, moneyStr.length);
}

//convert each num str into int
var chequeBalance = parseInt(getAmount(chequeStr));
var onlineBalance = parseInt(getAmount(onlineStr));
var usdBalance = parseInt(getAmount(usdStr));

//function for compounding interest
function compoundInterest(chqBal, onlBal, chqStr, onlStr){
    chqBal *= 1.02;
    onlBal *= 1.04;
    let chequeDollarIndex = chqStr.indexOf("$");
    let onlineDollarIndex = onlStr.indexOf("$");
    //update money str
    chqStr = chqStrchqStr.slice(0, chequeDollarIndex +1) + chqBal.toString();
    onlStr = onlStr.slice(0, onlineDollarIndex +1) + onlBal.toString();
}

//the chq&online balance compounds every 1000ms by calling the compound interest function
setTimeout(compoundInterest(chequeBalance, onlineBalance, chequeStr, onlineStr), 1000);

//function for money transfer
function transfer(){
    let  date = new Date();
    let amount = input.innerHTML;
    let fromAcc = fromField.innerHTML;
    let toAcc = toField.innerHTML;
    if (fromAcc === "cheque"){
        chequeBalance -= amount; 
    }
    else if (fromAcc == "online"){
        onlineBalance -= amount; 
    }

}

//function for 