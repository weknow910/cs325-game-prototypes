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
        game.load.image( 'stargazer', 'assets/Hat_man1.png');
        game.load.image('sky', 'assets/nightSky.png');
        game.load.image( 'cloud', 'assets/cloud.png');
        game.load.image( 'star', 'assets/star2.png');
        game.load.image('tile','assets/simples_pimples.png');
    }

    var stargazer;
    var star;
    var ray;
    var tileHits = [];
    var map;
    var layer1;

    function create() {
        map = game.add.sprite('sky');
        //map.addTilesetImage('tiles128','tiles');

        stargazer = game.add.sprite(game.world.centerX-60, game.world.height-80, 'stargazer');
        star = game.add.sprite(30, game.world.centerY, 'star');
        game.physics.arcade.enable(star);
        star.scale.x = 2;
        star.scale.y = 2;
        star.anchor.setTo(0.5,0.5);
        star.body.collideWorldBounds = true;

        this.game.input.keyboard.addKeyCapture([
           Phaser.Keyboard.LEFT,
           Phaser.Keyboard.RIGHT,
           Phaser.Keyboard.UP,
           Phaser.Keyboard.DOWN
       ]);

        var NUMBER_OF_WALLS = 4;
        this.walls = this.game.add.group();
        var i, x, y;
        for(i = 0; i < NUMBER_OF_WALLS; i++) {
            x = i * this.game.width/NUMBER_OF_WALLS + 50;
            y = this.game.rnd.integerInRange(50, this.game.height - 200);
            this.game.add.image(x, y, 'cloud', 0, this.walls).scale.setTo(0.3, 0.3);
        }
    }
    
    function update() {
        // Define a line that connects the person to the ball
        // This isn't drawn on screen. This is just mathematical representation
        // of a line to make our calculations easier. Unless you want to do a lot
        // of math, make sure you choose an engine that has things like line intersection
        // tests built in, like Phaser does.
        ray = new Phaser.Line(star.x, star.y, stargazer.x, stargazer.y);

        if (game.input.keyboard.isDown(Phaser.Keyboard.LEFT)) {
          star.x -= 4; // Move left
        }
        if (game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)) {
          star.x += 4; // Move right
        }
        if (game.input.keyboard.isDown(Phaser.Keyboard.UP)) {
          star.y -= 4; // Move up
        }
        if (game.input.keyboard.isDown(Phaser.Keyboard.DOWN)) {
          star.y += 4; // Move down
        }

        else {
            // Stop the player from moving horizontally
            star.body.velocity.x = 0;
            star.body.velocity.y = 0;
        }
    };
};
