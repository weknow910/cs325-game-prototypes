"use strict";

GameStates.makeMainMenu = function( game, shared ) {
	var playButton = null;
	var background = null;
    
    function startGame(pointer) {

        //	Ok, the Play Button has been clicked or touched, so let's stop the music (otherwise it'll carry on playing)
        //	And start the actual game
        game.state.start('Game');
        
    }
    
    return {
    
        create: function () {
    
            //	We've already preloaded our assets, so let's kick right into the Main Menu itself.
            //	Here all we're doing is playing some music and adding a picture and button
            //	Naturally I expect you to do something significantly better :)
            background = game.add.sprite(0, 0, 'titlePage');
            background.scale.setTo(1.25,1.5);
    
        },
    
        update: function () {
    
            //	Do some nice funky main menu effect here
        	game.state.start('Game');
        }
        
    };
};
