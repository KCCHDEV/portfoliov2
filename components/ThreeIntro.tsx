"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import * as THREE from "three";
import gsap from "gsap";

interface ThreeIntroProps {
  onFinish: () => void;
  onComplete: () => void;
}

const CANVAS_W = 1024;
const CANVAS_H = 640;

type ScreenPhase = "black" | "boot" | "brand" | "done";

export default function ThreeIntro({ onFinish, onComplete }: ThreeIntroProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const cancelledRef = useRef(false);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);
  const onFinishRef = useRef(onFinish);
  const onCompleteRef = useRef(onComplete);
  const [isFinished, setIsFinished] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);

  onFinishRef.current = onFinish;
  onCompleteRef.current = onComplete;

  const skipIntro = useCallback(() => {
    setFadeOut(true);
    timelineRef.current?.kill();
    onFinishRef.current();
    setTimeout(() => onCompleteRef.current(), 400);
  }, []);

  useEffect(() => {
    cancelledRef.current = false;
    const container = containerRef.current;
    if (!container) return;

    let scene: THREE.Scene;
    let camera: THREE.PerspectiveCamera;
    let renderer: THREE.WebGLRenderer;
    let deviceGroup: THREE.Group;
    let pivotGroup: THREE.Group;
    let screenTarget: THREE.Object3D;
    let screenTexture: THREE.CanvasTexture;
    let screenContext: CanvasRenderingContext2D;
    let screenPhase: ScreenPhase = "black";
    let bootProgress = 0;
    let brandReveal = 0;

    const WIDTH = 3.2;
    const DEPTH = 2.2;
    const THICKNESS = 0.1;

    const init3D = () => {
      scene = new THREE.Scene();

      // Subtle background gradient (dark blue-black)
      const bgGeometry = new THREE.PlaneGeometry(50, 50);
      const bgMaterial = new THREE.MeshBasicMaterial({
        color: 0x050507,
        side: THREE.BackSide,
      });
      const background = new THREE.Mesh(bgGeometry, bgMaterial);
      background.position.z = -15;
      scene.add(background);

      // Soft glowing orbs for depth
      const orbGeometry = new THREE.SphereGeometry(2, 32, 32);
      const orbMaterial = new THREE.MeshBasicMaterial({
        color: 0x1e3a5f,
        transparent: true,
        opacity: 0.25,
      });
      const orb1 = new THREE.Mesh(orbGeometry, orbMaterial.clone());
      orb1.position.set(-6, 2, -8);
      scene.add(orb1);
      const orb2 = new THREE.Mesh(orbGeometry, orbMaterial.clone());
      orb2.position.set(5, -1, -6);
      orb2.scale.setScalar(0.7);
      scene.add(orb2);
      const orb3 = new THREE.Mesh(orbGeometry, orbMaterial.clone());
      orb3.position.set(0, 4, -10);
      orb3.scale.setScalar(0.5);
      scene.add(orb3);

      camera = new THREE.PerspectiveCamera(
        32,
        window.innerWidth / window.innerHeight,
        0.1,
        100
      );
      camera.position.set(0, 3.5, 9);
      camera.lookAt(0, 0, 0);

      renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        powerPreference: "high-performance",
      });
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setClearColor(0x050507, 0);
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1;
      renderer.outputColorSpace = THREE.SRGBColorSpace;
      container.appendChild(renderer.domElement);
      rendererRef.current = renderer;

      const ambient = new THREE.AmbientLight(0xffffff, 0.4);
      scene.add(ambient);

      const keyLight = new THREE.DirectionalLight(0xffffff, 1.2);
      keyLight.position.set(4, 8, 6);
      keyLight.castShadow = true;
      keyLight.shadow.mapSize.set(1024, 1024);
      scene.add(keyLight);

      const rimLight = new THREE.PointLight(0x3b82f6, 0.8);
      rimLight.position.set(-4, 2, 4);
      scene.add(rimLight);

      const fillLight = new THREE.PointLight(0x6366f1, 0.3);
      fillLight.position.set(2, -1, 5);
      scene.add(fillLight);

      const matBody = new THREE.MeshStandardMaterial({
        color: 0x0f0f11,
        metalness: 0.85,
        roughness: 0.15,
        envMapIntensity: 0.5,
      });

      const canvas = document.createElement("canvas");
      canvas.width = CANVAS_W;
      canvas.height = CANVAS_H;
      screenContext = canvas.getContext("2d")!;
      screenTexture = new THREE.CanvasTexture(canvas);
      screenTexture.center.set(0.5, 0.5);
      screenTexture.rotation = Math.PI;
      screenTexture.flipY = true;

      const matScreen = new THREE.MeshBasicMaterial({
        map: screenTexture,
        toneMapped: false,
      });

      deviceGroup = new THREE.Group();
      screenTarget = new THREE.Object3D();

      const base = new THREE.Mesh(
        new THREE.BoxGeometry(WIDTH, THICKNESS, DEPTH),
        matBody
      );
      base.position.y = THICKNESS / 2;
      base.castShadow = true;
      deviceGroup.add(base);

      const kbCanvas = document.createElement("canvas");
      kbCanvas.width = 1024;
      kbCanvas.height = 512;
      const kbCtx = kbCanvas.getContext("2d")!;
      kbCtx.fillStyle = "#0a0a0b";
      kbCtx.fillRect(0, 0, 1024, 512);
      kbCtx.fillStyle = "#1a1a1c";
      for (let i = 0; i < 6; i++) {
        for (let j = 0; j < 14; j++) {
          if (i === 5 && j > 3 && j < 10) continue;
          const w = i === 5 && j === 3 ? 280 : 58;
          kbCtx.fillRect(12 + j * 72, 12 + i * 82, w, 68);
        }
      }
      const matKb = new THREE.MeshStandardMaterial({
        map: new THREE.CanvasTexture(kbCanvas),
        color: 0x18181b,
      });
      const kb = new THREE.Mesh(
        new THREE.PlaneGeometry(WIDTH - 0.35, DEPTH - 0.85),
        matKb
      );
      kb.rotation.x = -Math.PI / 2;
      kb.position.set(0, THICKNESS + 0.002, -0.15);
      deviceGroup.add(kb);

      pivotGroup = new THREE.Group();
      pivotGroup.position.set(0, THICKNESS, -DEPTH / 2);
      deviceGroup.add(pivotGroup);

      const lid = new THREE.Mesh(
        new THREE.BoxGeometry(WIDTH, 0.04, DEPTH),
        matBody
      );
      lid.position.set(0, 0.02, DEPTH / 2);
      lid.castShadow = true;
      pivotGroup.add(lid);

      const screen = new THREE.Mesh(
        new THREE.PlaneGeometry(WIDTH - 0.18, DEPTH - 0.28),
        matScreen
      );
      screen.rotation.x = Math.PI / 2;
      screen.rotation.z = Math.PI;
      screen.position.set(0, -0.002, DEPTH / 2);
      pivotGroup.add(screen);

      screenTarget.position.set(0, 0, DEPTH / 2);
      pivotGroup.add(screenTarget);

      scene.add(deviceGroup);
      deviceGroup.position.y = -3.5;
      deviceGroup.rotation.set(0.4, Math.PI, 0);

      function drawScreen() {
        const ctx = screenContext;
        const w = ctx.canvas.width;
        const h = ctx.canvas.height;
        ctx.clearRect(0, 0, w, h);

        if (screenPhase === "black") {
          ctx.fillStyle = "#000";
          ctx.fillRect(0, 0, w, h);
        } else if (screenPhase === "boot") {
          ctx.fillStyle = "#000";
          ctx.fillRect(0, 0, w, h);
          ctx.fillStyle = "rgba(255,255,255,0.9)";
          ctx.beginPath();
          ctx.arc(w / 2, h / 2 - 60, 36, 0, Math.PI * 2);
          ctx.strokeStyle = "rgba(255,255,255,0.3)";
          ctx.lineWidth = 4;
          ctx.stroke();
          ctx.fill();
          ctx.fillStyle = "#fff";
          ctx.beginPath();
          ctx.arc(w / 2, h / 2 - 60, 28, 0, (bootProgress / 100) * Math.PI * 2);
          ctx.lineWidth = 3;
          ctx.strokeStyle = "#3b82f6";
          ctx.stroke();
          const barW = 320;
          const barH = 6;
          const barX = (w - barW) / 2;
          const barY = h / 2 + 80;
          ctx.fillStyle = "rgba(255,255,255,0.1)";
          ctx.fillRect(barX, barY, barW, barH);
          ctx.fillStyle = "#3b82f6";
          ctx.fillRect(barX, barY, (barW * bootProgress) / 100, barH);
        } else if (screenPhase === "brand" || screenPhase === "done") {
          ctx.fillStyle = "#050507";
          ctx.fillRect(0, 0, w, h);
          ctx.textAlign = "center";
          ctx.textBaseline = "middle";

          const mainOpacity = Math.min(1, brandReveal * 1.2);
          const subOpacity = Math.max(0, (brandReveal - 0.4) / 0.6);

          ctx.save();
          ctx.globalAlpha = mainOpacity;
          ctx.fillStyle = "#fff";
          ctx.font = "bold 96px system-ui, sans-serif";
          ctx.fillText("NAYGOLF", w / 2, h / 2 - 30);
          ctx.restore();

          ctx.save();
          ctx.globalAlpha = subOpacity;
          ctx.fillStyle = "#71717a";
          ctx.font = "36px system-ui, sans-serif";
          ctx.fillText("Full Stack Developer", w / 2, h / 2 + 55);
          ctx.restore();

          if (screenPhase === "done" && brandReveal >= 1) {
            ctx.fillStyle = "rgba(113,113,122,0.6)";
            ctx.font = "14px system-ui, sans-serif";
            ctx.fillText("Portfolio 2026", w / 2, h / 2 + 120);
          }
        }

        screenTexture.needsUpdate = true;
      }

      const finishIntro = () => {
        if (cancelledRef.current) return;
        setIsFinished(true);
        onFinishRef.current();
        setTimeout(() => onCompleteRef.current(), 1200);
      };

      drawScreen();

      const tl = gsap.timeline({ onComplete: finishIntro });
      timelineRef.current = tl;

      tl.to(deviceGroup.position, {
        y: -0.25,
        duration: 2.2,
        ease: "power2.out",
      }).to(
        deviceGroup.rotation,
        { x: 0, y: 0, z: 0, duration: 2.4, ease: "back.out(0.5)" },
        "<"
      );

      tl.to(
        pivotGroup.rotation,
        {
          x: -1.82,
          duration: 1.6,
          ease: "power2.inOut",
          onStart: () => {
            screenPhase = "boot";
            drawScreen();
          },
        },
        "-=1.2"
      );

      tl.add(
        gsap.to(
          {},
          {
            duration: 1.4,
            onUpdate: function () {
              const p = this.progress();
              bootProgress = Math.min(100, p * 100);
              drawScreen();
            },
          }
        ),
        "-=0.3"
      );

      tl.call(
        () => {
          screenPhase = "brand";
          brandReveal = 0;
          drawScreen();
        },
        undefined,
        "+=0.15"
      );

      tl.to(
        {},
        {
          duration: 1,
          onUpdate: function () {
            brandReveal = this.progress();
            drawScreen();
          },
        },
        "+=0.05"
      );

      const zoomData = { p: 0 };
      const startPos = new THREE.Vector3(0, 3.5, 9);
      const targetPos = new THREE.Vector3();
      const endPos = new THREE.Vector3();
      const lookAtStart = new THREE.Vector3(0, 0, 0);

      tl.to(
        zoomData,
        {
          p: 1,
          duration: 2.2,
          ease: "power3.inOut",
          onUpdate: () => {
            const progress = zoomData.p;
            screenTarget.getWorldPosition(targetPos);
            endPos.set(0, targetPos.y, targetPos.z + 1.6);
            camera.position.lerpVectors(startPos, endPos, progress);
            const lookAtNow = new THREE.Vector3().lerpVectors(
              lookAtStart,
              targetPos,
              progress
            );
            camera.lookAt(lookAtNow);
          },
        },
        "+=0.2"
      );

      tl.call(
        () => {
          screenPhase = "done";
          brandReveal = 1;
          drawScreen();
        },
        undefined,
        "-=0.5"
      );

      const animate = () => {
        if (cancelledRef.current) return;
        requestAnimationFrame(animate);
        const t = performance.now() * 0.001;
        orb1.position.x = -6 + Math.sin(t * 0.3) * 0.3;
        orb2.position.y = -1 + Math.cos(t * 0.25) * 0.2;
        orb3.position.z = -10 + Math.sin(t * 0.2) * 0.2;
        renderer.render(scene, camera);
      };
      animate();
    };

    init3D();

    const handleResize = () => {
      if (camera && renderer) {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
      }
    };
    window.addEventListener("resize", handleResize);

    return () => {
      cancelledRef.current = true;
      timelineRef.current?.kill();
      timelineRef.current = null;
      window.removeEventListener("resize", handleResize);
      const r = rendererRef.current;
      if (r) {
        r.domElement.remove();
        r.dispose();
        rendererRef.current = null;
      }
    };
  }, []);

  return (
    <>
      <div
        id="canvas-container"
        ref={containerRef}
        className={
          isFinished || fadeOut
            ? "opacity-0 pointer-events-none"
            : "opacity-100"
        }
        style={{
          transition: "opacity 0.6s ease-out",
        }}
      />
      {!isFinished && !fadeOut && (
        <button
          id="skip-btn"
          type="button"
          onClick={skipIntro}
          aria-label="ข้าม intro"
        >
          Skip Intro
        </button>
      )}
    </>
  );
}
