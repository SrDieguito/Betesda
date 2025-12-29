// Traducciones
const translations = {
    es: {
        'title': 'Iglesia Bautista Fundamental Betesda',
        'nav-home': 'Inicio',
        'nav-resources': 'Recursos',
        'nav-services': 'Servicios',
        'nav-sermons': 'Sermones',
        'nav-events': 'Eventos',
        'nav-contact': 'Contacto',
        'lang-toggle': 'ES/EN',
        'footer-location': 'Ubicación',
        'footer-location-desc': 'Cuenca, Ecuador',
        'footer-contact': 'Contacto',
        'footer-contact-email': 'Correo: contact@ibfb.org',
        'footer-contact-phone': 'Teléfono: +593 123 456 789',
        'footer-follow': 'Síguenos',
        'footer-social-facebook': 'Facebook',
        'footer-social-youtube': 'YouTube',
        'footer-social-instagram': 'Instagram',
        'footer-copyright': '&copy; 2025 Iglesia Bautista Fundamental Betesda. Todos los derechos reservados.'
    },
    en: {
        'title': 'Fundamental Baptist Church Bethesda',
        'nav-home': 'Home',
        'nav-resources': 'Resources',
        'nav-services': 'Services',
        'nav-sermons': 'Sermons',
        'nav-events': 'Events',
        'nav-contact': 'Contact',
        'lang-toggle': 'EN/ES',
        'footer-location': 'Location',
        'footer-location-desc': 'Cuenca, Ecuador',
        'footer-contact': 'Contact',
        'footer-contact-email': 'Email: contact@ibfb.org',
        'footer-contact-phone': 'Phone: +593 123 456 789',
        'footer-follow': 'Follow Us',
        'footer-social-facebook': 'Facebook',
        'footer-social-youtube': 'YouTube',
        'footer-social-instagram': 'Instagram',
        'footer-copyright': '&copy; 2025 Fundamental Baptist Church Bethesda. All rights reserved.'
    }
};

// Función para cambiar el idioma
function setLanguage(lang) {
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        if (translations[lang][key]) {
            element.textContent = translations[lang][key];
        }
    });
    
    document.documentElement.lang = lang;
    localStorage.setItem('language', lang);
    
    // Actualizar botones de idioma
    const langToggle = document.getElementById('lang-toggle');
    const langToggleMobile = document.getElementById('lang-toggle-mobile');
    
    if (langToggle) langToggle.textContent = lang === 'es' ? 'ES/EN' : 'EN/ES';
    if (langToggleMobile) langToggleMobile.textContent = lang === 'es' ? 'ES/EN' : 'EN/ES';
}

// Evento para cambiar idioma
document.addEventListener('DOMContentLoaded', function() {
    // Cargar idioma inicial
    const savedLang = localStorage.getItem('language') || 'es';
    setLanguage(savedLang);
    
    // Configurar botón de idioma
    const langToggle = document.getElementById('lang-toggle');
    if (langToggle) {
        langToggle.addEventListener('click', () => {
            const currentLang = localStorage.getItem('language') || 'es';
            const newLang = currentLang === 'es' ? 'en' : 'es';
            setLanguage(newLang);
        });
    }
});