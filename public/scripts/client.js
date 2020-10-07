/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(document).ready(() => {


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
                    <p>${tweetObj.content.text}</p>
                    <footer>
                      <time>${Date(tweetObj.created_at)}</time>
                      <div class='social'>
                        <i class='fas fa-flag'></i>
                        <i class='fas fa-retweet'></i>
                        <i class='fas fa-heart'></i>
                      </div>
                    </footer>`;
    
    let $tweet = $('<article>').append(htmlText);

    return $tweet;
  };

  const renderTweets = (tweetsArr) => {
    tweetsArr.forEach(element => {
      let $tweet = createTweetElement(element);
      $('#tweets-container').append($tweet);
    });
  };

  // creates a submit ajax request instead of the one inside the form
  $('.new-tweet form').submit(function(event) {
    event.preventDefault();
    const data = $(this).serialize();
    const dataValidation = data.slice(5);

    if (!dataValidation) {
      alert('Cannot submit an empty tweet!');
    } else if (dataValidation.length > 140) {
      alert('Tweet too long!');
    } else {
      $.ajax({
        data,
        url: '/tweets',
        method: 'POST'
      });
    }
  });

  // ajax request to get the tweets and render them
  let loadTweets = () => {
    $.ajax({
      url:'/tweets'
    }).then((tweets) => {
      renderTweets(tweets);
    });
  };

  loadTweets();

});