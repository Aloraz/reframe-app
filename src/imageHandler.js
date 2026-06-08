export function setupImageUpload(inputId, canvasId) {
    const input = document.getElementById(inputId);
    const canvas = document.getElementById(canvasId);
    const ctx = canvas.getContext('2d');

    // Nasłuchujemy momentu, gdy użytkownik wybierze plik
    input.addEventListener('change', (event) => {
        const file = event.target.files[0];
        if (!file) return; // Jeśli ktoś anulował wybór pliku, przerywamy

        const reader = new FileReader();
        
        // Co ma się stać, gdy plik zostanie wczytany do pamięci:
        reader.onload = (e) => {
            const img = new Image();
            
            // Co ma się stać, gdy obrazek będzie gotowy do użycia:
            img.onload = () => {
                // 1. Dopasowujemy wielkość canvasu do rozdzielczości zdjęcia
                canvas.width = img.width;
                canvas.height = img.height;
                
                // 2. Rysujemy zdjęcie od lewego górnego rogu (x: 0, y: 0)
                ctx.drawImage(img, 0, 0);
            };
            
            // Podpinamy wczytane dane pod źródło obrazka
            img.src = e.target.result;
        };
        
        // Zaczynamy czytać plik jako adres URL w formacie base64
        reader.readAsDataURL(file);
    });
}