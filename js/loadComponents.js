// loadComponents.js - Versión mejorada
function loadComponents() {
    // Cargar Header
    fetch('components/header.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('header-placeholder').innerHTML = data;
            setupMobileMenu();
            // Disparar evento personalizado cuando el header se carga
            window.dispatchEvent(new Event('headerLoaded'));
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

// Ajustar padding cuando el header se carga
window.addEventListener('headerLoaded', function() {
    adjustBodyPadding();
});

function adjustBodyPadding() {
    const header = document.querySelector('#header-placeholder header');
    if (header) {
        const headerHeight = header.offsetHeight;
        document.body.style.paddingTop = headerHeight + 'px';
        console.log('Header height adjusted to:', headerHeight + 'px');
    }
}

// Ajustar también cuando cambie el tamaño de la ventana
window.addEventListener('resize', adjustBodyPadding);

// Cargar componentes cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', loadComponents);