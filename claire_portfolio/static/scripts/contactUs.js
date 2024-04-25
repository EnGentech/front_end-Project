document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contactForm');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const phoneInput = document.getElementById('phone');
    const commentInput = document.getElementById('comment');
    const resetButton = document.getElementById('resetButton');

    form.addEventListener('submit', function(event) {
        let isValid = true;

        if (nameInput.value.trim() === '') {
            document.getElementById('nameError').innerText = 'Name is required';
            isValid = false;
        } else {
            document.getElementById('nameError').innerText = '';
        }

        if (emailInput.value.trim() === '') {
            document.getElementById('emailError').innerText = 'Email is required';
            isValid = false;
        } else {
            document.getElementById('emailError').innerText = '';
        }

        if (phoneInput.value.trim() === '') {
            document.getElementById('phoneError').innerText = 'Phone number is required';
            isValid = false;
        } else {
            document.getElementById('phoneError').innerText = '';
        }

        if (commentInput.value.trim() === '') {
            document.getElementById('commentError').innerText = 'Comment is required';
            isValid = false;
        } else {
            document.getElementById('commentError').innerText = '';
        }

        if (!isValid) {
            event.preventDefault();
        }
    });

    resetButton.addEventListener('click', function() {
        resetForm();
    });

    function resetForm() {
        form.reset();
        document.querySelectorAll('.error').forEach(error => error.innerText = '');
    }
});
