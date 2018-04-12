"use strict";

GameStates.makeGame = function( game, shared ) {
    var bouncy = null;
    var background = null;
    var you = null;
    var dragon;
    var goons;
    var goonCount = 3;
    var bullets;
    var fireballs;
    var ammo = 1;
    var mouseTouchDown = false;
    var dragonLives = 5;
    var style;
    var text;
    var endText;
    var emitter;
    var key;
   
    function quitGame() {
        game.state.start('MainMenu');
    }
	function touchDown() {
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
		mouseTouchDown = false;
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
			you.kill();
			emitter.kill();
			fireballs.callAll('kill');
			 style = { font: "48px Verdana", fill: "#9999ff", align: "center" };
	    	 endText = game.add.text( game.world.centerX-100, game.world.centerY, "YOU WIN!", style );             
	    	 game.input.onTap.addOnce(restart,this);
		}
	}
	function playerHit()
	{
		you.kill();
        emitter.kill();
        
        style = { font: "48px Verdana", fill: "#9999ff", align: "center" };
   	 	endText = game.add.text( game.world.centerX-100, game.world.centerY, "YOU LOSE!", style );      

        game.input.onTap.addOnce(restart,this);
	}
	
	function restart () {

		dragonLives = 5;
		ammo = 1;
		goonCount = 3;
	    game.state.start('Game');
	}
	
	function makeGoon(){
		var goon = goons.getFirstExists(false);
		if (goon) {
			goon.reset(you.x, you.y - 50);
			// Give it a velocity of -500 so it starts shooting
		}
	}
	
	function goonHit(goon, bullet){
		goon.kill();
		bullet.kill();
	}
	
    return {
    
        create: function () {
        	
        	game.physics.startSystem(Phaser.Physics.ARCADE);
            // Background image
        	background = game.add.sprite(0, 0, 'background');
            background.scale.setTo(1.25,1.5);
            
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
        	bullets.callAll('anchor.setTo', 'anchor', 0.5, 1.0);
        	bullets.setAll('checkWorldBounds', true);
        	
	    	fireballs = game.add.group();
	    	fireballs.enableBody = true;
	    	fireballs.physicsBodyType = Phaser.Physics.ARCADE;
	    	fireballs.createMultiple(500, 'bullet');
	    	fireballs.callAll('events.onOutOfBounds.add', 'events.onOutOfBounds', resetBullet);
	    	fireballs.callAll('anchor.setTo', 'anchor', 0.5, 1.0);
	    	fireballs.setAll('checkWorldBounds', true);
	    	
	    	goons = game.add.group();
	    	goons.enableBody = true;
	    	goons.physicsBodyType = Phaser.Physics.ARCADE;
	    	goons.createMultiple(3, 'goon');
	    	goons.callAll('anchor.setTo', 'anchor', 0.5, 1.0);
	    	goons.callAll('scale.setTo', 'scale', 0.25, 0.25);
	    	goons.callAll('events.onOutOfBounds.add', 'events.onOutOfBounds', resetBullet);
            
    	    style = { font: "25px Verdana", fill: "#9999ff", align: "center" };
    	    text = game.add.text( game.world.centerX, 500, "Ammo: " + ammo, style );             
            text.anchor.setTo( 0.5, 0.0 );
            
            emitter = game.add.emitter(dragon.x, dragon.y + 50, 100);
            //emitter.bounce.setTo(0.5, 0.5);
            emitter.minParticleSpeed.setTo(-200, -300);
            emitter.maxParticleSpeed.setTo(200, 300);
            emitter.makeParticles('fireball', 0, 100, true, false);
            emitter.start(false, 5000, 20);

            key = game.input.keyboard.addKey(Phaser.Keyboard.E);
            key.onDown.add(makeGoon, this);
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
                game.physics.arcade.collide(emitter, goons, goonHit, null, this);
        	    
        }
    };
};
