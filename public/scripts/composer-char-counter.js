$(document).ready(function() {

  $('.tweet-input').keyup(function(e) {
    // debugger;
    let maxChars = 140;
    let charCount = $(this).val().length;
    console.log(charCount);
    let counter = $('form').find('.counter');
      counter.text(maxChars - charCount);
    if (charCount > maxChars) {
      counter.addClass('over');
    } else {
      counter.removeClass('over');
    }
  });
})
