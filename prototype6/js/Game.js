"use strict";

GameStates.makeGame = function( game, shared ) {
    // Create your own variables.
    var bouncy = null;
    var background = null;
    var you = null;
    var bullets;
    var mouseTouchDown = false;
   
    function quitGame() {

        //  Here you should destroy anything you no longer need.
        //  Stop music, delete sprites, purge caches, free resources, all that good stuff.

        //  Then let's go back to the main menu.
        game.state.start('MainMenu');

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
            
            // Anchor the sprite at its center, as opposed to its top-left corner.
            // so it will be truly centered.
            
            // Turn on the arcade physics engine for this sprite.
            game.physics.enable( you, Phaser.Physics.ARCADE );
            // Make it bounce off of the world bounds.
            you.body.collideWorldBounds = true;
            
            bullets = game.add.group();
            bullets.enableBody = true;
            bullets.physicsBodyType = Phaser.Physics.ARCADE;
            bullets.createMultiple(30, 'bullet');
            bullets.callAll('events.onOutOfBounds.add', 'events.onOutOfBounds', resetLaser);
        	// Same as above, set the anchor of every sprite to 0.5, 1.0
        	bullets.callAll('anchor.setTo', 'anchor', 0.5, 1.0);
         
        	// This will set 'checkWorldBounds' to true on all sprites in the group
        	bullets.setAll('checkWorldBounds', true);
            
            // Add some text using a CSS style.
            // Center it in X, and position its top 15 pixels from the top of the world.
            var style = { font: "25px Verdana", fill: "#9999ff", align: "center" };
            var text = game.add.text( game.world.centerX, 15, "Build something amazing.", style );
            text.anchor.setTo( 0.5, 0.0 );
            
            // When you click on the sprite, you go back to the MainMenu.
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
        				touchDown();
        			}
        		} else {
        			if (mouseTouchDown) {
        				touchUp();
        			}
        		}
        }
        
        function touchDown() {
        	// Set touchDown to true, so we only trigger this once
        	mouseTouchDown = true;
        	fireBullet();
        }
         
        function touchUp() {
        	// Set touchDown to false, so we can trigger touchDown on the next click
        	mouseTouchDown = false;
        }
        
        function fireBullet() {
        	var bullet = bullets.getFirstExists(false);
        	if (bullet) {
        		bullet.reset(you.x, you.y - 20);
        		// Give it a velocity of -500 so it starts shooting
        		laser.body.velocity.y = -500;
        	
        }
        	
        function resetBullet (bullet) {

            //  Called if the bullet goes out of the screen
            bullet.kill();

        }
        }
};
