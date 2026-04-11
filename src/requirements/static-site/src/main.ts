import './style.css';
import { Sidebar } from './components/sidebar';
import { MainContent } from './components/main-content';
import { portfolioData } from './data/portfolio';

function initPortfolio(): void {
    const appContainer = document.getElementById('app');
    if (!appContainer)
        return;

    const sidebar = new Sidebar();
    const mainContent = new MainContent();

    appContainer.appendChild(sidebar.render(portfolioData));
    appContainer.appendChild(mainContent.render(portfolioData));
}

// Init when DOM is ready
if (document.readyState === 'loading')
    document.addEventListener('DOMContentLoaded', initPortfolio);
else
    initPortfolio();
