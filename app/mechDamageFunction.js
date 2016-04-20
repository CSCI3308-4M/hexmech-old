/Function for damage once a mech has been hit, needs to be passed in which player
//has been danaged, which side, and how much damage

module.exports = {
//is this the correct usage of module.exports


function armHit(var playerHit, var side, var damage){
	var remainingDamage = 0;

	if (playerHit == 'player1'){
		if (side == 'left'){
                player1.leftArm -= damage;
                //Im going to let it fall through if arm == 0 because that means it hit a limb that is already dead
                if (player1.leftArm < 0){
                //Having a fail case if arm = 0 means that no torso damage can be taken by a destoryed arm
                        remainingDamage += player1.leftArm;
                        player1.leftArm = 0; 
                        torsoHit('player1', 'left', damage);
                }
                else (return);
          }
          // if side is right arm then subtract damage
          if (side == 'right'){
                player1.rightArm -= damage;
                //if the arm is dead then add any leftover damage and call torso hit with right side and remaining damage
                if (player1.rightArm < 0){
                		remainingDamage += player1.rightArm;
                		player1.rightArm = 0; 
                        torsoHit('player1', 'right', damage);
                        
                }
                else (return);
     	  }	
    }
}

function torsoHit(var playerHit, var side, var damage){
	var remainingDamage = 0;
    //This will cover cascading damage from torso that should end at the center torso
	if (playerHit == 'player1'){
		if (side == 'center'){
			player1.torso -= damage;
			if (player1.torso <= 0){
				player1.destroyed == true;
				//need game over function call here with winner as player 2
			}
		}
		else if (side == 'left'){
                player1.leftTorso -= damage;
                if (leftTorso < 0){
                        remainingDamage += player1.leftArm;
                        player1.leftTorso = 0; 
                        torsoHit('player1', 'center', remainingDamage);
                }
                else (return);
        }
        else if (side == 'right'){
                player1.rightTorso -= damage;
                if (player1.rightTorso < 0){
                		remainingDamage += player1.rightTorso;
                		player1.rightTorso = 0; 
                        torsoHit('player1', 'center', remainingDamage);
                        
                }
                else (return);
     	  }


     	  //doing the same thing but for player 2;
    if( playerHit == 'player2'){
    	if (side == 'center'){
			player2.torso -= damage;
			if (player2.torso <= 0){
				player2.destroyed == true;
				//need game over function call here with winner as player 2
			}
		}
     	else if (side == 'left'){
                player2.leftTorso -= damage;
                if (leftTorso < 0){
                        remainingDamage += player2.leftArm;
                        player2.leftTorso = 0; 
                        torsoHit('player2', 'center', remainingdamage);
                }
                else (return);
        }
        else if (side == 'right'){
                player2.rightTorso -= damage;
                if (player2.rightTorso < 0){
                		remainingDamage += player1.rightTorso;
                		player2.rightTorso = 0; 
                        torsoHit('player2', 'center', remainingdamage);
                        
                }
                else (return);
     	  }		
    }

}

function legHit(var playerHit, var side, var damage){
	var remainingDamage = 0;

	if (playerHit == 'player1'){
		if (side == 'left'){
                player1.leftLeg -= damage;
                if (player1.leftLeg < 0){
                //Having a fail case if arm = 0 means that no torso damage can be taken by a destoryed arm
                        remainingDamage += player1.leftLeg;
                        player1.leftLeg = 0; 
                        torsoHit('player1', 'left', damage);
                }
                else (return);
         }
         if (side == 'right'){
                player1.rightLeg -= damage;
                if (player1.rightLeg < 0){
                		remainingDamage += player1.rightLeg;
                		player1.rightLeg = 0; 
                        torsoHit('player1', 'right', damage);
                        
                }
                else (return);
     	  }	
    }
}

function headHit(playerHit, var damage){
	if (playerHit == 'player1'){
		player1.head -=damage;
		if (player1.head <= 0){
			player1.destroyed = true;
			//need to call function to end game
		}
		
	}
	if (playerHit == 'player2'){
		player2.head -=damage;
		if (player2.head <= 0){
			player2.destroyed = true;
			//need to call function to end game here
		}
		
	}
}

};

