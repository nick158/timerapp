var seconds = 0;
var minutes = 0;
var hours = 0;
var time = (checkZeroes(hours)+":"+checkZeroes(minutes)+":"+checkZeroes(seconds));
var timer = $("#timer");
var reset = $("#reset");

function checkZeroes(a){
	if(a < 10){
		return "0" + String(a);
	}
	else{
		return String(a);
	}
}

function Clock() {

	//updates the time with 0's
	this.update = function(){
	time = (checkZeroes(hours)+":"+checkZeroes(minutes)+":"+checkZeroes(seconds));
	timer.html(time);
	},
	//easier to add and change animations with animate.css
	this.addAnimation = function(object, animation){
		var target = $("#"+object);
		var ani = ("animated " + animation);
		//add the desired animation and on end remove the class
		target.addClass(ani).one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
			target.removeClass(ani);
		});
	}
}

//make stopwatch object with unique method for counting
var stopwatch = new Clock();

stopwatch.started = function(){
		seconds++;
		if(seconds >= 60){
			
			minutes++;
			seconds = 0;
			this.addAnimation("circle", "pulse");

			if (minutes >= 60){
				hours++;
				minutes = 0;
			}
		}
		this.update();
}


$(document).ready(function(){
	timer.html(time);

	$("#start").click(function(){
		var startFunc = setInterval(function(){ stopwatch.started(); }, 1000);

		$("#stop").click(function(){
			clearInterval(startFunc);
		});

		reset.click(function(){
			clearInterval(startFunc);
			seconds = 0;
			minutes = 0;
			hours = 0;
			stopwatch.addAnimation("circle", "bounce");
			stopwatch.update();
		})
	});


	reset.click(function(){
		seconds = 0;
		minutes = 0;
		hours = 0;
		stopwatch.addAnimation("circle", "bounce");
		stopwatch.update();
		})


})