let currentPlayer = 'X';
let gameOver = false;

const cells = document.querySelectorAll('#game button');

function checkWinner() {
    const winningCombos = [
        ['a', 'b', 'c'],
        ['d', 'e', 'f'],
        ['g', 'h', 'i'],
        ['a', 'd', 'g'],
        ['b', 'e', 'h'],
        ['c', 'f', 'i'],
        ['a', 'e', 'i'],
        ['c', 'e', 'g']
    ];

    for (const combo of winningCombos) {
        const [a, b, c] = combo;
        if (
            document.getElementById(a).innerText !== '' &&
            document.getElementById(a).innerText === document.getElementById(b).innerText &&
            document.getElementById(a).innerText === document.getElementById(c).innerText
        ) {
            return document.getElementById(a).innerText;
        }
    }

    return null;
}

function resetGame() {
    for (const cell of cells) {
        cell.innerText = '';
    }
    gameOver = false;
    currentPlayer = 'X';
}

function updateScore(winner) {
    const playerScore = document.getElementById('playerScore');
    const tieScore = document.getElementById('tieScore');
    const player2 = document.getElementById('player2');

    if (winner === 'X') {
        playerScore.innerText = parseInt(playerScore.innerText) + 1;
    } else if (winner === 'O') {
        player2.innerText = parseInt(player2.innerText) + 1;
    } else {
        tieScore.innerText = parseInt(tieScore.innerText) + 1;
    }
}

function handleClick(cellId) {
    if (gameOver) return;

    const cell = document.getElementById(cellId);

    if (cell.innerText === '') {
        cell.innerText = currentPlayer;

        const audioElement = document.createElement('audio');
        audioElement.src = currentPlayer === 'X' ? 'audio/x.mp3' : 'audio/o.mp3';
        audioElement.autoplay = true;

        cell.appendChild(audioElement);
        cell.style.color = currentPlayer === 'X' ? 'rgb(38, 80, 115)' : 'rgb(45, 149, 150)';
        cell.style.fontWeight = 'bolder';
        cell.style.fontSize = '30px';

        const winner = checkWinner();
        if (winner) {
            gameOver = true;
            const audioElement = document.createElement('audio');
            audioElement.src = 'audio/Winner.mp3';
            audioElement.autoplay = true;
            alert(`${winner} wins!`);
            updateScore(winner);
            resetGame();
            return;
        }

        if ([...cells].every(cell => cell.innerText !== '')) {
            gameOver = true;
            const audioElement = document.createElement('audio');
            audioElement.src = 'audio/tie.mp3';
            audioElement.autoplay = true;
            alert('It\'s a tie!');
            updateScore(null);
            resetGame();
            return;
        }

        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    }
}


