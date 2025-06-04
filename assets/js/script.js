function validateForm() {
    var date1 = document.forms["MyForm"]["Date1"].value;
    var date2 = document.forms["MyForm"]["Date2"].value;
    var room = document.forms["MyForm"]["Room"].value;
    var firstName = document.forms["MyForm"]["FirstName"].value;
    var surName = document.forms["MyForm"]["SurName"].value;
    var email = document.forms["MyForm"]["Email"].value;
    var tel = document.forms["MyForm"]["Tel"].value;

    if (new Date(date2) < new Date(date1)) {
        alert("Дата на отпътуване не може да бъде преди датата на настаняване.");
        return false;
    }

    var timeDiff = Math.abs(new Date(date2) - new Date(date1));
    var diffDays = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));

    if (diffDays < 2) {
        alert("Минималният брой нощувки е 2.");
        return false;
    }

    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
        alert("Моля въведете валиден имейл.");
        return false;
    }

    var telRegex = /^(\+359|0)([7-9]{1})(\d{8})$/;
    var minTelLength = 4;
    var maxTelLength = 14;

    if (!telRegex.test(tel) || tel.length < minTelLength || tel.length > maxTelLength) {
        alert("Моля въведете съществуващ телефонен номер.");
        return false;
    }
    return true; 
}


function restrictToLettersAndHyphen(inputElement) {
  inputElement.addEventListener('input', function () {
    var validInput = /^[a-zA-Zа-яА-Я-]*$/.test(this.value);

    if (!validInput) {
      alert('Въведете валидно име.');
      this.value = this.value.replace(/[^a-zA-Zа-яА-Я-]/g, '');
    }
  });
}

var firstNameInput = document.getElementById('FirstName');
var surNameInput = document.getElementById('SurName');

restrictToLettersAndHyphen(firstNameInput);
restrictToLettersAndHyphen(surNameInput);

