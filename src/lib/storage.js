/**
 * Sækir og vistar í localStorage
 */

// Fast sem skilgreinir heiti á lykli sem vistað er undir í localStorage
const LOCALSTORAGE_KEY = 'favourite_spacephotos';

/**
 * Sækir gögn úr localStorage. Skilað sem lista á forminu:
 * [{ type, mediaUrl, text, title },
 *  { type, mediaUrl, text, title },
 *  ...,
 *  { type, mediaUrl, text, title }]
 *
 * @returns {array} fylki af myndum eða tóma fylkið ef ekkert vistað.
 */
export function load() {

  var values = [],
    keys = Object.keys(localStorage),
    i = keys.length;

  while (i--) {
    values.push(localStorage.getItem(keys[i]));
  }

  return values;
}

/**
 * Vistaðar myndir með texta.
 *
 * @param {string} type annað hvort image eða video
 * @param {string} mediaUrl URL á myndinni/myndbandinu.
 * @param {string} text texti fyrir myndina/myndbandið.
 * @param {string} title titill fyrir myndina/myndbandið.
 */
export function save(date, type, mediaUrl, title) {
  var testObject = {
    'type': type,
    'mediaUrl': mediaUrl,
    'title': title
  };

  // Put the object into storage
  localStorage.setItem(date, JSON.stringify(testObject));
}


/**
 * Hreinsar allar myndir úr localStorage
 */
export function clear() {
  localStorage.removeItem(LOCALSTORAGE_KEY);
}