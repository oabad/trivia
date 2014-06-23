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
  var div = $('#gameConsole');
  var height = div.height();

//Defining Questions
$.each(questions.Sports, function(i) {
          sportsQuestions[i] = new Array();
          sportsQuestions[i].push(questions.Sports[i].Question);
          sportsQuestions[i].push(questions.Sports[i].answer);
          sportsQuestions[i].push(questions.Sports[i].tip);
    });

$.each(questions.Science, function(i) {
          scienceQuestions[i] = new Array();
          scienceQuestions[i].push(questions.Science[i].Question);
          scienceQuestions[i].push(questions.Science[i].answer);
          scienceQuestions[i].push(questions.Science[i].tip);
    });

$.each(questions.Pop, function(i) {
          popQuestions[i] = new Array();
          popQuestions[i].push(questions.Pop[i].Question);
          popQuestions[i].push(questions.Pop[i].answer);
          popQuestions[i].push(questions.Pop[i].tip);
    });

$.each(questions.Rock, function(i) {
          rockQuestions[i] = new Array();
          rockQuestions[i].push(questions.Rock[i].Question);
          rockQuestions[i].push(questions.Rock[i].answer);
          rockQuestions[i].push(questions.Rock[i].tip);
    });

  var names = ["Roberto","Carol","Jessica","Philip","Leonardo","Muller"
  ,"Ronaldo","Neymar","Chet","Pat","Sue","Camilo","Elias","Felipe","Hulk","Lula", "Marky"
  ,"Zinc", "Ozzy", "Donky Kong", "Lola", "Duke", "Carlos"];

  var randomName = function(){
    id = Math.floor(Math.random()*names.length);
    name = names[id];
    return name;
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
    playernro  =Math.floor(Math.random()*nroPlayers);
    return playernro;
  };  

  var currentCategory = function(){
    if(places[currentPlayer] == 0 && places[currentPlayer] == 4 && places[currentPlayer] == 8)
      return 'Pop';
    if(places[currentPlayer] == 1 && places[currentPlayer] == 5 && places[currentPlayer] == 9) 
      return 'Science';
    if(places[currentPlayer] == 2 && places[currentPlayer] == 6 && places[currentPlayer] == 10)
      return 'Sports';
    return 'Rock';
  };
 
  this.isPlayable = function(howManyPlayers){
    return howManyPlayers >= 2;
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
    var howManyPlayers = $("#nrOponents").val();

    if(!newGameValidation(name,howManyPlayers)){
      return ;
    };

    if(!this.isPlayable(parseInt(howManyPlayers) + 1)){
      return ;
    }

    this.addPlayers(name,email,parseInt(howManyPlayers) + 1);
    cleanLayout();
    prepareLayout(players,playersAvatars);
    currentPlayer = this.setFirstPlayer(players.length);
    consoleGameStart(players[currentPlayer]);
    this.run();
  };

  this.run = function() {
    this.roll(Math.floor(Math.random()*6) + 1);
    height += div.height();
    if(inPenaltyBox[currentPlayer]){
          game.setNextPlayer();
          game.run();
       } else {
        askQuestion(function(answer){
          notAWinner = answer;  
          if(notAWinner){            
            game.setNextPlayer();
            game.run();
          }else{
            consoleGeneric('WOW! ' + players[currentPlayer] + ' Won the game!');
          }
        });
       }
  };

  this.howManyPlayers = function(){
    return players.length;
  };

  var askQuestion = function(callback){
     

      if(currentCategory() == 'Pop'){
      random = Math.floor(Math.random()*popQuestions.length);
      currentQuestion = popQuestions[random][0];
      currentAnswer = (popQuestions[random][1] === "true") ? true : false;
      consoleQuestion(players[currentPlayer], currentQuestion);
    }

    if(currentCategory() == 'Science'){
      random = Math.floor(Math.random()*scienceQuestions.length);
      currentQuestion = scienceQuestions[random][0];
      currentAnswer = (scienceQuestions[random][1] === "true") ? true : false;
      consoleQuestion(players[currentPlayer], currentQuestion);
    }

    if(currentCategory() == 'Sports'){
      random = Math.floor(Math.random()*sportsQuestions.length);
      currentQuestion = sportsQuestions[random][0];
      currentAnswer = (sportsQuestions[random][1] === "true") ? true : false; 
      consoleQuestion(players[currentPlayer], currentQuestion);
    }

    if(currentCategory() == 'Rock'){
      random = Math.floor(Math.random()*rockQuestions.length);
      currentQuestion = rockQuestions[random][0];
      currentAnswer = (rockQuestions[random][1] === "true") ? true : false; 
      consoleQuestion(players[currentPlayer], currentQuestion);
    }

    if(currentPlayer != 0){
        setTimeout( function() {
          if(Math.floor(Math.random()*2) == 1){
            answer =  game.wrongAnswer();
            callback.call(this, answer);  
          }else{
            answer = game.wasCorrectlyAnswered();
            callback.call(this, answer);
          }
        }, 3000);  
    } else{
    $("#playerTurn").html(currentQuestion);
    setTimeout( function() {
      $("#playerTurn").dialog({
        resizable: false,
        modal: true,
        closeOnEscape: false,
        title: "Your Turn!",
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
    }, 2000);
  }
};

  this.leavePenality = function(roll){
    if(inPenaltyBox[currentPlayer]){
      if(roll % 2 != 0){
        inPenaltyBox[currentPlayer] = false;
        consoleGeneric(players[currentPlayer] + " is getting out of the penalty box");  
        this.currentPlace(roll);
        consoleGeneric(players[currentPlayer] + "'s new location is " + places[currentPlayer]);
        consoleGeneric("The category is " + currentCategory());
        return true;
      } else{
        consoleGeneric(players[currentPlayer] + " is not getting out of the penalty box");
        div.animate({scrollTop: height}, 500);
        false;
      }
    }
  };

  this.roll = function(roll){
    consoleGeneric(players[currentPlayer] + " is the current player");
    consoleGeneric("They have rolled a " + roll);
    if(inPenaltyBox[currentPlayer]){
      this.leavePenality(roll);
    }else{
    this.currentPlace(roll);
    consoleGeneric(players[currentPlayer] + "'s new location is " + places[currentPlayer]);
    consoleGeneric("The category is " + currentCategory());
    }  
  };

  this.currentPlace = function(roll){
    places[currentPlayer] = places[currentPlayer] + roll;
      if(places[currentPlayer] > 11){
        places[currentPlayer] = places[currentPlayer] - 12;
      }
  };

  this.wasCorrectlyAnswered = function(){
    consoleGeneric("Answer was correct!!!!");
    purses[currentPlayer] += 1;
    consoleGeneric(players[currentPlayer] + " now has <b>" +
                purses[currentPlayer]  + " Gold Coins</b>.");

    var winner = this.didPlayerWin();
    div.animate({scrollTop: height}, 500);

    return winner;
  };

  this.wrongAnswer = function(){
		consolePenalty(players[currentPlayer]);
		inPenaltyBox[currentPlayer] = true;
    div.animate({scrollTop: height}, 500);
    return true;
  };

  this.setNextPlayer = function(){ 
      currentPlayer += 1;
      if(currentPlayer == players.length)
        currentPlayer = 0;
      return true;
  };

  this.didPlayerWin = function(){
    return !(purses[currentPlayer] == 6)
  };
};

var notAWinner = false;
var game = new Game();