newGameValidation = function(name,howManyPlayers) {
 if (name == "" || howManyPlayers == "" || howManyPlayers < 2 || howManyPlayers > 4 ) {
      
      if(name == ""){
        $('#name').closest('div').addClass('has-error');
        $('#name-required').removeClass('hide');
      } else {
        $('#name').closest('div').removeClass('has-error');
        $('#name-required').addClass('hide');
      };
 
      if(howManyPlayers == ""){ 
        $('#nrOponents').closest('div').addClass('has-error');
        $('#qty-required').removeClass('hide');
      }else if ( howManyPlayers < 2 || howManyPlayers > 4) {
        $('#nrOponents').closest('div').addClass('has-error');
        $('#qty-required').addClass('hide');
        $('#qty-error').removeClass('hide');
    }else {
        $('#qty-required').addClass('hide');
        $('#qty-error').addClass('hide');
        $('#nrOponents').closest('div').removeClass('has-error');
    }
      return false;
    }
    return true;
};

$('#email').change(function(){
  var img = function(){ 
    return game.avatar($('#email').val());
  };
  $('.avatar img').attr('src',img);
});

cleanLayout = function() {
    $('#newGame').addClass('hide');
    $('#game').removeClass('hide');
    $('#game').addClass('show');
    $('#splashTitle').addClass('hide');
};

prepareLayout = function(players, playersAvatars) {  
  
  for (var i = 0; i < players.length; i++) {
    $('#players').append('<center">');
    $('#players').append('<div class="playerAvatar">' +
      '<img src="'+playersAvatars[i]+'">' +
      '<div class="playerName">' + players[i] +' </div>' +
      '</div>');
    $('#players').append('</center">');
  };
  
}

consoleGameStart = function (firstPlayer) {
  $('#gameConsole').append(' <p class="item">' +
    'Let the game begin!' + '<br />' +
    'Shall we start with you ' + firstPlayer + '?</p>').delay(2000);
}

consoleQuestion = function(playerName,question){
  $('#gameConsole').append(' <p class="item">' +
    playerName + ' ... True or False? ' + question);
}

consolePenalty = function(playerName){
  $('#gameConsole').append(' <p class="item penalty">' +
    'oh lord.. ' + playerName + ' was sent to the penalty box because of a wrong answer!');
}

consoleGeneric = function(text) {
 $('#gameConsole').append(' <p class="item">' + text + '</p>'); 
}
