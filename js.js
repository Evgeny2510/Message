
"use strict"

document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('form');
    form.addEventListener('submit', formSend);

    async function formSend(e) {
        e.preventDefault();

        var error = formValidate(form);

        let formData = new FormData(form);
        formData.append('image', formImage.files[0]);

        if (error === 0) {
            form.classList.add('_sending');
            let response = await fetch('sendmail.php', {
                method: 'POST',
                body: formData
            });
            if (response.ok) {
                let result = await response.json();
                alert(result.message);
                formPreview.innerHTML = '';
                form.reset();
                form.classList.remove('_sending');
            } else {
                alert('משהו פו לא טוב ');
                form.classList.remove('_sending');
            }
        } else {
            alert('fill in the input fields');
        }
    };

    function formValidate(form) {
        let error = 0;
        let formReq = document.querySelectorAll('._req');

        for (let index = 0; index < formReq.length; index++) {
            const input = formReq[index];
            formRemoveError(input);

            if (input.classList.contains('_email')) {
                if (emailTest(input)) {
                    formAddError(input);
                    error++;
                }
            } else if (input.getAttribute("type") === "checkbox" && input.checked === false) {
                formAddError(input);
                error++;
            } else {
                if (input.value === '') {
                    formAddError(input);
                    error++;
                }
            }

        }
        return error;
    }

    function formAddError(input) {
        input.parentElement.classList.add('_error');
        input.classList.add('_error');

    }

    function formRemoveError(input) {
        input.parentElement.classList.remove('_error');
        input.classList.remove('_error');

    }

    //check what and were in email
    function emailTest(input) {
        return !/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(input.value);

    }



    //אנחנו מקבלים בINPUT FILE משתנה
    const formImage = document.getElementById('formImage');
    //מוסיפים DIV בשביל להוסיף למשתנה
    const formPreview = document.getElementById('formPreview');



    //שמים משתנה ב input file
    formImage.addEventListener('change', () => {
        uploadFile(formImage.files[0]);
    });


    function uploadFile(file) {
        if (!['image/jpeg', 'image/png', 'image/gif'].includes(file.type)) {
            alert('you can input just images ')
            formImage.value = '';
            return;
        }

        //בודקים תמונה ב2 MB
        if (file.size > 2 * 1024 * 1024) {
            alert('MB קובץ צריך להיות מתחת ל2 ');
            return;
        }

        //להומיא את התמונה על המסך
        var reader = new FileReader();
        reader.onload = function (e) {
            formPreview.innerHTML = `<img src="${e.target.result}" alt="photo">`;
        };
        reader.onerror = function (e) {
            alert('error');

        };
        reader.readAsDataURL(file);

    }


});