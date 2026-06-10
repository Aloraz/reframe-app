import { applyQuadMirror } from './effects/mirror.js';
import { applyInterlace } from './effects/slicer.js';

// Dodajemy trzeci parametr: buttonId
export function setupImageUpload(inputId, canvasId, buttonId) {
    const input = document.getElementById(inputId);
    const canvas = document.getElementById(canvasId);
    const downloadBtn = document.getElementById(buttonId); // Pobieramy przycisk
    const ctx = canvas.getContext('2d');

    input.addEventListener('change', (event) => {
        const file = event.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        
        reader.onload = (e) => {
            const img = new Image();
            
            img.onload = () => {
                applyQuadMirror(img, canvas, ctx);
                applyInterlace(canvas, ctx, 'vertical');
                applyInterlace(canvas, ctx, 'horizontal');
                
                // Odblokowujemy przycisk zapisu po nałożeniu efektów!
                downloadBtn.disabled = false; 
            };
            
            img.src = e.target.result;
        };
        
        reader.readAsDataURL(file);
    });
}