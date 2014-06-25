exports = typeof window !== "undefined" && window !== null ? window : global;

exports.Game = function() {

  var players         = new Array();
  var playersAvatars  = new Array();
  var places          = new Array(6);
  var purses          = new Array(6);
  var inPenaltyBox    = new Array(6);

  var popQuestions     = new Array();
  var scienceQuestions = new Array();
  var sportsQuestions  = new Array();
  var rockQuestions    = new Array();

  var currentQuestion = "";
  var currentAnswer   = false;

  var currentPlayer    = 0;
  var isGettingOutOfPenaltyBox = false;

  //Defining Questions
  $.each(questions.Sports, function(i) {
          sportsQuestions[i] = new Array();
          sportsQuestions[i].push(questions.Sports[i].Question);
          sportsQuestions[i].push(questions.Sports[i].answer);
    });

  $.each(questions.Science, function(i) {
          scienceQuestions[i] = new Array();
          scienceQuestions[i].push(questions.Science[i].Question);
          scienceQuestions[i].push(questions.Science[i].answer);
    });

  $.each(questions.Pop, function(i) {
          popQuestions[i] = new Array();
          popQuestions[i].push(questions.Pop[i].Question);
          popQuestions[i].push(questions.Pop[i].answer);
    });

  $.each(questions.Rock, function(i) {
          rockQuestions[i] = new Array();
          rockQuestions[i].push(questions.Rock[i].Question);
          rockQuestions[i].push(questions.Rock[i].answer);
    });

  var names = ["Roberto","Carol","Jessica","Philip","Leonardo","Muller"
  ,"Ronaldo","Neymar","Chet","Pat","Sue","Camilo","Elias","Felipe","Hulk","Lula", "Marky"
  ,"Zinc", "Ozzy", "Donky Kong", "Lola", "Duke", "Carlos"];

  var randomName = function(){
    id = Math.floor(Math.random()*names.length);
    return names[id];
  };

  //Gravatar
  this.avatar = function(email){
    if(email == ""){
      return 'lib/img/default_avatar.png';
    } else {
      return 'http://www.gravatar.com/avatar/' + md5(email) +
     '?s=160';
    }
  };
  
  this.setFirstPlayer = function(nroPlayers){
    playernro = Math.floor(Math.random()*nroPlayers);
    return playernro;
  };  

  this.currentCategory = function(){
    if(places[currentPlayer] == 0 || places[currentPlayer] == 4 || places[currentPlayer] == 8)
      return 'Pop';
    if(places[currentPlayer] == 1 || places[currentPlayer] == 5 || places[currentPlayer] == 9) 
      return 'Science';
    if(places[currentPlayer] == 2 || places[currentPlayer] == 6 || places[currentPlayer] == 10)
      return 'Sports';
    return 'Rock';
  };

  this.addPlayers = function(firstPlayer, firstPlayerAvatar, nroPlayers){
    for (var i = 0; i < nroPlayers; i++) {
      if(i == 0){
      players.push(firstPlayer);
      playersAvatars.push(this.avatar(firstPlayerAvatar));
    } else {
      players.push(randomName());
      playersAvatars.push(this.avatar(""));
    }  
      places[this.howManyPlayers() - 1] = 0;
      purses[this.howManyPlayers() - 1] = 0;
      inPenaltyBox[this.howManyPlayers() - 1] = false;
    };
    return true;
  };
  
  this.setup = function(){
    
    var email = $("#email").val(); 
    var name = $("#name").val();
    var nrOponents = parseInt($("#nrOponents").val());
    var nroPlayers = nrOponents + 1;

    if(!newGameValidation(name,nrOponents)){
      return ;
    };

    this.addPlayers(name,email,nroPlayers);
    cleanLayout();
    prepareLayout(players,playersAvatars);
    currentPlayer = this.setFirstPlayer(players.length);
    consoleGameStart(players[currentPlayer]);
    this.run();
  };

  this.run = function() {
    this.roll();
    

    if(!inPenaltyBox[currentPlayer]){
      askQuestion(function(answer){
        if(!game.didPlayerWin()){
          game.setNextPlayer();
          game.run();
        }   
      });
    } else {
      game.setNextPlayer();
      game.run();
    }
  };

  this.howManyPlayers = function(){
    return players.length;
  };

  this.questionManager = function() {

    if( game.currentCategory() == 'Pop'){
      random = Math.floor(Math.random()*popQuestions.length);
      currentQuestion = popQuestions[random][0];
      currentAnswer = (popQuestions[random][1] === "true") ? true : false;
    }

    if(game.currentCategory() == 'Science'){
      random = Math.floor(Math.random()*scienceQuestions.length);
      currentQuestion = scienceQuestions[random][0];
      currentAnswer = (scienceQuestions[random][1] === "true") ? true : false;
    }

    if(game.currentCategory() == 'Sports'){
      random = Math.floor(Math.random()*sportsQuestions.length);
      currentQuestion = sportsQuestions[random][0];
      currentAnswer = (sportsQuestions[random][1] === "true") ? true : false; 
    }

    if(game.currentCategory() == 'Rock'){
      random = Math.floor(Math.random()*rockQuestions.length);
      currentQuestion = rockQuestions[random][0];
      currentAnswer = (rockQuestions[random][1] === "true") ? true : false; 
    }
  }

  var botAnswer = function(){
    return Math.floor(Math.random()*2);
  }

  var askQuestion = function(callback){
    game.questionManager();
    consoleQuestion(players[currentPlayer],currentQuestion);

    setTimeout( function() {
      if(currentPlayer != 0){
          if(botAnswer() == 1){
            answer =  game.wrongAnswer();
            callback.call(this, answer);  
          }else{
            answer = game.wasCorrectlyAnswered();
            callback.call(this, answer);
          }
    } else{
      game.playerQuestionPopup(callback);
    }
  }, 2500);
};

this.playerQuestionPopup = function(callback){
      $("#playerTurn").html(currentQuestion);
      $("#playerTurn").dialog({
        resizable: false,
        modal: true,
        closeOnEscape: false,
        title: "Your Turn! The Category is " + game.currentCategory(),
        height: 250,
        width: 400,
        buttons: {
            "true": function () {
                $(this).dialog('close');
                if(true === currentAnswer){
                    answer = game.wasCorrectlyAnswered();
                  } else {
                    answer = game.wrongAnswer();
                  }
                   callback.call(this, answer);
                },
            "false": function () {
                $(this).dialog('close');
                if(false === currentAnswer){
                    answer = game.wasCorrectlyAnswered();
                  } else {
                    answer = game.wrongAnswer();
                  }
                  callback.call(this, answer);
                }                
            }    
    });
}

  this.checkPenaltyBox = function(roll){
    if(inPenaltyBox[currentPlayer]){
      if(roll % 2 != 0){
        inPenaltyBox[currentPlayer] = false;
        consoleLeavePenaltyBox(players[currentPlayer]);
        return true;
      } else{
        consoleNotLeavePenaltyBox(players[currentPlayer]);
        div.animate({scrollTop: height}, 500);
        return false;
      }
    }
    return true
  };

  this.roll = function(){
    roll = Math.floor(Math.random()*6) + 1;
    consoleRoll(players[currentPlayer],roll);
    if(game.checkPenaltyBox(roll)){
      this.currentPlace(roll);
      consoleNewLocation(players[currentPlayer], places[currentPlayer], game.currentCategory());
    }
    return roll;
  };

  this.currentPlace = function(roll){
    places[currentPlayer] = places[currentPlayer] + roll;
      if(places[currentPlayer] > 11){
        places[currentPlayer] = places[currentPlayer] - 12;
      }
      return true;
  };

  this.wasCorrectlyAnswered = function(){
    purses[currentPlayer] += 1;
    consoleCorrectAnswer(players[currentPlayer], purses[currentPlayer]);
    return true;
  };

  this.wrongAnswer = function(){
		consolePenalty(players[currentPlayer]);
		inPenaltyBox[currentPlayer] = true;
    return true;
  };

  this.setNextPlayer = function(){ 
      currentPlayer += 1;
      if(currentPlayer == players.length)
        currentPlayer = 0;
      return true;
  };

  this.didPlayerWin = function(){
    if((purses[currentPlayer] == 6)){
      consolePlayerWon(players[currentPlayer]);    
      return true;
    }
    return false;
  };

};

var notAWinner = false;
var game = new Game();