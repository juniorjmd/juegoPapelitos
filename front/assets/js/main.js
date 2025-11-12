import { addRoute, renderRoute, navigateTo } from './core/router.js';
import { renderTemplate } from './core/template.js';
import { ROUTES } from './components/routes.js';
import { define as defineElementos } from './core/elementos.js';

const initApp =  async()=> {
  
  ROUTES.forEach(r => addRoute(r.path, r.component));

const linkPromises = ROUTES.map(r => {
  const { path, name, icon } = r;
  return renderTemplate('base/nav-link.html', { path, name, icon });
});

const renderedLinks = await Promise.all(linkPromises);
const routes = renderedLinks.join('');

 
  defineElementos(); 
  const navHtml = await renderTemplate('base/navBar.html', { routes });
  document.body.insertAdjacentHTML('afterbegin', navHtml);

  // Interceptar navegación SPA
  document.addEventListener('click', e => {
    const link = e.target.closest('[data-link]');
    if (link) {
      e.preventDefault();
      navigateTo(link.getAttribute('href'));
    }
  });  
  renderRoute();
}
 
initApp();
