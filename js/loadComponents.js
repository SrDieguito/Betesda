// loadComponents.js
document.addEventListener('DOMContentLoaded', function() {
    // Cargar Header
    fetch('components/header.html')
        .then(response => {
            if (!response.ok) {
                throw new Error('Error al cargar el header');
            }
            return response.text();
        })
        .then(data => {
            document.getElementById('header-placeholder').innerHTML = data;
            console.log('Header cargado correctamente');
            
            // Inicializar funcionalidades del header después de cargar
            initHeader();
        })
        .catch(error => {
            console.error('Error cargando header:', error);
            document.getElementById('header-placeholder').innerHTML = `
                <div style="background: black; color: white; padding: 1rem; text-align: center;">
                    Error cargando el menú de navegación
                </div>
            `;
        });

    // Cargar Footer
    fetch('components/footer.html')
        .then(response => {
            if (!response.ok) {
                throw new Error('Error al cargar el footer');
            }
            return response.text();
        })
        .then(data => {
            document.getElementById('footer-placeholder').innerHTML = data;
            console.log('Footer cargado correctamente');
        })
        .catch(error => {
            console.error('Error cargando footer:', error);
            document.getElementById('footer-placeholder').innerHTML = `
                <div style="background: #1a1a1a; color: white; padding: 2rem; text-align: center;">
                    © ${new Date().getFullYear()} Iglesia Bautista Betesda
                </div>
            `;
        });

    // Función para inicializar funcionalidades del header
    function initHeader() {
        const menuBtn = document.getElementById('menu-btn');
        const mobileMenu = document.getElementById('mobile-menu');
        const closeMobileMenu = document.getElementById('close-mobile-menu');
        const mobileLinks = document.querySelectorAll('.mobile-nav-link');
        const langToggle = document.getElementById('lang-toggle');
        const mobileLangToggle = document.getElementById('mobile-lang-toggle');

        // Toggle del menú móvil
        if (menuBtn && mobileMenu) {
            menuBtn.addEventListener('click', function() {
                mobileMenu.classList.toggle('-translate-x-full');
                document.body.style.overflow = mobileMenu.classList.contains('-translate-x-full') ? 'auto' : 'hidden';
            });
        }

        // Cerrar menú móvil
        if (closeMobileMenu) {
            closeMobileMenu.addEventListener('click', function() {
                mobileMenu.classList.add('-translate-x-full');
                document.body.style.overflow = 'auto';
            });
        }

        // Cerrar menú al hacer clic en enlaces
        mobileLinks.forEach(link => {
            link.addEventListener('click', function() {
                if (mobileMenu) {
                    mobileMenu.classList.add('-translate-x-full');
                    document.body.style.overflow = 'auto';
                }
            });
        });

        // Sistema de idiomas
        let currentLanguage = localStorage.getItem('preferredLanguage') || 'es';
        
        function toggleLanguage() {
            if (currentLanguage === 'es') {
                currentLanguage = 'en';
                if (document.getElementById('current-lang')) {
                    document.getElementById('current-lang').textContent = 'EN';
                }
                if (document.getElementById('mobile-current-lang')) {
                    document.getElementById('mobile-current-lang').textContent = 'English';
                }
                
                // Aquí puedes añadir lógica para cambiar contenido de la página
                console.log('Cambiando a inglés');
                
            } else {
                currentLanguage = 'es';
                if (document.getElementById('current-lang')) {
                    document.getElementById('current-lang').textContent = 'ES';
                }
                if (document.getElementById('mobile-current-lang')) {
                    document.getElementById('mobile-current-lang').textContent = 'Español';
                }
                
                console.log('Cambiando a español');
            }
            
            localStorage.setItem('preferredLanguage', currentLanguage);
            
            // Cerrar menú móvil si está abierto
            if (mobileMenu && !mobileMenu.classList.contains('-translate-x-full')) {
                mobileMenu.classList.add('-translate-x-full');
                document.body.style.overflow = 'auto';
            }
        }

        // Event listeners para botones de idioma
        if (langToggle) {
            langToggle.addEventListener('click', toggleLanguage);
        }
        
        if (mobileLangToggle) {
            mobileLangToggle.addEventListener('click', toggleLanguage);
        }
        
        // Aplicar idioma guardado
        if (currentLanguage === 'en') {
            if (document.getElementById('current-lang')) {
                document.getElementById('current-lang').textContent = 'EN';
            }
            if (document.getElementById('mobile-current-lang')) {
                document.getElementById('mobile-current-lang').textContent = 'English';
            }
        }
    }
});