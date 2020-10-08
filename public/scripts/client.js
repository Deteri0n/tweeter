/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
*/

// waiting for the file to finish loading 
$(document).ready(() => {

  // escape function to prevent injected script
  const escape =  function(str) {
    let div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

  //creates the HTML code for the corresponding tweet and returns the JQUERY objects containing it 
  const createTweetElement = (tweetObj) => {

    let htmlText =  `<header>
                      <div class='picture-name'>
                        <img src=${tweetObj.user.avatars}>
                        <a>${tweetObj.user.name}</a>
                      </div>
                      <div>
                        <a>${tweetObj.user.handle}</a>
                      </div>
                    </header>
                    <p>${escape(tweetObj.content.text)}</p>
                    <footer>
                      <time>${Date(tweetObj.created_at)}</time>
                      <div class='socials'>
                        <i class='fas fa-flag'></i>
                        <i class='fas fa-retweet'></i>
                        <i class='fas fa-heart'></i>
                      </div>
                    </footer>`;
    
    let $tweet = $('<article>').append(htmlText);

    return $tweet;
  };

  // adds the tweets to the tweets-container section in the HTML code
  const renderTweets = (tweetsArr) => {
    tweetsArr.forEach(element => {
      let $tweet = createTweetElement(element);
      $('#tweets-container').prepend($tweet);
    });
  };

  // ajax request to get the tweets from the database and render them
  let loadTweets = (callback) => {
    $.ajax({
      url:'/tweets'
    }).then((tweets) => {
      renderTweets(callback(tweets));
    });
  };

  //loads the tweets from the database
  loadTweets((data) => data);

  // creates an ajax request on submit instead of the submit of the form
  $('.new-tweet form').submit(function(event) {
    $('.error-message').slideUp(() => {
      $('.error-message span').text('');
    });
    event.preventDefault();
    const unSerializedData = $(this).children('textarea').val();
    const data = $(this).serialize();
    const dataValidation = data.slice(5);
    
    // checking if the textarea is empty or null
    if (!dataValidation) {
      $('.error-message').slideDown(function() {
        $('.error-message span').text('Cannot submit an empty tweet!');
      });
    } else if (dataValidation.length > 140) {
      $('.error-message').slideDown(() => {
        $('.error-message span').text('Tweet too long!');
      });
    // adding the tweet to the database if correct and rendering it
    } else {
    $.ajax({
      data : data,
      url: '/tweets',
      method: 'POST'
    }).then(() => {
      $(this).children('textarea').val('');
      $('.counter').val('140');
      loadTweets((arr) => arr.filter((e) => {
        return e.content.text === unSerializedData;
      }));
    });

    }
  });
  
  // sliding up and down the new-tweet section on the page
  $('.new-tweet-nav').click(() => {
    if ($('.new-tweet').is(':hidden')) {
      $('.new-tweet').slideDown(() => {
        $('#tweet-text').focus();
      });
    } else {
      $('.new-tweet').slideUp();
    }
  });
  
});