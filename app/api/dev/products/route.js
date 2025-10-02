import { getProducts } from 'lib/db';
import { writeFileSync, mkdirSync } from 'fs';
import { join } from 'path';

export async function GET(req) {
  try {
    const products = await getProducts();

    const dir = join(process.cwd(), 'public', 'data');
    const filePath = join(dir, 'products.json');

    mkdirSync(dir, { recursive: true });

    writeFileSync(filePath, JSON.stringify(products, null, 2), 'utf8');

    return new Response(JSON.stringify({ message: 'Products saved to ' + filePath }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error saving products:', error);
    return new Response(JSON.stringify({ error: 'Failed to save products' }), { status: 500 });
  }
}
