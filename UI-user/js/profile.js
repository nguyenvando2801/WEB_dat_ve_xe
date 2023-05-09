const profile__content__ = document.querySelectorAll('.profile__content__');
const categoryProfileCatelog = [
    document.querySelector('.profile__info'),
    document.querySelector('.delivery')
];
const buttonCancel = document.querySelector('.button-cancel .main');
const popupButtonCancel = document.querySelector('.popup-button-cancel');
const deliveryItemCurrent = document.querySelector('#delivery__item--current');
const deliveryItemWent = document.querySelector('#delivery__item--went');
const deliveryTop = document.querySelector('.delivery__top');
//

buttonCancel.addEventListener('click', () => {
    popupButtonCancel.classList.toggle('hidden');
});

[...profile__content__].forEach(item => {
    [...item.children].forEach((item_, index) => {
        item_.addEventListener('click', () => {
            switch (index) {
                case 0:
                    categoryProfileCatelog[0].classList.remove('hidden');
                    categoryProfileCatelog[1].classList.add('hidden');
                    break;
                case 1:
                    categoryProfileCatelog[0].classList.add('hidden');
                    categoryProfileCatelog[1].classList.remove('hidden');
                    break;
            }
            console.log(item);
            [...item.children].forEach((dt, i) => {
                if (i === index) {
                    dt.classList.add('active');
                }
                else {
                    dt.classList.remove('active');
                }
            });
        });

    });
});

deliveryTop.children[0].addEventListener('click', () => {
    deliveryItemCurrent.classList.remove('hidden');
    deliveryItemWent.classList.add('hidden');
});

deliveryTop.children[1].addEventListener('click', () => {
    deliveryItemCurrent.classList.add('hidden');
    deliveryItemWent.classList.remove('hidden');
});