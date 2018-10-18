// Objeto calculadora.
var Calculator= {
    PrintObject: undefined,
    ChainValue: undefined,
    CurrValue: undefined,
    FirstOperator: undefined,
    SecondOperator: undefined,
    PointAdded: false,

    ShowData: function() {
        if ( PrintObject != undefined ) {
            PrintObject.innerHTML = CurrValue;
        }
    },

    Initialize: function () {
        PrintObject = document.getElementById("display");
        CurrValue = 0;
        ChainValue = undefined;
        FirstOperator = undefined;
        SecondOperator = undefined;
        PointAdded = false;
    },

    CaptureNumber: function() {
        if ( CurrValue.length == (!PointAdded ? 8 : 9) ) { return null; }
        if ( !isNaN(arguments[0].target.id) ) {
            var Number = parseInt(arguments[0].target.id);
            if ( ( Number != 0 ) || ( Number == 0 && parseFloat(CurrValue) != 0 ) ) {
                CurrValue == undefined || CurrValue == "0" ? CurrValue = Number.toString() : CurrValue += Number.toString();
            }
        }
    },

    ChangePositiveOrNegative: function() {
        if ( CurrValue != "0" && CurrValue != undefined ) {
            var Number = parseFloat(CurrValue) * -1;
            CurrValue = Number;
        }
    },

    AddPoint: function() {
        if ( !PointAdded && (CurrValue.length <= ((!PointAdded ? 8 : 9) - 1) || this.CurrValue.length == undefined ) ) {
            CurrValue += ".";
            PointAdded = true;
        }
    }

}

// Instancia de la calculadora.
var objCalculator = Calculator;

function executeWithCallback(actionMethodWithoutParms) {
    actionMethodWithoutParms();
    objCalculator.ShowData();
}

function Initializing() {
    executeWithCallback(objCalculator.Initialize);
}
function ChangingNumber() {
    executeWithCallback(objCalculator.ChangePositiveOrNegative);
}
function CapturingNumber(element) {
    objCalculator.CaptureNumber(element);
    objCalculator.ShowData();
}
function PointAdding() {
    executeWithCallback(objCalculator.AddPoint);
}

document.addEventListener("DOMContentLoaded", function() {
    Initializing();

    var btnNumbers = document.querySelectorAll(".tecla.number");
    btnNumbers.forEach(element => {
        element.onclick = CapturingNumber;
    });

    document.getElementById("on").onclick = Initializing;
    document.getElementById("sign").onclick = ChangingNumber;
    document.getElementById("punto").onclick = PointAdding;
});