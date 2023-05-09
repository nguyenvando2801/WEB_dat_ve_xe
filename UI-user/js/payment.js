const momo = document.querySelector('#momo');
const banking = document.querySelector('#banking');
const offline = document.querySelector('#offline');
const bankingChild = document.querySelector('.payment__method--banking.banking');
const offlineChild = document.querySelector('.payment__method--banking.offline');
const paymentFooter = document.querySelector('.payment__footer');
const paymentFooterA = document.querySelector('.payment__footer div a');

if (momo && banking && offline && bankingChild && offlineChild && paymentFooter) {
    const methods = [momo, banking, offline];

    methods.forEach(method => {
        method.addEventListener('change', (e) => {
            onChangeMethod(e.target.value);
        });
    });
    const onChangeMethod = (method) => {
        paymentFooter.classList.remove('hidden');
        switch (method) {
            case "momo":
                paymentFooterA.href = './momo.html';
                offlineChild.classList.add('hidden');
                bankingChild.classList.add('hidden');
                break;
            case "banking":
                offlineChild.classList.add('hidden');
                bankingChild.classList.remove('hidden');
                break;
            case "offline":
                offlineChild.classList.remove('hidden');
                bankingChild.classList.add('hidden');
                break;
            default:
                paymentFooterA.href = './payment-success.html';
        }
    }
}