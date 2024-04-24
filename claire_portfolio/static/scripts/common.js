document.addEventListener("DOMContentLoaded", function() {
    const menuIcon = document.querySelector('.menu-icon');
    const navContainer = document.querySelector('.nav-container');

    // function toggleCategoryList() {
    //     categoryList.style.display = (categoryList.style.display === 'block') ? 'none' : 'block';
    // }

    // function hideCategoryList() {
    //     categoryList.style.display = 'none';
    // }

    // document.body.addEventListener('click', event => { if (event.target === document.body) hideCategoryList(); });
    // window.addEventListener('scroll', hideCategoryList);
    menuIcon.addEventListener('click', () => navContainer.classList.toggle('active'));
})