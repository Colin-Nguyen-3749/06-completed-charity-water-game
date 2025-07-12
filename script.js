// Log a message to the console to ensure the script is linked correctly
console.log('JavaScript file is linked correctly.');

// Function to play button click sound
function playButtonSound() {
    try {
        const audio = new Audio('sounds/button.mp3');
        audio.volume = 0.5; // Set volume to 50% to avoid being too loud
        audio.play().catch(error => {
            // Silently handle any audio play errors (like autoplay restrictions)
            console.log('Could not play button sound:', error);
        });
    } catch (error) {
        // Silently handle any audio creation errors
        console.log('Could not create button audio:', error);
    }
}

// Function to play jump sound
function playJumpSound() {
    try {
        const audio = new Audio('sounds/jump.mp3');
        audio.volume = 0.4; // Set volume to 40% for jump sound
        audio.play().catch(error => {
            // Silently handle any audio play errors (like autoplay restrictions)
            console.log('Could not play jump sound:', error);
        });
    } catch (error) {
        // Silently handle any audio creation errors
        console.log('Could not create jump audio:', error);
    }
}

function playWinSound() {
  try {
    const audio = new Audio('sounds/win.mp3');
    audio.volume = 0.6; // Set volume to 60% for win sound
    audio.play().catch(error => {
      // Silently handle any audio play errors (like autoplay restrictions)
      console.log('Could not play win sound:', error);
    });
  } catch (error) {
    // Silently handle any audio creation errors
    console.log('Could not create win audio:', error);
  }
}

// Get the menu and all menu buttons
const menu = document.getElementById('menu');
const buttons = document.querySelectorAll('.menu-btn');

// Add click sound to existing menu buttons
buttons.forEach(button => {
    button.addEventListener('click', playButtonSound);
});

// Global variable to store the selected difficulty
let selectedDifficulty = 'Hard'; // Default to Hard

// Function to show difficulty selection screen
function showDifficultyScreen() {
    // Hide the menu
    menu.style.display = 'none';

    // Remove any old screen if present
    const oldScreen = document.getElementById('screen');
    if (oldScreen) {
        oldScreen.remove();
    }

    // Create the difficulty selection screen
    const screen = document.createElement('div');
    screen.id = 'screen';
    screen.style.display = 'flex';
    screen.style.flexDirection = 'column';
    screen.style.alignItems = 'center';
    screen.style.justifyContent = 'center';
    screen.style.minHeight = '100vh';
    screen.style.color = '#fff';
    screen.style.fontFamily = `'Press Start 2P', monospace`;
    screen.style.fontSize = '1.2rem';
    screen.setAttribute('role', 'region');
    screen.setAttribute('tabindex', '-1');
    screen.setAttribute('aria-label', 'Difficulty Selection');

    // Title
    const title = document.createElement('h2');
    title.textContent = 'Choose Your Difficulty';
    title.style.fontSize = '1.8rem';
    title.style.marginBottom = '40px';
    title.style.textAlign = 'center';
    title.style.color = '#fff';
    screen.appendChild(title);

    // Easy button
    const easyBtn = document.createElement('button');
    easyBtn.textContent = 'Easy';
    easyBtn.className = 'menu-btn';
    easyBtn.style.background = '#111'; // Dark background for easy
    easyBtn.style.border = '2px solid #fff';
    easyBtn.style.marginBottom = '16px';
    easyBtn.onclick = function() {
        playButtonSound(); // Add sound effect
        selectedDifficulty = 'Easy';
        screen.remove();
        showScreen('GAME');
    };
    easyBtn.setAttribute('aria-label', 'Easy difficulty - hunger stays full, less brown platforms');
    screen.appendChild(easyBtn);

    // Easy description
    const easyDesc = document.createElement('p');
    easyDesc.textContent = 'Hunger stays full, less dangerous water';
    easyDesc.style.fontSize = '0.7rem';
    easyDesc.style.marginBottom = '20px';
    easyDesc.style.textAlign = 'center';
    easyDesc.style.color = '#aaa';
    screen.appendChild(easyDesc);

    // Medium button
    const mediumBtn = document.createElement('button');
    mediumBtn.textContent = 'Medium';
    mediumBtn.className = 'menu-btn';
    mediumBtn.style.background = '#111'; // Dark background for medium
    mediumBtn.style.border = '2px solid #fff';
    mediumBtn.style.marginBottom = '16px';
    mediumBtn.onclick = function() {
        playButtonSound(); // Add sound effect
        selectedDifficulty = 'Medium';
        screen.remove();
        showScreen('GAME');
    };
    mediumBtn.setAttribute('aria-label', 'Medium difficulty - normal hunger, more coins');
    screen.appendChild(mediumBtn);

    // Medium description
    const mediumDesc = document.createElement('p');
    mediumDesc.textContent = 'Normal hunger, more coins to collect';
    mediumDesc.style.fontSize = '0.7rem';
    mediumDesc.style.marginBottom = '20px';
    mediumDesc.style.textAlign = 'center';
    mediumDesc.style.color = '#aaa';
    screen.appendChild(mediumDesc);

    // Hard button
    const hardBtn = document.createElement('button');
    hardBtn.textContent = 'Hard';
    hardBtn.className = 'menu-btn';
    hardBtn.style.background = '#111'; // Dark background for hard
    hardBtn.style.border = '2px solid #fff';
    hardBtn.style.marginBottom = '16px';
    hardBtn.onclick = function() {
        playButtonSound(); // Add sound effect
        selectedDifficulty = 'Hard';
        screen.remove();
        showScreen('GAME');
    };
    hardBtn.setAttribute('aria-label', 'Hard difficulty - challenging gameplay');
    screen.appendChild(hardBtn);

    // Hard description
    const hardDesc = document.createElement('p');
    hardDesc.textContent = 'Full challenge mode';
    hardDesc.style.fontSize = '0.7rem';
    hardDesc.style.marginBottom = '40px';
    hardDesc.style.textAlign = 'center';
    hardDesc.style.color = '#aaa';
    screen.appendChild(hardDesc);

    // Back button
    const backBtn = document.createElement('button');
    backBtn.textContent = 'Back to Menu';
    backBtn.className = 'menu-btn';
    backBtn.style.marginTop = '32px';
    backBtn.onclick = function() {
        playButtonSound(); // Add sound effect
        screen.remove();
        menu.style.display = 'flex';
        const title = document.getElementById('main-title');
        if (title) {
            title.focus();
        }
    };
    backBtn.setAttribute('aria-label', 'Back to Main Menu');
    screen.appendChild(backBtn);

    document.body.appendChild(screen);
    screen.focus();
}

