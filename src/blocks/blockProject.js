import {projects} from '../json/projectJson.js';

let openSlide = 0;

export function blockProject(div) {
    caruselCreateAndPast(div);
    caruselClickArrow();
    caruselClickCircle();
    swapSlide(event);
}

function caruselCreateAndPast(div) {

    let carousel = document.createElement("div");
    carousel.id = 'carousel';
    div.appendChild(carousel);

    let arrowLeft = document.createElement("div");
    arrowLeft.classList.add('arrowLeft');
    carousel.appendChild(arrowLeft);

    let arrowLeftImg = document.createElement("div");
    arrowLeftImg.classList.add('arrow');
    arrowLeft.appendChild(arrowLeftImg);

    let carouselBox = document.createElement("div");
    carouselBox.id = 'carouselBox';
    carousel.appendChild(carouselBox);

    let carouselCounter = document.createElement("div");
    carouselCounter.id = 'carouselCounter';
    div.appendChild(carouselCounter);

    let arrowRight = document.createElement("div");
    arrowRight.classList.add('arrowRight');
    carousel.appendChild(arrowRight);

    let arrowRightImg = document.createElement("div");
    arrowRightImg.classList.add('arrow');
    arrowRight.appendChild(arrowRightImg);

    for (let i = 0; i < Object.keys(projects).length; i++) {

        let carouselCounterCircle = document.createElement("div");
        carouselCounterCircle.classList.add('carouselCounterCircle');
        (i === 0) ? carouselCounterCircle.classList.add('active') : undefined;
        carouselCounter.appendChild(carouselCounterCircle);

        let box = document.createElement("div");
        box.classList.add('box');
        (i === 0) ? box.classList.add('active') : undefined;
        carouselBox.appendChild(box);

        let carouselImg = document.createElement("div");
        carouselImg.classList.add('carouselImg', 'imgLoad');
        carouselImg.setAttribute('data-src', projects[i].img);
        box.appendChild(carouselImg);

        let carouselText = document.createElement("div");
        carouselText.classList.add('carouselText');
        carouselText.innerHTML = `<div class="text"><a href="${projects[i].src}" target="_blank"><h5>${projects[i].name}</h5></a></div>`;
        box.appendChild(carouselText);

    }
    setTimeout(() => {
        divGetBackground();
    }, 500);
}

function caruselClickArrow() {

    let arrows = document.getElementsByClassName('arrow');

    for (let i = 0; i < arrows.length; i++) {
        arrows[i].addEventListener('click', () => {
            slideNexrDevr(i);
        })
    }

}

function caruselClickCircle() {

    let slides = document.getElementsByClassName('box');
    let circle = document.getElementsByClassName('carouselCounterCircle');

    for (let i = 0; i < circle.length; i++) {
        circle[i].addEventListener('click', () => {

            for (let a = 0; a < slides.length; a++) {
                slides[a].classList.remove('active');
                circle[a].classList.remove('active');
            }

            circle[i].classList.add('active');
            slides[i].classList.add('active');

            openSlide = i;
        })
    }


}

function swapSlide(event) {

    let startTouch, endTouch;
    let carouselBox = document.getElementById('carouselBox');

    carouselBox.onpointerdown = (event) => {

        carouselBox.style.transition = '0s';

        startTouch = event.clientX;

        carouselBox.onpointermove = function (event) {
            endTouch = event.clientX;
            carouselBox.style.left = endTouch - startTouch + 'px';
        }

        document.onpointerup = (event) => {

            carouselBox.onpointermove = null;

            if (Math.abs(startTouch - endTouch) > 25) {

                (startTouch > endTouch) ? slideNexrDevr(1) : slideNexrDevr(0);

            }

            document.onpointerup = null;
        }

    }

}

function slideNexrDevr(i) {

    let slides = document.getElementsByClassName('box');
    let circle = document.getElementsByClassName('carouselCounterCircle');
    let carouselBox = document.getElementById('carouselBox');

    carouselBox.style.transition = '.5s';
    carouselBox.style.left = (i === 0) ? '100%' : '-100%' ;

    setTimeout(() => {
        carouselBox.style.transition = '0s';
        carouselBox.style.left = (i === 0) ? '-100%' : '100%' ;
        for (let a = 0; a < slides.length; a++) {
            slides[a].classList.remove('active');
            circle[a].classList.remove('active');
        }
    }, 200)

    setTimeout(() => {
        if (i === 0) {

            if (openSlide === 0) {
                slides[Object.keys(projects).length - 1].classList.add('active');
                circle[Object.keys(projects).length - 1].classList.add('active');
                openSlide = Object.keys(projects).length - 1;
            } else {
                slides[openSlide - 1].classList.add('active')
                circle[openSlide - 1].classList.add('active')
                openSlide = openSlide - 1;
            }

        } else {

            if (openSlide === Object.keys(projects).length - 1) {
                slides[0].classList.add('active');
                circle[0].classList.add('active');
                openSlide = 0;
            } else {
                slides[openSlide + 1].classList.add('active')
                circle[openSlide + 1].classList.add('active')
                openSlide = openSlide + 1;
            }

        }
        carouselBox.style.transition = '.5s';
        carouselBox.style.left = 0;
    }, 300)
}

function divGetBackground() {

    const objects = document.getElementsByClassName('imgLoad');

    Array.from(objects).map((item) => {

        const img = new Image();
        img.src = item.dataset.src;

        img.onload = () => {
            item.classList.remove('imgLoad');
            return item.nodeName === 'IMG' ?
                item.src = item.dataset.src :
                item.style.backgroundImage = `url(${item.dataset.src})`;
        };

    });

    return objects;
}
