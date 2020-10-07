/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(document).ready(() => {

  // escape function to prevent injected script
  const escape =  function(str) {
    let div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

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
      $('#tweets-container').prepend($tweet);
    });
  };

  // ajax request to get the tweets and render them
  let loadTweets = (callback) => {
    $.ajax({
      url:'/tweets'
    }).then((tweets) => {
      renderTweets(callback(tweets));
    });
  };

  // first load of the tweets on get method
  loadTweets((data) => data);

  // creates a submit ajax request instead of the one inside the form
  $('.new-tweet form').submit(function(event) {
    event.preventDefault();
    const unSerializedData = $(this).children('textarea').val();
    const data = $(this).serialize();
    const dataValidation = data.slice(5);

    if (!dataValidation) {
      alert('Cannot submit an empty tweet!');
    } else if (dataValidation.length > 140) {
      alert('Tweet too long!');
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

  

});