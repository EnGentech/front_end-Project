function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        const offset = section.getBoundingClientRect().bottom + window.scrollY;
        window.scroll({
            top: offset - 700,
            behavior: 'smooth'
        });
    }
}

document.addEventListener("DOMContentLoaded", function() {
    const menuIcon = document.querySelector('.menu-icon');
    const navContainer = document.querySelector('.nav-container');

    menuIcon.addEventListener('click', function() {
        navContainer.classList.toggle('active');
    });

    var moreButtons = document.querySelectorAll('.more');

    moreButtons.forEach(function(button) {
        button.addEventListener('click', function() {
            var contentArea = button.closest('.contentArea');
            var highlightSection = contentArea.querySelector('.highlight');

            if (highlightSection.style.display === 'none' || !highlightSection.style.display) {
                highlightSection.style.display = 'block';
                button.textContent = 'LESS DETAILS ▲';
            } else {
                highlightSection.style.display = 'none';
                button.textContent = 'MORE DETAILS ▼';
            }
        });
    });

});
