import {
  faHome,
  faTv,
  faCompass,
  faUser,
} from '@fortawesome/free-solid-svg-icons';

export const SidebarItems = [
  {
    name: 'home',
    icon: faHome,
    path: '/',
  },
  {
    name: 'movies',
    icon: faTv,
    path: '/movies',
  },
  {
    name: 'series',
    path: '/series',
  },
  {
    name: 'cartoons',
    path: '/cartoons',
  },
  {
    name: 'categories',
    path: '/categories',
  },
  {
    name: '',
    icon: faCompass,
    path: '/explorer',
  },
  {
    name: '',
    icon: faUser,
    path: '/user',
  },
];
