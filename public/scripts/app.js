/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */


$(document).ready(function() {

  // button function





  // Post tweet to stream
  $("#tweet-form").on("submit", function(event) {
      event.preventDefault();
      let tweetText = $(this).find('.tweet-input').val()
      if (tweetText.length > 140) {
        alert("Your tweet is too long! Please ensure it is no longer than 140 characters.");
      } else if (tweetText === '') {
        alert("Please write something before submitting your tweet.");
      } else {
        let data = $(this).serialize();
        $.ajax({
          type: "POST",
          url: '/tweets',
          data: data,
          success: function(data) {
              // Empty the tweet container
              $('.old-tweets').empty();
              // Clear tweet input box
              $('.tweet-input').val('');
              // Re-load tweets including submitted tweet
              loadTweets();
          }
        });
      }
  })

  function loadTweets(){
    $.ajax({
      type: "GET",
      url: '/tweets',
      success: function (tweets) {
        renderTweets(tweets);
      }
    })
  }

  loadTweets();

  // renderTweets(tweetData);
  });


  // Loops through tweets in tweetData to render previous tweets
  function renderTweets(tweets) {
    // loops through tweets
    let $tweetContainer = $('.old-tweets');
    console.log(tweets);
    tweets.reverse().forEach(function(tweet) {
      let $tweet = createTweetElement(tweet);
      $tweetContainer.append($tweet);
    });
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