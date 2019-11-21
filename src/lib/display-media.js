// todo vísa í rétta hluti með import
const API_URL = 'https://api.nasa.gov/planetary/apod?api_key=JHjpxVKshVKB6gI30gpWXMWaBVXJmBP5Ooqoy0UH&date=';
// breytur til þess að halda utan um html element nodes
let title; // titill fyrir mynd á forsíðu
let text; // texti fyrir mynd á forsíðu
let img; // mynd á forsíðu
let video; // myndband 

function randomDate(start, end) {
    var d = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime())),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
}


/*
 * Sækir nýja Mynd af handahófi frá Nasa API og birtir hana á forsíðunni
 * ásamt titli og texta.
 */
function getNewImage() {
    //*const formatDate = randomDate(new Date('1995-06-16'), new Date());
    const formatDate = new Date('2019-11-18');
    fetch(`${API_URL}${formatDate}`)
        .then((response) => {
            if (!response.ok) {
                console.log(error);
            }
            return response.json();
        })
        .then((data) => {
            title = document.getElementsByClassName('apod__title')[0]; // titill fyrir mynd á forsíðu
            text = document.getElementsByClassName('apod__text')[0]; // texti fyrir mynd á forsíðu
            img = document.getElementsByClassName('apod__image')[0];
            video = document.getElementsByClassName('apod__video')[0];
            text.innerHTML = data.explanation;
            title.innerHTML = data.title;
            if (data.media_type === 'video') {
                img.src = '';
                video.src = data.url;
            } else {
                img.src = data.url;
            }
        })
        .catch(function (error) {
            console.log(error);
        })
}

document.getElementById('new-image-button').addEventListener('click', getNewImage);

/*
 * Vistar núverandi mynd í storage.
 */
function saveCurrentImage() {

}

/*
 * Upphafsstillir forsíðuna. Setur event listeners á takkana, og sækir eina mynd.
 *
 */
export default function init(apod) {

}

/*
 * Fall fyrir favourites.html. Sér um að sækja allar vistuðu myndirnar og birta þær ásamt
 * titlum þeirra.
 */
export function loadFavourites() {

}