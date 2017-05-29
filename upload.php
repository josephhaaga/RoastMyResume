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
        <div class="border">
          <h2>Upload your resume</h2>
          <p>Please upload a jpg or png with all personal information redacted! RMR is not liable for any consequences of uploading personal information.</p>
          <p>Remember to bookmark your resume page link! You will need this to view feedback on your resume</p>
          <div class="upload-zone">
            <div class="row">
              <div class="medium-10 medium-offset-1 columns">
                <label for="email">Enter your email:</label>
                <input id="emailField" type="email" name="email">
              </div>
            </div>
            <div class="row">
              <div class="medium-12 columns">
                <form action="perform_upload.php" method="post" class="dropzone" enctype="multipart/form-data">
            <!-- <form action="upload.php" method="post" enctype="multipart/form-data"> -->
                        Drop resume here (or click to select from harddrive):
                        <!-- <input type="file" name="file" id="fileToUpload">
                        <input type="submit" value="Upload Image" name="submit"> -->
                </form>
              </div>
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
    <script src="./js/dropzone.js"></script>
    <script>
      email_address = null;
        $(document).ready(function(){
          run = false;
          $(this).foundation();    
          Dropzone.autoDiscover = false;
            $(".dropzone").dropzone({
                renameFilename: function (filename) {
                    if(!run){
                        console.log("var postsRef = firebase.database().ref(resume);")
                        var postsRef = firebase.database().ref("resume");
                        console.log("var newPostRef = postsRef.push({uploaded:true});")
                        var newPostRef = postsRef.push({"uploaded":true});
                        str = newPostRef.toString();
                        file_name = str.substring(str.lastIndexOf('/')+1,str.length) + ".jpg";
                        console.log("renaming file from "+filename+" to "+file_name);
                        run=true;
                        return file_name;
                    }else{
                        return file_name;
                    }
                },
                success:  function() {
                    console.log("UPLOAD SUCCESSFUL!");
                    my_path = file_name.substring(0,file_name.indexOf("."));
                    $('.upload-zone').append("<p>Visit your new resume page: </p><a style='display:inline;' href='http://roastmyresume.com/resume.php?resumeId="+my_path+"' >roastmyresume.com/resume.html?resumeId="+my_path+"</a>");
              firebase.database().ref("users").push({"user":email_address, "file":file_name});
                }
            }); 

        $('#emailField').on('keyup',function(){
          email_address = $(this).val();
          $('.dropzone').show();
        })
        });

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
