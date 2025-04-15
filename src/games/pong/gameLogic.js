export function initGame(canvas, score) {
	const ctx = canvas.getContext('2d');
	const width = canvas.width;
	const height = canvas.height;

	// Ball properties
	let ballX = width / 2;
	let ballY = height / 3;
	let ballRadius = 5;
	let dx = 2;
	let dy = -2;

	// Paddle properties
	const paddleWidth = 80;
	const paddleHeight = 10;
	const paddleY = height - 20;
	let paddleX = (width - paddleWidth) / 2;

	// Controls
	let rightPressed = false;
	let leftPressed = false;

	document.addEventListener("keydown", (e) => {
	  if (e.key === "ArrowRight") rightPressed = true;
	  if (e.key === "ArrowLeft") leftPressed = true;
	});

	document.addEventListener("keyup", (e) => {
	  if (e.key === "ArrowRight") rightPressed = false;
	  if (e.key === "ArrowLeft") leftPressed = false;
	});

	function drawBall() {
	  ctx.beginPath();
	  ctx.arc(ballX, ballY, ballRadius, 0, Math.PI * 2);
	  ctx.fillStyle = "white";
	  ctx.fill();
	  ctx.closePath();
	}

	function drawPaddle() {
	  ctx.beginPath();
	  ctx.rect(paddleX, paddleY, paddleWidth, paddleHeight);
	  ctx.fillStyle = "white";
	  ctx.fill();
	  ctx.closePath();
	}

	function update() {
	  // Clear canvas
	  ctx.clearRect(0, 0, width, height);

	  drawBall();
	  drawPaddle();

	  // Bounce off left/right walls
	  if (ballX + dx > width - ballRadius || ballX + dx < ballRadius) {
		dx = -dx;
	  }

	  // Bounce off top
	  if (ballY + dy < ballRadius) {
		dy = -dy;
	  }

	  // Hit paddle
	  if (
		ballY + dy > paddleY - ballRadius &&
		ballX > paddleX &&
		ballX < paddleX + paddleWidth
	  ) {
		dy = -dy;
		score.value += 10
	  }

	  // Missed ball
	  if (ballY + dy > height) {
		// Reset position (or handle game over)
		ballX = width / 2;
		ballY = height / 2;
		dx = 2;
		dy = -2;
		score.value = 0
	  }

	  // Update ball position
	  ballX += dx;
	  ballY += dy;

	  // Move paddle
	  if (rightPressed && paddleX < width - paddleWidth) {
		paddleX += 5;
	  } else if (leftPressed && paddleX > 0) {
		paddleX -= 5;
	  }

	  requestAnimationFrame(update);
	}

	update();
  }
