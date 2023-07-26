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
    name: 'For Kids',
    path: '/cartoons',
  },
  {
    name: 'Collection',
    path: '/collection',
  },
  {
    name: 'Catalog',
    path: '/catalog',
  },
  {
    name: 'My List',
    path: '/MYList',
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
