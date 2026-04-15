let display = document.getElementById("display");
let expression ="";

function append(value) {
  if (display.innerText === "0") {
    display.innerText = value;
    expression = value;
  } else {
    display.innerText += value;
    expression += value;
  }
}

function clearDisplay() {
  expression = "";
  display.innerText = "0";
}

function deleteLast() {
  expression = expression.slice(0, -1);
  display.innerText = display.innerText.slice(0, -1) || "0";
}

function deleteLast() {
  display.innerText = display.innerText.slice(0, -1) || "0";
}

// Insert functions properly
function insertFunc(func) {

  // 🔴 FIX: remove starting 0
  if (display.innerText === "0") {
    display.innerText = "";
    expression = "";
  }

  switch (func) {
    case "sin":
      expression += "Math.sin(";
      display.innerText += "sin(";
      break;

    case "cos":
      expression += "Math.cos(";
      display.innerText += "cos(";
      break;

    case "tan":
      expression += "Math.tan(";
      display.innerText += "tan(";
      break;

    case "sqrt":
      expression += "Math.sqrt(";
      display.innerText += "√(";
      break;
  }
}
// Square function
function insertSquare() {
  display.innerText += "**2";
}

function calculate() {
  try {
    let exp = expression;

    // auto close brackets
    let open = (exp.match(/\(/g) || []).length;
    let close = (exp.match(/\)/g) || []).length;
    while (close < open) {
      exp += ")";
    }

    // convert degrees → radians
    exp = exp
      .replace(/Math\.sin\((.*?)\)/g, "Math.sin(($1)*Math.PI/180)")
      .replace(/Math\.cos\((.*?)\)/g, "Math.cos(($1)*Math.PI/180)")
      .replace(/Math\.tan\((.*?)\)/g, "Math.tan(($1)*Math.PI/180)");

    let result = eval(exp);

    if (Math.abs(result - Math.round(result)) < 1e-10) {
      result = Math.round(result);
    }

    display.innerText = parseFloat(result.toFixed(10));
    expression = result.toString();

  } catch {
    display.innerText = "Error";
    expression = "";
  }
}