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

//function for compounding interest, loop again once any 
//of the balance reached $10,000,000
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


//define variables for transaction
var usdToNzd = 1.5;
var nzdToUsd = 0.67;

var amountInput = document.getElementById("amtToTransfer").value;
var amount = parseInt(amountInput);
var transferButton = document.getElementById("#initiateTransfer");
transferButton.addEventListener("click", function(){
    alert(typeof(amount) + " is " + amount);
}); 





while (amountInput != ""){
    var amount = parseFloat(amountInput);
    alert(amount);
};



var fromAcc = "";
var fromAcs = document.getElementById("fromDropdown");
function selectFromAcc(){
    while (fromAcc === ""){
        if (fromAcs.value == "Cheque"){
            fromAcc = "cheque";
        }
        else if (fromAcs.value == "Online"){
            fromAcc = "online";
        }
        else if (fromAcs.value == "USD"){
            fromAcc = "usd";
        }
        
    }
}
//fire event listener once the 'from account'
//is clicked
fromAcs.addEventListener("click", selectFromAcc());


var toAcc = "";
var toAcs = document.getElementById("toDropdown");
function selectToAcc(){
    while (toAcs === ""){
        if (toAcs.value == "Cheque"){
            toAcc = "cheque";
        } else if (toAcs.value == "Online"){
            toAcc = "online";
        } else if (fromAtoAcscs.value == "USD"){
            toAcc = "usd";
        } 
    }
}
//fire event listener once the 'to account'
//is clicked
toAcs.addEventListener("click", selectToAcc());


//function for money transfer
function transfer(){
    //set new date&time for each transaction
    var newDate = new Date();
    while (fromAcc === "cheque"){
        if (toAcc == "online"){
            //change cheque acc balance 
            chequeBalance -= amount; 
            //change cheque acc STRING balance
            var dollarIndex = chequeStr.lastIndexOf("$");
            chequeStr = chequeStr.slice(0, dollarIndex + 1) + chequeBalance;
            //change online acc balance
            onlineBalance += amount;
            //change online acc STRING balance
            dollarIndex = onlineStr.lastIndexOf("$");
            onlineStr = onlineStr.slice(0, dollarIndex + 1) + onlineBalance;
        }
        else if (toAcc == "usd"){
            var conversionFee = chequeBalance * 0.04;
            chequeBalance -= conversionFee;
            var convertedUsd = chequeBalance * nzdToUsd;
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

    while (true){
        if (fromAcc === toAcc){
            alert("You need to transfer fund to a different account!");
            break;
        }
        if (amount === ""){
            alert("Please enter an amount");
            break;
        }
    }
}

//add transaction processing animation after clicking transfer
// 
