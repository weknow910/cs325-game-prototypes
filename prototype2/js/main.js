"use strict";

window.onload = function() {
    // You can copy-and-paste the code from any of the examples at http://examples.phaser.io here.
    // You will need to change the fourth parameter to "new Phaser.Game()" from
    // 'phaser-example' to 'game', which is the id of the HTML element where we
    // want the game to go.
    // The assets (and code) can be found at: https://github.com/photonstorm/phaser/tree/master/examples/assets
    // You will need to change the paths you pass to "game.load.image()" or any other
    // loading functions to reflect where you are putting the assets.
    // All loading functions will typically all be found inside "preload()".

    var game = new Phaser.Game( 1000, 500, Phaser.AUTO, 'game', { preload: preload, create: create, update: update } );

    function preload() {
        game.load.spritesheet( 'player', 'assets/Player.png', 32, 32);
        game.load.image( 'spike', 'assets/Spike.png');
    }

    var player;
    var i;
    var spikes;
    function create() {
        // Create a sprite at the center of the screen using the 'logo' image.
        game.stage.backgroundColor = "#87CABC";
        spikes = game.add.group();
        spikes.enableBody = true;
        for(i = 0; i < 1000; i += 32)
        {
          var ground = spikes.create(i, game.world.height - 32, 'spike');
        }
        ground.body.immovable = true;

        player.anchor.setTo( 0.5, 0.5 );

        // The player and its settings
        player = game.add.sprite(32, game.world.height - 150, 'player');

        //  We need to enable physics on the player
        game.physics.arcade.enable(player);

        //  Player physics properties. Give the little guy a slight bounce.
        player.body.bounce.y = 0.2;
        player.body.gravity.y = 300;
        player.body.collideWorldBounds = true;

        //  Our two animations, walking left and right.
        player.animations.add('left', [0, 1, 2, 3], 10, true);
        player.animations.add('right', [5, 6, 7, 8], 10, true);

        // Turn on the arcade physics engine for this sprite.
        game.physics.enable( player, Phaser.Physics.ARCADE );
        // Make it bounce off of the world bounds.
        player.body.collideWorldBounds = true;
    }

    function update() {
        // Accelerate the 'logo' sprite towards the cursor,
        // accelerating at 500 pixels/second and moving no faster than 500 pixels/second
        // in X or Y.
        // This function returns the rotation angle that makes it visually match its
        // new trajectory.
        //bouncy.rotation = game.physics.arcade.accelerateToPointer( bouncy, game.input.activePointer, 500, 500, 500 );
    }
};
