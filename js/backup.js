var seconds = 0;
var minutes = 0;
var hours = 0;
var time = (checkZeroes(hours)+":"+checkZeroes(minutes)+":"+checkZeroes(seconds));
var timer = $("#timer");
var reset = $("#reset");

var timer = {}
function checkZeroes(a){
	if(a < 10){
		return "0" + String(a);
	}
	else{
		return String(a);
	}
}
function update(){
	time = (checkZeroes(hours)+":"+checkZeroes(minutes)+":"+checkZeroes(seconds));
	timer.html(time);
}


function addAnimation(object, animation){
	var target = $("#"+object);
	var ani = ("animated " + animation);

	target.addClass(ani).one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
		target.removeClass(ani);
	});
}

function started(){
		seconds++;
		if(seconds >= 60){
			
			minutes++;
			seconds = 0;
			addAnimation("circle", "pulse");

			if (minutes >= 60){
				hours++;
				minutes = 0;
			}
		}
		update();
}
$(document).ready(function(){
	timer.html(time);

	$("#start").click(function(){
		var startFunc = setInterval(function(){ started(); }, 1000);

		$("#stop").click(function(){
			clearInterval(startFunc);
		});

		reset.click(function(){
			clearInterval(startFunc);
			seconds = 0;
			minutes = 0;
			hours = 0;
			addAnimation("circle", "bounce");
			update();
		})
	});


	reset.click(function(){
		seconds = 0;
		minutes = 0;
		hours = 0;
		addAnimation("circle", "bounce");
		update();
		})


})