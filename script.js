let allowedNumbers = [];
let allNumbers = [];
let animationInterval;
let isAnimating = false;

// Funkce pro nastavení rozsahu
document.getElementById('rangeForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Zabráníme obnovení stránky
    const min = parseInt(document.getElementById('min').value);
    const max = parseInt(document.getElementById('max').value);

    // Vytvoření všech čísel v rozsahu
    allNumbers = [];
    for (let i = min; i <= max; i++) {
        allNumbers.push(i);
    }

    // Vytvoření povolených čísel
    allowedNumbers = [...allNumbers];

    // Vyloučená čísla
    const excludedNumbers = [1,3,4,5,6,7,8,9,10];

    // Filtrace vyloučených čísel z povolených čísel
    allowedNumbers = allowedNumbers.filter(num => !excludedNumbers.includes(num));
});

// Funkce pro spuštění animace losování
function startAnimation() {
    if (isAnimating) return; // Zabráníme vícenásobnému spuštění animace

    isAnimating = true;
    const resultElement = document.getElementById("result");
    resultElement.classList.add('spin'); // Přidáme CSS animaci

    // Nastavíme interval pro "protáčení" čísel
    animationInterval = setInterval(() => {
        // Zobrazujeme čísla ze všech čísel včetně vyloučených
        const randomIndex = Math.floor(Math.random() * allNumbers.length);
        const currentNumber = allNumbers[randomIndex];
        resultElement.textContent = "Losuji: " + currentNumber;
    }, 300); // Změna čísla každých 300 ms

    // Po 3 sekundách zastavíme animaci a vygenerujeme náhodné číslo z povolených
    setTimeout(() => {
        stopAnimation();
        generateNumber();
    }, 3000); // Animace trvá 3 sekundy
}

// Funkce pro zastavení animace
function stopAnimation() {
    clearInterval(animationInterval);
    isAnimating = false;
    document.getElementById("result").classList.remove('spin'); // Odstraníme CSS animaci
}

// Funkce pro vygenerování povoleného čísla
function generateNumber() {
    if (allowedNumbers.length === 0) {
        document.getElementById("result").textContent = "Nejprve nastavte rozsah!";
        return;
    }

    // Vygenerování náhodného indexu z povolených čísel
    const randomIndex = Math.floor(Math.random() * allowedNumbers.length);
    const randomNumber = allowedNumbers[randomIndex];

    // Zobrazení výsledku na stránce
    document.getElementById("result").textContent = "Vygenerované číslo: " + randomNumber;
}
