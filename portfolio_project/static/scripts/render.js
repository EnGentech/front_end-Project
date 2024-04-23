const laptopData = {
    'Apple': [
        {
            "name": "MacBook Air",
            "price": 820.50,
            "description": "The MacBook Air is a line of laptop computers developed and manufactured by Apple Inc. It consists of a full-size keyboard, a machined aluminum case, and a thin light structure. The Air is available with a screen size of (measured diagonally) 13.3 inches (33.782 cm), with different specifications produced by Apple.",
            "image": "https://www.tech21century.com/wp-content/uploads/2015/03/macbookpro.jpg"
        }
    ],

    'HP': [
        {
            "name": "HP Pavilion",
            "price": 650.50,
            "description": "The HP Pavilion is a line of personal computers produced by Hewlett-Packard (HP) and introduced in 1995. The name is applied to both desktops and laptops for the Home and Home Office product range.",
            "image": "https://www.bhphotovideo.com/images/images2500x2500/HP_Hewlett_Packard_WQ744UA_ABA_Pavilion_dv5_2070us_Entertainment_14_5_703179.jpg"
        }
    ],

    "Asus": [
        {
            "name": "Asus ZenBook",
            "price": 750.50,
            "description": "The Asus ZenBook is a line of ultrabooks produced by Asus. The product family began with the release of the ZenBook in 2011, followed by the UX21E and UX31E in 2011. The Zenbook mainly competes against computers such as Acer's Aspire, Dell's Inspiron and XPS, HP's Pavilion and Envy, Lenovo's IdeaPad and Toshiba's Satellite.",
            "image": "https://th.bing.com/th/id/R.f4a2e5490a93f6d77f8770d6b9046555?rik=RtHRymfKs5FrrA&pid=ImgRaw&r=0"
        }
    ],

    'DELLz' : [
        {
            "name": "Dell Inspiron",
            "price": 750.50,
            "description": "The Dell Inspiron is a line of consumer computer laptops manufactured by Dell. It was introduced in 1999 by Dell. The Inspiron series is a computer product line created, designed, developed, marketed, produced and sold by Dell as a range of affordable laptop computers, desktop computers and all-in-one computers.",
            "image": "https://th.bing.com/th/id/R.918a85b81291639b1e4fc519fba97b47?rik=6cXridC%2bLfk7YQ&riu=http%3a%2f%2fwww.notebookcheck.net%2fuploads%2ftx_nbc2%2fDellInspiron15-5558__4_.jpg&ehk=gs%2f9mPSdVwp4EnPQFeQjr6%2bnKGDaCVRv7MEee8rPzQk%3d&risl=&pid=ImgRaw&r=0"
        }
    ],

    'Toshiba': [
        {
            "name": "Toshiba Satellite",
            "price": 750.50,
            "description": "The Toshiba Satellite (dynabook Satellite in Japan) was a line of consumer-grade notebook computers marketed by Toshiba, and were some of the earliest laptops, introduced in the early-1990s, to compete with the IBM Thinkpad line. Models in the Satellite family varied greatly - from entry-level models sold at major retailers to full-fledged media center-class notebooks.",
            "image": "https://www.notebookcheck.org/uploads/tx_nbc2/4zu3_Toshiba_Satellite_L50_C_275.jpg"
        }
    ],
    
    'Accessories': [
        {
            "name": "Laptop Bag",
            "price": 50.50,
            "description": "A laptop bag is a bag designed to carry and protect laptops. Some laptop bags are designed to be simple and inexpensive, while others are fashionable, made of top-notch materials, and cost a pretty penny.",
            "image": "https://th.bing.com/th/id/OIP._ONwF0whh4PDeGU3ERzDLAHaHa?rs=1&pid=ImgDetMain"
        }
    ]
};

document.addEventListener('DOMContentLoaded', function() {
    const path = window.location.pathname;
    console.log(path)
    if (path === "/index.html") {
        const renderApple = document.getElementById('apple');
        const renderHP = document.getElementById('hp');
        const renderAsus = document.getElementById('asus');
        const renderDELLz = document.getElementById('dell');
        const renderToshiba = document.getElementById('toshiba');
        const renderAccessories = document.getElementById('accessories');
    
        renderApple.addEventListener('click', function() {
            renderLaptops('Apple');
        });
    
        renderHP.addEventListener('click', function() {
            renderLaptops('HP');
        });
    
        renderAsus.addEventListener('click', function() {
            renderLaptops('Asus');
        });
    
        renderDELLz.addEventListener('click', function() {
            renderLaptops('DELLz');
        });
    
        renderToshiba.addEventListener('click', function() {
            renderLaptops('Toshiba');
        });
    
        renderAccessories.addEventListener('click', function() {
            renderLaptops('Accessories');
        });
    } else if (path === '/products.html') {
        renderAllLaptops();
    }

});

function renderLaptops(brandName) {
    const mainPage = document.getElementById('hideContentArea');
    const appleContent = document.querySelector('.lpContent');
    appleContent.innerHTML = '';

    // Create heading for the brand's products
    const heading = document.createElement('h2');
    heading.textContent = `${brandName} Products`;
    heading.style.textAlign = 'center';
    appleContent.appendChild(heading);

    mainPage.style.display = 'none';

    const laptops = laptopData[brandName] || [];
    laptops.forEach(laptop => {
        const laptopDiv = document.createElement('div');
        laptopDiv.classList.add('laptop-item');

        const image = document.createElement('img');
        image.src = laptop.image;
        image.alt = laptop.name;
        laptopDiv.appendChild(image);

        const nameHeading = document.createElement('h2');
        nameHeading.textContent = laptop.name;
        laptopDiv.appendChild(nameHeading);

        const descriptionPara = document.createElement('p');
        descriptionPara.textContent = laptop.description;
        laptopDiv.appendChild(descriptionPara);

        const pricePara = document.createElement('p');
        pricePara.textContent = `Price: $${laptop.price}`;
        laptopDiv.appendChild(pricePara);

        appleContent.appendChild(laptopDiv);
    });
}

function renderAllLaptops() {
    const appleContent = document.querySelector('.lpContent');
    appleContent.innerHTML = '';

    const heading = document.createElement('h2');
    heading.textContent = '';
    heading.style.textAlign = 'center';
    appleContent.appendChild(heading);

    const allLaptops = Object.values(laptopData).reduce((acc, laptops) => {
        return acc.concat(laptops);
    }, []);

    allLaptops.forEach(laptop => {
        const laptopDiv = document.createElement('div');
        laptopDiv.classList.add('laptop-item');

        const image = document.createElement('img');
        image.src = laptop.image;
        image.alt = laptop.name;
        laptopDiv.appendChild(image);

        const nameHeading = document.createElement('h2');
        nameHeading.textContent = laptop.name;
        laptopDiv.appendChild(nameHeading);

        const descriptionPara = document.createElement('p');
        descriptionPara.textContent = laptop.description;
        laptopDiv.appendChild(descriptionPara);

        const pricePara = document.createElement('p');
        pricePara.textContent = `Price: $${laptop.price}`;
        laptopDiv.appendChild(pricePara);

        appleContent.appendChild(laptopDiv);
    });
}