// Function to create the game HUD (top info bar)
function createHUD(money, food, health, timerSeconds) {
    const hud = document.createElement('div');
    hud.id = 'hud';
    hud.className = 'hud-grid';

    // --- Counter stacks (2x2 grid) ---
    const countersGrid = document.createElement('div');
    countersGrid.className = 'counters-grid';

    // Money (top left)
    const moneyStack = document.createElement('div');
    moneyStack.className = 'counter-stack';
    const moneyLabel = document.createElement('span');
    moneyLabel.textContent = 'MONEY';
    moneyLabel.className = 'counter-label';
    moneyStack.appendChild(moneyLabel);
    const moneyCounter = document.createElement('span');
    moneyCounter.className = 'counter-value';
    moneyCounter.innerHTML = `<img src="img/mone.png" alt="Money" style="width: 28px; height: 28px; margin-right: 7px; image-rendering: pixelated;">x <span id="money-value">${money}</span>`;
    moneyStack.appendChild(moneyCounter);

    // Hunger (bottom left)
    const hungerStack = document.createElement('div');
    hungerStack.className = 'counter-stack';
    const hungerLabel = document.createElement('span');
    hungerLabel.textContent = 'HUNGER';
    hungerLabel.className = 'counter-label';
    hungerStack.appendChild(hungerLabel);

    // Hunger bar: 10 segments, each segment is a small white rectangle
    const hungerBarWrap = document.createElement('span');
    hungerBarWrap.className = 'counter-value';
    const hungerBarOuter = document.createElement('span');
    hungerBarOuter.className = 'hunger-bar-outer';
    hungerBarOuter.style.display = 'flex';
    hungerBarOuter.style.gap = '2px';
    hungerBarOuter.style.background = 'transparent';
    hungerBarOuter.style.border = '2px solid #fff';
    hungerBarOuter.style.borderRadius = '0';
    hungerBarOuter.style.width = '70px';
    hungerBarOuter.style.height = '12px';
    hungerBarOuter.style.overflow = 'hidden';
    hungerBarOuter.style.alignItems = 'center';
    hungerBarOuter.style.position = 'relative';

    // Create 10 segments
    const hungerSegments = [];
    for (let i = 0; i < 10; i++) {
        const seg = document.createElement('span');
        seg.className = 'hunger-segment';
        seg.style.display = 'inline-block';
        seg.style.height = '100%';
        seg.style.width = '10%';
        seg.style.background = '#fff';
        seg.style.margin = '0';
        seg.style.transition = 'background 0.3s';
        hungerBarOuter.appendChild(seg);
        hungerSegments.push(seg);
    }
    hungerBarOuter._segments = hungerSegments;
    hungerBarWrap.appendChild(hungerBarOuter);
    hungerStack.appendChild(hungerBarWrap);

    // Food (top right)
    const foodStack = document.createElement('div');
    foodStack.className = 'counter-stack';
    const foodLabel = document.createElement('span');
    foodLabel.textContent = 'FOOD';
    foodLabel.className = 'counter-label';
    foodStack.appendChild(foodLabel);
    const foodCounter = document.createElement('span');
    foodCounter.className = 'counter-value';
    foodCounter.innerHTML = `<img src="img/med.png" alt="Food" style="width: 28px; height: 28px; margin-right: 7px; image-rendering: pixelated;">x <span id="food-value">${food}</span>`;
    foodStack.appendChild(foodCounter);

    // Health (bottom right)
    const healthStack = document.createElement('div');
    healthStack.className = 'counter-stack';
    const healthLabel = document.createElement('span');
    healthLabel.textContent = 'MEDICINE';
    healthLabel.className = 'counter-label';
    healthStack.appendChild(healthLabel);
    const healthCounter = document.createElement('span');
    healthCounter.className = 'counter-value';
    healthCounter.innerHTML = `<img src="img/Food Icon for Game.png" alt="Medicine" style="width: 20px; height: 20px; margin-right: 7px; image-rendering: pixelated;">x <span id="health-value">${health}</span>`;
    healthStack.appendChild(healthCounter);

    // Add stacks to grid
    countersGrid.appendChild(moneyStack);
    countersGrid.appendChild(foodStack);
    countersGrid.appendChild(hungerStack);
    countersGrid.appendChild(healthStack);

    // --- Timer section ---
    const timerSection = document.createElement('div');
    timerSection.className = 'timer-section';
    const timerLabel = document.createElement('span');
    timerLabel.textContent = 'TIME';
    timerLabel.className = 'counter-label';
    timerSection.appendChild(timerLabel);
    const timerDiv = document.createElement('span');
    timerDiv.id = 'timer';
    timerDiv.className = 'counter-value';
    timerDiv.textContent = formatTime(timerSeconds);
    timerSection.appendChild(timerDiv);

    // Add grid and timer to HUD
    hud.appendChild(countersGrid);
    hud.appendChild(timerSection);

    hud._hungerSegments = hungerSegments;

    // --- Message area between HUD and buy bar ---
    const messageBar = document.createElement('div');
    messageBar.id = 'message-bar';
    messageBar.style.background = '#222';
    messageBar.style.color = '#fff';
    messageBar.style.fontSize = '1rem';
    messageBar.style.textAlign = 'center';
    messageBar.style.minHeight = '28px';
    messageBar.style.padding = '4px 0';
    messageBar.style.width = '100%';
    messageBar.style.maxWidth = '600px';
    messageBar.style.margin = '0 auto';
    messageBar.style.boxSizing = 'border-box';
    messageBar.style.borderLeft = '2px solid #fff';
    messageBar.style.borderRight = '2px solid #fff';
    messageBar.style.borderTop = 'none';
    messageBar.style.borderBottom = 'none';
    messageBar.textContent = ''; // Start empty

    // --- Buy buttons menu below the HUD ---
    const buyBar = document.createElement('div');
    buyBar.style.display = 'flex';
    buyBar.style.justifyContent = 'center';
    buyBar.style.alignItems = 'center';
    buyBar.style.gap = '18px';
    buyBar.style.background = '#111';
    buyBar.style.border = '2px solid #fff';
    buyBar.style.borderRadius = '0 0 12px 12px';
    buyBar.style.margin = '0 auto 8px auto';
    buyBar.style.padding = '4px 0';
    buyBar.style.width = '100%';
    buyBar.style.maxWidth = '600px';
    buyBar.style.boxSizing = 'border-box';

    // --- BUY FOOD BUTTON ---
    const buyFoodBtn = document.createElement('button');
    buyFoodBtn.textContent = 'BUY FOOD - $3';
    buyFoodBtn.className = 'menu-btn';
    buyFoodBtn.style.fontSize = '0.8rem';
    buyFoodBtn.style.padding = '4px 10px';
    buyFoodBtn.style.margin = '0';
    buyFoodBtn.style.width = 'auto';
    buyFoodBtn.style.height = 'auto';
    buyFoodBtn.style.minHeight = 'unset';
    buyFoodBtn.style.borderRadius = '6px';
    buyFoodBtn.style.background = '#222';
    buyFoodBtn.style.border = '1.5px solid #fff';
    buyFoodBtn.style.color = '#fff';
    buyFoodBtn.onclick = function() {
        playButtonSound(); // Add sound effect
        // Always get the latest values from the DOM
        const moneyValue = document.getElementById('money-value');
        const foodValue = document.getElementById('food-value');
        let moneyNum = parseInt(moneyValue.textContent, 10);
        let foodNum = parseInt(foodValue.textContent, 10);
        if (moneyNum >= 3) {
            // Subtract 3 from money and add 1 to food
            moneyNum = moneyNum - 3;
            foodNum = foodNum + 1;
            // Update the DOM counters
            moneyValue.textContent = moneyNum;
            foodValue.textContent = foodNum;
            // Show a message when food is bought
            const msg = document.getElementById('message-bar');
            if (msg) {
                msg.textContent = 'You bought food!';
                setTimeout(() => { msg.textContent = ''; }, 1500);
            }
        }
    };

    // --- BUY MEDICINE BUTTON ---
    const buyMedBtn = document.createElement('button');
    buyMedBtn.textContent = 'BUY MEDICINE - $5';
    buyMedBtn.className = 'menu-btn';
    buyMedBtn.style.fontSize = '0.8rem';
    buyMedBtn.style.padding = '4px 10px';
    buyMedBtn.style.margin = '0';
    buyMedBtn.style.width = 'auto';
    buyMedBtn.style.height = 'auto';
    buyMedBtn.style.minHeight = 'unset';
    buyMedBtn.style.borderRadius = '6px';
    buyMedBtn.style.background = '#222';
    buyMedBtn.style.border = '1.5px solid #fff';
    buyMedBtn.style.color = '#fff';
    buyMedBtn.onclick = function() {
        playButtonSound(); // Add sound effect
        // Always get the latest values from the DOM
        const moneyValue = document.getElementById('money-value');
        const healthValue = document.getElementById('health-value');
        let moneyNum = parseInt(moneyValue.textContent, 10);
        let healthNum = parseInt(healthValue.textContent, 10);
        if (moneyNum >= 5) {
            // Subtract 5 from money and add 1 to health
            moneyNum = moneyNum - 5;
            healthNum = healthNum + 1;
            // Update the DOM counters
            moneyValue.textContent = moneyNum;
            healthValue.textContent = healthNum;
            // Show a message when medicine is bought
            const msg = document.getElementById('message-bar');
            if (msg) {
                msg.textContent = 'You bought medicine!';
                setTimeout(() => { msg.textContent = ''; }, 1500);
            }
        }
    };

    // --- BUY EDUCATION BUTTON ---
    const buyEduBtn = document.createElement('button');
    buyEduBtn.textContent = 'BUY EDUCATION - $25';
    buyEduBtn.className = 'menu-btn';
    buyEduBtn.style.fontSize = '0.8rem';
    buyEduBtn.style.padding = '4px 10px';
    buyEduBtn.style.margin = '0';
    buyEduBtn.style.width = 'auto';
    buyEduBtn.style.height = 'auto';
    buyEduBtn.style.minHeight = 'unset';
    buyEduBtn.style.borderRadius = '6px';
    buyEduBtn.style.background = '#222';
    buyEduBtn.style.border = '1.5px solid #fff';
    buyEduBtn.style.color = '#fff';
    buyEduBtn.disabled = true;
    buyEduBtn.classList.add('edu-disabled');

    // Add the button to the buy bar
    buyBar.appendChild(buyFoodBtn);
    buyBar.appendChild(buyMedBtn);
    buyBar.appendChild(buyEduBtn);

    // --- Flashing effect for education button ---
    // Add a style tag for the flashing effect if not already present
    if (!document.getElementById('edu-flash-style')) {
        const style = document.createElement('style');
        style.id = 'edu-flash-style';
        style.textContent = `
        .edu-flash {
            animation: edu-flash-anim 0.7s infinite alternate;
            background: #FFC907 !important;
            color: #111 !important;
            border: 2px solid #FFC907 !important;
        }
        @keyframes edu-flash-anim {
            0% { box-shadow: 0 0 8px 2px #FFC907; }
            100% { box-shadow: 0 0 16px 4px #fff; }
        }
        .edu-disabled {
            opacity: 0.5;
            cursor: not-allowed;
            background: #444 !important;
            color: #bbb !important;
            border: 1.5px solid #888 !important;
        }
        `;
        document.head.appendChild(style);
    }

    // --- Enable/disable and flash the education button based on money ---
    function updateEduBtn() {
        const moneyValue = document.getElementById('money-value');
        let moneyNum = parseInt(moneyValue.textContent, 10);
        if (moneyNum >= 25) {
            buyEduBtn.disabled = false;
            buyEduBtn.classList.remove('edu-disabled');
            buyEduBtn.classList.add('edu-flash');
        } else {
            buyEduBtn.disabled = true;
            buyEduBtn.classList.remove('edu-flash');
            buyEduBtn.classList.add('edu-disabled');
        }
    }
    setInterval(updateEduBtn, 300);

    // --- Pixelated confetti function ---
    function showConfetti() {
        playWinSound(); // Play win sound
        // Create a container for confetti
        let confettiContainer = document.getElementById('confetti-container');
        if (!confettiContainer) {
            confettiContainer = document.createElement('div');
            confettiContainer.id = 'confetti-container';
            confettiContainer.style.position = 'fixed';
            confettiContainer.style.left = '0';
            confettiContainer.style.top = '0';
            confettiContainer.style.width = '100vw';
            confettiContainer.style.height = '100vh';
            confettiContainer.style.pointerEvents = 'none';
            confettiContainer.style.zIndex = '9999';
            document.body.appendChild(confettiContainer);
        }

        // Confetti colors (pixel style)
        const colors = [
            '#FFC907', // yellow
            '#2E9DF7', // blue
            '#4FCB53', // green
            '#FF902A', // orange
            '#F5402C', // red
            '#fff',    // white
            '#8BD1CB', // light blue
            '#F16061'  // pink
        ];

        // Create 40 confetti pieces
        for (let i = 0; i < 40; i++) {
            const conf = document.createElement('div');
            // Pixel size
            const size = Math.floor(Math.random() * 10) + 8;
            conf.style.position = 'absolute';
            conf.style.width = `${size}px`;
            conf.style.height = `${size}px`;
            conf.style.background = colors[Math.floor(Math.random() * colors.length)];
            conf.style.left = `${Math.random() * 100}vw`;
            conf.style.top = `-${size}px`;
            conf.style.opacity = '0.95';
            conf.style.borderRadius = '2px';
            conf.style.boxShadow = '0 0 0 2px #222';
            conf.style.transition = 'none';
            conf.style.zIndex = '10000';

            // Animate falling
            const fallTime = 1200 + Math.random() * 1200;
            const endLeft = Math.random() * 100;
            conf.animate([
                { transform: `translateY(0)`, left: conf.style.left },
                { transform: `translateY(80vh)`, left: `${endLeft}vw` }
            ], {
                duration: fallTime,
                easing: 'cubic-bezier(.5,1.5,.5,1)',
                fill: 'forwards'
            });

            // Remove confetti after animation
            setTimeout(() => {
                if (conf.parentNode) conf.parentNode.removeChild(conf);
            }, fallTime + 400);

            confettiContainer.appendChild(conf);
        }

        // Remove the container after all confetti is gone
        setTimeout(() => {
            if (confettiContainer.parentNode) confettiContainer.parentNode.removeChild(confettiContainer);
        }, 2200);
    }

    // --- Click event for education button ---
    buyEduBtn.onclick = function() {
        playButtonSound(); // Add sound effect
        // Always get the latest value from the DOM
        const moneyValue = document.getElementById('money-value');
        let moneyNum = parseInt(moneyValue.textContent, 10);
        const msg = document.getElementById('message-bar');
        if (moneyNum >= 25) {
            // Subtract 25 from money
            moneyNum = moneyNum - 25;
            moneyValue.textContent = moneyNum;
            if (msg) {
                msg.textContent = 'Yay, you won!';
            }
            // Show pixelated confetti
            showConfetti();
        }
    };

    // --- Container for HUD, message, and buy bar ---
    const hudContainer = document.createElement('div');
    hudContainer.appendChild(hud);
    hudContainer.appendChild(messageBar);
    hudContainer.appendChild(buyBar);
    hudContainer._hungerSegments = hungerSegments;
    return hudContainer;
}

