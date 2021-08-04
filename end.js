const username = document.querySelector('#username')
const saveScoreBtn = document.querySelector('#saveScoreBtn')
const finalScore = document.querySelector('#finalScore')
const mostRecentScore = localStorage.getItem('mostRecentScore')

const highScores = JSON.parse(localStorage.getItem('highScores')) || []

const MAX_HIGH_SCORES = 5

finalScore.innerText = mostRecentScore

username.addEventListener('keyup', () => {
    saveScoreBtn.disabled = !username.value
})

saveHighScore = e => {
    e.preventDefault();

    // First, get all users by the name.
    $.ajax({
        "url": "https://ca3-quiz.herokuapp.com/getPlayerByName?name=" + username.value,
        "method": "GET",
        "timeout": 0,
        "headers": {
            "Content-Type": "application/x-www-form-urlencoded",
        },
    }).fail((response) => {
        console.log("Error!");
        alert("An error occured, please try again later!");
    }).done((response) => {
        // If the response lenght > 0, means user exists in database
        if (response.data.length > 0) {
            return alert("A user already exists! Try a different name!");
        }
        // If not, can add a new player with the name!
        $.ajax({
            "url": "https://ca3-quiz.herokuapp.com/addPlayer",
            "method": "POST",
            "timeout": 0,
            "headers": {
                "Content-Type": "application/x-www-form-urlencoded",
            },
            "data": {
                "name": username.value,
                "score": mostRecentScore,
            }
        }).fail((response) => {
            console.log("Error!", response);
            alert("An error occured, please try again later!");
        }).done((response) => {
            window.location.assign('./index.html');
        });
    });


    // const score = {
    //     score: mostRecentScore,
    //     name: username.value
    // }

    // highScores.push(score)

    // highScores.sort((a,b) => {
    //     return b.score - a.score
    // })

    // highScores.splice(5)

    // localStorage.setItem('highScores', JSON.stringify(highScores))
    // window.location.assign('./index.html')


}