const routes = {};

export function addRoute(path, view) {
  routes[path] = view;
}

export async function navigateTo(path) {
  window.history.pushState({}, path, window.location.origin + path);
  await renderRoute();
}

export async function renderRoute() {
  const path = window.location.pathname;
  const view = routes[path] || routes['/'];
  const app = document.querySelector('#app');
  await view(app);
}

window.addEventListener('popstate', renderRoute);
