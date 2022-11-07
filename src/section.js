import {blockInfo} from './blocks/blockInfo.js'
import {blockContacts} from './blocks/blockContacts.js'
import {blockSkills} from './blocks/blockSkills.js'
import {blockProject} from './blocks/blockProject.js'

export function addClassActiveInSection(positionLi) {

    let sections = document.getElementsByTagName('main')[0].getElementsByTagName('section');

    let delay = (sections[0].getElementsByTagName('div')[0] ||
        sections[1].getElementsByTagName('div')[0]) ? 500 : 0;

    setTimeout(() => {
        for (let i = 0; i < sections.length; i++) {
            sections[i].className = '';
        }
    }, delay);

    if (positionLi != 2) {
        if (positionLi > 2) {

            setTimeout(() => {
                sections[1].classList.add('active');
            }, delay);

            createAndPastDivInSection(sections[1], 1, positionLi);

        } else {

            setTimeout(() => {
                sections[0].classList.add('active');
            }, delay);

            createAndPastDivInSection(sections[0], 0, positionLi);

        }
    } else {
        if(sections[0].getElementsByTagName('div')[0]){

            divAnimate(sections[0].getElementsByTagName('div')[0], 0, 'close');

            setTimeout(() => {

                removeDivInSection(sections[0].getElementsByTagName('div')[0]);

                },500)
        }
        if(sections[1].getElementsByTagName('div')[0]){

            divAnimate(sections[1].getElementsByTagName('div')[0], 1, 'close');

            setTimeout(() => {

                removeDivInSection(sections[1].getElementsByTagName('div')[0]);

                },500)

        }
    }

}

function createAndPastDivInSection(section, positionSection ,positionLi) {

    let direction;
    if (window.innerWidth > 720) {
        direction = {
            0: ['toLeft', 'leftToRight'],
            1: ['toRight', 'rightToLeft']
        }
    } else {
        direction = {
            0: ['toTop', 'topToBottom'],
            1: ['toBottom', 'bottomToTop']
        }
    }

    let delay = 0;
    let divInSection = section.getElementsByTagName('div')[0];

    // if (window.innerWidth <= 720) {

        let div = document.getElementsByTagName('main')[0]
            .getElementsByTagName('section')[Number(!positionSection)]
            .getElementsByTagName('div')[0];

        if (div) {

            delay = 500;

            divAnimate(div, Number(!positionSection), 'close');

            setTimeout(() => {

                removeDivInSection(div);

            }, 500);

        }

    // }

    if (divInSection) {

        delay = 500;

        divAnimate(divInSection, positionSection, 'close');

        setTimeout(() => {

            removeDivInSection(divInSection);

        }, 500);

    }

    setTimeout(() => {

        let div = document.createElement("div");

        div.classList.add(direction[positionSection][0]);

        section.appendChild(div);

        divInSection = section.getElementsByTagName('div')[0];

        switch (positionLi) {
            case 0:
                blockSkills(div);
                break;
            case 1:
                blockProject(div);
                break;
            case 3:
                blockInfo(div);
                break;
            case 4:
                blockContacts(div);
                break;
        }

    }, delay)

    setTimeout(() => {

        divAnimate(divInSection, positionSection, 'open')

    }, delay + 200)

}

function divAnimate(divInSection, positionSection, action) {

    let direction;
    if (window.innerWidth > 720) {
        direction = {
            0: ['toLeft', 'leftToRight'],
            1: ['toRight', 'rightToLeft']
        }
    } else {
        direction = {
            0: ['toTop', 'topToBottom'],
            1: ['toBottom', 'bottomToTop']
        }
    }

    if (action === 'open') {
        divInSection.classList.add(direction[positionSection][1]);
        divInSection.classList.remove(direction[positionSection][0]);
    } else {
        divInSection.classList.add(direction[positionSection][0]);
        divInSection.classList.remove(direction[positionSection][1]);
    }

}

function removeDivInSection(divInSection) {
    divInSection.remove();
}

