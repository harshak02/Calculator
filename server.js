const buttons = document.querySelectorAll(".button");
const display = document.querySelector(".display");
const sign = document.querySelector(".fun-dis");
let prev = "";
let state = 0;
let fun = "";
let dot = 0;
let st = 0;

buttons.forEach((button) => {
  button.addEventListener("click", (e) => {
    const can = e.target.innerText;
    if (display.textContent === "Error") {
      if (can == "CLR") {
        dot = 0;
        display.textContent = "0";
        sign.textContent = "";
        prev = "";
        fun = "";
      } else {
        return;
      }
    }
    if (can == "CLR") {
      dot = 0;
      display.textContent = "0";
      sign.textContent = "";
      prev = "";
      fun = "";
    } else if (can == ".") {
      dot = 1;
      display.textContent = display.textContent + ".";
    } else if (can == "B") {
      if (display.textContent != "0")
        display.textContent = display.textContent.slice(0, -1);
    } else if (can == "+" || can == "-" || can == "*" || can == "/") {
      if (sign.textContent == "" && st == 1) {
        prev = parseFloat(display.textContent);
        fun = can;
        sign.textContent = fun;
        state = 1;
      }
    } else if (can == "=") {
      if (prev != "" && fun != "") {
        let cnt1 = 0;
        let str2 = prev.toString();
        let ind1 = str2.length - 1;
        while (ind1 >= 0 && str2[ind1] != ".") {
          cnt1++;
          ind1--;
        }
        if (cnt1 == str2.length) cnt1 = 0;
        let str = display.textContent;
        let cnt2 = 0;
        let ind2 = str.length - 1;
        while (ind2 >= 0 && str[ind2] != ".") {
          cnt2++;
          ind2--;
        }
        if (cnt2 == str.length) cnt2 = 0;
        if (fun == "+") {
          let curr = parseFloat(display.textContent);
          console.log(curr);
          display.textContent = (prev + curr)
            .toFixed(Math.max(cnt1, cnt2))
            .toString();
        } else if (fun == "-") {
          let curr = parseFloat(display.textContent);
          display.textContent = (prev - curr)
            .toFixed(Math.max(cnt1, cnt2))
            .toString();
        } else if (fun == "*") {
          let curr = parseFloat(display.textContent);
          display.textContent = (prev * curr)
            .toFixed(Math.max(cnt1, cnt2))
            .toString();
        } else {
          let curr = parseFloat(display.textContent);
          if (curr == 0) display.textContent = "Error";
          else display.textContent = (prev / curr).toString();
        }
        prev = parseFloat(display.textContent);
        fun = "";
        sign.textContent = "";
      }
    } else {
      st = 1;
      if (state === 1) {
        dot = 0;
        display.textContent = "";
        state = 0;
      }
      if (display.textContent === "0") display.textContent = can;
      else display.textContent = display.textContent + can;
    }
  });
});
