import './style.css';
import { setupImageUpload } from './src/imageHandler.js';
import { setupDownload } from './src/export.js'; // Dodajemy import

// Aktualizujemy wywołanie - przekazujemy ID przycisku
setupImageUpload('imageUpload', 'mainCanvas', 'downloadBtn');

// Uruchamiamy nasłuchiwanie na przycisku pobierania
setupDownload('downloadBtn', 'mainCanvas');