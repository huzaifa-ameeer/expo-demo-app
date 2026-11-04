export type Product = {
  id: string;
  name: string;
  price: number;
  image: string;
};

export const PRODUCTS: Product[] = [
  {
    id: "p1",
    name: "Wireless Headphones",
    price: 129.99,
    image: "https://picsum.photos/seed/headphones/600/600",
  },
  {
    id: "p2",
    name: "Running Sneakers",
    price: 89.5,
    image: "https://picsum.photos/seed/sneakers/600/600",
  },
  {
    id: "p3",
    name: "Smart Watch",
    price: 199,
    image: "https://picsum.photos/seed/smartwatch/600/600",
  },
  {
    id: "p4",
    name: "Leather Backpack",
    price: 74.25,
    image: "https://picsum.photos/seed/backpack/600/600",
  },
  {
    id: "p5",
    name: "Coffee Maker",
    price: 54.99,
    image: "https://picsum.photos/seed/coffeemaker/600/600",
  },
  {
    id: "p6",
    name: "Sunglasses",
    price: 39.99,
    image: "https://picsum.photos/seed/sunglasses/600/600",
  },
];
