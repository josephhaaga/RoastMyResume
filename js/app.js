$(document).foundation()

firebase.database().ref('resume').on("value", function(snapshot) {
  resumes = (snapshot.val());
},function (errorObject) {
  console.log("The read failed: " + errorObject.code);
});

