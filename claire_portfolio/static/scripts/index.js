document.addEventListener("DOMContentLoaded", function() {
    const exploreButton = document.getElementById('explorebtn');

    if (exploreButton) {
        exploreButton.addEventListener('click', function() {
            window.location.href = 'products.html';
        });
    }

    const allContent = document.querySelector('.allContent');


    const targetDate = new Date();
    targetDate.setDate(targetDate.getDate() + 2);

    function updateCountdown() {
        const currentDate = new Date();
        const timeDifference = targetDate - currentDate;

        const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

        const countdownText = `${days}:${hours}:${minutes}:${seconds}`;

        document.querySelector('#blogView span').textContent = countdownText;

        setTimeout(updateCountdown, 1000);
    }

    updateCountdown();

    function renderFirstItems(data) {
        const firstItems = {};

        data.forEach(item => {
            const key = Object.keys(item)[0];
            const commonName = item[key].commonName;

            if (commonName === "sets") {
                return
            }

            if (!firstItems[commonName]) {
                firstItems[commonName] = item[key];
            }
        });

        const allContent = document.querySelector('.allContent');
        if (!allContent) {
            console.error("Unable to find 'allContent' element.");
            return;
        }

        Object.values(firstItems).forEach(product => {
            const contentArea = document.createElement('div');
            contentArea.classList.add('contentArea');

            const contentAreaFlex = document.createElement('div');
            contentAreaFlex.classList.add('contentAreaFlex');

            const itemList = document.createElement('section');
            itemList.classList.add('itemList');

            const order = document.createElement('div');
            order.classList.add('order');

            const featureImage = document.createElement('div');
            featureImage.classList.add('featureImage');
            const img = document.createElement('img');
            img.src = `/static/images/products/${product.image}`;
            img.alt = product.name;
            featureImage.appendChild(img);

            const name = document.createElement('div');
            name.classList.add('name');
            const h3 = document.createElement('h3');
            h3.textContent = product.name;
            name.appendChild(h3);

            const price = document.createElement('div');
            price.classList.add('price');
            price.textContent = `$${product.price.toFixed(2)}`;

            const buy = document.createElement('div');
            buy.classList.add('buy');
            const pPrice = document.createElement('p');
            pPrice.classList.add('price');
            buy.appendChild(pPrice);
            const button = document.createElement('button');
            button.classList.add('buy-button');
            button.textContent = 'Add to Cart';
            buy.appendChild(button);

            itemList.appendChild(order);
            itemList.appendChild(featureImage);
            itemList.appendChild(name);
            itemList.appendChild(price);
            itemList.appendChild(buy);

            contentAreaFlex.appendChild(itemList);
            contentArea.appendChild(contentAreaFlex);

            allContent.appendChild(contentArea);
        });
    }

    // Fetch JSON data and render the first items
    fetch('static/scripts/product.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            renderFirstItems(data);
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        });
});
