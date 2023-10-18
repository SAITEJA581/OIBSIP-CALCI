document.addEventListener("DOMContentLoaded", function(event) {
    let body = document.querySelector('body');
    let result = document.querySelector('#result');
    let dark_mode_btn = document.querySelector('.dark_mode_btn');
    let clear = document.querySelector('#clear');
    let history = document.querySelector('#history');
    let equalTo = document.querySelector('#equalTo');
    let delete_single_num = document.querySelector('#delete_single_num');
    let Normal_btn = document.querySelectorAll('#Normal_btn');
  
    let initial_value = "";
    let decimalAdded = false;
  
    Normal_btn.forEach((Normal_btn, index) => {
      Normal_btn.addEventListener('click', function() {
        let text = this.innerHTML;
  
        if (text === '.') {
          if (decimalAdded) {
            return;
          }
          decimalAdded = true;
        } else if (text === '+' || text === '-' || text === '/' || text === '*') {
          let lastChar = initial_value.slice(-1);
          if (lastChar === '+' || lastChar === '-' || lastChar === '/' || lastChar === '*') {
            return;
          }
          decimalAdded = false;
        }
        initial_value += text;
        result.innerHTML = initial_value;
      });
    });
  
    equalTo.addEventListener('click', function() {
      let expression = result.innerHTML;
      if (expression.includes('%')) {
        let operands = expression.split('%');
        if (operands.length === 2) {
          let percentage = parseFloat(operands[0]);
          let number = parseFloat(operands[1]);
  
          if (!isNaN(percentage) && !isNaN(number)) {
            let resultValue = (percentage / 100) * number;
            result.innerHTML = resultValue;
          } else {
            alert('Invalid expression. Please enter valid numbers.');
          }
        } else {
          alert('Invalid expression. Please enter a valid percentage expression.');
        }
      } else {
        if (expression !== "") {
          history.innerHTML = expression;
          result.innerHTML = eval(expression);
          initial_value = eval(expression);
        } else {
          alert('Please enter any number');
        }
      }
    });
  
    let dark_mode_status = false;
    dark_mode_btn.addEventListener('click', function() {
      body.classList.toggle('dark_mode_active');
      if (dark_mode_status == false) {
        this.innerHTML = '<i class="bi bi-brightness-low-fill"></i>';
        dark_mode_status = true;
      } else {
        this.innerHTML = '<i class="bi bi-moon-fill"></i>';
        dark_mode_status = false;
      }
    });
  
    delete_single_num.addEventListener('click', function() {
      result.innerHTML = result.innerHTML.slice(0, -1);
      initial_value = result.innerHTML;
    });
  
    clear.addEventListener('click', function() {
      result.innerHTML = "";
      initial_value = "";
      decimalAdded = false;
    });
  });
  