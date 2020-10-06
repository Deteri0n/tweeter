$(document).ready(() => {

  $('#tweet-text').keyup(function() {
    let remainingChars = 140 - $(this).val().length;
    console.log($(this).siblings())
    $(this).siblings('.submit-button').find('.counter').text(remainingChars);
  })
  
});