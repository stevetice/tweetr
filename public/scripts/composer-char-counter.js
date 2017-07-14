$(document).ready(function() {

  $('.tweet-input').keyup(function(event) {
    let maxChars = 140;
    let charCount = $(this).val().length;
    let counter = $('form').find('.counter');
    counter.text(maxChars - charCount);
    if (charCount > maxChars) {
      counter.addClass('over');
    } else {
      counter.removeClass('over');
    }
  });
});
