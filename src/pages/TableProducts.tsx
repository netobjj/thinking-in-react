import './TableProducts.css';
import { Product, ProductsDatabase } from '../db/data';
import { useState } from 'react';


function TableProducts() {
    const [filterText, setFilterText] = useState<string>("");
    const [inStockOnly, setInStockOnly] = useState<boolean>(false);

    function onFilterTextChange(newText: string) {
        setFilterText(newText)
    }

    function onInStockOnlyChange(newValue: boolean) {
        setInStockOnly(newValue);
    }

    const products = ProductsDatabase;

    return (
        <div className="table-products">
            <div className="col">
                <div className='row'>
                    <SearchBar
                        filterText={filterText}
                        inStockOnly={inStockOnly}
                        onFilterTextChange={onFilterTextChange}
                        onInStockOnlyChange={onInStockOnlyChange}
                    />

                </div>
                <div className='row'>
                    <ProductTable
                        products={products}
                        filterText={filterText}
                        inStockOnly={inStockOnly}
                    />
                </div>
            </div>

        </div>
    );
}


function SearchBar({ filterText, inStockOnly, onFilterTextChange, onInStockOnlyChange }:
    { filterText: string, inStockOnly: boolean, onFilterTextChange: Function, onInStockOnlyChange: Function }) {
    return (
        <form>
            <div className="row mt-5">
                <input type="text"
                    placeholder='search'
                    value={filterText}
                    onChange={(e) => onFilterTextChange(e.target.value)}
                />
            </div>
            <div className="row mt-3">
                <label>
                    <input
                        type="checkbox"
                        checked={inStockOnly}
                        onChange={(e) => onInStockOnlyChange(e.target.checked)}
                    />

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

function ProductCategoryRow({ category, products, filterText, inStockOnly }: { category: string, products: Product[], filterText: string, inStockOnly: boolean }) {
    const productsFiltered = products
        .filter(c => c.category === category)
        .map(p => {

            if (filterText.trim() !== "" && p.name.toLowerCase().indexOf(filterText.toLowerCase()) === -1) return;
            if (inStockOnly && !p.stocked) return;


            return (
                <tr>
                    <td>{p.stocked === false ? <span className='red'>{p.name}</span> : p.name}</td>
                    <td>{p.price}</td>
                </tr>
            )
        });

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

function ProductTable({ products, filterText, inStockOnly }: { products: Product[], filterText: string, inStockOnly: boolean }) {
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
                    return <ProductCategoryRow
                        category={c}
                        products={products}
                        filterText={filterText}
                        inStockOnly={inStockOnly}
                    />
                })
                }
            </tbody>
        </table>
    );
}



export default TableProducts;