
import { HomePage } from '../pages/home.js';
import { GamesPage } from '../pages/games.js';
import { UsersPage } from '../pages/users.js';

export const ROUTES = [
  { path: '/', name: 'Inicio', icon: '<i class="bi bi-house-door"></i>', component: HomePage },
  { path: '/games', name: 'Juegos', icon: '<i class="bi bi-controller"></i>', component: GamesPage },
  { path: '/users', name: 'Usuarios', icon: '<i class="bi bi-people"></i>', component: UsersPage },
];