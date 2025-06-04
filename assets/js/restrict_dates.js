document.addEventListener('DOMContentLoaded', function () {
  var checkinInput = document.getElementById('checkin');
  var checkoutInput = document.getElementById('checkout');

  function getFormattedDate(date) {
    date.setDate(date.getDate() + 1);
    return date.toISOString().slice(0, 10);
  }

  checkinInput.min = getFormattedDate(new Date());

  checkinInput.addEventListener('input', function () {
    var selectedDate = new Date(checkinInput.value);
    selectedDate.setDate(selectedDate.getDate() + 2); 
    var minCheckout = selectedDate.toISOString().slice(0, 10);
    checkoutInput.min = minCheckout;

    if (checkoutInput.value < minCheckout) {
      checkoutInput.value = minCheckout;
    }
  });
});
