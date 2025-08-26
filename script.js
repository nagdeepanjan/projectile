// Get canvas and context
const canvas = document.getElementById('simulationCanvas');
const ctx = canvas.getContext('2d');

// Set canvas dimensions
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Define constants
const SKY_COLOR = '#87CEEB'; // Light blue
const GROUND_COLOR = '#228B22'; // Forest green
const CANNON_COLOR = '#000000';
const PROJECTILE_COLOR = '#000000';
const PATH_COLOR = '#000000';

const GROUND_Y = canvas.height * 9 / 10;
const GRAVITY = 0.5; // Acceleration due to gravity

// Game state variables
let cannon;
let projectile;
let path;
let isShooting = false;

// --- Drawing Functions ---

/**
 * Draws the background, which consists of a blue sky and green ground.
 */
function drawBackground() {
    // Draw sky
    ctx.fillStyle = SKY_COLOR;
    ctx.fillRect(0, 0, canvas.width, GROUND_Y);

    // Draw ground
    ctx.fillStyle = GROUND_COLOR;
    ctx.fillRect(0, GROUND_Y, canvas.width, canvas.height - GROUND_Y);
}

/**
 * Draws the cannon on the canvas at its current position and angle.
 */
function drawCannon() {
    if (!cannon) return;
    ctx.save();
    ctx.translate(cannon.x, cannon.y);
    ctx.scale(1, -1);
    ctx.rotate(-cannon.angle);
    ctx.fillStyle = CANNON_COLOR;
    // The cannon is a rectangle. By drawing it with a negative width,
    // it extends to the left of the pivot point, making it look like it's pointing left.
    ctx.fillRect(-cannon.width, -cannon.height / 2, cannon.width, cannon.height);
    ctx.restore();
}

/**
 * Draws the projectile (a circle) on the canvas at its current position.
 */
function drawProjectile() {
    if (!projectile) return; // Don't hide the projectile when it lands
    ctx.beginPath();
    ctx.arc(projectile.x, projectile.y, projectile.radius, 0, Math.PI * 2);
    ctx.fillStyle = PROJECTILE_COLOR;
    ctx.fill();
    ctx.closePath();
}

// --- Physics and Path ---

/**
 * Updates the projectile's position based on its velocity and gravity.
 */
function updatePhysics() {
    if (!projectile || !isShooting) return;

    // Apply gravity
    projectile.vy += GRAVITY;

    // Update position
    projectile.x += projectile.vx;
    projectile.y += projectile.vy;
}

/**
 * Draws the projectile's path on the canvas as a series of dots.
 */
function drawPath() {
    ctx.fillStyle = PATH_COLOR;
    for (const point of path) {
        ctx.beginPath();
        ctx.arc(point.x, point.y, 2, 0, Math.PI * 2); // 2px radius dots
        ctx.fill();
    }
}


// --- Game Logic ---

let frameCounter = 0;
let animationId = null;

/**
 * Resets the simulation to its initial state with a new random trajectory.
 * This function is called at the start and after a projectile lands.
 */
function resetSimulation() {
    if (animationId) {
        cancelAnimationFrame(animationId);
        animationId = null;
    }

    // Initialize Cannon
    cannon = {
        x: canvas.width - 50,
        y: GROUND_Y,
        width: 50,
        height: 20,
        angle: 0
    };

    // Generate random angle (20-80 degrees)
    const angleDeg = Math.random() * 60 + 20; // 20 to 80 degrees
    const angleRad = angleDeg * Math.PI / 180;
    cannon.angle = -angleRad; // Pointing up and left

    // Calculate max speed to stay within bounds. Derived from projectile motion equations.
    const maxSpeedSq = (cannon.x * GRAVITY) / Math.sin(2 * angleRad);
    const maxSpeed = Math.sqrt(maxSpeedSq);

    // Set a random speed between 40% and 95% of max speed to ensure it lands visibly
    const speed = maxSpeed * (Math.random() * 0.55 + 0.4);

    // Initialize Projectile
    projectile = {
        x: cannon.x,
        y: cannon.y,
        radius: 5,
        vx: -speed * Math.cos(angleRad), // Negative for leftward motion
        vy: -speed * Math.sin(angleRad)  // Negative for upward motion
    };

    // Reset state
    path = [];
    isShooting = true;
    frameCounter = 0;

    // Start the loop
    gameLoop();
}

/**
 * The main animation loop. It updates physics, draws the scene,
 * and checks for collisions.
 */
function gameLoop() {
    updatePhysics();

    // Add a point to the path every 4 frames for a dotted effect
    if (frameCounter % 4 === 0) {
        path.push({ x: projectile.x, y: projectile.y });
    }
    frameCounter++;

    draw();

    // Check for ground collision
    if (projectile.y + projectile.radius >= GROUND_Y) {
        projectile.y = GROUND_Y; // Stick to the ground
        isShooting = false;

        // Redraw one last time to show it on the ground
        draw();

        // Restart after 5 seconds
        setTimeout(resetSimulation, 5000);
    } else {
        // Continue the loop
        animationId = requestAnimationFrame(gameLoop);
    }
}

/**
 * A helper function to clear the canvas and draw all elements in the correct order.
 */
function draw() {
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // Redraw everything
    drawBackground();
    drawPath();
    drawCannon();
    drawProjectile();
}

// Start the simulation when the page is loaded
window.addEventListener('load', resetSimulation);