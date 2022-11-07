import {skills} from '../json/skillsJson.js';

export function blockSkills(div) {

    skillsCreateAndPast(div);

    setTimeout(() => {
        setInterval(progressGetValueAnimate, 20)
    }, 300);

}

function skillsCreateAndPast(div) {

    let skillsDiv = document.createElement("div");
    skillsDiv.id = 'skills';
    div.appendChild(skillsDiv);

    for (let i = 0; i < Object.keys(skills).length; i++) {
        let skillBox = document.createElement("div");
        skillBox.classList.add('skillBox');
        skillsDiv.appendChild(skillBox);

        let label = document.createElement("label");
        label.setAttribute('for', 'skills' + i);
        label.classList.add('labelSkills');
        label.innerHTML = skills[i].name;
        skillBox.appendChild(label);

        let progressBox = document.createElement("div");
        progressBox.classList.add('progressBox');
        skillBox.appendChild(progressBox);

        let progressBackground = document.createElement("div");
        progressBackground.classList.add('progressBackground');
        progressBox.appendChild(progressBackground);

        let progress = document.createElement("div");
        progress.setAttribute('data-value', skills[i].progress);
        progress.id = 'skills' + i;
        progress.classList.add('skills');
        progress.style.background = skills[i].color;
        progress.style.width = skills[i].progress + '%';
        progressBox.appendChild(progress);
    }
    createArrCount();
}

let count = [];
const objects = document.getElementsByClassName('skills');

function createArrCount() {
    while (count.length != objects.length) {
        count.push(0);
    }
}

function progressGetValueAnimate() {
    for (let i = 0; i < objects.length; i++) {
        if (objects[i]) {
            if (count[i] != objects[i].dataset.value) {
                objects[i].style.width = count[i] + '%';
                count[i]++;
            }
        }
    }
}
