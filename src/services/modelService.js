import { 
  collection, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  doc, 
  getDocs, 
  query, 
  orderBy 
} from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { db, storage } from '../config/firebase';

const USERNAME = "GodreignElgin";
const REPO_NAME = "Portfolio-loki";

const CDN_URL = `https://cdn.jsdelivr.net/gh/${USERNAME}/${REPO_NAME}@main`;
const MODELS_PATH = '/models';

export const modelService = {
  // Get all models
  async getAllModels() {
    try {
      // For development, use local data
      if (process.env.NODE_ENV === 'development') {
        const { modelsData } = await import('../data/models');
        return modelsData;
      }

      // For production, fetch from jsDelivr
      const response = await fetch(`${CDN_URL}/data/models.json`);
      if (!response.ok) throw new Error('Failed to fetch models data');
      
      const data = await response.json();
      return data.map(model => ({
        ...model,
        modelUrl: `${CDN_URL}${MODELS_PATH}/${model.filename}`,
        thumbnailUrl: `${CDN_URL}/thumbnails/${model.thumbnail}`
      }));
    } catch (error) {
      console.error('Error fetching models:', error);
      return [];
    }
  },

  // Upload model
  async uploadModel(file, modelData) {
    const storageRef = ref(storage, `models/${file.name}`);
    await uploadBytes(storageRef, file);
    const modelUrl = await getDownloadURL(storageRef);

    const modelDoc = await addDoc(collection(db, 'models'), {
      ...modelData,
      modelUrl,
      createdAt: new Date().toISOString()
    });

    return modelDoc.id;
  },

  // Delete model
  async deleteModel(modelId, fileName) {
    await deleteDoc(doc(db, 'models', modelId));
    const storageRef = ref(storage, `models/${fileName}`);
    await deleteObject(storageRef);
  },

  // Update model
  async updateModel(modelId, updates) {
    const modelRef = doc(db, 'models', modelId);
    await updateDoc(modelRef, updates);
  },

  // Get model URL
  getModelUrl(fileName) {
    return `${CDN_URL}${MODELS_PATH}/${fileName}`;
  }
};