annotation_status = [];
annotations = {};
var this_resume_id = 123;
var url = window.location.href;
var captured = /resumeId=([^&]+)/.exec(url)[1]; // Value is in [1] ('384' in our case)
var this_resume_id = captured ? captured : '123';

$('.the-resume').attr("src", "uploads/"+this_resume_id+".jpg");

var starCountRef = firebase.database().ref('resume/' + this_resume_id + '/posts');
starCountRef.on('value', function(snapshot) {
  annotations = (snapshot.val());
  $.each(annotations, setupSidebar);
  if(annotations==null){
  	annotations = {};
  }
});

function determineColor(anno_obj){
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
	return color;
}

function setupSidebar(ob){
	// make sure annotation does not already exist on page
	if($("#sidebarAnnotation"+ob).length<=0){
		annotation_number = ob;
		addToSidebar(annotations[ob]);
		// add Annotation Dot
		$('.resume-container').append("<div class='black-dot-light' id='annotation"+annotation_number+"' style='position:absolute;left:calc("+(annotations[ob].x)+"% - 10px);top:calc("+(annotations[ob].y)+"% - 10px); background-color:"+determineColor(annotations[ob])+"'></div>");
	}
}
function addToSidebar(anno_obj){
	console.log(anno_obj)

	$('.sidebar .annotations').prepend("<li><div class='callout sidebar-annotation' id='sidebarAnnotation"+annotation_number+"' style='background-color:"+determineColor(anno_obj)+";'>"+anno_obj.remarks+"</div></li>");

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

	// Hover listeners for Sidebar Annotation and Annotation Dot
	$('#sidebarAnnotation'+annotation_number).hover( function(){
		$(this).addClass('highlight');
		annotation_number = ($(this).prop('id').replace("sidebarAnnotation",""));
		$('#annotation'+annotation_number).addClass('highlight');
	}, function(){
		$(this).removeClass('highlight');
		annotation_number = ($(this).prop('id').replace("sidebarAnnotation",""));
		$('#annotation'+annotation_number).removeClass('highlight');
	});

	$('#annotation'+annotation_number).hover( function(){
		$(this).addClass('highlight');
		annotation_number = ($(this).prop('id').replace("annotation",""));
		$('#sidebarAnnotation'+annotation_number).addClass('highlight');
	}, function(){
		$(this).removeClass('highlight');
		annotation_number = ($(this).prop('id').replace("annotation",""));
		$('#sidebarAnnotation'+annotation_number).removeClass('highlight');
	});
}


function registerComment(x,y){
	// Write to Firebase if field has text entered & category set
	// use imgur image ID as /root/
	var text_field_val = $('#comment-field').val();

	var num_letters = text_field_val.match(/[\w]/g).length;

	if(num_letters>0 && $(':checked').length>0){
		$('#comment-submit').addClass("success").text("Success!");
		// annotation_status[annotation_number]=true;
		var users_remarks = $('#comment-field').val();
		new_anno = {'type':$(':checked').first().attr('id'), 'remarks':users_remarks, 'x': x, 'y': y};
		setTimeout(
			function(){
				$('#comment-field').val('');
				$(':checked').first().prop('checked',false);
				$('#comment-modal').foundation('close');
				$('#comment-submit').removeClass("success").text('Submit');
			}
		,600);
		// addToSidebar(annotations[annotation_number]);
		annotation_number = firebase.database().ref('resume/'+this_resume_id+'/posts').push(new_anno);
		return true;
	}else{
		if($('#annotation'+annotation_number).length==0){
			selected_type=$(':checked').first().attr('id'); 
			switch(selected_type){
				case "grammar":
					$('.resume-container').append("<div class='blue-dot-light' id='annotation"+annotation_number+"' style='position:absolute;left:calc("+(x-10)+"% - 20px);top:calc("+(y-10)+"% - 20px);'></div>");
					break;
				case "design":
					$('.resume-container').append("<div class='green-dot-light' id='annotation"+annotation_number+"' style='position:absolute;left:calc("+(x-10)+"% - 20px);top:calc("+(y-10)+"% - 20px);'></div>");
					break;
				case "content":
					$('.resume-container').append("<div class='red-dot-light' id='annotation"+annotation_number+"' style='position:absolute;left:calc("+(x-10)+"% - 20px);top:calc("+(y-10)+"% - 20px);'></div>");
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

// function createNewComment(x,y,anno){
function createNewComment(x,y){
	$('#comment-modal').foundation('open');
	$('#comment-field').focus();
}

$('.the-resume').click(function(e){
	// annotation_number = firebase.database().ref('resume/'+this_resume_id).child('posts').push().key;
	x = e.pageX - $('.the-resume').offset().left;
	y = e.pageY - $('.the-resume').offset().top;
	// 209, 525
	x = (x/$('.resume-container').width())*100;
	y = (y/$('.resume-container').height())*100;
	// $('.resume-container').append("<div class='black-dot-light' id='annotation"+annotation_number+"' style='position:absolute;left:"+(x-10)+"px;top:"+(y-10)+"px'></div>");
	// createNewComment(x,y,annotation_number);
	createNewComment(x,y);
});

$('#comment-modal').on("closed.zf.reveal",function(){
	// if(!annotation_status[annotation_number]==true){
	// 	$('#annotation'+annotation_number).detach();
	// 	$(':checked').first().prop('checked',false);
	// 	$('#comment-field').val("");
	// }
});


$(document).keypress(function(e) {
    if(e.which == 13 && $('body').hasClass('is-reveal-open')) {
    	console.log("x: "+x+"  y:"+y);
    	registerComment(x,y);
    }
});
$('#comment-submit').click(function(){
		console.log("x: "+x+"  y:"+y);
		registerComment(x,y);
});