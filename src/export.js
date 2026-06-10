export function setupDownload(buttonId, canvasId) {
    const btn = document.getElementById(buttonId);
    const canvas = document.getElementById(canvasId);

    btn.addEventListener('click', () => {
        // Konwersja obecnego stanu canvasu na adres URL obrazka (format PNG)
        const dataUrl = canvas.toDataURL('image/png');
        
        // Tworzymy wirtualny link w pamięci
        const link = document.createElement('a');
        link.download = 'reframe-glitch.png'; // Domyślna nazwa pobieranego pliku
        link.href = dataUrl;
        
        // Symulujemy kliknięcie, co wywołuje okno zapisywania w przeglądarce
        link.click();
    });
}