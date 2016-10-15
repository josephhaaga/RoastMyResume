var annotation_number=1;
annotation_status = [];

function registerComment(x,y){
	// Write to Firebase if field has text entered & category set
	// use imgur image ID as /root/
	// console.log("registerComment("+x+","+y+") began");
	var text_field_val = $('#comment-field').val()
	if(text_field_val.length>0){
		$('#comment-submit').addClass("success").text("Success!");
		annotation_status[annotation_number]=true;
		setTimeout(
			function(){
				$('#comment-field').val('');
				$('#comment-modal').foundation('close');
				$('#comment-submit').removeClass("success").text('Submit');
			}
		,800);
		console.log("Comment entered!");
		return true;
	}else{
		console.log("no text in field");
		return false;
	}
}

function createNewComment(x,y,anno){
	$('#comment-modal').foundation('open');
	$('#comment-field').focus();
	$(document).keypress(function(e) {
	    if(e.which == 13) {
	    	if(!registerComment(x,y)){
	    		$('#annotation'+annotation_number).detach();
	    	}
	    }
	});
	$('#comment-submit').click(function(){
		if(!registerComment(x,y)){
	    	$('#annotation'+annotation_number).detach();
    	}
	});
}

$('.the-resume').click(function(e){
	var x = e.pageX;
	var y = e.pageY;
	$('.resume-container').append("<div class='red-dot-light' id='annotation"+annotation_number+"' style='position:absolute;left:"+(x-10)+"px;top:"+(y-10)+"px'></div>");
	createNewComment(x,y,annotation_number);
	// console.log(createNewComment(x,y,annotation_number));
});

$('#comment-modal').on("closed.zf.reveal",function(){
	if(!annotation_status[annotation_number]==true){
		$('#annotation'+annotation_number).detach();
	}
	annotation_number+=1;
});

$('#comment-modal #commentGrammar').click(function(){
	$('#annotation'+annotation_number).removeClass().addClass("blue-dot-light");
});

$('#comment-modal #commentContent').click(function(){
	$('#annotation'+annotation_number).removeClass().addClass("red-dot-light");
});

$('#comment-modal #commentDesign').click(function(){
	$('#annotation'+annotation_number).removeClass().addClass("green-dot-light");
});