// Helper to format seconds as MM:SS
function formatTime(seconds) {
    const min = Math.floor(seconds / 60);
    const sec = seconds % 60;
    return `${min}:${sec < 10 ? '0' : ''}${sec}`;
}

// Function to create the game area with random platforms and player
function createGameArea() {
    // Detect if the screen is mobile-sized
    const isMobile = window.innerWidth <= 700;

    // Set area size based on device
    // For mobile, make the game area much taller (about 70% of the viewport height, max 420px)
    const areaWidth = isMobile ? Math.min(window.innerWidth * 0.9, 320) : 600;
    const areaHeight = isMobile ? Math.min(window.innerHeight * 0.7, 420) : 400;

    // Create the game area container
    const gameArea = document.createElement('div');
    gameArea.id = 'game-area';
    gameArea.style.position = 'relative';
    gameArea.style.width = `${areaWidth}px`;
    gameArea.style.maxWidth = isMobile ? `${areaWidth}px` : '600px';
    gameArea.style.height = `${areaHeight}px`;
    gameArea.style.margin = isMobile ? '0 auto 0 auto' : '32px auto 0 auto';
    gameArea.style.background = '#2A2A2A'; // Made lighter from #181818
    gameArea.style.border = '2px solid #fff';
    gameArea.style.borderRadius = isMobile ? '8px' : '12px';
    gameArea.style.overflow = 'hidden';
    gameArea.style.display = 'flex';
    gameArea.style.alignItems = 'flex-end';

    // Game variables
    const platformCount = 8;
    const platformMinGapY = 40;
    const platformMaxGapY = 70;
    const platformMinWidth = 80;
    const platformMaxWidth = 120;
    const platformHeight = 16;

    // Store platforms as objects for collision
    let platforms = [];

    // Helper to generate a platform at a given y
    function createPlatform(y, forceBlue = false) {
        // Random width and x position, always inside the game area
        const width = platformMinWidth + Math.floor(Math.random() * (platformMaxWidth - platformMinWidth));
        const maxX = areaWidth - width - 10;
        const x = Math.floor(Math.random() * (maxX > 0 ? maxX : 1)) + 5;

        // Adjust platform color chance based on difficulty
        let brownChance = 0.5; // Default chance for brown platforms
        if (selectedDifficulty === 'Easy') {
            brownChance = 0.25; // Less brown platforms on easy
        }

        // If forceBlue is true, make the platform blue, otherwise random
        let isBrown = !forceBlue && Math.random() < brownChance;
        const color = isBrown ? '#BF6C46' : '#77A8BB';

        // Create platform div
        const platform = document.createElement('div');
        platform.className = 'platform';
        platform.style.position = 'absolute';
        platform.style.left = `${x}px`;
        platform.style.top = `${y}px`;
        platform.style.width = `${width}px`;
        platform.style.height = `${platformHeight}px`;
        platform.style.background = color;
        platform.style.border = '2px solid #222';
        platform.style.borderRadius = '6px';
        platform.style.boxShadow = '0 2px 0 #222';
        platform.setAttribute('aria-label', 'Platform');

        // --- Double-click to turn brown platform blue ---
        platform.addEventListener('dblclick', function() {
            if (platform.style.background === 'rgb(191, 108, 70)' || platform.style.background === '#BF6C46') {
                platform.style.background = '#77A8BB';
            }
        });

        // --- Randomly add a coin on blue platforms ---
        let coin = null;
        if (!isBrown) {
            // Adjust coin spawn chance based on difficulty
            let coinChance = 0.4; // Default chance
            if (selectedDifficulty === 'Medium') {
                coinChance = 0.6; // More coins on medium
            }
            
            if (Math.random() < coinChance) {
                coin = document.createElement('img');
                coin.src = 'img/mone.png';
                coin.alt = 'Coin';
                coin.className = 'coin-on-platform';
                coin.style.position = 'absolute';
                coin.style.left = `${width / 2 - 16}px`; // Adjusted for bigger size
                coin.style.top = '-26px'; // Adjusted for bigger size
                coin.style.width = '32px'; // Made bigger
                coin.style.height = '32px'; // Made bigger
                coin.style.border = 'none'; // Remove white border
                coin.style.borderRadius = '0'; /* Keep pixelated look */
                coin.style.display = 'block';
                coin.style.zIndex = '3';
                coin.style.imageRendering = 'pixelated'; /* Maintain pixelated rendering */
                coin.setAttribute('data-collected', 'false');
                platform.appendChild(coin);
            }
        }

        // Add to DOM and array
        gameArea.appendChild(platform);
        platforms.push({
            el: platform,
            x,
            y,
            width,
            height: platformHeight,
            coin: coin
        });
    }

    // Generate initial platforms, spaced vertically so they don't touch
    let y = areaHeight - 40;
    for (let i = 0; i < platformCount; i++) {
        // For the first platform (the one the player will spawn on), force it to be blue
        if (i === 0) {
            createPlatform(y, true); // Always blue for spawn
        } else {
            createPlatform(y);
        }
        y -= platformMinGapY + Math.floor(Math.random() * (platformMaxGapY - platformMinGapY));
    }

    // Add the player avatar
    const player = document.createElement('img');
    player.id = 'player';
    player.src = 'img/stand.png'; // Start with standing image
    player.alt = 'Player';
    player.style.position = 'absolute';
    player.style.width = '100px'; // Made bigger from 28px
    player.style.height = '100px'; // Made bigger from 28px
    player.style.left = `${platforms[0].x + platforms[0].width / 2 - 50}px`; // Center the 100px player
    player.style.top = `${platforms[0].y - 100}px`; // Position above platform
    player.style.border = 'none'; // Remove white border
    player.style.borderRadius = '0'; // Remove border radius since no border
    player.style.boxShadow = 'none'; // Remove shadow since no border
    player.style.display = 'block';
    player.style.zIndex = '2';
    player.style.imageRendering = 'pixelated'; // Keep pixelated look
    player.style.transform = 'scaleX(-1)'; // Start facing left (default)
    gameArea.appendChild(player);

    // Player physics variables
    let px = platforms[0].x + platforms[0].width / 2 - 50; // Center the 100px player
    let py = platforms[0].y - 100; // Position above platform
    let vx = 0;
    let vy = 0;
    let onGround = false;
    // Use window.currentJumpPower for jump height
    let gravity = 1.2; // Increased from 0.8 to make jumping much faster
    let moveSpeed = 4;
    let scrollY = 0;
    
    // Track the player's last safe position (on a blue platform)
    let lastSafeX = px;
    let lastSafeY = py;
    
    // Track player's facing direction (true = right, false = left)
    let facingRight = false;

    // Keyboard controls
    let leftPressed = false;
    let rightPressed = false;
    let jumpPressed = false;

    // Listen for keydown and keyup
    document.addEventListener('keydown', function(e) {
        // Prevent default scrolling for space and arrow keys
        if (
            e.code === 'Space' ||
            e.code === 'ArrowUp' ||
            e.code === 'ArrowDown' ||
            e.code === 'ArrowLeft' ||
            e.code === 'ArrowRight'
        ) {
            e.preventDefault();
        }
        if (e.code === 'ArrowLeft' || e.code === 'KeyA') leftPressed = true;
        if (e.code === 'ArrowRight' || e.code === 'KeyD') rightPressed = true;
        if ((e.code === 'Space' || e.code === 'ArrowUp' || e.code === 'KeyW') && onGround) jumpPressed = true;
    });
    document.addEventListener('keyup', function(e) {
        // Prevent default scrolling for space and arrow keys
        if (
            e.code === 'Space' ||
            e.code === 'ArrowUp' ||
            e.code === 'ArrowDown' ||
            e.code === 'ArrowLeft' ||
            e.code === 'ArrowRight'
        ) {
            e.preventDefault();
        }
        if (e.code === 'ArrowLeft' || e.code === 'KeyA') leftPressed = false;
        if (e.code === 'ArrowRight' || e.code === 'KeyD') rightPressed = false;
    });

    // --- On-screen controls for mobile ---
    let controls = null;
    if (isMobile) {
        // Create a container for the on-screen buttons (will be added outside gameArea)
        controls = document.createElement('div');
        controls.id = 'mobile-controls';
        controls.style.display = 'flex';
        controls.style.justifyContent = 'center';
        controls.style.gap = '24px';
        controls.style.margin = '18px 0 0 0';
        controls.style.width = `${areaWidth}px`;

        // Helper to make a pixelated button
        function makeBtn(label) {
            const btn = document.createElement('button');
            btn.textContent = label;
            btn.style.background = '#111';
            btn.style.color = '#fff';
            btn.style.border = '2px solid #fff';
            btn.style.fontFamily = "'Press Start 2P', monospace";
            btn.style.fontSize = '2rem';
            btn.style.padding = '22px 32px';
            btn.style.borderRadius = '10px';
            btn.style.margin = '0 4px';
            btn.style.cursor = 'pointer';
            btn.style.outline = 'none';
            btn.style.boxShadow = '0 2px #222';
            btn.style.pointerEvents = 'auto'; // enable click/touch
            btn.style.userSelect = 'none';
            btn.style.touchAction = 'none';
            return btn;
        }

        // Left, Right, Jump buttons
        const leftBtn = makeBtn('←');
        const rightBtn = makeBtn('→');
        const jumpBtn = makeBtn('⤒');

        // Add event listeners for touch and mouse
        leftBtn.addEventListener('touchstart', e => { e.preventDefault(); leftPressed = true; });
        leftBtn.addEventListener('touchend', e => { e.preventDefault(); leftPressed = false; });
        leftBtn.addEventListener('mousedown', e => { e.preventDefault(); leftPressed = true; });
        leftBtn.addEventListener('mouseup', e => { e.preventDefault(); leftPressed = false; });
        leftBtn.addEventListener('mouseleave', () => { leftPressed = false; });

        rightBtn.addEventListener('touchstart', e => { e.preventDefault(); rightPressed = true; });
        rightBtn.addEventListener('touchend', e => { e.preventDefault(); rightPressed = false; });
        rightBtn.addEventListener('mousedown', e => { e.preventDefault(); rightPressed = true; });
        rightBtn.addEventListener('mouseup', e => { e.preventDefault(); rightPressed = false; });
        rightBtn.addEventListener('mouseleave', () => { rightPressed = false; });

        jumpBtn.addEventListener('touchstart', e => { e.preventDefault(); if (onGround) jumpPressed = true; });
        jumpBtn.addEventListener('mousedown', e => { e.preventDefault(); if (onGround) jumpPressed = true; });

        // Arrange buttons: left, jump, right
        controls.appendChild(leftBtn);
        controls.appendChild(jumpBtn);
        controls.appendChild(rightBtn);
    }

    // Track the player's items
    // Remove the local money variable since we'll use the DOM counter directly
    // let money = 0; // Removed - we'll use DOM counter instead
    // let food = 0; // Removed unused variable
    // let health = 0; // Removed unused variable

    // We need to get the money counter span from the HUD each time, because the HUD is created in showScreen
    // So we use document.getElementById to always get the current value span
    // ...existing code...

    function gameLoop() {
        // Move left/right
        if (leftPressed) {
            vx = -moveSpeed;
            facingRight = true; // Player is moving left
        } else if (rightPressed) {
            vx = moveSpeed;
            facingRight = false; // Player is moving right
        } else {
            vx = 0;
        }

        // Jump
        if (jumpPressed && onGround) {
            // Play jump sound when player jumps
            playJumpSound();
            // Use the currentJumpPower global variable for jump height
            // If not set, default to -15
            vy = typeof window.currentJumpPower === "number" ? window.currentJumpPower : -15;
            onGround = false;
            jumpPressed = false;
        }

        // Apply gravity
        vy += gravity;

        // Update player position
        px += vx;
        py += vy;

        // Prevent player from going out of bounds horizontally
        if (px < 0) px = 0;
        if (px > areaWidth - 100) px = areaWidth - 100; // Adjusted for 100px size

        // Prevent player from jumping above the top of the game area
        if (py < 0) {
            py = 0;
            vy = 0;
        }

        // Update player avatar based on state and direction
        if (!onGround) {
            // Player is jumping/falling
            player.src = 'img/jump.png';
        } else {
            // Player is on ground (standing or moving)
            player.src = 'img/stand.png';
        }
        
        // Update player facing direction
        if (facingRight) {
            player.style.transform = 'scaleX(1)'; // Face right (normal)
        } else {
            player.style.transform = 'scaleX(-1)'; // Face left (flipped)
        }

        // Platform collision (simple AABB)
        onGround = false;
        for (let plat of platforms) {
            if (
                py + 100 <= plat.y + vy &&  // Bottom of 100px player
                py + 100 + vy >= plat.y &&  // Bottom of player + velocity
                px + 80 > plat.x && px + 20 < plat.x + plat.width  // Adjusted for 100px width
            ) {
                // --- Check if landing on a brown platform ---
                const platColor = plat.el.style.background;
                if (
                    vy > 0 &&
                    (platColor === '#BF6C46' || platColor === 'rgb(191, 108, 70)')
                ) {
                    // Get counters
                    const healthValue = document.getElementById('health-value');
                    const moneyValue = document.getElementById('money-value');
                    const msg = document.getElementById('message-bar');
                    let healthNum = parseInt(healthValue.textContent, 10);
                    let moneyNum = parseInt(moneyValue.textContent, 10);

                    // Helper: move player to nearest blue platform above or below
                    function moveToBluePlatform() {
                        // Find all blue platforms
                        let bluePlats = platforms.filter(p =>
                            p.el.style.background === '#77A8BB' ||
                            p.el.style.background === 'rgb(119, 168, 187)'
                        );
                        // Find the closest blue platform vertically to current py
                        let closest = null;
                        let minDist = Infinity;
                        for (let bp of bluePlats) {
                            let dist = Math.abs((py + 100) - bp.y); // Use 100px height
                            if (dist < minDist) {
                                minDist = dist;
                                closest = bp;
                            }
                        }
                        if (closest) {
                            px = closest.x + closest.width / 2 - 50; // Center the 100px player
                            py = closest.y - 100; // Position above platform
                            vy = 0;
                            // Update last safe position
                            lastSafeX = px;
                            lastSafeY = py;
                        }
                    }

                    // If player has medicine, lose 1 medicine and move to blue platform
                    if (healthNum > 0) {
                        healthNum -= 1;
                        healthValue.textContent = healthNum;
                        if (msg) {
                            msg.textContent = 'Uh-oh, you got sick! -1 MEDICINE';
                            setTimeout(() => { msg.textContent = ''; }, 2000);
                        }
                        moveToBluePlatform();
                    }
                    // If no medicine, but enough money, lose $5 and move to blue platform
                    else if (moneyNum > 4) {
                        moneyNum -= 5;
                        moneyValue.textContent = moneyNum;
                        if (msg) {
                            msg.textContent = 'Uh-oh, you got sick! -5 DOLLARS';
                            setTimeout(() => { msg.textContent = ''; }, 2000);
                        }
                        moveToBluePlatform();
                    }
                    // If no medicine and not enough money, freeze game and show message
                    else {
                        if (msg) {
                            msg.textContent = "Uh-oh, you got sick! Try again?";
                        }
                        // Stop the game loop by not calling requestAnimationFrame again
                        return;
                    }
                } else {
                    // Land on platform normally
                    py = plat.y - 100; // Position above platform for 100px height
                    vy = 0;
                    onGround = true;
                    
                    // If landing on a blue platform, update last safe position
                    if (platColor === '#77A8BB' || platColor === 'rgb(119, 168, 187)') {
                        lastSafeX = px;
                        lastSafeY = py;
                    }
                }
            }
        }

        // If player falls below screen, reset to random blue platform
        if (py > areaHeight) {
            // Find all blue platforms currently on screen
            let bluePlats = platforms.filter(p =>
                p.el.style.background === '#77A8BB' ||
                p.el.style.background === 'rgb(119, 168, 187)'
            );
            
            // If there are blue platforms, pick a random one
            if (bluePlats.length > 0) {
                const randomBlue = bluePlats[Math.floor(Math.random() * bluePlats.length)];
                px = randomBlue.x + randomBlue.width / 2 - 50; // Center the 100px player
                py = randomBlue.y - 100; // Position above platform
                vy = 0;
                scrollY = 0;
                // Update last safe position to this new random location
                lastSafeX = px;
                lastSafeY = py;
            } else {
                // If no blue platforms exist, use the last safe position as backup
                px = lastSafeX;
                py = lastSafeY;
                vy = 0;
                scrollY = 0;
            }
        }

        // Scroll platforms down as player moves up
        if (py < areaHeight / 2) {
            const diff = areaHeight / 2 - py;
            py = areaHeight / 2;
            scrollY += diff;
            // Move all platforms down
            for (let plat of platforms) {
                plat.y += diff;
                plat.el.style.top = `${plat.y}px`;
            }
        }

        // Remove platforms that go off the bottom and add new ones at the top
        // Before removing a platform, also remove its coin from the DOM if it exists
        platforms = platforms.filter(plat => {
            if (plat.y >= areaHeight) {
                // If the platform has a coin, remove it from the DOM
                if (plat.coin && plat.coin.parentNode) {
                    plat.coin.parentNode.removeChild(plat.coin);
                }
                // Remove the platform element from the DOM
                if (plat.el && plat.el.parentNode) {
                    plat.el.parentNode.removeChild(plat.el);
                }
                return false; // Remove this platform from the array
            }
            return true; // Keep this platform
        });

        while (platforms.length < platformCount) {
            // Find highest platform
            const highest = platforms.reduce((a, b) => (a.y < b.y ? a : b), {y: areaHeight});
            // New y above highest
            const newY = highest.y - (platformMinGapY + Math.floor(Math.random() * (platformMaxGapY - platformMinGapY)));
            createPlatform(newY);
        }

        // Update player DOM position
        player.style.left = `${px}px`;
        player.style.top = `${py}px`;

        // --- Coin collection check ---
        for (let plat of platforms) {
            if (plat.coin && plat.coin.getAttribute('data-collected') === 'false') {
                // Get player and coin positions
                const playerRect = player.getBoundingClientRect();
                const coinRect = plat.coin.getBoundingClientRect();
                // Check if player's feet are touching the coin (simple overlap)
                if (
                    playerRect.bottom >= coinRect.top &&
                    playerRect.top < coinRect.bottom &&
                    playerRect.left < coinRect.right &&
                    playerRect.right > coinRect.left
                ) {
                    plat.coin.setAttribute('data-collected', 'true');
                    plat.coin.style.display = 'none';
                    // Always get the current money value from the DOM and increment it
                    const moneyValue = document.getElementById('money-value');
                    if (moneyValue) {
                        let currentMoney = parseInt(moneyValue.textContent, 10);
                        currentMoney++;
                        moneyValue.textContent = currentMoney;
                    }
                }
            }
        }

        requestAnimationFrame(gameLoop);
    }

    // Start the game loop
    requestAnimationFrame(gameLoop);

    // Return both gameArea and controls if mobile, else just gameArea
    if (isMobile) {
        // Wrap in a container to keep layout simple for students
        const wrapper = document.createElement('div');
        wrapper.style.display = 'flex';
        wrapper.style.flexDirection = 'column';
        wrapper.style.alignItems = 'center';
        wrapper.appendChild(gameArea);
        wrapper.appendChild(controls);
        return wrapper;
    } else {
        return gameArea;
    }
}

