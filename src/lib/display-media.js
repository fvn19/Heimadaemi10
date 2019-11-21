import {
    save,
    load
} from './storage.js';

import {
    randomDate,
    el
} from './helpers.js';



// todo vísa í rétta hluti með import
const API_URL = 'https://api.nasa.gov/planetary/apod?api_key=JHjpxVKshVKB6gI30gpWXMWaBVXJmBP5Ooqoy0UH&date=';
// breytur til þess að halda utan um html element nodes
let title; // titill fyrir mynd á forsíðu
let text; // texti fyrir mynd á forsíðu
let img; // mynd á forsíðu
let video; // myndband 

// breytur til að halda utan um gildin 
let dateValue;
let typeValue;
let mediaUrlValue;
let titleValue;

/*
 * Sækir nýja Mynd af handahófi frá Nasa API og birtir hana á forsíðunni
 * ásamt titli og texta.
 */
function getNewImage() {
    const formatDate = randomDate(new Date('1995-06-16'), new Date());
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

            titleValue = data.title;
            dateValue = data.date;
            typeValue = data.media_type;
            mediaUrlValue = data.url;

            if (data.media_type === 'video') {
                img.src = '';
                video.src = data.url;
            } else {
                video.src = '';
                img.src = data.url;
            }
        })
        .catch(function (error) {
            console.log(error);
        })
}


/*
 * Vistar núverandi mynd í storage.
 */
function saveCurrentImage() {
    save(dateValue, typeValue, mediaUrlValue, titleValue);
}

/*
 * Upphafsstillir forsíðuna. Setur event listeners á takkana, og sækir eina mynd.
 *
 */

export default function init(apod) {
    document.getElementById('new-image-button').addEventListener('click', getNewImage);
    document.getElementById('save-image-button').addEventListener('click', saveCurrentImage);
    getNewImage();
}
//

function createImg(element) {
    var div = document.createElement("div");
    var heading = document.createElement("h1");
    var img = document.createElement("img");
    img.src = JSON.parse(element).mediaUrl;
    heading.innerHTML = JSON.parse(element).title;
    console.log(img);
    div.appendChild(img);
    div.appendChild(heading);
    document.getElementById('favoritesContainer').appendChild(div);

}
/*
 * Fall fyrir favourites.html. Sér um að sækja allar vistuðu myndirnar og birta þær ásamt
 * titlum þeirra.
 */
export function loadFavourites() {
    let favorites = load();
    favorites.forEach(element => createImg(element));
}