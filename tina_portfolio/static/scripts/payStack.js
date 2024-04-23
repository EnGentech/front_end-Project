document.addEventListener("DOMContentLoaded", function() {
    document.querySelectorAll('.buy-button').forEach(function(button) {
        button.addEventListener('click', function(event) {
            event.preventDefault();

            var price = this.closest('.buy').querySelector('.price').textContent.replace('$', '');
            var amount = parseFloat(price.replace(/[^0-9.-]+/g,"")) * 100;

            const userEmail = 'customer@example.com';
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
        });
    });
});
