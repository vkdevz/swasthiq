// Theme Management
const themeToggle = {
    init() {
        this.theme = localStorage.getItem('theme') || 'light';
        this.applyTheme();
        this.setupListeners();
    },

    applyTheme() {
        document.documentElement.setAttribute('data-theme', this.theme);
        document.body.classList.toggle('dark-mode', this.theme === 'dark');
    },

    toggleTheme() {
        this.theme = this.theme === 'light' ? 'dark' : 'light';
        localStorage.setItem('theme', this.theme);
        this.applyTheme();
    },

    setupListeners() {
        const themeBtn = document.getElementById('themeToggle');
        if (themeBtn) {
            themeBtn.addEventListener('click', () => this.toggleTheme());
        }
    }
};

// Navigation Management
const navigation = {
    init() {
        this.setupMobileMenu();
        this.setupScrollBehavior();
        this.setupActiveLinks();
    },

    setupMobileMenu() {
        const menuBtn = document.getElementById('mobileMenuBtn');
        const mobileMenu = document.getElementById('mobileMenu');
        
        if (menuBtn && mobileMenu) {
            menuBtn.addEventListener('click', () => {
                mobileMenu.classList.toggle('active');
                menuBtn.classList.toggle('active');
            });
        }
    },

    setupScrollBehavior() {
        // Smooth scroll for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth'
                    });
                }
            });
        });
    },

    setupActiveLinks() {
        const currentPath = window.location.pathname;
        document.querySelectorAll('nav a').forEach(link => {
            if (link.getAttribute('href') === currentPath) {
                link.classList.add('active');
            }
        });
    }
};

// Authentication Management
const auth = {
    init() {
        this.setupLoginModal();
        this.setupRegisterModal();
        this.checkAuthStatus();
    },

    setupLoginModal() {
        const loginBtn = document.getElementById('loginBtn');
        const loginModal = document.getElementById('loginModal');
        const closeBtn = document.querySelector('.close-btn');
        
        if (loginBtn && loginModal) {
            loginBtn.addEventListener('click', () => {
                loginModal.style.display = 'flex';
            });
        }

        if (closeBtn) {
            closeBtn.addEventListener('click', () => {
                loginModal.style.display = 'none';
            });
        }
    },

    setupRegisterModal() {
        const registerBtn = document.getElementById('registerBtn');
        const registerModal = document.getElementById('registerModal');
        
        if (registerBtn && registerModal) {
            registerBtn.addEventListener('click', () => {
                registerModal.style.display = 'flex';
            });
        }
    },

    checkAuthStatus() {
        const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
        const authElements = document.querySelectorAll('.auth-required');
        const guestElements = document.querySelectorAll('.guest-only');
        
        authElements.forEach(el => {
            el.style.display = isLoggedIn ? 'block' : 'none';
        });
        
        guestElements.forEach(el => {
            el.style.display = isLoggedIn ? 'none' : 'block';
        });
    }
};

// Notification System
const notifications = {
    init() {
        this.setupNotificationListeners();
    },

    show(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.classList.add('show');
        }, 100);
        
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, 3000);
    },

    setupNotificationListeners() {
        // Example: Listen for form submissions
        document.querySelectorAll('form').forEach(form => {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                this.show('Form submitted successfully!', 'success');
            });
        });
    }
};

// Initialize all modules when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    themeToggle.init();
    navigation.init();
    auth.init();
    notifications.init();
}); 