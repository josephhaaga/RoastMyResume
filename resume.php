<!doctype html>
<html class="no-js" lang="en" dir="ltr">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="x-ua-compatible" content="ie=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Roast My Resume</title>
    <link rel="stylesheet" href="css/foundation.css">
    <link rel="stylesheet" href="css/app.css">
    <link rel="stylesheet" href="css/resume.css">
  </head>
  <body>
    <div class="row expanded navigation" data-equalizer data-equalize-on="medium" id="test-eq">
      <div class="medium-6 columns" data-equalizer-watch>
        <div class="logo-button">
          <a href="/"><h1 class="site-name">Roast My Resume</h1></a>
        </div>
      </div>
      <div class="medium-6 columns" data-equalizer-watch>
        <div class="random-button">
            <?php $array = explode("\n", file_get_contents('resume_ids')); ?>
            <?php $random_resume = $array[array_rand($array)]; ?>
          <a href="/resume.php?resumeId=<?php echo $random_resume; ?>">Random Resume</a>
        </div>
      </div>
    </div>

    <div class="row">
      <div class="large-12 columns">
        <div class="border">

          <div class="medium-10 column resume-container">
            <img class="the-resume" src="http://i.imgur.com/CSS4APd.png"/>
          </div>

          <div class="medium-2 column sidebar">
            <p>Annotations<p>
            <ul class="annotations">
            </ul>
          </div>

          <div id="comment-modal" class="reveal-modal" data-reveal aria-labelledby="modalTitle" aria-hidden="true" role="dialog">
              <div class="modal-interior">
                <textarea id="comment-field" placeholder="Roast this fool"></textarea>
                  <h4>What kind of annotation is this?</h4>
                  <ul class="button-group round toggle commentType" style="text-align:center;" data-toggle="buttons-radio">
                    <li id="commentContent">
                      <input type="radio" id="content" name="r-group" data-toggle="button">
                      <label class="button" for="content">Content</label>
                    </li>
                    <li id="commentDesign">
                      <input type="radio" id="design" name="r-group" data-toggle="button">
                      <label class="button" id="design" for="design">Design</label>
                    </li>
                    <li id="commentGrammar">
                      <input type="radio" id="grammar" name="r-group" data-toggle="button">
                      <label class="button" id="grammar" for="grammar">Grammar</label>
                    </li>
                  </ul>


                <a id="comment-submit" class="button expanded">Submit</a>
              </div>
            </div>

        </div>
      </div>
    </div>
    <script src="https://www.gstatic.com/firebasejs/3.9.0/firebase.js"></script>
    <script>
      // Initialize Firebase
      var config = {
        apiKey: "AIzaSyCJkxAmM6oZsUpbi0o4q_W0n5TWr4r2qWE",
        authDomain: "rmr.firebaseapp.com",
        databaseURL: "https://rmr.firebaseio.com",
        projectId: "firebase-rmr",
        storageBucket: "firebase-rmr.appspot.com",
        messagingSenderId: "518079744181"
      };
      firebase.initializeApp(config);
    </script>
    <script src="js/vendor/jquery.js"></script>
    <script src="js/vendor/what-input.js"></script>
    <script src="js/vendor/foundation.js"></script>
    <script src="js/app.js"></script>
    <script src="js/resume.js"></script>
    <script>
    $(document).ready(function(){
      $(this).foundation();      
    })
    </script>
    <script>
      (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
      (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
      m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
      })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

      ga('create', 'UA-66264514-8', 'auto');
      ga('send', 'pageview');

    </script>
  </body>
</html>
