const buttonDelivery = document.getElementsByClassName('button__search__delivery');
const buttonDelivery__ = document.getElementsByClassName('button__search__delivery__');
const buttonPrevious = document.querySelectorAll('.button_previous');
const buttonNext = document.querySelectorAll('.button_next');
const statusDelivery = document.querySelectorAll('.index__right--child--status');
const childDelivery = document.querySelectorAll('.index__right--child');
const profileItem = document.querySelectorAll('.profile__item');


//
const filterButtonIndexRight = document.querySelector('.index__right--top ul');
const filterTime = document.querySelector('.index__left--filter .first');
const filterAmount = document.querySelectorAll('.index__left--filter .amount li.button');
const filterAmountInput = document.querySelector('.index__left--filter .amount li.input input');
const filterRangerText = document.querySelector('.index__left--filter--range p');
const filterRangerInput = document.querySelector('.index__left--filter--range input');
const filterList = document.querySelectorAll('.index__left--filter .list input');

let amountInput = 1;

filterRangerInput.addEventListener('change', (e) => {
    const valueRanger = Number(e.target.value);
    filterRangerText.innerHTML = valueRanger.toLocaleString(
        undefined, // leave undefined to use the visitor's browser 
        // locale or a string like 'en-US' to override it.
        { minimumFractionDigits: 0 }
    ) + "đ";
});

filterAmount.length === 2 && (() => {
    filterAmountInput.addEventListener('input', (e) => {
        if (isNaN(e.target.value)) {
            filterAmountInput.value = 1;
        }
        else if (e.target.value) {
            if (e.target.value.length > 2) {
                amountInput = 1;
                filterAmountInput.value = 1;
            }
            else {
                amountInput = Number(filterAmountInput.value);
            }
        }
        else {
            amountInput = Number(filterAmountInput.value);
        }
    })
    filterAmount[1].addEventListener('click', () => {
        amountInput++;
        filterAmountInput.value = amountInput;
    });
    filterAmount[0].addEventListener('click', () => {
        if (amountInput === 1) return;
        amountInput--;
        filterAmountInput.value = amountInput;
    });
})();

const eventActive = (container) => {
    [...container.children].forEach(item => {
        item.addEventListener('click', () => {
            [...container.children].forEach(item_ => {
                item_.classList.remove('active');
            });
            item.classList.add('active');
        });
    });
}

eventActive(filterButtonIndexRight);
eventActive(filterTime);

//

const removeFilter = () => {
    filterRangerInput.value = 500000;
    [...filterTime.children].forEach(item => {
        item.classList.remove('active');
    });
    const defaultValue = 500000;
    filterRangerInput.value = defaultValue;
    filterRangerText.innerHTML = defaultValue.toLocaleString(
        undefined, // leave undefined to use the visitor's browser 
        // locale or a string like 'en-US' to override it.
        { minimumFractionDigits: 0 }
    ) + "đ";
    filterAmountInput.value = 1;
    amountInput = 1;
    [...filterList].forEach(item => {
        item.checked = false;
    })
}

const addEventButton = () => {
    [...buttonDelivery].forEach((item, index) => {
        item.addEventListener('click', () => {
            const status = item.classList.contains('close');
            item.classList.remove(!status ? 'active' : 'close');
            item.classList.add(status ? 'active' : 'close')
            item.innerHTML = status ? 'Chọn chuyển' : 'Đóng';

            const parent = item.parentElement.parentElement.parentElement.parentElement.parentElement;
            [...parent.children][1].classList.add(status ? 'hidden' : 'block');
            [...parent.children][1].classList.remove(!status ? 'hidden' : 'block');
        });
    });
    [...buttonDelivery__].forEach((item, index) => {
        item.addEventListener('click', () => {
            [...buttonDelivery][index].classList.remove('close');
            [...buttonDelivery][index].classList.add('active');
            [...buttonDelivery][index].innerHTML = 'Chọn chuyển';

            const parent = item.parentElement.parentElement;
            parent.classList.add('hidden');
            parent.classList.remove('block');
        });
    });
    [...buttonPrevious].forEach((item, index) => {
        item.addEventListener('click', () => {
            let pos = Number(statusDelivery[index].getAttribute('data-index'));
            pos = (pos - 1 <= 0 ? 0 : pos - 1);
            statusDelivery[index].setAttribute('data-index', pos);
            loadStep(index, pos);
        });
    });
    [...buttonNext].forEach((item, index) => {
        item.addEventListener('click', () => {
            let pos = Number(statusDelivery[index].getAttribute('data-index'));
            if (pos + 1 === 3) {
                window.location.href = './payment.html';
                return;
            }
            pos === 2 ? Sub_next(index) :
                pos = (pos + 1 >= 2 ? 2 : pos + 1);
            statusDelivery[index].setAttribute('data-index', pos);
            loadStep(index, pos);
        });
    });
};
const Sub_next = (e) => {
    Check_null();
    if (result_Check && done_email && done_phone) {
        alert('thành công')
        Stop_submit(false, e)
    }
    else {
        Check_value();
        Stop_submit(true, e)
        return;
    }
}
addEventButton();

const loadStep = (index, step) => {
    buttonPrevious[index].classList[step !== 0 ? 'remove' : 'add']('hidden');
    for (let i = 0; i < statusDelivery[index].children.length - 1; i++) {
        if (i < step) {
            [...statusDelivery[index].children][i].classList = 'checked';
            [...statusDelivery[index].children][i].children[0].classList = 'bx bx-check';
            [...statusDelivery[index].children][i].children[0].innerHTML = '';
            if ([...statusDelivery[index].children][i + 1]) {
                [...statusDelivery[index].children][i + 1].classList = 'active';
            }
        }
        else if (i === step) {
            [...statusDelivery[index].children][i].classList = 'active';
            [...statusDelivery[index].children][i].children[0].classList = '';
            [...statusDelivery[index].children][i].children[0].innerHTML = i + 1;
        }
        else {
            [...statusDelivery[index].children][i].classList = '';
            [...statusDelivery[index].children][i].children[0].classList = '';
            [...statusDelivery[index].children][i].children[0].innerHTML = i + 1;
        }
    }

    let items = [];

    [...childDelivery[index].children].forEach((item, index) => {
        if (item.classList.contains('step')) {
            items.push(item);
        }
    });

    items.forEach((item, pos) => {
        if (step === pos) {
            item.classList.remove('hidden');
        }
        else {
            item.classList.add('hidden');
        }
    });
}