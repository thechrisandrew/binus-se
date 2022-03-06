const page = [...document.getElementsByClassName('main')];

function changeStep() {
    try {
        page.forEach((item, index) => {
            item.getElementsById('button')[0].addEventListener('click', () => {
                const valid = [...item.querySelectorAll('input')];
                const check = valid.every(item => item.checkValidity());
                if(check && index < 2) {
                    item.addEventListener('animationend', () => {
                        item.classList.remove('block');
                        item.classList.add('hidden');
                        page[index + 1].classList.remove('hidden');
                        page[index + 1].classList.add('block');
                    });
                    item.classList.add('animate-slidein');
                }
            });
        });
    } catch (error) {
        console.log(error);
    }
}

changeStep();

const submit = document.querySelector('form');
const pw = document.querySelector('#password');
const check_pw = document.querySelector('#check_password');
const msg = document.querySelector('.message');
console.log(submit);

submit.addEventListener('submit', (e) => {
    e.preventDefault();
    if(pw.value === check_pw.value) {
    const valid = [...submit.querySelectorAll('input')];
    const check = valid.every(item => item.checkValidity());
        if(check) {
            submit.submit();
        } else {
            msg.innerHTML = 'Password do not match';
        }
    }
});
