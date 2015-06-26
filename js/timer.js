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
stopwatch.reset = function() {
		seconds = 0;
		minutes = 0;
		hours = 0;
		this.update();
}

var timing = new Clock();

timing.started = function(){
	// for the timer, it needs to hide everything, show field where user can enter in the desired length
	//after entering the desired length, counts down.
	var seconds = $("#seconds").value;
	var minutes = $('#hours').value;
	var hours = $('#hours').value;
	this.update();

	seconds--;
	if(seconds <= 0){}
}

$(document).ready(function(){
	var mode = stopwatch;

	timer.html(time);

	$("#stopChoice").click(function() {
		if (mode != stopwatch){
			mode = stopwatch;
			mode.reset();
			mode.addAnimation("circle", "bounce");
		}
	});

	$("#timerChoice").click(function() {
		if (mode != timing){
			mode = timing;
			mode.reset();
			mode.addAnimation("circle", "bounce");
		}
	})
	
	$("#start").click(function(){
		var startFunc = setInterval(function(){ mode.started(); }, 1000);

		$("#stop").click(function(){
			clearInterval(startFunc);
		});

		reset.click(function(){
			mode.reset();
			clearInterval(startFunc);
			mode.addAnimation("circle", "bounce");
		})

		$("#stopChoice").click(function() {
			mode.reset();
			clearInterval(startFunc);
			mode.addAnimation("circle", "bounce");
		})
	});


	reset.click(function(){
		seconds = 0;
		minutes = 0;
		hours = 0;
		mode.addAnimation("circle", "bounce");
		mode.update();
		})


})