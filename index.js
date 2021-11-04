// DOM elements
const frameElements = document.querySelectorAll('.frame');
const containerElement = document.querySelector('.container');
const nextButtonElement = document.getElementById('next');
const previousButtonElement = document.getElementById('previous');
const circleElements = document.querySelectorAll('.circle');

// Adding event listeners
nextButtonElement.addEventListener('click', renderNextImage);
previousButtonElement.addEventListener('click', renderPreviousImage);
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

// Keep track of the images
let currentImage = frames[0];
let nextImage = frames[1];
let previousImage = frames[frames.length - 1];

function updateImageOrder() {
    for (let i = 0; i < frames.length; i++) {
        if (!frames[i].element.classList.contains('invisible')) {
            currentImage = frames[i];

            if (!frames[i].element.nextElementSibling) {
                nextImage = frames[0];
            } else {
                nextImage = frames[i + 1];
            }

            if (!frames[i].element.previousElementSibling) {
                previousImage = frames[frames.length - 1];
            } else {
                previousImage = frames[i - 1];
            }
        }
    }
    updateActiveCircle();
}

updateImageOrder();

function renderNextImage() {
    currentImage.element.classList.add('invisible');
    nextImage.element.classList.remove('invisible');
    updateImageOrder();
}

function renderPreviousImage() {
    currentImage.element.classList.add('invisible');
    previousImage.element.classList.remove('invisible');
    updateImageOrder();
}

function updateImage(element) {
    frameElements.forEach(frame => {
        if (!frame.classList.contains('invisible')) {
            frame.classList.add('invisible')
        }
    });
    element.classList.remove('invisible');
    updateImageOrder()
}

function displayImage(id) {
    frames.forEach(frame => {
        if (frame.id == id) {
            updateImage(frame.element);
        }
    });
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