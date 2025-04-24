import React, { useState, useEffect, useRef } from 'react';
import '@google/model-viewer';

function ModelViewer({ modelPath, alt = "3D model" }) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const modelRef = useRef(null);
  
  const fallbackModelPath = "https://modelviewer.dev/shared-assets/models/Astronaut.glb";
  const [modelSrc, setModelSrc] = useState(modelPath || fallbackModelPath);

  useEffect(() => {
    // Intersection Observer to detect when model is in viewport
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.1 } // Trigger when 10% of the element is visible
    );

    if (modelRef.current) {
      observer.observe(modelRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handleModelLoaded = () => {
      console.log("Model loaded successfully!");
      setIsLoading(false);
    };

    const handleModelError = (event) => {
      console.error("Error loading model:", event);
      setHasError(true);
      
      if (modelSrc !== fallbackModelPath) {
        console.log("Switching to fallback model...");
        setModelSrc(fallbackModelPath);
      }
    };

    const modelViewer = modelRef.current;
    if (modelViewer) {
      modelViewer.addEventListener('load', handleModelLoaded);
      modelViewer.addEventListener('error', handleModelError);
    }

    return () => {
      if (modelViewer) {
        modelViewer.removeEventListener('load', handleModelLoaded);
        modelViewer.removeEventListener('error', handleModelError);
      }
    };
  }, [modelSrc, fallbackModelPath]);

  return (
    <div style={{ width: '100%', height: '300px', position: 'relative', background: '#f5f5f5' }}>
      {isLoading && (
        <div style={{ 
          position: 'absolute', 
          top: 0, 
          left: 0, 
          width: '100%', 
          height: '100%', 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center',
          background: '#ffffff',
          zIndex: 1
        }}>
          Loading 3D Model...
        </div>
      )}
      
      {hasError && modelSrc === fallbackModelPath && (
        <div style={{ 
          position: 'absolute', 
          bottom: 10, 
          left: 0, 
          width: '100%', 
          textAlign: 'center',
          color: '#ff6b6b', 
          zIndex: 2 
        }}>
          Failed to load model. Using fallback model.
        </div>
      )}
      
      <model-viewer
        ref={modelRef}
        src={isVisible ? modelSrc : null} // Only load when visible
        alt={alt}
        camera-controls
        auto-rotate={isVisible} // Only auto-rotate when visible
        rotation-per-second="30deg"
        style={{ width: '100%', height: '100%' }}
        shadow-intensity="1"
        exposure="1"
        loading="lazy"
        poster="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7" // Transparent placeholder
      />
    </div>
  );
}

export default ModelViewer;