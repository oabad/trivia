var div = $('#gameConsole');
var height = div.height();

newGameValidation = function(name,howmanyoponents) {
 if (name == "" || howmanyoponents == "" || howmanyoponents < 2 || howmanyoponents > 4 ) {
      
      if(name == ""){
        $('#name').closest('div').addClass('has-error');
        $('#name-required').removeClass('hide');
      } else {
        $('#name').closest('div').removeClass('has-error');
        $('#name-required').addClass('hide');
      };
 
      if(howmanyoponents == ""){ 
        $('#nrOponents').closest('div').addClass('has-error');
        $('#qty-required').removeClass('hide');
      }else if ( howmanyoponents < 2 || howmanyoponents > 4) {
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
  height += div.height();
  div.animate({scrollTop: height}, 500);

}

consoleCorrectAnswer = function(player,coins) {
  $('#gameConsole').append(' <p class="item green"> '+
  '<span class="green"><b>' + player +' answer was correct and now have '+ coins + ' coins </b></p>');
  height += div.height();
  div.animate({scrollTop: height}, 500);

}

consoleNewLocation = function(player,place,category) {
  $('#gameConsole').append(' <p class="item">' + player + ' new location is ' +
  place + ' and the category is ' + category + '</p>'); 
}

consoleRoll = function(player, roll) {
  $('#gameConsole').append(' <p class="item">' + player + ' is the current player and have rolled a ' + roll +' </p>'); 
}

consoleLeavePenaltyBox = function(player) {
  $('#gameConsole').append(' <p class="item green ">Orayy! ' + player + ' is getting out of the penalty box! </p>'); 
}

consoleNotLeavePenaltyBox = function(player) {
  $('#gameConsole').append(' <p class="item green ">:( ... ' + player + ' is not getting out of the penalty box! </p>'); 
}

consolePlayerWon = function(player) {
  $('#gameConsole').append(' <p class="item green win"WOWOWOWOW!!!! ' + player + ' won the game!! </p>');
  div.animate({scrollTop: height}, 500);

}


