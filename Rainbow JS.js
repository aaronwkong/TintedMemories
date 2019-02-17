
var colours = ['#ffcccc', '#ffe6cc', '#ffffcc', '#e6ffcc', '#ccffcc', '#ccffff', '#cce6ff', '#ccccff', '#e6ccff', '#ffcce6'];
var questionColours = ['#000000', '#000000', '#000000', '#000000', '#000000'];
var guessColours = [0, 0, 0, 0, 0];
var index = 0;
var lvlsPassed = 0;

// Displays a white page??
function whitePage() {
	var answer = document.getElementById("answer");
	// hide answer if shown
	if (answer.style.visibility == "visible") {
		answer.style.visibility = "hidden";
	}
	// show the answer if not shown already (i.e question was in display)
	else {
		answer.style.visibility = "visible";
	}
}

// take out question and give slots
function blank() {
	var answer = document.getElementById("answer");
	var answerChoice = document.querySelectorAll('.choice span');
	var question = document.getElementById("question");
	question.style.display = "none";
/*	for (int i = 0; i < 9; ++i){
		answerChoice[i].style.visibility = "visible";
	}*/
	answer.style.visibility = "visible";
	
}

//Transitions into other pages  
function transition() {
	var answer = document.getElementById("answer");
	// if answer is displayed rn
	if (answer.style.visibility == "visible") {
		whitePage();
		var toShow = document.getElementById("question");
	}
	// if question is displayed rn
	else {
		setTimeout(blank, 5000);
		var toShow = document.getElementById("answer");
	}
	toShow.style.visibility = "visible"; 
}


// Resets colour scheme of game
function resetColour() {
	var colour_list = document.querySelectorAll('.choice span');
	if (lvlsPassed <= 5) {
		colours = ['#ffcccc', '#ffe6cc', '#ffffcc', '#e6ffcc', '#ccffcc', '#ccffff', '#cce6ff', '#ccccff', '#e6ccff', '#ffcce6'];
	}
	else if (lvlsPassed <= 10) {
		colours = ['#ffcccc', '#ffd9cc', '#ffe6cc', '#fff2cc', '#ffffcc', '#f2ffcc', '#d9ffcc', '#ccffe6', '#ccffff', '#ccf2ff'];
	}
	else if (lvlsPassed <= 15) {
		colours = ['#e6ffff', '#c4ffff', '#99ffff', '#00e6e6', '#00b3b3', '#fff2f5', '#ffe6ed', '#ffccda', '#ff99b6', '#ff6691'];
	}
	else if (lvlsPassed <= 20) {
		colours = ['#e6ffe6', '#ccffcc', '#adffad', '#80fd80', '#40ff40', '#fff2e6', '#ffe6cc', '#fdd5aa', '#ffc180', '#ffa94d'];
	}
	else if (lvlsPassed <= 25) {
		colours = ['#e6f2ff', '#cce5ff', '#b3d7ff', '#96c8ff', '#80bbff', '#eee6ff', '#e3d6ff', '#d9c7ff', '#c9b0ff', '#b999ff'];
	}
	else {
		colours = ['#f2ffe6', '#e5ffcc', '#d3ffad', '#beff84', '#adff66', '#ffffe6', '#ffffcc', '#ffffac', '#ffff8e', '#ffff66'];
	}
	for (i = 0; i <= 9; ++i) {
		colour_list[i].style.background = colours[i];
		transition();
	}
}




// Main Program
// Refreshes the question colours and creates an array for them
function main() {
	resetColour();
	var quest_colour = document.querySelectorAll('.question span');
	for (i = 0; i < 5; ++i) {
		var randInt = Math.floor(Math.random() * 10);
		questionColours[i] = colours[randInt];
		quest_colour[i].style.background = questionColours[i];
	}
}


// Implements user's guess and modifies the guess array
function guess(guessIndex) {
	
	var choice = document.querySelectorAll('.choice span');
	guessColours[guessIndex] = choice[index].style.backgroundColor;
	var user_colour = document.querySelectorAll(".user span");
	user_colour[guessIndex].style.background = guessColours[guessIndex];
	changeColour(index + 1);
}

// Changes user guess (based on selection index)
function changeColour(newIndex) {
	var choice = document.querySelectorAll('.choice span');
	choice[index].style.borderStyle = "none";
	index = newIndex;
	choice[index].style.borderStyle = "solid";
	choice[index].style.borderColor = "#d9d9d9";

}


// converts the hex to rgb format so a comparison can be made
function lazyConvertToRGB(){
	var invisible = document.querySelectorAll('.invisible span');
	for (i = 0; i < 5; ++i){
		invisible[i].style.backgroundColor = questionColours[i]; // fill an invisible div
	}
}


// Checks user answer upon submittal 
function guessAnswer() {
	var lose = false;
	lazyConvertToRGB();
	var invisible = document.querySelectorAll('.invisible span');
	for (i = 0; i < 5; ++i){ 
		questionColours[i] = invisible[i].style.backgroundColor; // fill questionColours[i] with the rgb instead of hex
	}
	for (i = 0; i < 5; ++i) {
		if (guessColours[i] != questionColours[i]) { // guesColours[i] gets converted to rgb so we want questionsColours[i] as rgb too
			alert("Incorrect colours!"); // for now
			lose = true;
			break;
			// don't know what happens yet - page changes and error code
		}
	}

	if(lose == false){
		alert("Correct!"); // for now
	}
	// they succeeded if this happens! 
	++lvlsPassed;
	transition();
}
