
module.exports = {

//to access in damage class swith to mech.leftArm -= damage etc.
var Mech = function Mech(var rightArm, var leftArm, var rightLeg, var leftLeg, var rightTorso, var leftTorso, var torso, var head, var weapon1, var weapon2){
	//this should create object, set the consturctor and ets up object
	//this.consturctor; Not sure if I need this here?
	this.rightArm = rightArm;
	this.leftArm = leftArm;
	this.rightLeg = rightLeg;
	this.leftLeg = leftLeg;
	this.rightTorso = rightTorso;
	this.leftTorso = leftTorso;
	this.torso = torso;
	this.head = head;
	this.weapon1Damage = weapon1;
	this.weapon2Damage = weapon2;
	//flag to check whcih player has initiative
	this.first = false;
	//flag to check if destroyed
	this.destroyed = false; 
	

}
/*
Mech.prototype = {
	go: function go();
}
*/
};