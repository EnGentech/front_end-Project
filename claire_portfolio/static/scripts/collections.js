document.addEventListener("DOMContentLoaded", function() {
    const categoryList = document.querySelector("#headerContent ul");
    const header = document.querySelector("#header")

    function toggleCategoryList() {
        categoryList.style.display = (categoryList.style.display === 'block') ? 'none' : 'block';
    }

    function hideCategoryList() {
        categoryList.style.display = 'none';
    }

    document.getElementById("category").addEventListener('click', toggleCategoryList);
    document.body.addEventListener('click', event => { if (event.target === document.body) hideCategoryList(); });
    window.addEventListener('scroll', hideCategoryList);

    const allContent = document.querySelector('.allContent');

    fetch('static/scripts/product.json')
    .then(response => response.json())
    .then(data => {
        let filteredData = data;

        const urlParams = new URLSearchParams(window.location.search);
        const categoryParam = urlParams.get('category');

        if (categoryParam) {
            filteredData = data.filter(item => Object.values(item)[0].commonName === categoryParam);
        }

        filteredData.forEach(productData => {
            const product = Object.values(productData)[0];

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
            button.textContent = 'ORDER';
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

        document.getElementById("tops").addEventListener('click', function(event) {
            event.preventDefault();
            filterProducts('tops', data);
        });

        document.getElementById("shorts").addEventListener('click', function(event) {
            event.preventDefault();
            filterProducts('shorts', data);
        });

        document.getElementById("leggings").addEventListener('click', function(event) {
            event.preventDefault();
            filterProducts('leggings', data);
        });

        document.getElementById("sets").addEventListener('click', function(event) {
            event.preventDefault();
            filterProducts('sets', data);
        });
    })
    .catch(error => console.error('Error fetching data:', error));

    function filterProducts(category, data) {
        const filteredData = data.filter(item => Object.values(item)[0].commonName === category);
    
        allContent.innerHTML = '';
    
        if (filteredData.length === 0) {
            const noItemMessage = document.createElement('h2');
            noItemMessage.textContent = 'No item for this category at the moment';
            noItemMessage.style.margin = "auto auto";
            noItemMessage.style.backgroundColor = 'red';
            noItemMessage.style.padding = '10px 80px 10px 80px';
            noItemMessage.style.color = 'white';
            noItemMessage.style.marginTop = "5%";
            allContent.appendChild(noItemMessage);
        } else {
    
            filteredData.forEach((productData, index) => {
                header.style.color = "red";
                header.style.margin = "0px 0px 50px";
                const product = Object.values(productData)[0];
    
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
    }
    
    
});
