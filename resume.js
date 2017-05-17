annotation_status = [];
annotations = {};
var this_resume_id = 123;


function addToSidebar(anno_obj){
	switch(anno_obj['type']){
		case "grammar":
			color = "rgba(0,0,240,0.5)";
			break;
		case "design":
			color = "rgba(0,240,0,0.5)";
			break;
		case "content":
			color = "rgba(240,0,0,0.5)";
			break;
	}	
	$('.sidebar .annotations').append("<li><div class='callout sidebar-annotation' id='sidebarAnnotation"+annotation_number+"' style='background-color:"+color+";'>"+anno_obj.remarks+"</div></li>");
}


function registerComment(x,y){
	// Write to Firebase if field has text entered & category set
	// use imgur image ID as /root/
	var text_field_val = $('#comment-field').val();

	var num_letters = text_field_val.match(/[\w]/g).length;

	if(num_letters>0 && $(':checked').length>0){
		$('#comment-submit').addClass("success").text("Success!");
		annotation_status[annotation_number]=true;
		var users_remarks = $('#comment-field').val();
		annotations[annotation_number] = {'type':$(':checked').first().attr('id'), 'remarks':users_remarks};
		setTimeout(
			function(){
				$('#comment-field').val('');
				$(':checked').first().prop('checked',false);
				$('#comment-modal').foundation('close');
				$('#comment-submit').removeClass("success").text('Submit');
			}
		,600);
		addToSidebar(annotations[annotation_number]);
		firebase.database().ref('resume/'+this_resume_id+'/posts/'+annotation_number).update(annotations[annotation_number]);
		return true;
	}else{
		if($('#annotation'+annotation_number).length==0){
			selected_type=$(':checked').first().attr('id'); 
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
	annotation_number = firebase.database().ref('resume/'+this_resume_id).child('posts').push().key;
	x = e.pageX;
	y = e.pageY;
	$('.resume-container').append("<div class='black-dot-light' id='annotation"+annotation_number+"' style='position:absolute;left:"+(x-10)+"px;top:"+(y-10)+"px'></div>");
	createNewComment(x,y,annotation_number);
});

$('#comment-modal').on("closed.zf.reveal",function(){
	// if(!annotation_status[annotation_number]==true){
	// 	$('#annotation'+annotation_number).detach();
	// 	$(':checked').first().prop('checked',false);
	// 	$('#comment-field').val("");
	// }
});

// Style Annotation dot to match annotation_type
$(".commentType li").click(function(){
	switch($(this).prop('id')){
		case 'commentContent':
			$('#annotation'+annotation_number).removeClass().addClass("red-dot-light");
			break;
		case 'commentGrammar':
			$('#annotation'+annotation_number).removeClass().addClass("blue-dot-light");		
			break;
		default:
			$('#annotation'+annotation_number).removeClass().addClass("green-dot-light");		
			break;
	}
});

$(document).keypress(function(e) {
    if(e.which == 13 && $('body').hasClass('is-reveal-open')) {
    	registerComment(x,y);
    }
});
$('#comment-submit').click(function(){
		registerComment(x,y);
});