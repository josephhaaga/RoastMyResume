var annotation_number=1;
annotation_status = [];
annotations = {};

function addToSidebar(anno_obj){
	console.log(anno_obj['type']);
	switch(anno_obj['type']){
		case "grammar":
			$('.sidebar').append("<div class='callout sidebar-annotation' id='sidebarAnnotation"+annotation_number+"' style='background-color:rgba(0,0,240,0.5);'>"+anno_obj.remarks+"</div>");
			break;
		case "design":
			$('.sidebar').append("<div class='callout sidebar-annotation' id='sidebarAnnotation"+annotation_number+"' style='background-color:rgba(0,240,0,0.5);'>"+anno_obj.remarks+"</div>");
			break;
		case "content":
			// $('.sidebar').append("<div class='callout alert'>"+anno_obj.remarks+"</div>");
			$('.sidebar').append("<div class='callout sidebar-annotation' id='sidebarAnnotation"+annotation_number+"' style='background-color:rgba(240,0,0,0.5);'>"+anno_obj.remarks+"</div>");
			break;
	}	
}


function registerComment(x,y){
	// Write to Firebase if field has text entered & category set
	// use imgur image ID as /root/
	// console.log("registerComment("+x+","+y+") began");
	var text_field_val = $('#comment-field').val();

	var num_letters = text_field_val.match(/[\w]/g).length;

	if(num_letters>0 && $(':checked').length>0){
		$('#comment-submit').addClass("success").text("Success!");
		annotation_status[annotation_number]=true;
		var users_remarks = $('#comment-field').val();
		console.log("text: "+users_remarks);
		annotations[annotation_number] = {'type':$(':checked').first().attr('id'), 'remarks':users_remarks};
		setTimeout(
			function(){
				$('#comment-field').val('');
				$(':checked').first().prop('checked',false);
				$('#comment-modal').foundation('close');
				$('#comment-submit').removeClass("success").text('Submit');
			}
		,600);
		console.log("Comment entered!");
		addToSidebar(annotations[annotation_number]);
		return true;
	}else{
		console.log("no text in field");
		if($('#annotation'+annotation_number).length==0){
			// $('.resume-container').append("<div class='red-dot-light' id='annotation"+annotation_number+"' style='position:absolute;left:"+(x-10)+"px;top:"+(y-10)+"px'></div>");
			selected_type=$(':checked').first().attr('id'); 
			console.log(selected_type);
			switch(selected_type){
				case "grammar":
					$('.resume-container').append("<div class='blue-dot-light' id='annotation"+annotation_number+"' style='position:absolute;left:"+(x-10)+"px;top:"+(y-10)+"px'></div>");
					break;
				case "design":
					$('.resume-container').append("<div class='green-dot-light' id='annotation"+annotation_number+"' style='position:absolute;left:"+(x-10)+"px;top:"+(y-10)+"px'></div>");
					break;
				case "content":
					$('.resume-container').append("<div class='red-dot-light' id='annotation"+annotation_number+"' style='position:absolute;left:"+(x-10)+"px;top:"+(y-10)+"px'></div>");
					break;
			}
		}

		$('#comment-submit').addClass("warning").text("Forget something?");
		setTimeout(function(){
			$('#comment-submit').removeClass("warning");
		},600);
		return false;
	}
}

function createNewComment(x,y,anno){
	$('#comment-modal').foundation('open');
	$('#comment-field').focus();
}

$('.the-resume').click(function(e){
	x = e.pageX;
	y = e.pageY;
	$('.resume-container').append("<div class='black-dot-light' id='annotation"+annotation_number+"' style='position:absolute;left:"+(x-10)+"px;top:"+(y-10)+"px'></div>");
	createNewComment(x,y,annotation_number);
});

$('#comment-modal').on("closed.zf.reveal",function(){
	if(!annotation_status[annotation_number]==true){
		$('#annotation'+annotation_number).detach();
		$(':checked').first().prop('checked',false);
		$('#comment-field').val("");
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

$(document).keypress(function(e) {
    if(e.which == 13 && $('body').hasClass('is-reveal-open')) {
    	registerComment(x,y);
    }
});
$('#comment-submit').click(function(){
		registerComment(x,y);
});