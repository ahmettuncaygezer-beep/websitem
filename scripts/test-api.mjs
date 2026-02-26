import { getProducts } from '../src/lib/api';

async function test() {
    console.log('Testing getProducts for oturma-odasi...');
    const products = await getProducts({ categorySlug: 'oturma-odasi' });
    console.log('Results count:', products.length);
    if (products.length > 0) {
        console.log('First product slug:', products[0].categorySlug);
    } else {
        console.log('No products found!');
    }
}

test();
