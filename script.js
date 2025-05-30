const whiteCar = document.getElementById('white');
const redCar = document.getElementById('red');
const result = document.getElementById('result');

const btnBranco = document.getElementById('branco');
const btnVermelho = document.getElementById('vermelho');
const btnResetar = document.getElementById('resetar');
const btnAcelerar = document.getElementById('acelerar');
const btnDesacelerar = document.getElementById('desacelerar');

const headerTitle = document.querySelector('header h1');
const body = document.body;

let selectedCar = null;
let intervalId = null;
let position = 0;
let speed = 0;
let size = 50; // tamanho inicial do carro (em px)

function updateTitleAndBg() {
    if (selectedCar === 'branco') {
        headerTitle.textContent = 'Carro selecionado: Branco';
        body.style.backgroundColor = '#f5f5f5';
        body.style.color = 'black';
    } else if (selectedCar === 'vermelho') {
        headerTitle.textContent = 'Carro selecionado: Vermelho';
        body.style.backgroundColor = '#2b0000';
        body.style.color = 'white';
    }
}

function selectCar(color) {
    selectedCar = color;
    result.textContent = color.charAt(0).toUpperCase() + color.slice(1);
    whiteCar.style.display = color === 'branco' ? 'block' : 'none';
    redCar.style.display = color === 'vermelho' ? 'block' : 'none';
    position = 0;
    size = 50;
    updateCarPosition();
    updateCarSize();
    updateTitleAndBg();
    toggleActionButtons(true);
    stopCar();
}

function updateCarPosition() {
    if (selectedCar === 'branco') {
        whiteCar.style.left = 205 + position + 'px';
    } else if (selectedCar === 'vermelho') {
        redCar.style.right = 205 + position + 'px';
    }
}

function updateCarSize() {
    const car = selectedCar === 'branco' ? whiteCar : redCar;
    car.style.width = `${size}px`;
    car.style.height = `${size}px`;
}

function toggleActionButtons(show) {
    const display = show ? 'inline-block' : 'none';
    btnAcelerar.style.display = display;
    btnDesacelerar.style.display = display;
    btnResetar.style.display = display;
}

function moveCar() {
    if (!selectedCar) return;

    position += speed;
    updateCarPosition();

    // Tamanho do carro varia com a velocidade
    if (speed > 0 && size < 100) {
        size += 1;
    } else if (speed < 0 && size > 30) {
        size -= 1;
    }
    updateCarSize();
}

function accelerate() {
    speed = Math.min(speed + 1, 10);
    if (!intervalId) {
        intervalId = setInterval(moveCar, 50);
    }
}

function decelerate() {
    speed = Math.max(speed - 1, -10);
    if (!intervalId) {
        intervalId = setInterval(moveCar, 50);
    }
}

function stopCar() {
    clearInterval(intervalId);
    intervalId = null;
    speed = 0;
}

function resetAll() {
    stopCar();
    selectedCar = null;
    result.textContent = '?';
    headerTitle.textContent = 'Selecione a cor do carro';
    body.style.backgroundColor = 'black';
    body.style.color = 'white';
    whiteCar.style.display = 'none';
    redCar.style.display = 'none';
    toggleActionButtons(false);
    whiteCar.style.left = '205px';
    redCar.style.right = '205px';
    whiteCar.style.width = '50px';
    whiteCar.style.height = '50px';
    redCar.style.width = '50px';
    redCar.style.height = '50px';
}

// Clique nas cores do rodapé
btnBranco.addEventListener('click', () => selectCar('branco'));
btnVermelho.addEventListener('click', () => selectCar('vermelho'));

// Clique direto nos carros
whiteCar.addEventListener('click', () => selectCar('branco'));
redCar.addEventListener('click', () => selectCar('vermelho'));

// Botões de ação
btnAcelerar.addEventListener('click', accelerate);
btnDesacelerar.addEventListener('click', decelerate);
btnResetar.addEventListener('click', resetAll);

// Teclado: UP para acelerar, DOWN para desacelerar, R para resetar
document.addEventListener('keydown', (e) => {
    if (!selectedCar) return;

    if (e.key === 'ArrowUp') {
        accelerate();
    } else if (e.key === 'ArrowDown') {
        decelerate();
    } else if (e.key.toLowerCase() === 'r') {
        resetAll();
    }
});

// Início: carros invisíveis e botões ocultos
window.addEventListener('DOMContentLoaded', () => {
    whiteCar.style.display = 'none';
    redCar.style.display = 'none';
    toggleActionButtons(false);
});
s
