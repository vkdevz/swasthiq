// Component Loader
const componentLoader = {
    async loadComponent(elementId, componentPath) {
        try {
            const response = await fetch(componentPath);
            const html = await response.text();
            document.getElementById(elementId).innerHTML = html;
        } catch (error) {
            console.error(`Error loading component ${componentPath}:`, error);
        }
    },

    async init() {
        // Load header
        if (document.getElementById('header-container')) {
            await this.loadComponent('header-container', '/components/header.html');
        }

        // Load footer
        if (document.getElementById('footer-container')) {
            await this.loadComponent('footer-container', '/components/footer.html');
        }
    }
};

// Initialize components when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    componentLoader.init();
}); 