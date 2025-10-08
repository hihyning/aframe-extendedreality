// A-Frame Extended Reality Main JavaScript

// Wait for A-Frame to be ready
document.addEventListener('DOMContentLoaded', function() {
    console.log('A-Frame Extended Reality project initialized');
    
    // Initialize the scene
    initScene();
    
    // Add event listeners
    setupEventListeners();
    
    // Add custom components if needed
    registerCustomComponents();
});

// Initialize the A-Frame scene
function initScene() {
    const scene = document.querySelector('a-scene');
    
    if (!scene) {
        console.error('A-Frame scene not found');
        return;
    }
    
    console.log('Scene initialized successfully');
    
    // Add loading screen
    addLoadingScreen();
    
    // Hide loading screen when scene is loaded
    scene.addEventListener('loaded', function() {
        hideLoadingScreen();
    });
}

// Add loading screen
function addLoadingScreen() {
    const loadingScreen = document.createElement('div');
    loadingScreen.className = 'loading-screen';
    loadingScreen.innerHTML = `
        <div>
            <h2>Loading A-Frame Scene...</h2>
            <p>Please wait while the 3D environment loads</p>
        </div>
    `;
    document.body.appendChild(loadingScreen);
}

// Hide loading screen
function hideLoadingScreen() {
    const loadingScreen = document.querySelector('.loading-screen');
    if (loadingScreen) {
        loadingScreen.classList.add('hidden');
        setTimeout(() => {
            loadingScreen.remove();
        }, 500);
    }
}

// Setup event listeners
function setupEventListeners() {
    // VR mode change detection
    const scene = document.querySelector('a-scene');
    if (scene) {
        scene.addEventListener('enter-vr', function() {
            console.log('Entered VR mode');
            document.body.classList.add('vr-mode');
        });
        
        scene.addEventListener('exit-vr', function() {
            console.log('Exited VR mode');
            document.body.classList.remove('vr-mode');
        });
    }
    
    // Add controls info
    addControlsInfo();
    
    // Add click handlers for interactive objects
    addInteractiveHandlers();
}

// Add controls information
function addControlsInfo() {
    const controlsInfo = document.createElement('div');
    controlsInfo.className = 'controls-info';
    controlsInfo.innerHTML = `
        <h3>Controls</h3>
        <ul>
            <li>Mouse: Look around</li>
            <li>WASD: Move around</li>
            <li>Click: Interact with objects</li>
            <li>VR: Use VR headset for immersive experience</li>
        </ul>
    `;
    document.body.appendChild(controlsInfo);
}

// Add interactive handlers
function addInteractiveHandlers() {
    // Make objects interactive
    const interactiveObjects = document.querySelectorAll('a-box, a-sphere, a-cylinder');
    
    interactiveObjects.forEach(obj => {
        obj.classList.add('custom-entity');
        
        // Add click handler
        obj.addEventListener('click', function() {
            console.log('Clicked on:', obj.tagName);
            
            // Add some interaction - change color
            const colors = ['#4CC3D9', '#EF2D5E', '#FFC65D', '#7BC8A4', '#404040'];
            const randomColor = colors[Math.floor(Math.random() * colors.length)];
            obj.setAttribute('color', randomColor);
            
            // Add animation
            obj.setAttribute('animation', 'property: rotation; to: 0 360 0; dur: 1000; easing: easeInOutQuad');
        });
        
        // Add hover effects
        obj.addEventListener('mouseenter', function() {
            obj.setAttribute('scale', '1.1 1.1 1.1');
        });
        
        obj.addEventListener('mouseleave', function() {
            obj.setAttribute('scale', '1 1 1');
        });
    });
}

// Register custom A-Frame components
function registerCustomComponents() {
    // Example custom component for extended functionality
    AFRAME.registerComponent('custom-behavior', {
        init: function() {
            console.log('Custom behavior component initialized');
            
            // Add custom logic here
            this.el.addEventListener('click', function() {
                console.log('Custom behavior triggered');
            });
        }
    });
}

// Utility functions
function createBox(position, color = '#4CC3D9') {
    const box = document.createElement('a-box');
    box.setAttribute('position', position);
    box.setAttribute('color', color);
    box.classList.add('custom-entity');
    return box;
}

function createSphere(position, radius = 1, color = '#EF2D5E') {
    const sphere = document.createElement('a-sphere');
    sphere.setAttribute('position', position);
    sphere.setAttribute('radius', radius);
    sphere.setAttribute('color', color);
    sphere.classList.add('custom-entity');
    return sphere;
}

// Export functions for use in other modules
window.AFrameXR = {
    createBox,
    createSphere,
    initScene
};
