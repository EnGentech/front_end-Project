document.addEventListener('DOMContentLoaded', function() {
    const lpContent = document.querySelector('.lpContent');
    const categories = document.querySelectorAll('#headerContent a');
    const productHead = document.getElementById('productHead');

    let amount = 0; // Initialize amount variable

    function toSentenceCase(str) {
        return str.toLowerCase().split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
    }

    function renderItems(category) {
        lpContent.innerHTML = '';
        let headingText = '';
        fetch('static/scripts/data.json')
            .then(response => response.json())
            .then(jsonData => {
                let filteredData;
                if (category === 'all') {
                    filteredData = jsonData;
                    headingText = 'Products & Services';
                } else {
                    filteredData = jsonData.filter(item => item.commonName.toLowerCase() === category.toLowerCase());
                    headingText = `${toSentenceCase(category)} Products`;
                }

                productHead.textContent = headingText;

                filteredData.forEach(item => {
                    const lpItem = document.createElement('div');
                    lpItem.classList.add('lpItem');

                    const img = document.createElement('img');
                    img.src = item.image;
                    img.alt = item.name;
                    img.classList.add('lpImage');
                    lpItem.appendChild(img);

                    const name = document.createElement('h3');
                    name.textContent = toSentenceCase(item.name);
                    lpItem.appendChild(name);

                    const description = document.createElement('p');
                    description.textContent = item.description;
                    description.classList.add('lpDescription');
                    lpItem.appendChild(description);

                    const price = document.createElement('p');
                    const priceFloat = parseFloat(item.price); // Extract float value
                    price.textContent = `Price: $${priceFloat.toFixed(2)}`;
                    price.classList.add('lpPrice');
                    lpItem.appendChild(price);

                    const buyButton = document.createElement('button');
                    buyButton.textContent = 'BUY';
                    buyButton.classList.add('lpBuyButton');
                    lpItem.appendChild(buyButton);
                   
                    buyButton.addEventListener('click', function() {
                        amount = priceFloat * 100; // Convert amount to kobo
                        const userEmail = 'customer@example.com'; // Replace with actual email address
                        const reference = Math.floor((Math.random() * 1000000000) + 1).toString(); // Generate unique reference
            
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

                    lpContent.appendChild(lpItem);
                });
            })
            .catch(error => console.error('Error fetching data:', error));
    }

    categories.forEach(category => {
        category.addEventListener('click', function(e) {
            e.preventDefault();
            const selectedCategory = category.id;
            renderItems(selectedCategory);
        });
    });

    renderItems('all');
});
