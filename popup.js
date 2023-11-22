const POPUP_OPENED_CLASSNAME = 'popup_open';
const BODY_FIXED_CLASSNAME = 'body_fixed';

const bodyNode = document.querySelector('body');
const popupNode = document.querySelector('.js-popup');
const btnOpenNode = document.querySelector('.js-btn');
const popupContentNode = document.querySelector('.js-popup__content')
const btnCloseNode = document.querySelector('.js-popup__close-btn');
const btnCloseNodeTwo = document.querySelector('.js-popup__btn')



btnOpenNode.addEventListener('click', togglePopup);
btnCloseNode.addEventListener('click', togglePopup);
btnCloseNodeTwo.addEventListener('click', togglePopup);

popupNode.addEventListener('click', (event) => {
    const isClickOutsideContent = !event.composedPath().includes(popupContentNode)
    
    if (isClickOutsideContent) {
        togglePopup();
    }
    
})

function togglePopup() {
    popupNode.classList.toggle(POPUP_OPENED_CLASSNAME);
    bodyNode.classList.toggle(BODY_FIXED_CLASSNAME);
}


// const POPUP_OPENED_CLASSNAME = 'popup_open';
// console.log(POPUP_OPENED_CLASSNAME);
// const popupNode = document.querySelector('.js-popup');
// console.log(popupNode);
// const btnOpenNode = document.querySelector('.js-btn');
// console.log(btnOpenNode)

btnOpenNode.addEventListener('click', togglePopup);

function togglePopup() {
    popupNode.classList.toggle(POPUP_OPENED_CLASSNAME);
}



