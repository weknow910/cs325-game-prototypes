 "use strict";

 GameStates.makeGame = function( game, shared ) {
     var bouncy = null;
     var background = null;
     var you = null;
     var playerRoom = 1;
     
     var securityA;
     var securityAState = 2;
     var securityB;
     var securityBState = 3;
     
     var table1, table2, table3, table4;
     var t1state = -1;
     var t2state = -1;
     var t3state = -1;
     var t4state = -1;  
     var safe;
     var safeSwitch = 1;
     var crackSafe = 0;
     
     var securityTimer;
     var timer;
     var safeTimer;
     
     var style;
     var text;
     var endText
     var score = 0;

     function quitGame() {
         game.state.start('MainMenu');
     }

 	function restart () {

 	    playerRoom = 1;
 	    securityAState = 2;
 	    securityBState = 3;
 	    crackSafe = 0;
 	    safeSwitch = 1;
 	    score = 0;
 	    t1state = -1;
 	    t2state = -1;
 	    t3state = -1;
 	    t4state = -1; 
 	    game.paused = false;
 	    game.state.start('Game');
 	}
 	
 	function endGame() {
 		
 		style = { font: "48px Verdana", fill: "#9999ff", align: "center" };
   	 	endText = game.add.text( game.world.centerX-200, 500, "Final Score: " + score, style );
        game.input.onTap.addOnce(restart,this);
   	 	game.paused = true;
 	}
 	
 	function safeProgress() {
 		safeSwitch = 1;
 	}
 	
 	function rgbToHex(r, g,  {	return r << 16 | g << 8 | b;}
 	
 	function seatCustomer(){
// 		var x = Math.floor(Math.random() * 4) + 1;
// 		if(x == 1 && this.t1State == -1){
// 			t1state += 1;
// 			table1.tint = rgbToHex(255,255,17);
// 		}
// 		else if(x==1){
// 			t1state += 1;
// 			table1.tint = rgbToHex(255,255-(t1state*50),17)
// 		}
// 		
// 		if(x == 2 && this.t2State == -1){
// 			t2state += 1;
// 			table2.tint = rgbToHex(255,255,17);
// 		}
// 		else if(x == 2){
// 			t2state += 1;
// 			table2.tint = rgbToHex(255,255-(t2state*50),17)
// 		}
// 		
// 		if(x == 3 && this.t3State == -1){
// 			t3state += 1;
// 			table3.tint = rgbToHex(255,255,17);
// 		}
// 		else if(x==3){
// 			t3state += 1;
// 			table3.tint = rgbToHex(255,255-(t3state*50),17)
// 		}
// 		
// 		if(x == 4 && this.t4State == -1){
// 			t4state += 1;
// 			table4.tint = rgbToHex(255,255,17);
// 		}
// 		else if(x==4){
// 			t4state += 1;
// 			table4.tint = rgbToHex(255,255-(t4state*50),17)
// 		}
// 		
// 		if(t1state > 5 || t2state > 5 || t3state > 5 || t4state > 5)
//		{
// 			endGame();
//		}
 	}
 	function moveSecurity() {
 		securityAState = Math.floor(Math.random() * 4) + 1;
 		securityBState = Math.floor(Math.random() * 4) + 1;

 		if(securityAState == 1)
 		{
 			securityA.x = 200;
 			securityA.y = 60;
 		}
 		else if(securityAState == 2)
 		{
 			securityA.x = 700;
 			securityA.y = 60;
 		}
 		else if(securityAState == 3)
 		{
 			securityA.x = 200;
 			securityA.y = 310;
 		}
 		else if(securityAState == 4)
 		{
 			securityA.x = 700;
 			securityA.y = 310;
 		}
 		
 		if(securityBState == 1)
 		{
 			securityB.x = 200;
 			securityB.y = 60;
 		}
 		else if(securityBState == 2)
 		{
 			securityB.x = 700;
 			securityB.y = 60;
 		}
 		else if(securityBState == 3)
 		{
 			securityB.x = 200;
 			securityB.y = 310;
 		}
 		else if(securityBState == 4)
 		{
 			securityB.x = 700;
 			securityB.y = 310;
 		}
 	}

     return {

         create: function () {

        	t1state = -1;
        	t2state = -1;
        	t3state = -1;
        	t4state = -1;
         	game.physics.startSystem(Phaser.Physics.ARCADE);
             // Background image
         	background = game.add.sprite(0, 0, 'background');
            background.scale.setTo(.43,0.55);

            you = game.add.sprite(100, 50, 'you');
            you.anchor.setTo(0.5, 0.5);
            you.scale.setTo(0.3,0.3);
            
            safe = game.add.sprite(270,150,'safe');
            safe.scale.setTo(0.2,0.2);
            
            table1 = game.add.sprite(100,200, 'table');
            table1.anchor.setTo(0.5, 0.5);
            table1.scale.setTo(0.5,0.5);
            
            table2 = game.add.sprite(100,400, 'table');
            table2.anchor.setTo(0.5, 0.5);
            table2.scale.setTo(0.5,0.5);
            
            table3 = game.add.sprite(500,200, 'table');
            table3.anchor.setTo(0.5, 0.5);
            table3.scale.setTo(0.5,0.5);
            
            table4 = game.add.sprite(500,400, 'table');
            table4.anchor.setTo(0.5, 0.5);
            table4.scale.setTo(0.5,0.5);
            
            securityA = game.add.sprite(700,60,'security');
            securityA.anchor.setTo(0.5,0.5);
            securityA.scale.setTo(0.4,0.4);
            
            securityB = game.add.sprite(200,310,'security');
            securityB.anchor.setTo(0.5,0.5);
            securityB.scale.setTo(0.4,0.4);

            securityTimer = game.time.create(false);
            securityTimer.loop(5000, moveSecurity, this);
            securityTimer.start();
            
            timer = game.time.create(false);
            timer.loop(60000, endGame ,this);
            timer.start();
            
            style = { font: "25px Verdana", fill: "#9999ff", align: "center" };
           
         },

         update: function () {
         	 if (game.input.keyboard.isDown(Phaser.Keyboard.ONE))
         	    {
         		 	you.x = 100;
         		 	you.y = 50;
         	    }
         	    else if (game.input.keyboard.isDown(Phaser.Keyboard.TWO))
         	    {
         	        you.x = 600;
         	        you.y = 50;
         	    }
 
         	    if (game.input.keyboard.isDown(Phaser.Keyboard.THREE))
         	    {231
         	    	you.x = 100;
         	    	you.y = 300;
         	    }
         	    else if (game.input.keyboard.isDown(Phaser.Keyboard.FOUR))
         	    {
         	    	you.x = 600;
         	    	you.y = 300;
         	    }
         	    if(game.input.keyboard.isDown(Phaser.Keyboard.R) && (playerRoom == 1))
     	    	{
         	    	if(safeSwitch > 0 && crackSafe < 100){
         				safeSwitch = 0;
         				crackSafe += 1;
         			}
         			if(crackSafe == 100 && safeSwitch > 0){
         				safeSwitch = 0;
         				score += 250;
         			}
         			if(safeSwitch == 0) {
         				game.time.events.add(1000, safeProgress, this);
         			}
     	    	}
         	    if(game.input.keyboard.isDown(Phaser.Keyboard.R) && ((playerRoom == securityAState) || (playerRoom == securityBState)))
         	    	endGame();
         	    
         	    game.time.events.add(4000, seatCustomer, this);
         	    game.debug.text('Time until restaurant closes: ' + timer.duration.toFixed(0)/1000, 0, 500);
         	    game.debug.text('Money: ' + score, 0, 520);
         	    game.debug.text('Safe progress: ' + crackSafe + "/100", 0, 540);

         }
     };
 };
