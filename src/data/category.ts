export interface CategoryDisplay {
  slug: string;
  label: string;
  image: string;
}

export const categoryDisplays: CategoryDisplay[] = [
  {
    slug: "clothing",
    label: "Clothing",
    image: "/images/categories/clothing.jpg",
  },
  { slug: "shoes", label: "Shoes", image: "/images/categories/shoes.jpg" },
  { slug: "bags", label: "bags", image: "/images/categories/bags.jpg" },
  {
    slug: "accessories",
    label: "accessories",
    image: "/images/categories/accessories.jpg",
  },
  {
    slug: "electronics",
    label: "electronics",
    image: "/images/categories/electronics.jpg",
  },
  {
    slug: "home-lifestyle",
    label: "home-lifestyle",
    image: "/images/categories/home-lifestyle.jpg",
  },
];
