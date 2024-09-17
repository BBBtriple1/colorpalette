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

        const colorInfo = document.createElement('div');
        colorInfo.className = 'color-info';
        colorInfo.textContent = color.toUpperCase();

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
