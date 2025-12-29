// Cargar componentes globales
function loadComponents() {
    // Cargar Header
    fetch('components/header.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('header-placeholder').innerHTML = data;
            setupMobileMenu();
        })
        .catch(error => console.error('Error loading header:', error));

    // Cargar Footer
    fetch('components/footer.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('footer-placeholder').innerHTML = data;
        })
        .catch(error => console.error('Error loading footer:', error));
}

// Configurar menú móvil después de cargar
function setupMobileMenu() {
    const menuBtn = document.getElementById("menu-btn");
    const mobileMenu = document.getElementById("mobile-menu");
    const langToggleMobile = document.getElementById("lang-toggle-mobile");

    if (menuBtn && mobileMenu) {
        menuBtn.onclick = () => {
            mobileMenu.classList.remove("-translate-y-full");
        };
        
        // Sincronizar botón de idioma móvil
        if (langToggleMobile) {
            langToggleMobile.onclick = () => {
                document.getElementById("lang-toggle").click();
            };
        }
    }
}

function closeMenu() {
    const mobileMenu = document.getElementById("mobile-menu");
    if (mobileMenu) {
        mobileMenu.classList.add("-translate-y-full");
    }
}

// Cargar componentes cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', loadComponents);