// Initialize Lucide Icons for all elements with data-lucide attribute
// Note: Lucide script is loaded in index.html
lucide.createIcons();

// --- General Interaction Logic ---

// Smooth Scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
        // Close mobile menu after clicking a link
        document.getElementById('mobile-menu').classList.add('hidden');
    });
});

// Mobile Menu Toggle
document.getElementById('mobile-menu-button').addEventListener('click', () => {
    const menu = document.getElementById('mobile-menu');
    menu.classList.toggle('hidden');
});

// Contact Form Submission (Simulated)
document.getElementById('contact-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const messageElement = document.getElementById('form-message');
    // Simulate API call success
    messageElement.textContent = 'Thank you for your message! I will get back to you soon.';
    messageElement.classList.remove('text-red-400');
    messageElement.classList.add('text-green-400');
    this.reset();

    // Clear message after 5 seconds
    setTimeout(() => {
        messageElement.textContent = '';
    }, 5000);
});


// --- Three.js Setup and Animations ---

// Helper function to handle canvas resizing
function resizeCanvas(canvas, camera, renderer, container) {
    const width = container.clientWidth;
    const height = container.clientHeight;
    renderer.setSize(width, height);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
}

// 1. Hero Section 3D Visual (Abstract Computer Setup/Visuals)
function initHeroScene() {
    // THREE.js is assumed to be loaded via CDN in index.html
    const container = document.getElementById('hero-canvas');
    if (!container) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ canvas: container, alpha: true, antialias: true });
    renderer.setClearColor(0x000000, 0); // Transparent background

    resizeCanvas(container, camera, renderer, container.parentElement);
    window.addEventListener('resize', () => resizeCanvas(container, camera, renderer, container.parentElement));
    
    camera.position.z = 5;

    // Abstract Shape (TorusKnot - resembles intertwined wires/visuals)
    const geometry = new THREE.TorusKnotGeometry(1.5, 0.5, 100, 16);
    const material = new THREE.MeshPhongMaterial({
        color: 0x6366f1, // Indigo color
        shininess: 100,
    });
    const torusKnot = new THREE.Mesh(geometry, material);
    scene.add(torusKnot);

    // Lighting
    const pointLight = new THREE.PointLight(0xffffff, 1.5);
    pointLight.position.set(5, 5, 5);
    scene.add(pointLight);

    const ambientLight = new THREE.AmbientLight(0x404040, 1.0);
    scene.add(ambientLight);

    // Animation Loop
    function animateHero() {
        requestAnimationFrame(animateHero);

        // Rotate the shape for a subtle dynamic effect
        torusKnot.rotation.x += 0.005;
        torusKnot.rotation.y += 0.005;

        renderer.render(scene, camera);
    }

    animateHero();
}

// 2. Contact Section 3D Visual (Stylized Globe)
function initContactScene() {
    const container = document.getElementById('contact-canvas');
    const visualContainer = document.getElementById('contact-visual-container');
    if (!container || !visualContainer) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, visualContainer.clientWidth / visualContainer.clientHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ canvas: container, alpha: true, antialias: true });
    renderer.setClearColor(0x000000, 0); // Transparent background

    resizeCanvas(container, camera, renderer, visualContainer);
    window.addEventListener('resize', () => resizeCanvas(container, camera, renderer, visualContainer));
    
    camera.position.z = 5;

    // Stylized Globe (Wireframe Sphere)
    const geometry = new THREE.IcosahedronGeometry(2.5, 1);
    const material = new THREE.MeshBasicMaterial({
        color: 0xa78bfa, // Light purple
        wireframe: true,
        transparent: true,
        opacity: 0.8
    });
    const globe = new THREE.Mesh(geometry, material);
    scene.add(globe);

    // Another layer for depth and visual complexity (Pink Winding effect)
    const geometry2 = new THREE.SphereGeometry(2.5, 32, 32);
    const material2 = new THREE.MeshStandardMaterial({
        color: 0xf472b6, // Pink color
        metalness: 0.5,
        roughness: 0.5,
        transparent: true,
        opacity: 0.3
    });
    const globe2 = new THREE.Mesh(geometry2, material2);
    scene.add(globe2);


    // Lighting
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1.0);
    directionalLight.position.set(5, 5, 5);
    scene.add(directionalLight);

    const ambientLight = new THREE.AmbientLight(0x404040, 0.5);
    scene.add(ambientLight);

    // Animation Loop
    function animateContact() {
        requestAnimationFrame(animateContact);

        // Rotate the globes slowly
        globe.rotation.y += 0.003;
        globe2.rotation.y -= 0.002;

        renderer.render(scene, camera);
    }

    animateContact();
}


// Start all Three.js scenes once the window has fully loaded
window.onload = function () {
    initHeroScene();
    initContactScene();
}