document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('snakeCanvas');
    const ctx = canvas.getContext('2d');
    const scoreElement = document.getElementById('score');

    const gridSize = 20;
    let snake = [{ x: 200, y: 200 }];
    let food = getRandomFoodPosition();
    let dx = 0;
    let dy = 0;
    let score = 0;
    let gameRunning = false;

    function startGame() {
        if (!gameRunning) {
            gameRunning = true;
            snake = [{ x: 200, y: 200 }];
            food = getRandomFoodPosition();
            dx = gridSize;
            dy = 0;
            score = 0;
            scoreElement.textContent = score;
            main();
        }
    }

    function main() {
        if (!gameRunning) return;

        setTimeout(() => {
            clearCanvas();
            updateSnake();
            drawSnake();
            drawFood();

            if (checkCollision()) {
                endGame();
                return;
            }

            if (checkFoodCollision()) {
                eatFood();
                food = getRandomFoodPosition();
            }

            main();
        }, 100); // velocidade da cobrinha
    }

    function clearCanvas() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }

    function updateSnake() {
        const head = { x: snake[0].x + dx, y: snake[0].y + dy };
        snake.unshift(head);
        if (!checkFoodCollision()) {
            snake.pop();
        }
    }

    function drawSnake() {
        snake.forEach((segment, index) => {
            ctx.fillStyle = index === 0 ? 'green' : 'darkgreen';
            ctx.fillRect(segment.x, segment.y, gridSize, gridSize);
        });
    }

    function drawFood() {
        ctx.fillStyle = 'red';
        ctx.fillRect(food.x, food.y, gridSize, gridSize);
    }

    function checkCollision() {
        if (
            snake[0].x < 0 || snake[0].x >= canvas.width ||
            snake[0].y < 0 || snake[0].y >= canvas.height ||
            snake.slice(1).some(segment => segment.x === snake[0].x && segment.y === snake[0].y)
        ) {
            return true;
        }
        return false;
    }

    function checkFoodCollision() {
        return snake[0].x === food.x && snake[0].y === food.y;
    }

    function eatFood() {
        score++;
        scoreElement.textContent = score;
    }

    function endGame() {
        gameRunning = false;
        alert(`Fim do jogo! Pontuação: ${score}`);
    }

    function getRandomFoodPosition() {
        const x = Math.floor(Math.random() * (canvas.width / gridSize)) * gridSize;
        const y = Math.floor(Math.random() * (canvas.height / gridSize)) * gridSize;
        return { x, y };
    }

    document.addEventListener('keydown', (e) => {
        if (!gameRunning) return;

        if (e.key === 'ArrowUp' && dy === 0) {
            dx = 0;
            dy = -gridSize;
        } else if (e.key === 'ArrowDown' && dy === 0) {
            dx = 0;
            dy = gridSize;
        } else if (e.key === 'ArrowLeft' && dx === 0) {
            dx = -gridSize;
            dy = 0;
        } else if (e.key === 'ArrowRight' && dx === 0) {
            dx = gridSize;
            dy = 0;
        }
    });
});
