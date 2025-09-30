const gameArea = document.getElementById('gameArea');
const player = document.getElementById('player');
const obstacle = document.getElementById('obstacle');
const scoreDisplay = document.getElementById('score');
const gameOverDiv = document.getElementById('gameOver');
const restartBtn = document.getElementById('restartBtn');

const gameWidth = gameArea.clientWidth;
const playerWidth = player.clientWidth;
const obstacleWidth = obstacle.clientWidth;

let playerPosX = gameWidth / 2 - playerWidth / 2;
let obstaclePosY = -60;
let obstaclePosX = Math.random() * (gameWidth - obstacleWidth);
let obstacleSpeed = 4;
let playerSpeed = 10;
let score = 0;
let gameRunning = false;
let animationFrameId;

player.style.left = playerPosX + 'px';
obstacle.style.left = obstaclePosX + 'px';

function resetGame() {
    score = 0;
    obstacleSpeed = 4;
    obstaclePosY = -60;
    obstaclePosX = Math.random() * (gameWidth - obstacleWidth);
    playerPosX = gameWidth / 2 - playerWidth / 2;
    player.style.left = playerPosX + 'px';
    obstacle.style.top = obstaclePosY + 'px';
    obstacle.style.left = obstaclePosX + 'px';
    scoreDisplay.textContent = "Điểm: 0";
    gameOverDiv.classList.add('hidden');
    gameRunning = true;
    requestAnimationFrame(gameLoop);
}

function gameLoop() {
    if (!gameRunning) return;

    // Move obstacle down
    obstaclePosY += obstacleSpeed;
    obstacle.style.top = obstaclePosY + 'px';

    // Check if obstacle out of screen
    if (obstaclePosY > gameArea.clientHeight) {
        obstaclePosY = -60;
        obstaclePosX = Math.random() * (gameWidth - obstacleWidth);
        obstacle.style.left = obstaclePosX + 'px';

        score++;
        scoreDisplay.textContent = "Điểm: " + score;

        // Increase speed a bit every 5 points
        if (score % 5 === 0) {
            obstacleSpeed += 0.5;
        }
    }

    // Check collision
    if (isCollision()) {
        endGame();
        return;
    }

    animationFrameId = requestAnimationFrame(gameLoop);
}

function isCollision() {
    const playerRect = player.getBoundingClientRect();
    const obstacleRect = obstacle.getBoundingClientRect();

    return !(
        playerRect.top > obstacleRect.bottom ||
        playerRect.bottom < obstacleRect.top ||
        playerRect.left > obstacleRect.right ||
        playerRect.right < obstacleRect.left
    );
}

function endGame() {
    gameRunning = false;
    gameOverDiv.classList.remove('hidden');
    cancelAnimationFrame(animationFrameId);
}

window.addEventListener('keydown', (e) => {
    if (!gameRunning) return;

    if (e.key === 'ArrowLeft') {
        playerPosX -= playerSpeed;
        if (playerPosX < 0) playerPosX = 0;
    } else if (e.key === 'ArrowRight') {
        playerPosX += playerSpeed;
        if (playerPosX > gameWidth - playerWidth) playerPosX = gameWidth - playerWidth;
    }
    player.style.left = playerPosX + 'px';
});

restartBtn.addEventListener('click', () => {
    resetGame();
});

// Start game at load
resetGame();
