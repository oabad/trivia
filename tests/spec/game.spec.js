describe("When starting a trivia game", function() {
  it("define de object game", function() {
    expect(Game).toBeDefined();
  });
  
  it("should check new game conditions", function() {
	expect(newGameValidation("String Name",3)).toBeTruthy();
	expect(newGameValidation("",3)).toBeFalsy();
	expect(newGameValidation("Leo",1)).toBeFalsy();
	expect(newGameValidation("",5)).toBeFalsy();
	expect(newGameValidation("String",5)).toBeFalsy();
  });
  
  it("should add players", function() {
    expect(game.addPlayers("leonardo", "leo@leonardobg.com.br", "3")).toBeTruthy();
  });  
  
  it("should set default avatar when none was set", function() {
	expect(game.avatar("")).toEqual("lib/img/default_avatar.png");
	expect(game.avatar("leo@leonardobg.com.br")).toEqual("http://www.gravatar.com/avatar/d8d23b4d6f59d44b153881c40f3ab6fc?s=160");
  });
});

describe("playing the trivia game", function() {
  it("should get 1 gold for ever right answer", function() {
	expect(game.wasCorrectlyAnswered()).toBeTruthy();
	expect(game.wasCorrectlyAnswered()).toBeTruthy();
	expect(game.wasCorrectlyAnswered()).toBeTruthy();
	expect(game.wasCorrectlyAnswered()).toBeTruthy();
  });
  
  it("should only win when getting 6 gold", function() {
	expect(game.didPlayerWin()).toBeFalsy();
	expect(game.wasCorrectlyAnswered()).toBeTruthy();
	expect(game.wasCorrectlyAnswered()).toBeTruthy();
	expect(game.didPlayerWin()).toBeTruthy();
  });
  
  it("should change the question category based on the player place", function() {
	expect(game.currentPlace(0)).toBeTruthy();
	expect(game.currentCategory()).toEqual("Pop");
	expect(game.currentPlace(1)).toBeTruthy();
	expect(game.currentCategory()).toEqual("Science");
	expect(game.currentPlace(1)).toBeTruthy();
	expect(game.currentCategory()).toEqual("Sports");
	expect(game.currentPlace(1)).toBeTruthy();
	expect(game.currentCategory()).toEqual("Rock");
	expect(game.currentPlace(1)).toBeTruthy();
	expect(game.currentCategory()).toEqual("Pop");
	expect(game.currentPlace(1)).toBeTruthy();
	expect(game.currentCategory()).toEqual("Science");
	expect(game.currentPlace(5)).toBeTruthy();
	expect(game.currentCategory()).toEqual("Sports");
	expect(game.currentPlace(1)).toBeTruthy();
	expect(game.currentCategory()).toEqual("Rock");
	expect(game.currentPlace(10)).toBeTruthy();
	expect(game.currentCategory()).toEqual("Science");
  });
  
  it("should put player on penalty box if the answer is wrong", function() {
	expect(game.setNextPlayer()).toBeTruthy();
	expect(game.wrongAnswer()).toBeTruthy();
  });
  
  it("should not leave the penalty box if he roll is even", function() {
	expect(game.checkPenaltyBox(2)).toBeFalsy();
  });
  
  it("should leave the penalty box if he roll is odd", function() {
	expect(game.checkPenaltyBox(3)).toBeTruthy();
  });  
});