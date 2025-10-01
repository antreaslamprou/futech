import { fetchAllProducts } from "@/lib/db";

export default async function Head() {
  const products = await fetchAllProducts();
  
  return (
    <>
      <link
        rel="preload"
        href="/fonts/Timeburner.ttf"
        as="font"
        type="font/ttf"
        crossOrigin="anonymous"
      />
      <link
        rel="preload"
        href="/fonts/Ballega.otf"
        as="font"
        type="font/otf"
        crossOrigin="anonymous"
      />
      {products.map((product) => (
        <link
          key={product.name}
          rel="preload"
          as="image"
          href={`/images/${product.name}.webp`}
          type="image/webp"
        />
      ))}
    </>
  );
}