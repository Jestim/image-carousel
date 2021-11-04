// DOM elements
const frameElements = document.querySelectorAll('.frame');
const containerElement = document.querySelector('.container');
const nextButtonElement = document.getElementById('next');
const previousButtonElement = document.getElementById('previous');
const circleElements = document.querySelectorAll('.circle');

// Adding event listeners
nextButtonElement.addEventListener('click', nextImage);
previousButtonElement.addEventListener('click', previousImage);
circleElements.forEach(circle => {
    circle.addEventListener('click', (e) => {
        displayImage(e.target.id);
    })
});

// creating an object for each image and storing in an array
function createFrameObject(id, element) {
    return {
        id,
        element
    }
}

let frames = [];
let IdCounter = 0;
frameElements.forEach(frame => {
    frames.push(createFrameObject(IdCounter, frame));
    IdCounter++;
});

let currentImage = frames[0];

function nextImage() {
    if (currentImage.id + 1 < frames.length) {
        currentImage.element.classList.add('invisible');
        frames[currentImage.id + 1].element.classList.remove('invisible');
        currentImage = frames[currentImage.id + 1];
    } else {
        currentImage.element.classList.add('invisible');
        frames[0].element.classList.remove('invisible');
        currentImage = frames[0];
    }
    updateActiveCircle();
}

function previousImage() {
    if (currentImage.id - 1 >= 0) {
        currentImage.element.classList.add('invisible');
        frames[currentImage.id - 1].element.classList.remove('invisible');
        currentImage = frames[currentImage.id - 1];
    } else {
        currentImage.element.classList.add('invisible');
        frames[frames.length - 1].element.classList.remove('invisible');
        currentImage = frames[frames.length - 1];
    }
    updateActiveCircle();
}

function updateImage(element) {
    frameElements.forEach(frame => {
        if (!frame.classList.contains('invisible')) {
            frame.classList.add('invisible')
        }
    });
    element.classList.remove('invisible');
}

function displayImage(id) {
    frames.forEach(frame => {
        if (frame.id == id) {
            updateImage(frame.element);
        }
    });
    currentImage = frames[id];
    updateActiveCircle();
}

function updateActiveCircle() {
    circleElements.forEach(element => {
        if (element.classList.contains('circle-active')) {
            element.classList.remove('circle-active');
        }

        if (element.id == currentImage.id) {
            element.classList.add('circle-active');
        }
    });
}