// Function to show a new screen with a message or the game
function showScreen(message) {
    // Hide the menu
    menu.style.display = 'none';

    // Remove any old screen if present
    const oldScreen = document.getElementById('screen');
    if (oldScreen) {
        oldScreen.remove();
    }

    // If message is "GAME", show the game screen
    if (message === 'GAME') {
        // Create the game screen container
        const screen = document.createElement('div');
        screen.id = 'screen';
        screen.style.display = 'flex';
        screen.style.flexDirection = 'column';
        screen.style.alignItems = 'center';
        screen.style.justifyContent = 'flex-start';
        screen.style.minHeight = '100vh';
        screen.style.color = '#fff';
        screen.style.fontFamily = `'Press Start 2P', monospace`;
        screen.style.fontSize = '1.2rem';
        screen.setAttribute('role', 'region');
        screen.setAttribute('tabindex', '-1');
        screen.setAttribute('aria-label', 'Game Screen');

        // Set all counters to zero at the start of the game
        let money = 0;
        let food = 0; // Start food at 0, not 100
        let health = 0;
        // let hunger = 100; // Hunger bar starts full (removed unused variable)

        // Create the HUD with starting values
        const startTime = 180; // 3 minutes in seconds
        let timeLeft = startTime;
        const hud = createHUD(money, food, health, timeLeft);
        screen.appendChild(hud);

        // Add the game area with platforms
        const gameAreaOrWrapper = createGameArea();
        screen.appendChild(gameAreaOrWrapper);

        // --- Hunger bar segment logic ---
        let jumpCount = 0;
        let hungerSegments = hud._hungerSegments;
        let segmentsLeft = 10;

        // Set jump powers for normal and much lower jumps
        let jumpPowerNormal = -25; // Increased from -22 to make jumping even higher/faster
        window.currentJumpPower = jumpPowerNormal;

        // Listen for jump events and update hunger bar segments (visual only)
        document.addEventListener('keydown', function(e) {
            if (
                (e.code === 'Space' || e.code === 'ArrowUp' || e.code === 'KeyW')
            ) {
                // Find the player element
                const player = document.getElementById('player');
                if (player) {
                    if (player.getAttribute('data-on-ground') === 'true') {
                        jumpCount++;
                        // Every 15 jumps, hide a segment
                        if (jumpCount % 15 === 0 && segmentsLeft > 0) {
                            segmentsLeft--;
                            // Visually show how many segments are left
                            for (let i = 0; i < 10; i++) {
                                if (i < segmentsLeft) {
                                    hungerSegments[i].style.background = '#fff';
                                } else {
                                    hungerSegments[i].style.background = '#181818';
                                }
                            }
                        }
                    }
                }
            }
        });

        // --- Decrease hunger bar every 5 seconds (visual only) ---
        // let hungerFrozen = false; // Removed unused variable
        let hungerInterval = setInterval(() => {
            // Skip hunger decrease on Easy difficulty
            if (selectedDifficulty === 'Easy') {
                return; // Keep hunger full on easy mode
            }

            if (segmentsLeft > 0) {
                segmentsLeft--;
                for (let i = 0; i < 10; i++) {
                    if (i < segmentsLeft) {
                        hungerSegments[i].style.background = '#fff';
                    } else {
                        hungerSegments[i].style.background = '#2A2A2A'; // Updated to match new game area color
                    }
                }
                // If hunger just reached 0, handle food/money logic
                if (segmentsLeft === 0) {
                    const msg = document.getElementById('message-bar');
                    const foodValue = document.getElementById('food-value');
                    const moneyValue = document.getElementById('money-value');
                    let foodNum = parseInt(foodValue.textContent, 10);
                    let moneyNum = parseInt(moneyValue.textContent, 10);

                    // If player has food, eat food
                    if (foodNum > 0) {
                        foodNum -= 1;
                        foodValue.textContent = foodNum;
                        if (msg) {
                            msg.textContent = "Uh-oh, you have to eat! -1 FOOD";
                            setTimeout(() => { msg.textContent = ''; }, 2000);
                        }
                        // Refill hunger bar after eating
                        segmentsLeft = 10;
                        for (let i = 0; i < 10; i++) {
                            hungerSegments[i].style.background = '#fff';
                        }
                    }
                    // If player has 3 or more coins, buy food automatically
                    else if (moneyNum >= 3) {
                        moneyNum -= 3;
                        moneyValue.textContent = moneyNum;
                        if (msg) {
                            msg.textContent = "Uh-oh, you need food! -3 DOLLARS";
                            setTimeout(() => { msg.textContent = ''; }, 2000);
                        }
                        // Refill hunger bar after buying food
                        segmentsLeft = 10;
                        for (let i = 0; i < 10; i++) {
                            hungerSegments[i].style.background = '#fff';
                        }
                    }
                    // If no food and not enough money, freeze game and show message
                    else {
                        if (msg) {
                            msg.textContent = "Uh-oh, you're too hungry! Try again?";
                        }
                        clearInterval(hungerInterval);
                    }
                }
            }
        }, 5000);

        // --- Remove the patch that changes jump power based on hunger ---
        // Only update the player's onGround attribute for visuals
        setTimeout(() => {
            function patchPlayerOnGround() {
                const player = document.getElementById('player');
                if (player) {
                    // Patch onGround attribute
                    const plats = Array.from(document.querySelectorAll('.platform'));
                    let playerRect = player.getBoundingClientRect();
                    let onGroundNow = false;
                    for (let plat of plats) {
                        let platRect = plat.getBoundingClientRect();
                        if (
                            playerRect.bottom <= platRect.top + 2 &&
                            playerRect.bottom + 2 >= platRect.top &&
                            playerRect.right > platRect.left + 20 && // Adjusted for 100px width
                            playerRect.left < platRect.right - 20   // Adjusted for 100px width
                        ) {
                            onGroundNow = true;
                        }
                    }
                    player.setAttribute('data-on-ground', onGroundNow ? 'true' : 'false');
                }
                requestAnimationFrame(patchPlayerOnGround);
            }
            patchPlayerOnGround();
        }, 500);

        // Timer countdown
        let timerInterval = setInterval(() => {
            timeLeft--;
            const timerDiv = document.getElementById('timer');
            if (timerDiv) timerDiv.textContent = formatTime(timeLeft);
            if (timeLeft <= 0) {
                clearInterval(timerInterval);
                clearInterval(hungerInterval);
                // Show game over message
                alert('Time is up!');
            }
        }, 1000);

        // --- Reset Button ---
        // This button will reset the game completely
        const resetBtn = document.createElement('button');
        resetBtn.textContent = 'Reset Game';
        resetBtn.className = 'menu-btn';
        resetBtn.style.marginTop = '16px';
        resetBtn.onclick = function() {
            playButtonSound(); // Add sound effect
            // Clear intervals to stop timers
            clearInterval(timerInterval);
            clearInterval(hungerInterval);
            // Remove the current game screen
            screen.remove();
            // Show a new game screen (fresh start)
            showScreen('GAME');
        };
        resetBtn.setAttribute('aria-label', 'Reset the game');
        screen.appendChild(resetBtn);

        // Add a back button to return to menu
        const backBtn = document.createElement('button');
        backBtn.textContent = 'Back to Menu';
        backBtn.className = 'menu-btn';
        backBtn.style.marginTop = '16px';
        backBtn.onclick = function() {
            playButtonSound(); // Add sound effect
            clearInterval(timerInterval);
            clearInterval(hungerInterval);
            screen.remove();
            menu.style.display = 'flex';
            const title = document.getElementById('main-title');
            if (title) {
                title.focus();
            }
        };
        backBtn.setAttribute('aria-label', 'Back to Main Menu');
        screen.appendChild(backBtn);

        // Add the new screen to the body
        document.body.appendChild(screen);

        // Move focus to the new screen for accessibility
        screen.focus();
        return;
    }

    // Otherwise, show a simple message screen
    const screen = document.createElement('div');
    screen.id = 'screen';
    screen.style.display = 'flex';
    screen.style.flexDirection = 'column';
    screen.style.alignItems = 'center';
    screen.style.justifyContent = 'center';
    screen.style.minHeight = '100vh';
    screen.style.color = '#fff';
    screen.style.fontFamily = `'Press Start 2P', monospace`;
    screen.style.fontSize = '1.2rem';
    screen.setAttribute('role', 'region');
    screen.setAttribute('tabindex', '-1');
    screen.setAttribute('aria-label', 'Game Screen');

    const msg = document.createElement('div');
    msg.textContent = message;
    msg.style.textAlign = 'center';
    msg.style.maxWidth = '90vw';
    screen.appendChild(msg);

    const backBtn = document.createElement('button');
    backBtn.textContent = 'Back to Menu';
    backBtn.className = 'menu-btn';
    backBtn.style.marginTop = '32px';
    backBtn.onclick = function() {
        playButtonSound(); // Add sound effect
        screen.remove();
        menu.style.display = 'flex';
        const title = document.getElementById('main-title');
        if (title) {
            title.focus();
        }
    };
    backBtn.setAttribute('aria-label', 'Back to Main Menu');
    screen.appendChild(backBtn);

    document.body.appendChild(screen);
}

