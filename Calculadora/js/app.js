// Objeto calculadora.

var ConstantAction = {
    Sum: 1,
    Deduct: 2,
    Multiply: 3,
    Divide: 4,
    Execute: 0
}

var Calculator= {
    PrintObject: undefined,
    CurrValue: undefined,
    FirstOperator: undefined,
    SecondOperator: undefined,
    PointAdded: false,
    Operation: undefined,
    Executing: false,

    ShowData: function() {
        if ( PrintObject != undefined ) {
            PrintObject.innerHTML = CurrValue;
        }
    },

    Initialize: function () {
        PrintObject = document.getElementById("display");
        CurrValue = 0;
        FirstOperator = undefined;
        SecondOperator = undefined;
        PointAdded = false;
        Operation = undefined;
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
            CurrValue += (CurrValue.length == 0 ? "0." : ".");
            PointAdded = true;
        }
    },

    SetExecuting: function(value) {
        Executing = value;
    },

    SetOperation: function(operationValue) {
        if ( CurrValue != undefined && CurrValue != "" && CurrValue != null ) {
            Executing = false;
            if ( FirstOperator != undefined && SecondOperator == undefined ) {
                ExecuteOperation();
            }
            FirstOperator = parseFloat(CurrValue);
            SecondOperator = undefined;
            CurrValue = "";
            PointAdded = false;
        }
        Operation = operationValue;
    },

    ExecuteOperation: function() {
        if ( (FirstOperator != undefined && FirstOperator != "" && FirstOperator != null) && 
             (CurrValue != undefined && CurrValue != "" && CurrValue != null) ) {
            SecondOperator = (SecondOperator == undefined || !Executing ? parseFloat(CurrValue) : SecondOperator);

            switch(Operation) {
                case ConstantAction.Sum:
                    CurrValue = ( FirstOperator + SecondOperator );
                    break;
                case ConstantAction.Deduct:
                    CurrValue = ( FirstOperator - SecondOperator );
                    break;
                case ConstantAction.Multiply:
                    CurrValue = ( FirstOperator * SecondOperator );
                    break;
                case ConstantAction.Divide:
                    if ( parseFloat(SecondOperator) == 0 ) {
                        CurrValue = "Error!";
                    } else {
                        CurrValue = ( FirstOperator / SecondOperator );
                    }
                    break;
            }

            CurrValue = ( CurrValue.toString().length >= 9 ? CurrValue.toString().substr(1, 8) : CurrValue );
            FirstOperator = ( !isNaN(CurrValue) ? CurrValue : undefined );
            PointAdded = false;
            SecondOperator = ( !Executing ? undefined : SecondOperator );
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
function PointAdding() {
    executeWithCallback(objCalculator.AddPoint);
}
function CapturingNumber(element) {
    objCalculator.CaptureNumber(element);
    objCalculator.ShowData();
}
function SendSum() {
    objCalculator.SetOperation(ConstantAction.Sum);
    objCalculator.ShowData();
}
function SendDeduct() {
    objCalculator.SetOperation(ConstantAction.Deduct);
    objCalculator.ShowData();
}
function SendMultiply() {
    objCalculator.SetOperation(ConstantAction.Multiply);
    objCalculator.ShowData();
}
function SendDivide() {
    objCalculator.SetOperation(ConstantAction.Divide);
    objCalculator.ShowData();
}
function ExecuteOperation() {
    objCalculator.SetExecuting(true);
    executeWithCallback(objCalculator.ExecuteOperation);
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

    document.getElementById("mas").onclick = SendSum;
    document.getElementById("menos").onclick = SendDeduct;
    document.getElementById("por").onclick = SendMultiply;
    document.getElementById("dividido").onclick = SendDivide;
    document.getElementById("igual").onclick = ExecuteOperation;
});