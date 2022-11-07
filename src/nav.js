import {addClassActiveInSection} from './section.js';

export default class Nav {
    init() {
        clickElementsLi();
    }
}

let openSection = 2;

function clickElementsLi() {

    let elementsLi = document.getElementsByTagName('nav')[0]
        .getElementsByTagName('ul')[0]
        .getElementsByTagName('li');

    for (let i = 0; i < elementsLi.length; i++) {
        elementsLi[i].addEventListener('click', () => {
            if(openSection != i){
                addClassActiveInLi(elementsLi[i], elementsLi);
                addClassActiveInSection(i);
                openSection = i;
            }
        })
    }

}

function addClassActiveInLi(elem,elems) {
    for(let i = 0; i < elems.length; i++){
        elems[i].className = '';
    }
    elem.classList.add('active');
}