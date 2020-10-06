$(document).ready(() => {

  $('#tweet-text').keyup(function() {
    let remainingChars = 140 - $(this).val().length;
    console.log($(this).siblings('.submit-button').find('.counter'));
    if (remainingChars < 0) {
      $(this).siblings('.submit-button').find('.counter').attr('value',"negative");
    } else {
      $(this).siblings('.submit-button').find('.counter').attr('value', "positive");
    }
    $(this).siblings('.submit-button').find('.counter').text(remainingChars);
  })

});