// --- 3D Configuration ---
let scene, camera, renderer, laptopGroup, pivotGroup, screenTarget, screenTexture, screenContext;
let isIntroFinished = false;

// Dimensions
const WIDTH = 3.2, DEPTH = 2.2, THICKNESS = 0.1, SCREEN_THICKNESS = 0.05;

function init3D() {
    const container = document.getElementById('canvas-container');
    if (!container) return; // Guard

    scene = new THREE.Scene();
    // Important: Alpha true to see video background

    camera = new THREE.PerspectiveCamera(35, window.innerWidth / window.innerHeight, 0.1, 100);
    camera.position.set(0, 4, 8);
    camera.lookAt(0, 0, 0);

    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "high-performance" });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    container.appendChild(renderer.domElement);

    // Lighting
    const ambient = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambient);

    const keyLight = new THREE.SpotLight(0xffffff, 10);
    keyLight.position.set(5, 10, 5);
    keyLight.castShadow = true;
    scene.add(keyLight);

    const rimLight = new THREE.SpotLight(0x4455ff, 8);
    rimLight.position.set(-5, 5, -5);
    scene.add(rimLight);

    // Materials
    const matBody = new THREE.MeshStandardMaterial({ color: 0x222222, metalness: 0.9, roughness: 0.2 });
    const matBlack = new THREE.MeshStandardMaterial({ color: 0x050505, metalness: 0.5, roughness: 0.5 });

    // Screen Texture
    const canvas = document.createElement('canvas');
    canvas.width = 1024; canvas.height = 640;
    screenContext = canvas.getContext('2d');
    screenTexture = new THREE.CanvasTexture(canvas);
    screenTexture.center.set(0.5, 0.5);
    screenTexture.rotation = Math.PI;
    screenTexture.flipY = true;
    const matScreen = new THREE.MeshBasicMaterial({ map: screenTexture });

    // Keyboard Texture
    const kbCanvas = document.createElement('canvas');
    kbCanvas.width = 1024; kbCanvas.height = 512;
    const kbCtx = kbCanvas.getContext('2d');
    kbCtx.fillStyle = '#111'; kbCtx.fillRect(0, 0, 1024, 512);
    kbCtx.fillStyle = '#222';
    for (let i = 0; i < 6; i++) {
        for (let j = 0; j < 14; j++) {
            if (i == 5 && j > 3 && j < 10) continue;
            let w = 60; if (i == 5 && j == 3) w = 300;
            kbCtx.fillRect(10 + j * 72, 10 + i * 82, w, 70);
        }
    }
    const kbTex = new THREE.CanvasTexture(kbCanvas);
    const matKb = new THREE.MeshStandardMaterial({ map: kbTex, color: 0x333333 });

    // Build Model
    laptopGroup = new THREE.Group();

    // Base
    const base = new THREE.Mesh(new THREE.BoxGeometry(WIDTH, THICKNESS, DEPTH), matBody);
    base.position.y = THICKNESS / 2;
    base.castShadow = true; base.receiveShadow = true;
    laptopGroup.add(base);

    // Keyboard
    const kb = new THREE.Mesh(new THREE.PlaneGeometry(WIDTH - 0.4, DEPTH - 0.9), matKb);
    kb.rotation.x = -Math.PI / 2;
    kb.position.set(0, THICKNESS + 0.001, -0.2);
    laptopGroup.add(kb);

    // Hinge
    pivotGroup = new THREE.Group();
    pivotGroup.position.set(0, THICKNESS, -DEPTH / 2);
    laptopGroup.add(pivotGroup);

    // Lid
    const lidGeo = new THREE.BoxGeometry(WIDTH, SCREEN_THICKNESS, DEPTH);
    lidGeo.translate(0, SCREEN_THICKNESS / 2, DEPTH / 2);
    const lid = new THREE.Mesh(lidGeo, matBody);
    lid.castShadow = true;
    pivotGroup.add(lid);

    // Screen
    const screen = new THREE.Mesh(new THREE.PlaneGeometry(WIDTH - 0.2, DEPTH - 0.3), matScreen);
    screen.rotation.x = Math.PI / 2;
    screen.rotation.z = Math.PI;
    screen.position.set(0, -0.001, DEPTH / 2);
    pivotGroup.add(screen);

    // Target for camera zoom
    screenTarget = new THREE.Object3D();
    screenTarget.position.set(0, 0, DEPTH / 2);
    pivotGroup.add(screenTarget);

    scene.add(laptopGroup);

    // Initial State
    laptopGroup.position.y = -2;
    laptopGroup.rotation.set(0.5, Math.PI, 0);
    pivotGroup.rotation.x = 0;

    // GSAP Animation Sequence
    const tl = gsap.timeline({ onComplete: finishIntro });

    // 1. Float Up
    tl.to(laptopGroup.position, { y: -0.3, duration: 2, ease: "power2.out" })
        .to(laptopGroup.rotation, { x: 0, y: 0, z: 0, duration: 2.5, ease: "back.out(0.6)" }, "<");

    // 2. Open Lid
    tl.to(pivotGroup.rotation, { x: -1.8, duration: 1.5, ease: "power2.inOut", onStart: () => drawScreen('boot') }, "-=1");

    // 3. Zoom In
    tl.call(() => drawScreen('desktop'), null, "+=0.2");

    const zoomObj = { p: 0 };
    tl.to(zoomObj, {
        p: 1, duration: 2, ease: "power2.inOut",
        onUpdate: () => {
            const progress = zoomObj.p;
            const targetPos = new THREE.Vector3();
            screenTarget.getWorldPosition(targetPos);

            const startPos = new THREE.Vector3(0, 4, 8);
            // End position: In front of screen
            const endPos = new THREE.Vector3(0, targetPos.y, targetPos.z + 1.5);

            camera.position.lerpVectors(startPos, endPos, progress);
            camera.lookAt(new THREE.Vector3().lerpVectors(new THREE.Vector3(0, 0, 0), targetPos, progress));
        }
    }, "+=0.1");

    drawScreen('black');
    animate();
}

