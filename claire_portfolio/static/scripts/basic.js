document.addEventListener("DOMContentLoaded", function() {
    const menuIcon = document.querySelector('.menu-icon');
    const navContainer = document.querySelector('.nav-container');

    menuIcon.addEventListener('click', function() {
        navContainer.classList.toggle('active');
    });

    fetch('static/scripts/product.json')
    .then(response => response.json())
    .then(data => {
        const allContent = document.querySelector('.allContent');

        data.forEach(productData => {
            const productName = Object.keys(productData)[0];
            const product = productData[productName];

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
    })
    .catch(error => console.error('Error fetching data:', error));
});
