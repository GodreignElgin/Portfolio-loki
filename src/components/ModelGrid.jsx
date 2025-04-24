import React from 'react';
import ModelViewer from '../codes/ModelViewer';
import { useModels } from '../hooks/useModels';

function ModelGrid() {
  const { models, loading, error } = useModels();

  if (loading) return <div>Loading models...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
      gap: '20px',
      padding: '20px'
    }}>
      {models.map((model) => (
        <div key={model.id} className="model-card">
          <ModelViewer 
            modelPath={model.modelUrl} 
            alt={model.title}
            preload={false} // Only load when in viewport
          />
          <div className="model-info">
            <h3>{model.title}</h3>
            <p>{model.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ModelGrid;