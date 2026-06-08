export function applyInterlace(canvas, ctx, direction = 'vertical') {
    const width = canvas.width;
    const height = canvas.height;
    
    // Rozmiar paska
    const stripSize = 20; 

    // Klonujemy obraz
    const tempCanvas = document.createElement('canvas');
    tempCanvas.width = width;
    tempCanvas.height = height;
    const tempCtx = tempCanvas.getContext('2d');
    tempCtx.drawImage(canvas, 0, 0);

    // Czyścimy główne płótno
    ctx.clearRect(0, 0, width, height);

    if (direction === 'vertical') {
        const numStrips = Math.ceil(width / stripSize);
        let leftIndex = 0;
        let rightIndex = numStrips - 1;

        for (let i = 0; i < numStrips; i++) {
            let sourceStripIndex = (i % 2 === 0) ? leftIndex++ : rightIndex--;
            const sourceX = sourceStripIndex * stripSize;
            const destX = i * stripSize;

            ctx.drawImage(
                tempCanvas,
                sourceX, 0, stripSize, height, 
                destX, 0, stripSize, height    
            );
        }
    } else if (direction === 'horizontal') {
        const numStrips = Math.ceil(height / stripSize);
        let topIndex = 0;
        let bottomIndex = numStrips - 1;

        for (let i = 0; i < numStrips; i++) {
            let sourceStripIndex = (i % 2 === 0) ? topIndex++ : bottomIndex--;
            const sourceY = sourceStripIndex * stripSize;
            const destY = i * stripSize;

            ctx.drawImage(
                tempCanvas,
                0, sourceY, width, stripSize, 
                0, destY, width, stripSize    
            );
        }
    }
}