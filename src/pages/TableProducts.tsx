import './TableProducts.css';
import { Product, ProductsDatabase } from '../db/data';

function SearchBar() {

    return (
        <form>
            <div className="row mt-5">
                <input type="text" placeholder='search' />
            </div>
            <div className="row mt-3">
                <label>
                    <input type="checkbox" />

                    Only show products in stock!
                </label>
            </div>

        </form>

    );
}

/* 
function ProductRow({ category, products }: { category: string, products: Product[] }) {
    const productsFiltered = products
        .filter(c => c.category === category)
        .map(p => (
            <tr>
                <td>{p.stocked === false ? <span className='red'>{p.name}</span> : p.name}</td>
                <td>{p.price}</td>
            </tr>
        ));

    return productsFiltered;
} */

function ProductCategoryRow({ category, products }: { category: string, products: Product[] }) {
    const productsFiltered = products
        .filter(c => c.category === category)
        .map(p => (
            <tr>
                <td>{p.stocked === false ? <span className='red'>{p.name}</span> : p.name}</td>
                <td>{p.price}</td>
            </tr>
        ));

    return (
        <>
            <tr>
                <th className='font-bold justify-center' colSpan={2}>
                    {category}
                </th>
            </tr>
            {productsFiltered}
        </>
    );
}

function ProductTable({ products }: { products: Product[] }) {
    const uniquesCategories: string[] = []
    products.forEach((v, i, arr) => !uniquesCategories.includes(v.category) ? uniquesCategories.push(v.category) : "");

    // ProductRow
    return (
        <table>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Price</th>
                </tr>
            </thead>
            <tbody>
                {uniquesCategories.map(c => {
                    return <ProductCategoryRow category={c} products={products} />
                })
                }
            </tbody>
        </table>
    );
}



function TableProducts() {
    const products = ProductsDatabase;

    return (
        <div className="table-products">
            <div className="col">
                <div className='row'><SearchBar /></div>
                <div className='row'><ProductTable products={products} /></div>
            </div>

        </div>
    );
}

export default TableProducts;