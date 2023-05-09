const form_Submit = document.getElementsByClassName('js_form');
const Btn_register = document.getElementById('js_register');
const Btn_login = document.getElementById('js_login');
const Ip_register = document.querySelectorAll('.field:not(.optional) .field__input>input');
const Vl_email = document.getElementsByClassName('js_email');
const Vl_password = document.getElementsByClassName('js_password');
const Vl_phone = document.getElementsByClassName('js_phone');
const Vl_password_again = document.getElementById('js_password_again');
const Btn_user = document.getElementById('btn_user');
const List_item_user = document.getElementById('js_list_user');

let result_Check, same_Password, done_password, done_email, done_phone = false;

function Check_validate(type, value) {
    switch (type) {
        case 'email':
            return value.match(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
        case 'password':
            if (value.length >= 8) {
                return true;
            }
            else {
                return false;
            }
        case 'phone':
            return /(((\+|)84))+([0-9]{9})\b/.test(value);
    }
}
function Stop_submit(allow, e) {

    if (e == undefined) {
        e = 0
    }
    form_Submit[e].addEventListener('submit', (e) => {
        if (allow) {
            e.preventDefault();
        }
        else {
            window.location = e.currentTarget.action;
        }
    })

}
const Check_email = (value, e) => {
    if (Check_validate('email', value)) {
        e.target.parentElement.className = "field__input";
        done_email = true;
    }
    else {
        e.target.parentElement.className = "field__input ip_email";
        done_email = false;
    }
}

const Check_password = (value, e) => {
    if (Check_validate('password', value)) {
        e.target.parentElement.className = 'field__input';
        done_password = true;
    }
    else {
        e.target.parentElement.className = 'field__input ip_password';
        done_password = false;
    }
}

const Check_phone = (value, e) => {
    if (Check_validate('phone', value)) {
        e.target.parentElement.className = 'field__input';
        done_phone = true;
    }
    else {
        e.target.parentElement.className = 'field__input ip_phone';
        done_phone = false;
    }
}
const Check_null = () => {
    let value = []
    Ip_register.forEach((item, index) => {
        item.parentElement.classList.remove('obligatory')
        if (item.value.length === 0) {
            item.parentElement.classList.add('obligatory')
        }
        value.push(item.value.length)
    })
    if (value.indexOf(0) === -1) {
        result_Check = true;
    }
    else {
        result_Check = false;
    }
}
function Check_value() {
    Ip_register.forEach((item, index) => {
        item.addEventListener('input', (e) => {
            Check_null()
        })
    })
}
const Check_same_password = () => {
    if (Vl_password_again.value.length > 0) {
        if (Vl_password_again.value === Vl_password[0].value) {
            same_Password = true;
            Vl_password_again.parentElement.className = 'field__input';
        }
        else {
            same_Password = false;
            Vl_password_again.parentElement.className = 'field__input ip_same_password';
        }
    }
}
if (Vl_email) {
    [...Vl_email].forEach((item, index) => {
        item.addEventListener('input', (e) => {
            Check_email(e.target.value, e)
        })
    })
}
if (Vl_password) {
    [...Vl_password].forEach((item, index) => {
        item.addEventListener('input', (e) => {
            Check_password(e.target.value, e);
            if (Vl_password_again) {
                Check_same_password();
            }
        })
    })

}
if (Vl_phone) {
    [...Vl_phone].forEach((item, index) => {
        item.addEventListener('input', (e) => {
            let not_Number = /\D/g.test(e.target.value)
            if (not_Number) {
                e.target.value = e.target.value.replace(/\D/g, '');
            }
            else {
                if (e.target.value.indexOf("0") === 0) {
                    let result = e.target.value.replace(0, 84);
                    e.target.value = result;
                }
                Check_phone(e.target.value, e);
            }
        })
    })

}
if (Vl_password_again) {
    Vl_password_again.addEventListener('input', () => {
        Check_same_password();
    })
}
if (Btn_register) {
    Btn_register.addEventListener('click', () => {
        Check_null();
        if (result_Check && same_Password && done_password && done_email && done_phone) {
            alert('Đăng ký thành công')
            Stop_submit(false);
        }
        else {
            Check_value();
            Stop_submit(true);
            return;
        }
    });
}
if (Btn_login) {
    Btn_login.addEventListener('click', () => {
        Check_null();
        if (result_Check && done_password) {
            alert('Đăng nhập thành công')
            Stop_submit(false);
        }
        else {
            Check_value();
            Stop_submit(true);
            return;
        }
    })
}
Btn_user.addEventListener('click', () => {
    List_item_user.classList.toggle('hidden');
})
document.addEventListener('click', function handleClickOutsideBox(event) {
    if (!Btn_user.contains(event.target)) {
        List_item_user && List_item_user.classList.add('hidden');
    }
});