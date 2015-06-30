var seconds = 0;
var minutes = 0;
var hours = 0;
var time = (checkZeroes(hours)+":"+checkZeroes(minutes)+":"+checkZeroes(seconds));
var timer = $("#timer");
var reset = $("#reset");
var menu = $("#mybox");
var started = false;
var startFunc;

function checkZeroes(a){
    if(a < 10){
		return "0" + String(a);
	}
	else{
		return String(a);
	}
}
function inputValidation(field){
	var digits = (field.match(/\d/g)).join("");
	return Number(digits);
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
	},
	this.reset = function() {
		seconds = 0;
		minutes = 0;
		hours = 0;
		this.update();
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

var timing = new Clock();

timing.started = function(){
	// for the timer, it needs to hide everything, show field where user can enter in the desired length
	//after entering the desired length, counts down.
	this.update();

	if(seconds <= 0){
		if (minutes === 0 && hours === 0){
			clearInterval(startFunc);
			this.addAnimation("circle", "tada");
		}
		else{
			minutes--;
			seconds = 59;

			if(minutes <= 0){
				hours--;
				minutes = 59;
			}
		}
		//needed an automatic stop

	}
	else{
		seconds--;
	}
}

$(document).ready(function(){
	var mode = stopwatch;

	timer.html(time);

    $("#stopChoice").click(function() {
		if (mode != stopwatch){
			mode = stopwatch;
			mode.reset();
			menu.removeClass().addClass("animated slideOutRight").one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
			menu.addClass("hide");
		});
		}
	});
	$("#timeChoice").click(function() {
		$("#start").prop("disabled", false);
		if (mode != timing){
			mode = timing;
			mode.reset();
			mode.addAnimation("circle", "bounce");
			menu.removeClass().addClass("animated slideInRight").one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
			menu.removeClass("hide");
		});
		}
	})
	
	$("#set").click(function() {
		seconds = inputValidation($("#seconds").val()) % 60;
		minutes = (inputValidation($("#minutes").val()) + Math.floor($("#seconds").val() / 60)) % 60;
		hours = inputValidation($("#hours").val()) + Math.floor((inputValidation($("#minutes").val()) + Math.floor($("#seconds").val() / 60)) / 60);

		console.log(seconds);
		mode.update();
	})

	$("#start").click(function(){
		startFunc = setInterval(function(){ mode.started(); }, 1000);
		$("#start").prop("disabled", true);
		$("#stop").click(function(){
			clearInterval(startFunc);
			$("#start").prop("disabled", false);
		});

		reset.click(function(){
			mode.reset();
			clearInterval(startFunc);
			mode.addAnimation("circle", "bounce");
		})

		$("#stopChoice").click(function() {
			mode.reset();
			clearInterval(startFunc);
			$("#start").prop("disabled", false);
			mode.addAnimation("circle", "bounce");
		})
	});


	reset.click(function(){
		seconds = 0;
		minutes = 0;
		hours = 0;
		mode.addAnimation("circle", "bounce");
		$("#start").prop("disabled", false);
		mode.update();
		})


})