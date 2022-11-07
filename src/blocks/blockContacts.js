export function blockContacts(div) {

    contactsCreateAndPast(div);

}

function contactsCreateAndPast(div) {

    let contactsDiv = document.createElement("div");
    contactsDiv.id = 'contacts';
    div.appendChild(contactsDiv);

    let p = document.createElement("p");
    contactsDiv.appendChild(p);

    let contactsIconsBox = document.createElement("div");
    contactsIconsBox.classList.add('iconsBox');
    contactsDiv.appendChild(contactsIconsBox);

    let phone = document.createElement("div");
    contactsIconsBox.appendChild(phone);

    let aPhone = document.createElement("a");
    aPhone.href = 'tel:+79773578661';
    aPhone.setAttribute('target', '_blank');
    phone.appendChild(aPhone);

    let imgPhone = document.createElement("img");
    imgPhone.classList.add('contactsIcon');
    imgPhone.src = '../src/img/blockContacts/telephone.png'
    aPhone.appendChild(imgPhone);


    let telegram = document.createElement("div");
    contactsIconsBox.appendChild(telegram);

    let aTelegram = document.createElement("a");
    aTelegram.href = 'https://t.me/Doodle_voodle';
    aTelegram.setAttribute('target', '_blank');
    telegram.appendChild(aTelegram);

    let imgTelegram = document.createElement("img");
    imgTelegram.classList.add('contactsIcon');
    imgTelegram.src = '../src/img/blockContacts/telegram.png'
    aTelegram.appendChild(imgTelegram);


    let vk = document.createElement("div");
    contactsIconsBox.appendChild(vk);

    let aVk = document.createElement("a");
    aVk.href = 'https://vk.com/id389145822';
    aVk.setAttribute('target', '_blank');
    vk.appendChild(aVk);

    let imgVk = document.createElement("img");
    imgVk.classList.add('contactsIcon');
    imgVk.src = '../src/img/blockContacts/vk.png'
    aVk.appendChild(imgVk);


    let whatsapp = document.createElement("div");
    contactsIconsBox.appendChild(whatsapp);

    let aWhatsapp = document.createElement("a");
    aWhatsapp.href = 'https://wa.me/79773578661';
    aWhatsapp.setAttribute('target', '_blank');
    whatsapp.appendChild(aWhatsapp);

    let imgWhatsapp = document.createElement("img");
    imgWhatsapp.classList.add('contactsIcon');
    imgWhatsapp.src = '../src/img/blockContacts/whatsapp.png'
    aWhatsapp.appendChild(imgWhatsapp);


    let email = document.createElement("div");
    contactsIconsBox.appendChild(email);

    let aEmail = document.createElement("a");
    aEmail.href = 'mailto:kate.miha2410@icloud.com';
    aEmail.setAttribute('target', '_blank');
    email.appendChild(aEmail);

    let imgEmail = document.createElement("img");
    imgEmail.classList.add('contactsIcon');
    imgEmail.src = '../src/img/blockContacts/email.png'
    aEmail.appendChild(imgEmail);

    textAnimate(p);
}

function textAnimate(p){
    let i = 0;

    let speed = 25;
    let textHTML = ' Буду рада присоедениться к вашей организации для дальнейшего взаимо развития :)';

    function typeWriter() {
        if (i < textHTML.length) {
            p.innerHTML += textHTML.charAt(i);
            i++;
            setTimeout(typeWriter, speed);
        }
    }

    typeWriter();

}
