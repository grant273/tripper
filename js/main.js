
const GAME_COUNT = 50;

class WordleGame {
  static gameCount = 0;
  static ALLOWED_GUESSES = GAME_COUNT + 5;

  constructor(answer="grant") {
    this.elem = document.createElement("div");
    this.elem.className = "game";
    this.answer = answer;
    this.guesses = [];
    this.won = undefined;
    this.gameNumber = WordleGame.gameCount;
    WordleGame.gameCount += 1;
    document.getElementById("container").append(this.elem);
    console.log("created game");
    this.render();
  }

  render() {
    this.elem.innerHTML = "";
    let html = this.elem;
    html.id = `game-${this.gameNumber}`;
    for (const [i, guess] of this.guesses.entries()) {
      const rowHtml = document.createElement("div");
      rowHtml.classList.add('row');
      for (const [j, letter] of Array.from(guess).entries()) {
        const input = document.createElement("input");
        input.classList.add("square");
        input.value = letter;
        input.readOnly = true;
        if (this.answer[j] === letter) {
          input.classList.add("green");
        } else if (this.answer.includes(letter)) {
          input.classList.add("yellow");
        }
        rowHtml.append(input);
      }
      html.append(rowHtml);
    }
    for (let i = 0; i < WordleGame.ALLOWED_GUESSES - this.guesses.length; i++) {
      const blankRow = document.createElement("div");
      blankRow.classList.add("row");
      for (let j = 0; j < 5; j++) {
        const input = document.createElement("input");
        input.classList.add("square");
        input.readOnly = true;
        blankRow.append(input);
      }
      html.append(blankRow);
    }

    if (this.won) {
      this.elem.classList.add('won-bg');
    } else if (this.won === false) {
      this.elem.classList.add('lost-bg');
    }
  }

  guess(word) {
    word = word.trim().toLowerCase();
    if (word.length !== this.answer.length) {
      throw Error("Invalid guess length");
    }
    if (this.won) {
      throw Error("No more guessing, you already won");
    }
    if (this.won === false) {
      throw Error("No more guessing, you lost");
    }
    if (word === this.answer) {
      this.won = true;
    }

    this.guesses.push(word);

    if (this.guesses.length === WordleGame.ALLOWED_GUESSES) {
      this.won = false;
    }
    this.render();
  }
}


function test() {
  const game1 = new WordleGame();
  window.game1 = game1;
  game1.render();
  game1.guess("gtxxx");
  console.assert(document.getElementsByClassName("square").length = 5)
  console.assert(document.getElementsByClassName("square")[0].classList.contains("green"))

  console.assert(!document.getElementsByClassName("square")[1].classList.contains("green"))
  console.assert(document.getElementsByClassName("square")[1].classList.contains("yellow"))

  game1.guess("grant");
  console.assert(!document.getElementsByClassName("square")[4].classList.contains("green"))

  const game2 = new WordleGame();
  window.game2 = game2;
  for (let i = 0; i < WordleGame.ALLOWED_GUESSES; i++) {
    game2.guess("gtxxx");
  }
  console.assert(game2.elem.classList.contains("lost-bg"));

  game2.render();
}

if ('ontouchstart' in document.documentElement) {
  document.getElementById("guess-box").setAttribute("disabled", "true");
  document.getElementById("guess-box").setAttribute("readonly", "true");
} else {
  document.querySelector(".keyboard").remove();
}

window.onload = function () {
  test();
  document.getElementById("container").innerHTML = "";


  // set up games
  const games = [];
  window.games = games;

  for (let i = 0; i < GAME_COUNT; i++) {
    const randomWord = WORDLIST[Math.floor(Math.random() * WORDLIST.length)];
    const game = new WordleGame(randomWord);
    console.log(game.answer);
    games.push(game);
  }

  // set up guess box
  const guessBox = document.getElementById("guess-box");
  let lettersLeft = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

  function handleSubmit(event) {
    event.preventDefault();
    const guess = document.getElementById('guess-box').value.trim().toLowerCase();
    console.log(WORDLIST[0])
    if (WORDLIST.includes(guess)) {
      games.forEach((game) => {
        if (game.won === undefined) {
          game.guess(guess);
        }
      });
      document.getElementById('guess-box').value = "";
      for(const letter of guess.toUpperCase()) {
        lettersLeft = lettersLeft.replace(letter, "");
      }
      document.getElementById("letters-left").innerText = "Unused: " + Array.from(lettersLeft).join("");
    }
  }

  function handleKeyInput(e) {
    if (e.target.id === "back-key") {
      document.getElementById('guess-box').value = document.getElementById('guess-box').value.slice(0, -1);
      return
    }
    if (e.target.id === "enter-key") {
      handleSubmit(e);
      return
    }
    if (document.getElementById('guess-box').value.length < 5) {
      document.getElementById('guess-box').value += e.target.innerText;
    }
  }

  document.getElementById("letters-left").innerText = "Unused: " + Array.from(lettersLeft).join("");
  document.getElementById("guess-form").addEventListener("submit", handleSubmit);
  document.querySelectorAll(".keyboard-key").forEach((elem) => elem.addEventListener("click", handleKeyInput));
}
