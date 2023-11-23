import React, { useRef, useEffect } from "react";
import * as THREE from "three";
import "./App.css";

function App() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    // Scene
    const scene = new THREE.Scene();

    // Create a sphere
    const geometry = new THREE.SphereGeometry(3, 64, 64);
    const material = new THREE.MeshStandardMaterial({ color: "#00ff83" });
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    //Size
    const sizes = {
      width: window.innerWidth,
      height: window.innerHeight,
    };

    // Add light
    const light = new THREE.PointLight(0xffffff, 100, 100);
    light.position.set(0, 10, 10);
    scene.add(light);

    // Camera
    const camera = new THREE.PerspectiveCamera(
      45,
      sizes.width / sizes.height,
      0.1,
      100
    );
    camera.position.z = 20;
    scene.add(camera);

    // Renderer
    const renderer = new THREE.WebGLRenderer({ canvas: canvasRef.current });
    renderer.setSize(sizes.width, sizes.height);

    // Animation
    const animate = () => {
      requestAnimationFrame(animate);

      // Rotate the sphere
      mesh.rotation.x += 0.01;
      mesh.rotation.y += 0.01;

      renderer.render(scene, camera);
    };

    animate();
  }, []);

  return <canvas className="webgl" ref={canvasRef} />;
}

export default App;
