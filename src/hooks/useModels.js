import { useState, useEffect } from 'react';
import { modelService } from '../services/modelService';

export const useModels = () => {
  const [models, setModels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cache, setCache] = useState(new Map());

  useEffect(() => {
    loadModels();
  }, []);

  const loadModels = async () => {
    try {
      setLoading(true);
      
      // Check localStorage for cached data
      const cachedData = localStorage.getItem('modelsCache');
      const cacheTimestamp = localStorage.getItem('modelsCacheTimestamp');
      
      // Cache is valid for 1 hour
      const isCacheValid = cacheTimestamp && 
        (Date.now() - parseInt(cacheTimestamp) < 3600000);

      if (cachedData && isCacheValid) {
        setModels(JSON.parse(cachedData));
      } else {
        const data = await modelService.getAllModels();
        setModels(data);
        
        // Update cache
        localStorage.setItem('modelsCache', JSON.stringify(data));
        localStorage.setItem('modelsCacheTimestamp', Date.now().toString());
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return { models, loading, error, refreshModels: loadModels };
};