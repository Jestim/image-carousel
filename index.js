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
let IdCounter = 1;
frameElements.forEach(frame => {
    frames.push(createFrameObject(IdCounter, frame));
    IdCounter++;
});

// Keep track of the images
let currentImage;
let nextImage;
let previousImage;

function updateImageOrder() {
    frameElements.forEach(frame => {
        if (!frame.classList.contains('invisible')) {
            currentImage = frame;

            if (!frame.nextElementSibling) {
                nextImage = containerElement.firstElementChild;
            } else {
                nextImage = frame.nextElementSibling;
            }

            if (!frame.previousElementSibling) {
                previousImage = containerElement.lastElementChild;
            } else {
                previousImage = frame.previousElementSibling;
            }
        }
    });
}

updateImageOrder();

function renderNextImage() {
    currentImage.classList.add('invisible');
    nextImage.classList.remove('invisible');
    updateImageOrder();
}

function renderPreviousImage() {
    currentImage.classList.add('invisible');
    previousImage.classList.remove('invisible');
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