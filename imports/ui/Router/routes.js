import Home from '../pages/Home';
import Quotes from '../pages/Quotes';
import Login from '../pages/Login';
import Logout from '../pages/Logout';

export default [
  { icon: 'home', name: 'Accueil', path: '/', component: Home, exact: true, auth: true },
  { icon: 'database', name: 'Citations', path: '/quotes', component: Quotes, auth: true },
  { icon: 'login', name: 'Connexion', path: '/login', component: Login, hide: true },
  { icon: 'logout', name: 'Déconnexion', path: '/logout', component: Logout, auth: true }
];
