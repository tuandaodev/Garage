import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'Checkin',
    icon: 'arrowhead-right-outline',
    link: '/pages/checkin',
    home: true,
  },
  {
    title: 'Checkout',
    icon: 'arrowhead-left-outline',
    link: '/pages/checkout',
  },
  {
    title: 'Manage',
    icon: 'grid-outline',
    link: '/pages/manage'
  },
];
