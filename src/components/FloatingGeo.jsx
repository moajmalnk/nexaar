import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

/**
 * FloatingGeo — A premium Three.js 3D wireframe visual for the Nexaar brand.
 * Renders an animated icosahedron with glowing edges and orbiting particles,
 * matching the brand's Electric Purple palette.
 */
const FloatingGeo = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    let animationId;
    const clock = new THREE.Clock();
    let renderer;

    // --- Scene setup ---
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
    camera.position.z = 4.5;

    // --- Brand colors ---
    const purple = new THREE.Color('#6B20E8');
    const lavender = new THREE.Color('#9B59D4');
    const coral = new THREE.Color('#FF5C35');

    // --- Main Icosahedron (wireframe) ---
    const icoGeo = new THREE.IcosahedronGeometry(1.6, 1);
    const icoMat = new THREE.MeshBasicMaterial({
      color: purple,
      wireframe: true,
      transparent: true,
      opacity: 0.35,
    });
    const ico = new THREE.Mesh(icoGeo, icoMat);
    scene.add(ico);

    // --- Inner solid icosahedron with subtle fill ---
    const innerGeo = new THREE.IcosahedronGeometry(1.2, 2);
    const innerMat = new THREE.MeshBasicMaterial({
      color: purple,
      transparent: true,
      opacity: 0.06,
    });
    const innerIco = new THREE.Mesh(innerGeo, innerMat);
    scene.add(innerIco);

    // --- Edges for glow effect ---
    const edgesGeo = new THREE.EdgesGeometry(new THREE.IcosahedronGeometry(1.61, 1));
    const edgesMat = new THREE.LineBasicMaterial({
      color: lavender,
      transparent: true,
      opacity: 0.6,
    });
    const edges = new THREE.LineSegments(edgesGeo, edgesMat);
    scene.add(edges);

    // --- Orbiting particles ---
    const particleCount = 60;
    const particleGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = 2.0 + Math.random() * 0.8;

      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = r * Math.cos(phi);

      // Randomly assign purple or coral
      const c = Math.random() > 0.8 ? coral : purple;
      colors[i * 3] = c.r;
      colors[i * 3 + 1] = c.g;
      colors[i * 3 + 2] = c.b;
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particleGeo.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const particleMat = new THREE.PointsMaterial({
      size: 0.04,
      vertexColors: true,
      transparent: true,
      opacity: 0.7,
      sizeAttenuation: true,
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // --- Outer ring ---
    const ringGeo = new THREE.TorusGeometry(2.4, 0.008, 8, 80);
    const ringMat = new THREE.MeshBasicMaterial({
      color: lavender,
      transparent: true,
      opacity: 0.2,
    });
    const ring = new THREE.Mesh(ringGeo, ringMat);
    ring.rotation.x = Math.PI / 2;
    scene.add(ring);

    // --- Second tilted ring ---
    const ring2Geo = new THREE.TorusGeometry(2.1, 0.006, 8, 80);
    const ring2Mat = new THREE.MeshBasicMaterial({
      color: purple,
      transparent: true,
      opacity: 0.15,
    });
    const ring2 = new THREE.Mesh(ring2Geo, ring2Mat);
    ring2.rotation.x = Math.PI / 3;
    ring2.rotation.z = Math.PI / 6;
    scene.add(ring2);

    // --- Mouse interaction ---
    let mouseX = 0;
    let mouseY = 0;
    const handleMouseMove = (e) => {
      const rect = container.getBoundingClientRect();
      mouseX = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      mouseY = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
    };
    container.addEventListener('mousemove', handleMouseMove);

    const syncRendererSize = () => {
      if (!renderer) return;

      const { width, height } = container.getBoundingClientRect();
      if (!width || !height) return;

      renderer.setSize(width, height, false);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    };

    renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.domElement.style.display = 'block';
    renderer.domElement.style.width = '100%';
    renderer.domElement.style.height = '100%';
    container.appendChild(renderer.domElement);
    syncRendererSize();

    const animate = () => {
      animationId = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();

      // Smooth rotation
      ico.rotation.y = t * 0.15 + mouseX * 0.3;
      ico.rotation.x = t * 0.1 + mouseY * 0.3;
      innerIco.rotation.y = t * 0.12 + mouseX * 0.3;
      innerIco.rotation.x = t * 0.08 + mouseY * 0.3;
      edges.rotation.y = t * 0.15 + mouseX * 0.3;
      edges.rotation.x = t * 0.1 + mouseY * 0.3;

      // Particles orbit
      particles.rotation.y = t * 0.05;
      particles.rotation.x = t * 0.03;

      // Ring rotations
      ring.rotation.z = t * 0.08;
      ring2.rotation.y = t * 0.06;

      // Gentle breathing scale
      const s = 1 + Math.sin(t * 0.8) * 0.03;
      ico.scale.setScalar(s);
      innerIco.scale.setScalar(s);
      edges.scale.setScalar(s);

      renderer.render(scene, camera);
    };

    animate();

    const resizeObserver = new ResizeObserver(syncRendererSize);
    resizeObserver.observe(container);
    window.addEventListener('resize', syncRendererSize);

    // --- Cleanup ---
    return () => {
      cancelAnimationFrame(animationId);
      resizeObserver.disconnect();
      window.removeEventListener('resize', syncRendererSize);
      container.removeEventListener('mousemove', handleMouseMove);

      renderer.dispose();
      icoGeo.dispose();
      icoMat.dispose();
      innerGeo.dispose();
      innerMat.dispose();
      edgesGeo.dispose();
      edgesMat.dispose();
      particleGeo.dispose();
      particleMat.dispose();
      ringGeo.dispose();
      ringMat.dispose();
      ring2Geo.dispose();
      ring2Mat.dispose();

      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="h-[340px] w-full cursor-crosshair sm:h-[420px] md:h-[520px]"
      style={{ touchAction: 'none' }}
    />
  );
};

export default FloatingGeo;
