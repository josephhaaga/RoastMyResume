<!doctype html>
<html class="no-js" lang="en" dir="ltr">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="x-ua-compatible" content="ie=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Roast My Resume</title>
    <link rel="stylesheet" href="./css/foundation.css">
    <link rel="stylesheet" href="./css/app.css">
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
          <a href="/resume.html?resumeId=<?php echo $random_resume; ?>">Random Resume</a>
        </div>
      </div>
    </div>

    <div class="row">
      <div class="large-12 columns">
        <div class="callout primary">
          <h2>Welcome to RoastMyResume</h2>
          <p>First impressions matter; perfect your game with feedback from people all over the world.</p>
          <div class="row">
            <div class="medium-4 columns">
              <h3>Features</h3>
              <ul>
                <li>Annotate directly on the resume</li>
                <li>Leave feedback on <span style="color:red;">content</span>, <span style="color:blue;">grammar</span>, or <span style="color:green;">design</span></li>
                <li>The more feedback you give, the more you get!
                  <ul>
                    <li>Giving feedback raises your score</li>
                    <li>Higher score means your resume is served to more people!</li>
                    <li style="font-style:italic;">Resume rank feature under development</li>
                  </ul>
                </li>
              </ul>
            </div>
            <div class="medium-8 columns">
              <img src="/img/demo.png" />
            </div>
          </div>
        </div>
        <div class="callout secondary">
          <div class="row">
            <!-- Grid of resumes -->
            <?php $uploads = scandir('/uploads'); ?>
            <?php foreach($uploads as $key=>$value){
              echo '<div class="medium-4 columns resume-item">
                <a href="http://roastmyresume.com/resume.php?resumeId='.$value.'"><img src="/uploads/'.$value.'" /></a>
              </div>';
            } ?>
            <div class="medium-4 columns resume-item end">
              <a href="http://roastmyresume.com/resume.php"><img src="http://i.imgur.com/CSS4APd.png" /></a>
            </div>
          </div>
        </div>
      </div>
    </div>

    <script src="js/vendor/jquery.js"></script>
    <script src="js/vendor/what-input.js"></script>
    <script src="js/vendor/foundation.js"></script>

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
