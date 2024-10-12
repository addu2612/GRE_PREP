import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { BookOpen, HelpCircle, Zap } from 'lucide-react';
import * as THREE from 'three';

const ThreeJSBackground = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    let scene, camera, renderer, particles;
    let geometry, material; 
    const mount = mountRef.current;

    const init = () => {
      scene = new THREE.Scene();
      camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
      renderer = new THREE.WebGLRenderer({ alpha: true });
      renderer.setSize(window.innerWidth, window.innerHeight);
      mount.appendChild(renderer.domElement);

      const geometry = new THREE.BufferGeometry();
      const vertices = [];

      for (let i = 0; i < 5000; i++) {
        const x = (Math.random() - 0.5) * 2000;
        const y = (Math.random() - 0.5) * 2000;
        const z = (Math.random() - 0.5) * 2000;
        vertices.push(x, y, z);
      }

      geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));

      const material = new THREE.PointsMaterial({ color: 0xffffff, size: 2 });
      particles = new THREE.Points(geometry, material);
      scene.add(particles);

      camera.position.z = 500;
    };

    const animate = () => {
      requestAnimationFrame(animate);
      particles.rotation.x += 0.001;
      particles.rotation.y += 0.002;
      renderer.render(scene, camera);
    };

    init();
    animate();

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      // Check if the mount and renderer still exist before removing
      if (mount && renderer.domElement && mount.contains(renderer.domElement)) {
        mount.removeChild(renderer.domElement);
      }
      // Dispose of Three.js objects
      if (renderer) renderer.dispose();
      if (geometry) geometry.dispose();
      if (material) material.dispose();
    };
  }, []);

  return <div ref={mountRef} style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }} />;
};

const FancyHomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen w-full bg-gradient-to-br from-blue-600 via-purple-500 to-pink-500 overflow-hidden">
      <ThreeJSBackground />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen text-white px-4">
        <h1 className="text-6xl md:text-8xl font-extrabold mb-8 text-center animate-fadeIn">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500">
            GRE Vocabulary
          </span>
          <br />
          <span className="text-white">Trainer</span>
        </h1>

        <p className="text-xl md:text-2xl mb-12 text-center max-w-2xl animate-fadeIn animation-delay-300">
          Elevate your vocabulary to new heights with our cutting-edge learning tools.
        </p>

        <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-6 animate-fadeIn animation-delay-600">
          <button
            onClick={() => navigate('/flashcards')}
            className="group relative px-8 py-4 bg-white text-blue-600 rounded-full shadow-lg font-bold text-lg transition-transform transform hover:scale-105 hover:shadow-xl"
          >
            <span className="flex items-center justify-center">
              <BookOpen className="w-6 h-6 mr-2" />
              Flashcards
            </span>
            <span className="absolute inset-0 w-full h-full bg-blue-600 rounded-full opacity-0 group-hover:opacity-10 transition-opacity"></span>
          </button>
          <button
            onClick={() => navigate('/quiz')}
            className="group relative px-8 py-4 bg-white text-pink-600 rounded-full shadow-lg font-bold text-lg transition-transform transform hover:scale-105 hover:shadow-xl"
          >
            <span className="flex items-center justify-center">
              <HelpCircle className="w-6 h-6 mr-2" />
              Quiz
            </span>
            <span className="absolute inset-0 w-full h-full bg-pink-600 rounded-full opacity-0 group-hover:opacity-10 transition-opacity"></span>
          </button>
          <button
            onClick={() => navigate('/sentence-evaluation')}
            className="group relative px-8 py-4 bg-white text-green-600 rounded-full shadow-lg font-bold text-lg transition-transform transform hover:scale-105 hover:shadow-xl"
          >
            <span className="flex items-center justify-center">
              <HelpCircle className="w-6 h-6 mr-2" />
              Sentence Evaluation
            </span>
            <span className="absolute inset-0 w-full h-full bg-green-600 rounded-full opacity-0 group-hover:opacity-10 transition-opacity"></span>
          </button>
          <button
            onClick={() => navigate('/daily-word-challenge')}
            className="group relative px-8 py-4 bg-white text-yellow-600 rounded-full shadow-lg font-bold text-lg transition-transform transform hover:scale-105 hover:shadow-xl"
          >
            <span className="flex items-center justify-center">
              <HelpCircle className="w-6 h-6 mr-2" />
              Daily Word 
            </span>
            <span className="absolute inset-0 w-full h-full bg-yellow-600 rounded-full opacity-0 group-hover:opacity-10 transition-opacity"></span>
          </button>
        </div>

        <div className="mt-16 animate-fadeIn animation-delay-900">
          <h2 className="text-2xl font-bold mb-4 text-center">Why Choose Us?</h2>
          <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-8">
            {[
              { icon: Zap, title: "Fast Learning", description: "Efficient techniques to boost your vocabulary quickly" },
              { icon: BookOpen, title: "Comprehensive", description: "Cover all essential GRE words and their usage" },
              { icon: HelpCircle, title: "Interactive", description: "Engaging quizzes and flashcards for better retention" },
            ].map((feature, index) => (
              <div key={index} className="flex flex-col items-center bg-white bg-opacity-10 rounded-lg p-6 backdrop-blur-sm transition-transform transform hover:scale-105">
                <feature.icon className="w-12 h-12 mb-4 text-yellow-400" />
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-center">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FancyHomePage;