"use strict";

GameStates.makeGame = function( game, shared ) {
    // Create your own variables.
    var bouncy = null;
    var background = null;
    var you = null;
    var dragon;
    var goons;
    var bullets;
    var fireballs;
    var ammo = 1;
    var mouseTouchDown = false;
    var dragonLives = 1;
    var style;
    var text;
    var endText;
    var emitter;
   
    function quitGame() {
        game.state.start('MainMenu');
    }
	function touchDown() {
		// Set touchDown to true, so we only trigger this once
		mouseTouchDown = true;
		if(ammo > 0){
			ammo -= 1;
			fireBullet();
		}
		if(ammo == 0) {
			game.time.events.add(5000, reload, this);
		}
	}
	
	function reload(){
		ammo = 1;
	}
	
	function touchUp() {
		// Set touchDown to false, so we can trigger touchDown on the next click
		mouseTouchDown = false;
	}
	function dragonBullet() {
		var bullet = bullet = bullets.getFirstDead();
		var amount, start, step, i, angle, speed;
		amount = 64;
		start = Math.PI * -1;
		step = Math.PI / amount * 2;
		i = amount;
		while (i > 0) {
		    bullet = bullets.getFirstDead();
		    if (bullet) {
		        bullet.reset(dragon.x,dragon.y);
		        var angle = start + i * step;
		        speed = 200;
		        bullet.body.velocity.x = Math.cos(angle) * speed;
		        bullet.body.velocity.y = Math.sin(angle) * speed;
		    }
		    i--;
		}
	}
	function fireBullet() {
		var bullet = bullets.getFirstExists(false);
		bullet.angle = 270;
		if (bullet) {
			bullet.reset(you.x, you.y - 20);
			// Give it a velocity of -500 so it starts shooting
			bullet.body.velocity.y = -500;
		}
	}
		
	function resetBullet (bullet) {
	
	    //  Called if the bullet goes out of the screen
	    bullet.kill();
	}
	
	function dragonHit(dragon, bullet)
	{
		bullet.kill();
		dragonLives -= 1;
		dragon.tint = 0xff0000;
		if(dragonLives == 0){
			dragon.kill();
			fireballs.callAll('kill');
			 style = { font: "48px Verdana", fill: "#9999ff", align: "center" };
	    	 endText = game.add.text( game.world.centerX-100, game.world.centerY, "YOU WIN!", style );             
	
	        //the "click to restart" handler
	        game.input.onTap.addOnce(restart,this);
		}
	}
	function playerHit()
	{
		you.kill();
        emitter.kill();
        
        style = { font: "48px Verdana", fill: "#9999ff", align: "center" };
   	 	endText = game.add.text( game.world.centerX-100, game.world.centerY, "YOU LOSE!", style );      

        //the "click to restart" handler
        game.input.onTap.addOnce(restart,this);
	}
	
	function restart () {

		dragonLives = 1;
		ammo = 5;
		goons = 10;
	    game.state.start('Game');
	}
	
    return {
    
        create: function () {
        	
        	game.physics.startSystem(Phaser.Physics.ARCADE);
            // Background image
        	background = game.add.sprite(0, 0, 'background');
            background.scale.setTo(1.25,1.5);
            
            // Create a sprite that represents your character
            you = game.add.sprite(game.world.centerX, game.world.centerY, 'you');
            you.anchor.setTo(0.5, 0.5);
            you.scale.setTo(0.5,0.5);
            game.physics.enable( you, Phaser.Physics.ARCADE );
            you.body.setSize(50,50,81,81);
            you.body.collideWorldBounds = true;
            
            dragon = game.add.sprite(game.world.centerX, 0,'dragon');
            dragon.animations.add('fly');

            dragon.animations.play('fly', 10, true);
            dragon.anchor.setTo(0.5, 0.5);
            dragon.scale.setTo(0.5,0.5);
            game.physics.enable(dragon, Phaser.Physics.ARCADE );
            dragon.body.collideWorldBounds = true;

            bullets = game.add.group();
            bullets.enableBody = true;
            bullets.physicsBodyType = Phaser.Physics.ARCADE;
            bullets.createMultiple(30, 'bullet');
            bullets.callAll('events.onOutOfBounds.add', 'events.onOutOfBounds', resetBullet);
        	// Same as above, set the anchor of every sprite to 0.5, 1.0
        	bullets.callAll('anchor.setTo', 'anchor', 0.5, 1.0);
         
        	// This will set 'checkWorldBounds' to true on all sprites in the group
        	bullets.setAll('checkWorldBounds', true);
        	
	    	fireballs = game.add.group();
	    	fireballs.enableBody = true;
	    	fireballs.physicsBodyType = Phaser.Physics.ARCADE;
	    	fireballs.createMultiple(500, 'bullet');
	    	fireballs.callAll('events.onOutOfBounds.add', 'events.onOutOfBounds', resetBullet);
         	// Same as above, set the anchor of every sprite to 0.5, 1.0
	    	fireballs.callAll('anchor.setTo', 'anchor', 0.5, 1.0);
          
         	// This will set 'checkWorldBounds' to true on all sprites in the group
	    	fireballs.setAll('checkWorldBounds', true);
            
	    	
    	    style = { font: "25px Verdana", fill: "#9999ff", align: "center" };
    	    text = game.add.text( game.world.centerX, 500, "Ammo: " + ammo, style );             
            text.anchor.setTo( 0.5, 0.0 );
            
            emitter = game.add.emitter(dragon.x, dragon.y + 50, 100);
            emitter.bounce.setTo(0.5, 0.5);
            emitter.makeParticles('fireball', 0, 100, true, false);
            emitter.start(false, 5000, 20);

        },
        
        update: function () {
        	 if (game.input.keyboard.isDown(Phaser.Keyboard.A))
        	    {
        	        you.x -= 4;
        	    }
        	    else if (game.input.keyboard.isDown(Phaser.Keyboard.D))
        	    {
        	        you.x += 4;
        	    }

        	    if (game.input.keyboard.isDown(Phaser.Keyboard.W))
        	    {
        	        you.y -= 4;
        	    }
        	    else if (game.input.keyboard.isDown(Phaser.Keyboard.S))
        	    {
        	        you.y += 4;
        	    }
        	    if (game.input.activePointer.isDown) {
        			// We'll manually keep track if the pointer wasn't already down
        			if (!mouseTouchDown) {
        				if(ammo != 0)
        				{
        					touchDown();
        				}
        			}
        		}
        	    else {
        			if (mouseTouchDown) {

        				touchUp();
        			}
        		}
        	    text.setText("Ammo: " + ammo);
        		dragon.tint = 0xffffff;
        	    game.physics.arcade.overlap(bullets, dragon, dragonHit, null, this);
                game.physics.arcade.collide(emitter, you, playerHit, null, this);
        	    
        }
    };
};