// --- Add a large jerry can image above the main title on the main menu ---
window.addEventListener('DOMContentLoaded', function() {
    // Only add if on the menu screen and not already present
    const menu = document.getElementById('menu');
    // Remove the old jerrycan-icon if it exists
    const oldJerry = document.getElementById('jerrycan-icon');
    if (oldJerry) {
        oldJerry.remove();
    }
    if (menu && !document.getElementById('jerrycan-icon')) {
        // Create an img element for the jerry can
        const jerryImg = document.createElement('img');
        jerryImg.id = 'jerrycan-icon';
        jerryImg.src = 'img/jerry.png';
        jerryImg.alt = 'Charity: Water Jerry Can Logo';
        // Make the image much bigger for emphasis
        jerryImg.style.width = '180px';
        jerryImg.style.height = '180px';
        jerryImg.style.marginBottom = '28px';
        jerryImg.style.display = 'block';
        jerryImg.style.background = 'none';
        jerryImg.style.border = 'none';
        jerryImg.style.borderRadius = '0';
        jerryImg.style.boxShadow = 'none';
        // Insert above the main title
        const mainTitle = document.getElementById('main-title');
        if (mainTitle) {
            menu.insertBefore(jerryImg, mainTitle);
        }
    }
});

// Add click event listeners to each button
buttons[0].onclick = function() {
    playButtonSound(); // Add sound effect
    // Start button: show the difficulty selection screen
    showDifficultyScreen();
};
buttons[1].onclick = function() {
    playButtonSound(); // Add sound effect
    // How to Play button - create a properly formatted screen
    showHowToPlayScreen();
};
buttons[2].onclick = function() {
    playButtonSound(); // Add sound effect
    // About Charity: Water button - show screen with link
    showAboutCharityWaterScreen();
};

