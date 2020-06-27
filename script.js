$(document).ready(function() {
  var card = $(".card");
  var front = $(".front");
  var back = $(".back");
  var firstCard = 0;
  var secondCard = 0;
  var clickedCards = [];
  var numArr = [];
  var newGameBtn = $(".new-game");
  var cardContainer = $(".cards-container");
  var numberOfCards;
  var score = 100;

  newGameBtn.on("click", function() {
    gameSize();
  });

  function gameSize() {
    cardContainer.html("");
    numArr.length = 0;
    score = 100;
    $(".score").text(`SCORE: ${score}`);
    numberOfCards = prompt("How many cards would you like to play with?");
    if (numberOfCards % 2 == 0) {
      for (var i = 0; i < numberOfCards; i++) {
        var currentVal = Math.floor(i / 2);
        numArr.push(currentVal);
      }
    } else {
      alert("Please pick an even number!");
      return;
    }
    shuffleCards(numArr);
  }

  function shuffleCards() {
    for (var i = numArr.length - 1; i > 0; i--) {
      var cardNum = Math.floor(Math.random() * (i + 1));
      [numArr[i], numArr[cardNum]] = [numArr[cardNum], numArr[i]];
    }
    console.log("HI numArr shuffled: ", numArr);
    buildBoard(numArr);
  }
  function buildBoard() {
    for (var i = 0; i < numArr.length; i++) {
      cardContainer.append(`<div class="card">
                                    <div class="front" data-value='${numArr[i]}'></div>
                                    <div class="back" data-value='${numArr[i]}'><h1 class="cardNum">${numArr[i]}</h1></div></div>`);
    }
    cardCheck();
  }

  console.log("OUTSIDE NUMARR: ", numArr);

  function cardCheck() {
    console.log("INSIDE CARD CHECK", numArr);
    $(".card").on("click", function() {
      if (
        $(this)
          .children(".back")
          .hasClass("show")
      ) {
        // Already clicked on - ignore
      } else {
        //If the card does not have the class SHOW...
        if ($(".show").length < 2) {
          $(this)
            .children(".back")
            .addClass("show");

          //add class show to back of clicked card
          $(this)
            .children(".front")
            .addClass("hide");
          //add class hide to front of clicked card

          if ($(".show").length == 2) {
            var firstCard = $(".show")
              .first()
              .attr("data-value");

            console.log("FIRST CARD", firstCard);
            var secondCard = $(".show")
              .last()
              .attr("data-value");

            console.log("SECOND CARD", secondCard);

            if (firstCard == secondCard) {
              alert("YOU FOUND A MATCH");
              score += 10;
              $(".score").text(`SCORE: ${score}`);

              $(".show")
                .first()
                .addClass("matched")
                .removeClass("show");

              $(".show")
                .last()
                .addClass("matched")
                .removeClass("show");

              console.log($(".show").length);
            }
            if ($(".matched").length == numArr.length) {
              alert(`Nice job! Your score final is: ${score}`);
              newGame();
              function newGame() {
                setTimeout(function() {
                  gameSize();
                }, 2000);
              }
            }
            //If the cards are not a match...
            else if (firstCard !== secondCard) {
              alert("Not a match. Try again. ");
              score -= 1;
              $(".score").text(`SCORE: ${score}`);
              console.log("NO MATCH FIRST", firstCard);

              $(".show")
                .last()
                .addClass("noMatch")
                .removeClass("show");

              $(".show")
                .first()
                .addClass("noMatch")
                .removeClass("show");

              function flipCardsBack() {
                setTimeout(function() {
                  $(".back").removeClass("noMatch");
                  console.log("im here in functoin");
                }, 1000);
              }

              flipCardsBack();
            }

            console.log("SHOW LENGTH: ", $(".show").length);
          }
        } else {
          alert("too many");
        }
      }
    });
  }
});
