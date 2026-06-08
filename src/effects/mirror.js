export function applyQuadMirror(img, canvas, ctx) {
    const w = img.width;
    const h = img.height;

    // Powiększamy canvas, aby zmieścił 4 kopie zdjęcia
    canvas.width = w * 2;
    canvas.height = h * 2;

    // 1. Lewy Górny Róg (Oryginał)
    ctx.drawImage(img, 0, 0, w, h);

    // 2. Prawy Górny Róg (Odbicie w poziomie)
    ctx.save(); // Zapisujemy normalny stan płótna
    ctx.translate(w * 2, 0); // Przesuwamy punkt startowy na prawy koniec
    ctx.scale(-1, 1); // Odwracamy oś X (lustro w poziomie)
    ctx.drawImage(img, 0, 0, w, h);
    ctx.restore(); // Wracamy do normalnego stanu

    // 3. Lewy Dolny Róg (Odbicie w pionie)
    ctx.save();
    ctx.translate(0, h * 2); // Przesuwamy punkt startowy na sam dół
    ctx.scale(1, -1); // Odwracamy oś Y (lustro w pionie)
    ctx.drawImage(img, 0, 0, w, h);
    ctx.restore();

    // 4. Prawy Dolny Róg (Odbicie w poziomie i pionie)
    ctx.save();
    ctx.translate(w * 2, h * 2); // Przesuwamy punkt startowy w prawy dolny róg
    ctx.scale(-1, -1); // Odwracamy obie osie
    ctx.drawImage(img, 0, 0, w, h);
    ctx.restore();
}