// Function to show the How to Play screen with better formatting
function showHowToPlayScreen() {
    // Hide the menu
    menu.style.display = 'none';

    // Remove any old screen if present
    const oldScreen = document.getElementById('screen');
    if (oldScreen) {
        oldScreen.remove();
    }

    // Create the how to play screen
    const screen = document.createElement('div');
    screen.id = 'screen';
    screen.style.display = 'flex';
    screen.style.flexDirection = 'column';
    screen.style.alignItems = 'center';
    screen.style.justifyContent = 'center';
    screen.style.minHeight = '100vh';
    screen.style.color = '#fff';
    screen.style.fontFamily = `'Press Start 2P', monospace`;
    screen.style.fontSize = '1.2rem';
    screen.style.padding = '20px';
    screen.setAttribute('role', 'region');
    screen.setAttribute('tabindex', '-1');
    screen.setAttribute('aria-label', 'How to Play');

    // Add title
    const title = document.createElement('h2');
    title.textContent = 'How to Play';
    title.style.marginBottom = '30px';
    title.style.textAlign = 'center';
    title.style.fontSize = '1.5rem';
    screen.appendChild(title);

    // Add instructions with better line spacing
    const instructions = document.createElement('p');
    instructions.textContent = 'To play, use WASD or arrow keys to move left/right and to jump. Jump onto the blue platforms and collect coins. But watch out! Avoid jumping on brown platforms, as they will make you sick. Double click on them to clean their water and to make them safe to jump on. You can also use the on-screen controls if you are on a mobile device. The goal is to collect as many coins as possible so that you can afford an education. If you do not have enough food, medicine, or money in the event that you are sick or hungry, you lose. Good luck!';
    instructions.style.textAlign = 'center';
    instructions.style.maxWidth = '90vw';
    instructions.style.lineHeight = '2.2'; // Increased line spacing for better readability
    instructions.style.marginBottom = '40px';
    instructions.style.fontSize = '1rem'; // Slightly smaller font for better fit
    screen.appendChild(instructions);

    // Add back button
    const backBtn = document.createElement('button');
    backBtn.textContent = 'Back to Menu';
    backBtn.className = 'menu-btn';
    backBtn.style.marginTop = '20px';
    backBtn.onclick = function() {
        playButtonSound(); // Add sound effect
        screen.remove();
        menu.style.display = 'flex';
        const title = document.getElementById('main-title');
        if (title) {
            title.focus();
        }
    };
    backBtn.setAttribute('aria-label', 'Back to Main Menu');
    screen.appendChild(backBtn);

    // Add the screen to the body
    document.body.appendChild(screen);
    screen.focus();
}

