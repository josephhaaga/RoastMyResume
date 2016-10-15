var annotation_number=1;
annotation_status = [];
annotations = {};

function addToSidebar(anno_obj){

}


function registerComment(x,y){
	// Write to Firebase if field has text entered & category set
	// use imgur image ID as /root/
	// console.log("registerComment("+x+","+y+") began");
	var text_field_val = $('#comment-field').val()
	if(text_field_val.replace("\n","").length>0 && $(':checked').length>0){
		$('#comment-submit').addClass("success").text("Success!");
		annotation_status[annotation_number]=true;
		var users_remarks = $('#comment-field').val();
		// var users_remarks = $('#comment-field').val().replace(/<script[^>]*?>.*?<\/script>/gi, '').
		// 			 replace(/<[\/\!]*?[^<>]*?>/gi, '').
		// 			 replace(/<style[^>]*?>.*?<\/style>/gi, '').
		// 			 replace(/<![\s\S]*?--[ \t\n\r]*>/gi, '');
		console.log("text: "+users_remarks);
		annotations[annotation_number] = {'type':$(':checked').first().attr('id'), 'remarks':users_remarks};
		
		// add to DOM again since annotation dot disappeared
		if($('#annotation'+annotation_number).length==0){
			$('.resume-container').append("<div class='red-dot-light' id='annotation"+annotation_number+"' style='position:absolute;left:"+(x-10)+"px;top:"+(y-10)+"px'></div>");
		}

		setTimeout(
			function(){
				$('#comment-field').val('');
				$(':checked').first().prop('checked',false);
				$('#comment-modal').foundation('close');
				$('#comment-submit').removeClass("success").text('Submit');
			}
		,800);
		console.log("Comment entered!");
		return true;
	}else{
		console.log("no text in field");
		console.log($(':checked').first().attr('id'));
		switch($(':checked').first().attr('id')){
			case 'grammar':
				$('.resume-container').append("<div class='blue-dot-light' id='annotation"+annotation_number+"' style='position:absolute;left:"+(x-10)+"px;top:"+(y-10)+"px'></div>");
			case 'design':
				$('.resume-container').append("<div class='green-dot-light' id='annotation"+annotation_number+"' style='position:absolute;left:"+(x-10)+"px;top:"+(y-10)+"px'></div>");
			case 'content':
				$('.resume-container').append("<div class='red-dot-light' id='annotation"+annotation_number+"' style='position:absolute;left:"+(x-10)+"px;top:"+(y-10)+"px'></div>");
		}

		$('#comment-submit').addClass("warning").text("Forget something?");
		setTimeout(function(){
			$('#comment-submit').removeClass("warning");
		},500);
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