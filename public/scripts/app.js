/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
 let tweetData = [
  {
    "user": {
      "name": "Newton",
      "avatars": {
        "small":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_50.png",
        "regular": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188.png",
        "large":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_200.png"
      },
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": {
        "small":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_50.png",
        "regular": "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc.png",
        "large":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_200.png"
      },
      "handle": "@rd" },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  },
  {
    "user": {
      "name": "Johann von Goethe",
      "avatars": {
        "small":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_50.png",
        "regular": "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1.png",
        "large":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_200.png"
      },
      "handle": "@johann49"
    },
    "content": {
      "text": "Es ist nichts schrecklicher als eine tätige Unwissenheit."
    },
    "created_at": 1461113796368
  }
]

$(document).ready(function() {

  $("#tweet-form").on("submit", function(event) {
      event.preventDefault();
      // create and condition? if less than 140 and greater than 0 chars
      // debugger
      let tweetText = $(this).find('.tweet-input').val()
      if (tweetText.length < 140) {
        let data = $(this).serialize();
        $.ajax({
           type: "POST",
           url: '/tweets',
           data: data, // serializes the form's elements.
           success: function(data)
           {
               alert(tweetText); // show response from the php script.
           }
         });

        }

        // else {
        //   alert(`Tweet length must be between 0 and 140 characters`)
        // }
  })





  renderTweets(tweetData);
  });

  // Loops through tweets in tweetData to render previous tweets
  function renderTweets(tweets) {
    // loops through tweets
    let $tweetContainer = $('.old-tweets');
    console.log(tweets);
    tweets.forEach(function(tweet) {
      let $tweet = createTweetElement(tweet);
      $tweetContainer.append($tweet);
    });

      // calls createTweetElement for each tweet
      // takes return value and appends it to the tweets container

    // For each (tweet){
      // let tweet = createTweetElement

    }


  // Function creates each element of tweet
  function createTweetElement(tweet) {
    var $tweet = $('<article>').addClass('tweet');

    // HEADER
    let $header = $('<header>')

    let $avatar = $('<div class="avatar">')
      .append($('<img>').attr('src', tweet.user.avatars.regular))
      $header.append($avatar);

    let $username = $('<div class="username">')
      .append($('<h2>').text(tweet.user.name))
      $header.append($username);


    let $handle = $('<div class="handle">')
      .append($('<span>').text(tweet.user.handle))
      $header.append($handle);


    // BODY
    let $body = $('<div class="tweet-body">')

    let $content = $('<p>')
      .append($('<p>').text(tweet.content.text))
      $body.append($content);


    // FOOTER
    let $footer = $('<footer>')

    let $timestamp = $('<span class="timestamp">')
      .append($('<span>').text(new Date(tweet.created_at)))
      $footer.append($timestamp);

    let $icons = $('<span class="icons">')
      .append($('<i>')
        .attr({
        class:"fa fa-flag",
        "aria-hidden":"true"
      }))
      .append($('<i>')
        .attr({
        class:"fa fa-retweet",
        "aria-hidden":"true"
      }))
      .append($('<i>')
        .attr({
        class:"fa fa-heart",
        "aria-hidden":"true"
      }));
      $footer.append($icons);


      $tweet.append($header).append($body).append($footer);

      return $tweet;

  }
