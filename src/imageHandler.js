import { applyQuadMirror } from './effects/mirror.js';
import { applyInterlace } from './effects/slicer.js'; // Dodajemy import

export function setupImageUpload(inputId, canvasId) {
    const input = document.getElementById(inputId);
    const canvas = document.getElementById(canvasId);
    const ctx = canvas.getContext('2d');

    input.addEventListener('change', (event) => {
        const file = event.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        
        reader.onload = (e) => {
            const img = new Image();
            
            img.onload = () => {
                // 1. Nakładamy efekt lustra
                applyQuadMirror(img, canvas, ctx);
                
                // 2. Nakładamy cięcie na paski
                applyInterlace(canvas, ctx);
            };
            
            img.src = e.target.result;
        };
        
        reader.readAsDataURL(file);
    });
}