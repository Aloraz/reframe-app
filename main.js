import './style.css';
import { setupImageUpload } from './src/imageHandler.js';

// Inicjalizujemy logikę, przekazując ID naszych elementów z HTML
setupImageUpload('imageUpload', 'mainCanvas');