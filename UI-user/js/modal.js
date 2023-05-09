const modal = document.querySelector('.modal');
const modal_close = document.querySelector('.modal__close');

modal_close.addEventListener('click', () => {
    modal.classList.remove('active');
});

const openModal = () => {
    modal.classList.add('active');
}