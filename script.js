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
            console.log(char, "too");
        }
        else if(char == ".") number.push(char);
        else if(isNaN(char) == true){
            if(char == "*" && operations[operations.length-1] == "*"){
                operations.pop();
                operations.push("**");
                console.log(char, "temdeg")
            }
            else{
                numbers.push(parseFloat(number.toString().replace(/,/g,'')));
                number = [];
                operations.push(char);
                console.log(char, "temdeg")
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
    console.log(calculate);

// calculate the expression
    while(calculate.length > 1){
        for(let i = 0; i < calculate.length; i++){
            if(isNaN(calculate[i]) == true){
                {
                    if(calculate[i] == "**") calculate[i] = calculate[i-1]**calculate[i+1];
                    else if(calculate[1] == "*") calculate[i] = calculate[i-1]*calculate[i+1];
                    else if(calculate[1] == "/") calculate[i] = calculate[i-1]/calculate[i+1];
                    else if(calculate[1] == "+") calculate[i] = calculate[i-1]+calculate[i+1];
                    else if(calculate[1] == "-") calculate[i] = calculate[i-1]-calculate[i+1];
                    calculate.splice(i+1, 1);
                    calculate.splice(i-1, 1);
                    break;
                }
            }
        }
        console.log(calculate.length);
    }

    console.log(calculate);
});


// hasah too => haalt ashiglah bh, olon . in bug