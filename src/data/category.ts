export interface CategoryDisplay {
  slug: string;
  label: string;
  image: string;
}

export const categoryDisplays: CategoryDisplay[] = [
  {
    slug: "clothing",
    label: "Clothing",
    image: "/images-optimized/categories/clothing.webp",
  },
  {
    slug: "shoes",
    label: "Shoes",
    image: "/images-optimized/categories/shoes.webp",
  },
  {
    slug: "bags",
    label: "bags",
    image: "/images-optimized/categories/bags.webp",
  },
  {
    slug: "accessories",
    label: "accessories",
    image: "/images-optimized/categories/accessories.webp",
  },
  {
    slug: "electronics",
    label: "electronics",
    image: "/images-optimized/categories/electronics.webp",
  },
  {
    slug: "home-lifestyle",
    label: "home-lifestyle",
    image: "/images-optimized/categories/home-lifestyle.webp",
  },
];
