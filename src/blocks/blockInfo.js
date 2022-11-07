export function blockInfo(div) {

    createDivAndPast(div);

}

function createDivAndPast(div) {

    let info = document.createElement('div');
    info.id = 'info';
    div.appendChild(info);

    let photo = document.createElement('div');
    photo.classList.add('infoPhoto');
    info.appendChild(photo);

    let img = document.createElement('img');
    img.classList.add('infoImg');
    img.src = '../src/img/blockInfo/profil.png'
    photo.appendChild(img);

    let name = document.createElement('div');
    name.classList.add('name');
    name.id = 'infoText';
    info.appendChild(name);

    for(let i = 0;i < 3; i++){
        let p = document.createElement('p');
        name.appendChild(p);
    }

    let textHTML = [
        ' Привет, меня зовут Михайловская Екатерина. В 2022 году я закончила' +
        ' Санкт-Петербургский государственный университет телекоммуникаций им. проф. М. А. Бонч-Бруевича,' +
        ' по направлению Информационные системы и технологии.' ,
        ' В сумме в сфере веб-разработки я нахожусь около года.' +
        ' Опыт работы в ИТ компании отсутствует,' +
        ' большая часть созданных проектов, была разработана для личного использования' +
        ' или фриланс заказов.',
        ' В список навыков на разных уровнях входят такие технологии как: HTML, CSS, JavaScript, JQuery,' +
        ' базовое понимание Vue, PHP и MySQL, Laravel, а тaкже основы Git, WebPack и Node.'
        // ' Буду рада присоедениться к вашей организации для дальнейшего взаимо развития.'
    ]

    let i = 0;
    let a = 0;

    let speed = 50;
    let arrP = document.getElementById("infoText").getElementsByTagName('p');

    function typeWriter() {
            if (a < textHTML[i].length) {
                arrP[i].innerHTML += textHTML[i].charAt(a);
                a++;
                if (document.getElementById("infoText")) {
                    document.getElementById("infoText").scrollTop += 10;
                }
                setTimeout(typeWriter, speed);
            } else {
                a = 0;
                i++;
                typeWriter();
            }
    }

    typeWriter();

}