function drawScreen(state) {
    const ctx = screenContext;
    const w = ctx.canvas.width, h = ctx.canvas.height;
    ctx.clearRect(0, 0, w, h);

    if (state === 'boot') {
        ctx.fillStyle = '#000'; ctx.fillRect(0, 0, w, h);
        ctx.fillStyle = '#fff';
        ctx.beginPath(); ctx.arc(w / 2, h / 2, 40, 0, Math.PI * 2); ctx.fill();
        // Loading bar
        ctx.fillRect(w / 2 - 80, h / 2 + 80, 160, 4);
    } else if (state === 'desktop') {
        // Screen content
        ctx.fillStyle = '#050507'; ctx.fillRect(0, 0, w, h);
        ctx.fillStyle = '#fff';
        ctx.font = 'bold 80px Inter';
        ctx.textAlign = 'center';
        ctx.fillText('NAYGOLF', w / 2, h / 2);
        ctx.font = '30px Inter';
        ctx.fillStyle = '#888';
        ctx.fillText('Full Stack Developer', w / 2, h / 2 + 60);
        ctx.shadowColor = "white"; ctx.shadowBlur = 20;
    }
    screenTexture.needsUpdate = true;
}

function animate() {
    if (!isIntroFinished) {
        requestAnimationFrame(animate);
        renderer.render(scene, camera);
    }
}

window.finishIntro = function () {
    if (isIntroFinished) return;
    isIntroFinished = true;

    gsap.killTweensOf(camera.position);

    const container = document.getElementById('canvas-container');
    const skipBtn = document.getElementById('skip-btn');

    // Fade out 3D
    container.style.opacity = '0';
    if (skipBtn) skipBtn.style.opacity = '0';

    // Fade in HTML Content
    document.getElementById('web-content').classList.add('visible');
    document.body.classList.remove('intro-active');

    // Trigger Reveals for Split Layout
    document.querySelectorAll('.reveal').forEach(el => {
        gsap.fromTo(el,
            { opacity: 0, y: 30 },
            {
                opacity: 1, y: 0, duration: 1,
                scrollTrigger: { trigger: el, start: "top 85%" }
            }
        );
    });

    setTimeout(() => {
        renderer.dispose();
        container.remove();
        if (skipBtn) skipBtn.remove();
    }, 1000);
};

window.addEventListener('resize', () => {
    if (camera && renderer) {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    }
});

// Initialize
init3D();

// Navbar scroll effect
window.addEventListener('scroll', () => {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('bg-black/80', 'backdrop-blur-xl', 'shadow-lg');
        navbar.classList.remove('bg-black/30', 'backdrop-blur-md');
    } else {
        navbar.classList.remove('bg-black/80', 'backdrop-blur-xl', 'shadow-lg');
        navbar.classList.add('bg-black/30', 'backdrop-blur-md');
    }
});
