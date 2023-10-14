let handleNumberClick = (id) => {
    document.getElementById("field").innerText += id;
};

let handleCharClick = (id) => {
    field = document.getElementById("field").innerText.split("");
    lastChar = field[field.length-1];
    lastChar2 = field[field.length-2];
    if(field == "") return;
    if(id == "."){
        let i = 1;
        while(isNaN(field[field.length-i]) == false){
            i++;
            continue;
        }
        if(field[field.length-i] == ".") return;
        else document.getElementById("field").innerText += id;
    }
    else if(isNaN(lastChar) == true){
        if(lastChar == "*" && ((lastChar == "*" && lastChar2 == "*") == false)) document.getElementById("field").innerText += id;
        else alert("wtf");
    }
    else document.getElementById("field").innerText += id;

}

document.getElementById("C").addEventListener("click", clearField = function(){
    document.getElementById("field").innerText = "";
});

document.getElementById("backspace").addEventListener("click", handleBackspace = function(){
    document.getElementById("field").innerText = document.getElementById("field").innerText.slice(0, -1);
});

document.getElementById("calculate").addEventListener("click", handleCalculate = function(){
    field = document.getElementById("field").innerText.split("");
    numbers = [];
    number = [];
    operations = [];
    
    //sorting numbers and operators in field
    field.map(char => {
        if(isNaN(char) == false){
            number.push(char);
        }
        else if(char == ".") number.push(char);
        else if(isNaN(char) == true){
            if(char == "*" && operations[operations.length-1] == "*"){
                operations.pop();
                operations.push("**");
            }
            else{
                numbers.push(parseFloat(number.toString().replace(/,/g,'')));
                number = [];
                operations.push(char);
            }
        }
    });
    numbers.push(parseFloat(number.toString().replace(/,/g,'')));
    
// joining the math expression in a single array
    let calculate = [];
    for(let i = 0; i<operations.length; i++){
        calculate.push(numbers[i]);
        calculate.push(operations[i]);
    }
    calculate.push(numbers[numbers.length-1]);

// calculate the expression
    let operationOrder = [];
    let orderedOperation = [];
    while(calculate.length > 1){

        //put all operations in an array
        for(let i = 0; i < calculate.length; i++){
            if(isNaN(calculate[i]) == true){
                {
                    let obj = {'index': i, 'operand': calculate[i]};
                    operationOrder.push(obj);
                }
            }
        }

        //sort the operations in the array
        while(operationOrder.length > 0){
            operationOrder.map((object, index) => {
                if(object['operand'] == "**"){
                    orderedOperation.push(object);
                    operationOrder.splice(index, 1);
                }
            });
            operationOrder.map((object, index) => {
                if(object['operand'] == "*" || object['operand'] == "/"){
                    orderedOperation.push(object);
                    operationOrder.splice(index, 1);
                }
            });
            operationOrder.map((object, index) => {
                if(object['operand'] == "+" || object['operand'] == "-"){
                    orderedOperation.push(object);
                    operationOrder.splice(index, 1);
                }
            });
        }

        //78+3**2-3*9 enig chadku uchir n nemeh uildel hurtel 2 uildel huleetsen bolhor 4 indexer butsah yostoi enend zoriulj tooluur hiih
        orderedOperation.map((object,index) => {
            if(index > 0 && object['index'] > orderedOperation[index-1]['index']) object['index'] -= 2;
            let id = object['index'];
            let operand = object['operand'];
            let num1 = calculate[id-1];
            let num2 = calculate[id+1];
            console.log(num1, num2, operand);
            switch(operand){
                case "**": calculate[id-1] = num1**num2; calculate.splice(id, 1); calculate.splice(id, 1); break;
                case "*": calculate[id-1] = num1*num2; calculate.splice(id, 1); calculate.splice(id, 1); break;
                case "/": calculate[id-1] = num1/num2; calculate.splice(id, 1); calculate.splice(id, 1); break;
                case "+": calculate[id-1] = num1+num2; calculate.splice(id, 1); calculate.splice(id, 1); break;
                case "-": calculate[id-1] = num1-num2; calculate.splice(id, 1); calculate.splice(id, 1); break;
            }
        });
    }
    document.getElementById('field').innerText = "="+calculate[0];
});


// hasah too => haalt ashiglah bh