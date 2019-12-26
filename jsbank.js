var chequeDiv = document.getElementsByClassName("cheque");
var chequeBalance = chequeDiv.getElementByClassName("balance").getElementByClassName("amount");

var onlineBalance;
var usdBalance;

//function for compounding interest
function compoundInterest(){
    chequeBalance *= 1.1;
    onlineBalance *= 1.1;
}
setTimeout(compoundInterest(), 5000);

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