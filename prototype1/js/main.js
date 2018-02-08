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

    var game = new Phaser.Game( 800, 600, Phaser.AUTO, 'game', { preload: preload, create: create, update: update } );

    function preload() {
        // Load an image and call it 'logo'.
        game.load.image( 'logo', 'assets/phaser.png' );
        game.load.image('banana', 'assets/banana.png');
    }

    var bouncy;
    var banana1;
    var banana2;
    var scoreText;
    var score = 0;

    function create() {
        // Create a sprite at the center of the screen using the 'logo' image.
        bouncy = game.add.sprite( game.world.centerX, game.world.centerY, 'logo' );
        banana1 = game.add.sprite(0, 0, 'banana');
        banana2 = game.add.sprite(750, 0, 'banana');
        // Anchor the sprite at its center, as opposed to its top-left corner.
        // so it will be truly centered.
        bouncy.anchor.setTo( 0.5, 0.5 );

        // Turn on the arcade physics engine for this sprite.
        game.physics.startSystem(Phaser.Physics.ARCADE);
        game.physics.arcade.enable([banana1, banana2, bouncy]);
        game.stage.backgroundColor = '#2d2d2d';
        banana1.body.velocity.setTo(200, 200);
        banana1.body.bounce.set(1);

        banana2.body.velocity.setTo(-200, 200);
        banana2.body.bounce.set(1);
        // Make it bounce off of the world bounds.
        bouncy.body.collideWorldBounds = true;
        banana1.body.collideWorldBounds = true;
        banana2.body.collideWorldBounds = true;

        bouncy.body.onCollide = new Phaser.Signal();
        bouncy.body.onCollide.add(hitSprite, this);
        // Add some text using a CSS style.
        // Center it in X, and position its top 15 pixels from the top of the world.
        var style = { font: "25px Verdana", fill: "#9999ff", align: "center" };
        var text = game.add.text( game.world.centerX, 15, "NO I DO NOT WANT A BANANA.", style );
        scoreText = game.add.text(10,10,scoreString + score, style);
        text.anchor.setTo( 0.5, 0.0 );
    }
    function hitSprite(sprite1, sprite2) {
        score = score - 1;
    }

    function update() {
        // Accelerate the 'logo' sprite towards the cursor,
        // accelerating at 500 pixels/second and moving no faster than 500 pixels/second
        // in X or Y.
        // This function returns the rotation angle that makes it visually match its
        // new trajectory.
        bouncy.rotation = game.physics.arcade.accelerateToPointer( bouncy, game.input.activePointer, 500, 500, 500 );
    }
};
