const translations = {
    "nl": {
        "title": "Kleurenschema Generator",
        "generateBtn": "Genereer Palet"
    },
    "en": {
        "title": "Color Palette Generator",
        "generateBtn": "Generate Palette"
    }
};

document.getElementById('languageBtn').addEventListener('click', switchLanguage);
document.getElementById('generateBtn').addEventListener('click', generatePalette);

// Genereer een initiële palet bij het laden
generatePalette();

function switchLanguage() {
    const currentLang = document.getElementById('languageBtn').textContent.toLowerCase();
    const newLang = currentLang === 'nl' ? 'en' : 'nl';
    document.getElementById('languageBtn').textContent = newLang.toUpperCase();
    document.getElementById('title').textContent = translations[newLang].title;
    document.getElementById('generateBtn').textContent = translations[newLang].generateBtn;
}

function generatePalette() {
    const baseColor = document.getElementById('baseColor').value;
    const palette = document.getElementById('palette');
    palette.innerHTML = '';

    const colors = generateColors(baseColor);

    colors.forEach(color => {
        const colorColumn = document.createElement('div');
        colorColumn.className = 'color-column';
        colorColumn.style.backgroundColor = color;

        // Iconen
        const iconBar = document.createElement('div');
        iconBar.className = 'icon-bar';
        const lockButton = document.createElement('button');
        lockButton.innerHTML = '<i class="fas fa-lock-open"></i>';
        const saveButton = document.createElement('button');
        saveButton.innerHTML = '<i class="fas fa-save"></i>';
        const reloadButton = document.createElement('button');
        reloadButton.innerHTML = '<i class="fas fa-sync-alt"></i>';
        iconBar.appendChild(lockButton);
        iconBar.appendChild(saveButton);
        iconBar.appendChild(reloadButton);

        // Kleurinformatie
        const colorInfo = document.createElement('div');
        colorInfo.className = 'color-info';
        colorInfo.innerHTML = `${color.toUpperCase()}<br>${getColorName(color)}`;

        colorColumn.appendChild(iconBar);
        colorColumn.appendChild(colorInfo);
        palette.appendChild(colorColumn);
    });
}

function generateColors(baseColor) {
    const colors = [];

    // Converteer de basiskleur naar HSL
    const hsl = hexToHSL(baseColor);

    // Genereer een analoog kleurenschema
    for (let i = -2; i <= 2; i++) {
        let hue = (hsl.h + i * 30) % 360;
        if (hue < 0) hue += 360;
        const newColor = HSLToHex(hue, hsl.s, hsl.l);
        colors.push(newColor);
    }

    return colors;
}

function hexToHSL(H) {
    // Converteer hex naar RGB
    let r = 0, g = 0, b = 0;
    if (H.length == 4) {
        r = "0x" + H[1] + H[1];
        g = "0x" + H[2] + H[2];
        b = "0x" + H[3] + H[3];
    } else if (H.length == 7) {
        r = "0x" + H[1] + H[2];
        g = "0x" + H[3] + H[4];
        b = "0x" + H[5] + H[6];
    }
    r = +r;
    g = +g;
    b = +b;
    r /= 255;
    g /= 255;
    b /= 255;
    const cmin = Math.min(r,g,b);
    const cmax = Math.max(r,g,b);
    const delta = cmax - cmin;
    let h = 0, s = 0, l = 0;

    if (delta == 0)
        h = 0;
    else if (cmax == r)
        h = ((g - b) / delta) % 6;
    else if (cmax == g)
        h = (b - r) / delta + 2;
    else
        h = (r - g) / delta + 4;

    h = Math.round(h * 60);
    if (h < 0)
        h += 360;

    l = (cmax + cmin) / 2;
    s = delta == 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));
    s = +(s * 100).toFixed(1);
    l = +(l * 100).toFixed(1);

    return { h, s, l };
}

function HSLToHex(h, s, l) {
    s /= 100;
    l /= 100;

    let c = (1 - Math.abs(2 * l -1)) * s;
    let x = c * (1 - Math.abs((h / 60)%2 -1));
    let m = l - c/2;
    let r = 0, g = 0, b = 0;

    if (0<=h && h<60) {
        r = c; g = x; b = 0;
    } else if (60<=h && h<120) {
        r = x; g = c; b = 0;
    } else if (120<=h && h<180) {
        r = 0; g = c; b = x;
    } else if (180<=h && h<240) {
        r = 0; g = x; b = c;
    } else if (240<=h && h<300) {
        r = x; g = 0; b = c;
    } else if (300<=h && h<360) {
        r = c; g = 0; b = x;
    }
    r = Math.round((r + m)*255);
    g = Math.round((g + m)*255);
    b = Math.round((b + m)*255);

    return "#" + 
        ("0" + r.toString(16)).slice(-2) +
        ("0" + g.toString(16)).slice(-2) +
        ("0" + b.toString(16)).slice(-2);
}

function getColorName(hex) {
    // Eenvoudige benadering van kleurnamen op basis van hue
    const hsl = hexToHSL(hex);
    const hue = hsl.h;

    let colorName = '';

    if (hue >= 0 && hue < 15) colorName = 'Rood';
    else if (hue >= 15 && hue < 45) colorName = 'Oranje';
    else if (hue >= 45 && hue < 75) colorName = 'Geel';
    else if (hue >= 75 && hue < 105) colorName = 'Limoen';
    else if (hue >= 105 && hue < 135) colorName = 'Groen';
    else if (hue >= 135 && hue < 165) colorName = 'Turkoois';
    else if (hue >= 165 && hue < 195) colorName = 'Cyaan';
    else if (hue >= 195 && hue < 225) colorName = 'Hemelsblauw';
    else if (hue >= 225 && hue < 255) colorName = 'Blauw';
    else if (hue >= 255 && hue < 285) colorName = 'Paars';
    else if (hue >= 285 && hue < 315) colorName = 'Magenta';
    else if (hue >= 315 && hue < 345) colorName = 'Roze';
    else if (hue >= 345 && hue <= 360) colorName = 'Rood';

    return colorName;
}
