document.addEventListener("DOMContentLoaded", function() {
    document.getElementById('signup-form').addEventListener('submit', function(event) {
        event.preventDefault();
        
        var usernameInput = document.getElementById('username');
        var emailInput = document.getElementById('email');
        var passwordInput = document.getElementById('password');
        var confirmPasswordInput = document.getElementById('confirm-password');
        
        var usernameError = document.getElementById('username-error');
        var emailError = document.getElementById('email-error');
        var passwordMatchError = document.getElementById('password-match-error');
        
        usernameError.textContent = '';
        emailError.textContent = '';
        passwordMatchError.textContent = '';

        var errors = [];

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        function validateEmail(email) {
            return emailRegex.test(email);
        }

        if (!validateEmail(emailInput.value)) {
            errors.push('Email is invalid');
        } 
        
        if (passwordInput.value.length >= 4) {
           if (passwordInput.value !== confirmPasswordInput.value) {
                errors.push('Passwords do not match');
            } 
        } else {
            errors.push('Password must be at least 4 characters long');
        }
        
        if (usernameInput.value.length !== 0) {
            if (usernameInput.value.length < 2) {
                errors.push('Username must be at least 2 characters long');
            }
        } else {
            errors.push('Username is required');
        }
        
        if (errors.length > 0) {
            errors.forEach(function(error) {
                var errorElement = document.createElement('p');
                errorElement.textContent = error;
                errorElement.className = 'error';
                switch (error) {
                    case 'Email is invalid':
                        emailError.appendChild(errorElement);
                        break;
                    case 'Passwords do not match':
                    case 'Password must be at least 4 characters long':
                        passwordMatchError.appendChild(errorElement);
                        break;
                    case 'Username must be at least 2 characters long':
                    case 'Username is required':
                        usernameError.appendChild(errorElement);
                        break;
                    default:
                        break;
                }
            });
        } else {
            this.submit();
        }
    });
});
