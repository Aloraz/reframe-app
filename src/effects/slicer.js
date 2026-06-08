export function applyInterlace(canvas, ctx) {
    const width = canvas.width;
    const height = canvas.height;
    
    // Ustawiamy stałą szerokość paska (możemy to później zmienić na zmienną)
    const stripWidth = 20; 
    const numStrips = Math.ceil(width / stripWidth);

    // Klonujemy obecny stan płótna (z lustrzanym odbiciem) na niewidoczne płótno w pamięci
    const tempCanvas = document.createElement('canvas');
    tempCanvas.width = width;
    tempCanvas.height = height;
    const tempCtx = tempCanvas.getContext('2d');
    tempCtx.drawImage(canvas, 0, 0);

    // Czyścimy nasze główne płótno, żeby przygotować miejsce na nowe ułożenie
    ctx.clearRect(0, 0, width, height);

    // Zmienne do śledzenia, skąd pobieramy pasek
    let leftIndex = 0;
    let rightIndex = numStrips - 1;

    // Układamy paski naprzemiennie
    for (let i = 0; i < numStrips; i++) {
        let sourceStripIndex;

        // Jeśli parzysty (0, 2, 4...) -> bierzemy z lewej
        // Jeśli nieparzysty (1, 3, 5...) -> bierzemy z prawej
        if (i % 2 === 0) {
            sourceStripIndex = leftIndex;
            leftIndex++;
        } else {
            sourceStripIndex = rightIndex;
            rightIndex--;
        }

        // Obliczamy współrzędną X skąd wycinamy i gdzie wklejamy
        const sourceX = sourceStripIndex * stripWidth;
        const destX = i * stripWidth;

        // Rysujemy wycięty pasek na głównym płótnie
        ctx.drawImage(
            tempCanvas,
            sourceX, 0, stripWidth, height, // Wycinanie (x, y, szerokość, wysokość)
            destX, 0, stripWidth, height    // Wklejanie (x, y, szerokość, wysokość)
        );
    }
}