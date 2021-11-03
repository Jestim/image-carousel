const frames = document.querySelectorAll('.frame');
const container = document.querySelector('.container');
const nextButton = document.getElementById('next');
const previousButton = document.getElementById('previous');

let currentImage;
let nextImage;
let previousImage;

function getImageOrder() {
    frames.forEach(frame => {
        if (!frame.classList.contains('invisible')) {
            currentImage = frame;

            if (!frame.nextElementSibling) {
                nextImage = container.firstElementChild;
            } else {
                nextImage = frame.nextElementSibling;
            }

            if (!frame.previousElementSibling) {
                previousImage = container.lastElementChild;
            } else {
                previousImage = frame.previousElementSibling;
            }
        }
    });
}

getImageOrder();

function renderNextImage() {
    currentImage.classList.add('invisible');
    nextImage.classList.remove('invisible');
    getImageOrder();
}

nextButton.addEventListener('click', renderNextImage);

function renderPreviousImage() {
    currentImage.classList.add('invisible');
    previousImage.classList.remove('invisible');
    getImageOrder();
}

previousButton.addEventListener('click', renderPreviousImage);