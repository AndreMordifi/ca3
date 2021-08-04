const highScoresList = document.querySelector('#highScoresList')
// const highScores = JSON.parse(localStorage.getItem("highScores")) || []

$.ajax({
    "url": "https://ca3-quiz.herokuapp.com/getTopPlayers",
    "method": "GET",
    "timeout": 0,
}).fail((response) => {
    console.log("Error!");
    alert("An error occured, please try again later!");
}).done((response) => {
    const highscores = response.data;
    highScoresList.innerHTML =
    highscores.map(score => {
            return `<li class="high-score">${score.name} - ${score.score}</li>`
        }).join("")
});

