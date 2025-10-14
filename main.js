// Mystical Cloud Journey

// Add loading screen
function addLoadingScreen() {
    const loadingScreen = document.createElement('div');
    loadingScreen.className = 'loading-screen';
    loadingScreen.innerHTML = `
        <div>
            <h2>Loading Mystical Cloud Journey...</h2>
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

// Wait for A-Frame to be ready
document.addEventListener('DOMContentLoaded', function() {
    console.log('Mystical Cloud Journey initialized');
    
    // Add loading screen
    addLoadingScreen();
    
    // Check if A-Frame is loaded
    if (typeof AFRAME === 'undefined') {
        console.error('A-Frame not loaded');
        setTimeout(() => {
            hideLoadingScreen();
            alert('A-Frame failed to load. Please refresh the page.');
        }, 2000);
        return;
    }
    
    // Initialize the scene
    initCloudScene();
    
    // Setup controls and UI
    setupControls();
    
    // Register custom components
    registerCloudComponents();
});

// Initialize the mystical cloud scene
function initCloudScene() {
    const scene = document.querySelector('a-scene');
    
    if (!scene) {
        console.error('A-Frame scene not found');
        hideLoadingScreen();
        return;
    }
    
    console.log('Mystical cloud scene initialized');
    
    // Generate clouds when scene is loaded
    scene.addEventListener('loaded', function() {
        console.log('A-Frame scene loaded, generating clouds...');
        try {
            generateClouds();
            generateSunlightBeams();
            addControlsInfo();
            hideLoadingScreen();
            console.log('Scene fully loaded and ready!');
        } catch (error) {
            console.error('Error generating clouds:', error);
            hideLoadingScreen();
        }
    });
    
    // Fallback timeout in case scene doesn't load
    setTimeout(() => {
        const loadingScreen = document.querySelector('.loading-screen');
        if (loadingScreen && !loadingScreen.classList.contains('hidden')) {
            console.log('Scene loading timeout, forcing hide of loading screen');
            hideLoadingScreen();
        }
    }, 10000); // 10 second timeout
}

// Generate mystical clouds
function generateClouds() {
    const cloudContainer = document.querySelector('#cloud-container');
    
    if (!cloudContainer) {
        console.error('Cloud container not found');
        return;
    }
    
    console.log('Generating mystical clouds...');
    
    try {
        // Generate massive cloud formations - WAY MORE CLOUDS!
        for (let i = 0; i < 200; i++) { // Increased from 50 to 200
            const x = (Math.random() - 0.5) * 200; // Expanded range
            const y = Math.random() * 40 + 5; // Between 5 and 45 height
            const z = (Math.random() - 0.5) * 200; // Expanded range
            
            createCloud(x, y, z, cloudContainer);
        }
        
        // Generate floating cloud particles - MANY MORE!
        for (let i = 0; i < 500; i++) { // Increased from 100 to 500
            const x = (Math.random() - 0.5) * 300; // Much larger range
            const y = Math.random() * 50 + 2; // Higher altitude range
            const z = (Math.random() - 0.5) * 300; // Much larger range
            
            createCloudParticle(x, y, z, cloudContainer);
        }
        
        // Generate small cloud clusters
        for (let i = 0; i < 150; i++) {
            const x = (Math.random() - 0.5) * 250;
            const y = Math.random() * 35 + 3;
            const z = (Math.random() - 0.5) * 250;
            
            createSmallCloudCluster(x, y, z, cloudContainer);
        }
        
        // Generate high altitude clouds
        for (let i = 0; i < 100; i++) {
            const x = (Math.random() - 0.5) * 400;
            const y = Math.random() * 20 + 30; // High altitude
            const z = (Math.random() - 0.5) * 400;
            
            createHighCloud(x, y, z, cloudContainer);
        }
        
        console.log('Mystical clouds generated successfully');
    } catch (error) {
        console.error('Error generating clouds:', error);
    }
}

// Generate golden sunlight beams
function generateSunlightBeams() {
    const cloudContainer = document.querySelector('#cloud-container');
    
    if (!cloudContainer) {
        console.error('Cloud container not found');
        return;
    }
    
    console.log('Generating sunlight beams...');
    
    // Create multiple sunlight beam areas
    for (let i = 0; i < 8; i++) {
        const angle = (i / 8) * Math.PI * 2;
        const radius = 15 + Math.random() * 20;
        const x = Math.cos(angle) * radius;
        const z = Math.sin(angle) * radius;
        const y = 5 + Math.random() * 10;
        
        createSunlightBeam(x, y, z, cloudContainer);
    }
    
    // Create central beam
    createSunlightBeam(0, 8, 0, cloudContainer);
    
    console.log('Sunlight beams generation completed');
}

// Create individual sunlight beam
function createSunlightBeam(x, y, z, container) {
    try {
        const beam = document.createElement('a-entity');
        beam.setAttribute('position', `${x} ${y} ${z}`);
        
        // Create infinite vertical beam using a very tall cylinder
        const beamCylinder = document.createElement('a-cylinder');
        beamCylinder.setAttribute('radius', 1.2);
        beamCylinder.setAttribute('height', 200); // Very tall to simulate infinite
        beamCylinder.setAttribute('position', '0 0 0');
        beamCylinder.setAttribute('color', '#FFD700');
        beamCylinder.setAttribute('material', 'opacity: 0.15; transparent: true; emissive: #FFD700; emissiveIntensity: 0.2; side: double');
        beamCylinder.setAttribute('rotation', '0 0 0');
        
        beam.appendChild(beamCylinder);
        
        // Add subtle gradient effect with multiple overlapping cylinders
        const gradientBeam1 = document.createElement('a-cylinder');
        gradientBeam1.setAttribute('radius', 0.8);
        gradientBeam1.setAttribute('height', 200);
        gradientBeam1.setAttribute('position', '0 0 0');
        gradientBeam1.setAttribute('color', '#FFD700');
        gradientBeam1.setAttribute('material', 'opacity: 0.1; transparent: true; emissive: #FFD700; emissiveIntensity: 0.3; side: double');
        gradientBeam1.setAttribute('rotation', '0 0 0');
        
        beam.appendChild(gradientBeam1);
        
        const gradientBeam2 = document.createElement('a-cylinder');
        gradientBeam2.setAttribute('radius', 0.4);
        gradientBeam2.setAttribute('height', 200);
        gradientBeam2.setAttribute('position', '0 0 0');
        gradientBeam2.setAttribute('color', '#FFD700');
        gradientBeam2.setAttribute('material', 'opacity: 0.08; transparent: true; emissive: #FFD700; emissiveIntensity: 0.4; side: double');
        gradientBeam2.setAttribute('rotation', '0 0 0');
        
        beam.appendChild(gradientBeam2);
        
        beam.classList.add('sunlight-beam');
        container.appendChild(beam);
        
    } catch (error) {
        console.error('Error creating sunlight beam:', error);
    }
}

// Create a mystical cloud formation
function createCloud(x, y, z, container) {
    try {
        const cloud = document.createElement('a-entity');
        cloud.setAttribute('position', `${x} ${y} ${z}`);
        
        // Create multiple cloud spheres for natural look
        const cloudSpheres = 8 + Math.floor(Math.random() * 5); // 8-12 spheres per cloud
        
        for (let i = 0; i < cloudSpheres; i++) {
            const sphere = document.createElement('a-sphere');
            const radius = 2 + Math.random() * 4; // 2-6 radius
            const offsetX = (Math.random() - 0.5) * 8;
            const offsetY = (Math.random() - 0.5) * 3;
            const offsetZ = (Math.random() - 0.5) * 8;
            
            sphere.setAttribute('radius', radius);
            sphere.setAttribute('position', `${offsetX} ${offsetY} ${offsetZ}`);
            sphere.setAttribute('color', '#FFFFFF');
            sphere.setAttribute('material', 'opacity: 0.7; transparent: true; roughness: 0.1; metalness: 0.0');
            sphere.setAttribute('animation', `property: rotation; to: 0 360 0; dur: ${20000 + Math.random() * 10000}; loop: true; easing: linear`);
            
            cloud.appendChild(sphere);
        }
        
        cloud.classList.add('cloud-formation');
        container.appendChild(cloud);
    } catch (error) {
        console.error('Error creating cloud:', error);
    }
}

// Create floating cloud particles
function createCloudParticle(x, y, z, container) {
    try {
        const particle = document.createElement('a-sphere');
        const radius = 0.5 + Math.random() * 1.5; // 0.5-2 radius
        
        particle.setAttribute('position', `${x} ${y} ${z}`);
        particle.setAttribute('radius', radius);
        particle.setAttribute('color', '#FFFFFF');
        particle.setAttribute('material', 'opacity: 0.5; transparent: true; roughness: 0.1; metalness: 0.0');
        particle.setAttribute('animation', `property: position; to: ${x} ${y + 2} ${z}; dur: ${15000 + Math.random() * 10000}; loop: true; dir: alternate; easing: easeInOutQuad`);
        
        particle.classList.add('cloud-particle');
        container.appendChild(particle);
    } catch (error) {
        console.error('Error creating cloud particle:', error);
    }
}

// Create small cloud clusters
function createSmallCloudCluster(x, y, z, container) {
    try {
        const cluster = document.createElement('a-entity');
        cluster.setAttribute('position', `${x} ${y} ${z}`);
        
        // Create 3-6 small spheres for cluster
        const clusterSpheres = 3 + Math.floor(Math.random() * 4);
        
        for (let i = 0; i < clusterSpheres; i++) {
            const sphere = document.createElement('a-sphere');
            const radius = 0.8 + Math.random() * 1.5; // Smaller than main clouds
            const offsetX = (Math.random() - 0.5) * 4;
            const offsetY = (Math.random() - 0.5) * 2;
            const offsetZ = (Math.random() - 0.5) * 4;
            
            sphere.setAttribute('radius', radius);
            sphere.setAttribute('position', `${offsetX} ${offsetY} ${offsetZ}`);
            sphere.setAttribute('color', '#FFFFFF');
            sphere.setAttribute('material', 'opacity: 0.6; transparent: true; roughness: 0.1; metalness: 0.0');
            sphere.setAttribute('animation', `property: rotation; to: 0 360 0; dur: ${25000 + Math.random() * 15000}; loop: true; easing: linear`);
            
            cluster.appendChild(sphere);
        }
        
        cluster.classList.add('cloud-cluster');
        container.appendChild(cluster);
    } catch (error) {
        console.error('Error creating cloud cluster:', error);
    }
}

// Create high altitude clouds
function createHighCloud(x, y, z, container) {
    try {
        const cloud = document.createElement('a-entity');
        cloud.setAttribute('position', `${x} ${y} ${z}`);
        
        // Create fewer, larger spheres for high clouds
        const cloudSpheres = 4 + Math.floor(Math.random() * 3); // 4-6 spheres
        
        for (let i = 0; i < cloudSpheres; i++) {
            const sphere = document.createElement('a-sphere');
            const radius = 3 + Math.random() * 5; // Larger radius
            const offsetX = (Math.random() - 0.5) * 12;
            const offsetY = (Math.random() - 0.5) * 4;
            const offsetZ = (Math.random() - 0.5) * 12;
            
            sphere.setAttribute('radius', radius);
            sphere.setAttribute('position', `${offsetX} ${offsetY} ${offsetZ}`);
            sphere.setAttribute('color', '#FFFFFF');
            sphere.setAttribute('material', 'opacity: 0.4; transparent: true; roughness: 0.1; metalness: 0.0');
            sphere.setAttribute('animation', `property: rotation; to: 0 360 0; dur: ${30000 + Math.random() * 20000}; loop: true; easing: linear`);
            
            cloud.appendChild(sphere);
        }
        
        cloud.classList.add('high-cloud');
        container.appendChild(cloud);
    } catch (error) {
        console.error('Error creating high cloud:', error);
    }
}

// Setup controls and UI
function setupControls() {
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
    
    // Add click to focus for pointer lock
    document.addEventListener('click', function() {
        const scene = document.querySelector('a-scene');
        if (scene && !scene.is('vr-mode')) {
            scene.canvas.requestPointerLock();
        }
    });
}

// Add controls information
function addControlsInfo() {
    const controlsInfo = document.createElement('div');
    controlsInfo.className = 'controls-info';
    controlsInfo.innerHTML = `
        <h3>Journey Through the Clouds</h3>
        <p class="experiment-note">An experimental A-Frame experience,<br>VR Compatible</p>
        <p>WASD: Fly through 950+ clouds</p>
        <p>Mouse: Look around</p>
        <p>Click: Focus controls</p>
    `;
    document.body.appendChild(controlsInfo);
}

// Register custom A-Frame components
function registerCloudComponents() {
    // Gradient shader component
    AFRAME.registerShader('gradient', {
        schema: {
            topColor: {type: 'color', is: 'uniform'},
            bottomColor: {type: 'color', is: 'uniform'},
            offset: {type: 'number', is: 'uniform', default: 0},
            exponent: {type: 'number', is: 'uniform', default: 0.6}
        },
        
        vertexShader: `
            varying vec3 vWorldPosition;
            
            void main() {
                vec4 worldPosition = modelMatrix * vec4(position, 1.0);
                vWorldPosition = worldPosition.xyz;
                gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
            }
        `,
        
        fragmentShader: `
            uniform vec3 topColor;
            uniform vec3 bottomColor;
            uniform float offset;
            uniform float exponent;
            
            varying vec3 vWorldPosition;
            
            void main() {
                float h = normalize(vWorldPosition + offset).y;
                gl_FragColor = vec4(mix(bottomColor, topColor, max(pow(max(h, 0.0), exponent), 0.0)), 1.0);
            }
        `
    });
    
    // Cloud interaction component
    AFRAME.registerComponent('cloud-interaction', {
        init: function() {
            this.el.addEventListener('mouseenter', function() {
                this.setAttribute('material', 'opacity: 0.8');
            });
            
            this.el.addEventListener('mouseleave', function() {
                this.setAttribute('material', 'opacity: 0.6');
            });
        }
    });
    
    // Floating animation component
    AFRAME.registerComponent('floating', {
        init: function() {
            const originalY = this.el.getAttribute('position').y;
            this.el.setAttribute('animation', `property: position; to: ${this.el.getAttribute('position').x} ${originalY + 1} ${this.el.getAttribute('position').z}; dur: 3000; loop: true; dir: alternate; easing: easeInOutQuad`);
        }
    });
}

// Export functions for use in other modules
window.MysticalClouds = {
    generateClouds,
    createCloud,
    createCloudParticle
};

