document.addEventListener("DOMContentLoaded", function() {
    let productPrice;
    const orderForm = document.getElementById('orderForm');

    // Close order form
    const closeButton = document.getElementById('closeButton');

    closeButton.addEventListener('click', function() {
        orderForm.style.display = 'none';
        document.body.style.overflow = 'visible';
    });

    document.addEventListener("click", function(event) {
        if (event.target && event.target.classList.contains("buy-button")) {
            productPrice = event.target.closest(".itemList").querySelector('.price').textContent;
            orderForm.style.display = 'block';
            document.body.style.overflow = 'hidden';
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        }
    });

    document.getElementById('order-form').addEventListener('submit', function(event) {
        event.preventDefault();
        
        var firstNameInput = document.getElementById('firstname');
        var lastNameInput = document.getElementById('lastname');
        var emailInput = document.getElementById('email');
        var addressInput = document.getElementById('address');
        var phoneInput = document.getElementById('phone');
        
        var firstNameError = document.getElementById('firstname-error');
        var lastNameError = document.getElementById('lastname-error');
        var emailError = document.getElementById('email-error');
        var addressError = document.getElementById('address-error');
        var phoneError = document.getElementById('phone-error');
        
        firstNameError.textContent = '';
        lastNameError.textContent = '';
        emailError.textContent = '';
        addressError.textContent = '';
        phoneError.textContent = '';

        var errors = [];

        // Validation rules
        if (firstNameInput.value.trim() === '') {
            errors.push('First name is required');
        } else if (firstNameInput.value.trim().length < 3) {
            errors.push('First name must be at least 3 characters long');
        }

        if (lastNameInput.value.trim() === '') {
            errors.push('Last name is required');
        } else if (lastNameInput.value.trim().length < 3) {
            errors.push('Last name must be at least 3 characters long');
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(emailInput.value.trim())) {
            errors.push('Email is invalid');
        }

        if (addressInput.value.trim() === '') {
            errors.push('Residential address is required');
        }

        const phoneRegex = /^\d{11}$/; // Updated to check for 11 digits
        if (!phoneRegex.test(phoneInput.value.trim())) {
            errors.push('Phone number must be 11 digits');
        }

        if (errors.length > 0) {
            errors.forEach(function(error) {
                var errorElement = document.createElement('p');
                errorElement.textContent = error;
                errorElement.className = 'error';
                switch (error) {
                    case 'First name is required':
                        firstNameError.appendChild(errorElement);
                        break;
                    case 'First name must be at least 3 characters long':
                        firstNameError.appendChild(errorElement);
                        break;
                    case 'Last name is required':
                        lastNameError.appendChild(errorElement);
                        break;
                    case 'Last name must be at least 3 characters long':
                        lastNameError.appendChild(errorElement);
                        break;
                    case 'Email is invalid':
                        emailError.appendChild(errorElement);
                        break;
                    case 'Residential address is required':
                        addressError.appendChild(errorElement);
                        break;
                    case 'Phone number must be 11 digits':
                        phoneError.appendChild(errorElement);
                        break;
                    default:
                        break;
                }
            });
        } else {
            var price = productPrice.replace('$', '');
            var amount = parseFloat(price.replace(/[^0-9.-]+/g,"")) * 100;

            const userEmail = emailInput.value;
            const reference = Math.floor((Math.random() * 1000000000) + 1).toString();

            const data = {
                email: userEmail,
                amount: amount,
                reference: reference,
            };

            fetch('https://api.paystack.co/transaction/initialize', {
                method: 'POST',
                body: JSON.stringify(data),
                headers: {
                    'Authorization': 'Bearer sk_test_a28e13ca97f109c4688821390d78cd5bdfdc9516',
                    'Content-Type': 'application/json',
                },
            })
            .then(response => response.json())
            .then(data => {
                if (data.status === true) {
                    const authorizationUrl = data.data.authorization_url;
                    window.location.href = authorizationUrl;
                } else {
                    console.error(data.message);
                }
            })
            .catch(error => console.error(error));
        }
    });
});
