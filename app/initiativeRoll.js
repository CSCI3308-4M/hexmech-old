//call this function in main to get inititive value for each player
// I have a dice function written but Matt does also so we're going to use his
module.exports = {
function initiativeStep(){

	var player1Roll = 0;
	var player2Roll = 0;
	//what should w ehave for equal rolls?
	player1Roll = getDiceRoll(2); //need to rename off of matt's function
	player2Roll = getDiceRoll(2); //" "
	if (player1Roll > player2Roll){
		player1.first == true;
		return;
	}
	else if (player1Roll < player2Roll){
		player2.first == true;
		return;
	}
	else if (player1Roll == player2Roll){
		initiativeStep();
	}
}

};
