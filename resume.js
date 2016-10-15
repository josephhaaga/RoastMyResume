function registerComment(x,y){
	// Write to Firebase if field has text entered & category set
	// use imgur image ID as /root/
	var text_field_val = $('#comment-field').val()
	if(text_field_val.length>0){
		$('#comment-submit').addClass("success").text("Success!");
		setTimeout(
			function(){
				$('#comment-field').val('');
				$('#comment-modal').foundation('close');
				$('#comment-submit').removeClass("success").text('Submit');
			}
		,800);
		console.log("Comment entered!");
		
	}else{
		console.log("no text in field");
	}
}

function createNewComment(x,y){
	console.log("comment added at "+x+", "+y);
	$('.resume-container').append("<div class='red-dot-light' style='position:absolute;left:"+(x-10)+"px;top:"+(y-10)+"px'></div>");
	$('#comment-modal').foundation('open');
	$('#comment-field').focus();

	$(document).keypress(function(e) {
	    if(e.which == 13) {
	    	registerComment(x,y);
	    }
	});

	$('#comment-submit').click(function(){
		registerComment(x,y);
	})
}

$('.the-resume').click(function(e){
	// window.alert("clicked at "+e.pageX+" "+e.pageY);
	var x = e.pageX;
	var y = e.pageY;
	createNewComment(x,y);
});