// Function to show the About Charity: Water screen with link
function showAboutCharityWaterScreen() {
    // Hide the menu
    menu.style.display = 'none';

    // Remove any old screen if present
    const oldScreen = document.getElementById('screen');
    if (oldScreen) {
        oldScreen.remove();
    }

    // Create the about screen
    const screen = document.createElement('div');
    screen.id = 'screen';
    screen.style.display = 'flex';
    screen.style.flexDirection = 'column';
    screen.style.alignItems = 'center';
    screen.style.justifyContent = 'center';
    screen.style.minHeight = '100vh';
    screen.style.color = '#fff';
    screen.style.fontFamily = `'Press Start 2P', monospace`;
    screen.style.fontSize = '1.2rem';
    screen.style.padding = '20px';
    screen.setAttribute('role', 'region');
    screen.setAttribute('tabindex', '-1');
    screen.setAttribute('aria-label', 'About Charity Water');

    // Add title
    const title = document.createElement('h2');
    title.textContent = 'About Charity: Water';
    title.style.marginBottom = '30px';
    title.style.textAlign = 'center';
    title.style.fontSize = '1.5rem';
    screen.appendChild(title);

    // Add description text with better line spacing
    const description = document.createElement('p');
    description.textContent = 'Charity: Water is a non-profit bringing clean water to people in need around the world. This game represents the struggles that many people have to face in order to collect fresh drinking water. Many cannot worry about getting an education before worrying about their health, and many cannot worry about their health before worrying about their drinking water. The player is a young girl, who are often the ones who have to travel long distances to collect water for their families.';
    description.style.textAlign = 'center';
    description.style.maxWidth = '90vw';
    description.style.lineHeight = '2.2'; // Increased line spacing for better readability
    description.style.marginBottom = '30px';
    description.style.fontSize = '1rem'; // Slightly smaller font for better fit
    screen.appendChild(description);

    // Add link to charity:water website
    const link = document.createElement('a');
    link.href = 'https://www.charitywater.org/';
    link.target = '_blank'; // Open in new tab
    link.rel = 'noopener noreferrer'; // Security best practice
    link.textContent = 'Visit Charity: Water';
    link.style.color = '#FFC907'; // Use charity:water yellow
    link.style.textDecoration = 'underline';
    link.style.fontSize = '1rem';
    link.style.marginBottom = '40px';
    link.style.padding = '10px';
    link.style.border = '2px solid #FFC907';
    link.style.borderRadius = '8px';
    link.style.background = 'transparent';
    link.style.transition = 'background 0.2s, color 0.2s';
    link.setAttribute('aria-label', 'Visit Charity Water website (opens in new tab)');

    // Add hover effect for the link
    link.addEventListener('mouseenter', function() {
        link.style.background = '#FFC907';
        link.style.color = '#000';
    });
    link.addEventListener('mouseleave', function() {
        link.style.background = 'transparent';
        link.style.color = '#FFC907';
    });

    screen.appendChild(link);

    // Add back button
    const backBtn = document.createElement('button');
    backBtn.textContent = 'Back to Menu';
    backBtn.className = 'menu-btn';
    backBtn.style.marginTop = '20px';
    backBtn.onclick = function() {
        playButtonSound(); // Add sound effect
        screen.remove();
        menu.style.display = 'flex';
        const title = document.getElementById('main-title');
        if (title) {
            title.focus();
        }
    };
    backBtn.setAttribute('aria-label', 'Back to Main Menu');
    screen.appendChild(backBtn);

    // Add the screen to the body
    document.body.appendChild(screen);
    screen.focus();
}
