import { Product } from '@/types/product';

export const products: Product[] = [
  {
    id: 'prod_1',
    name: 'T-shirt',
    description: 'Comfortable cotton t-shirt',
    price: 1999,
    imageUrl: 'https://picsum.photos/seed/tshirt/200/200',
  },
  {
    id: 'prod_2',
    name: 'Hoodie',
    description: 'Warm hoodie for cold days',
    price: 3999,
    imageUrl: 'https://picsum.photos/seed/hoodie/200/200',
  },
  {
    id: 'prod_3',
    name: 'Cap',
    description: 'Stylish cap for sunny days',
    price: 1499,
    imageUrl: 'https://picsum.photos/seed/cap/200/200',
  },
];
