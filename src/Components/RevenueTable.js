import React, { useState, useEffect } from 'react';
import "./RevenueTable.css";

const formatNumber = (number) => {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(number);
};

const RevenueTable = () => {
  const [products, setProducts] = useState([]);
  const [searchInput, setSearchInput] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    const fetchBranchData = async (branch) => {
      const response = await fetch(`data/branch${branch}.json`);
      console.log("dark", response);
      const branchData = await response.json();
      return branchData;
    };

    const fetchData = async () => {
      const branches = [1, 2, 3];
      const productsData = {};

      for (const branch of branches) {
        const branchData = await fetchBranchData(branch);
        for (const product of branchData) {
          const { name, unitPrice, sold } = product;
          let revenue = unitPrice * sold;
          if (!productsData[name]) {
            productsData[name] = revenue;
          } else {
            productsData[name] += revenue;
          }
        }
      }

      const sortedProducts = Object.entries(productsData).sort((a, b) => a[0].localeCompare(b[0]));
      setProducts(sortedProducts);
    };

    fetchData();
  }, []);

  useEffect(() => {
    const lowerCaseSearchInput = searchInput.toLowerCase();
    const filteredProducts = products.filter(([productName]) =>
      productName.toLowerCase().includes(lowerCaseSearchInput)
    );
    setFilteredProducts(filteredProducts);
  }, [searchInput, products]);

  const totalRevenue = filteredProducts.reduce((acc, [, revenue]) => acc + revenue, 0);

  return (<div className="revenue-table-container">
  <label htmlFor="searchInput" className="search-label">
    Search Product:
  </label>
  <input
    type="text"
    id="searchInput"
    value={searchInput}
    onChange={(e) => setSearchInput(e.target.value)}
    placeholder="Type to search..."
    className="search-input"
  />

  <table className="revenue-table">
    <thead>
      <tr>
        <th>Product Name</th>
        <th>Total Revenue</th>
      </tr>
    </thead>
    <tbody>
      {filteredProducts.map(([productName, revenue], index) => (
        <tr key={index}>
          <td>{productName}</td>
          <td>{formatNumber(revenue)}</td>
        </tr>
      ))}
    </tbody>
    <tfoot>
      <tr>
        <td>Total Revenue for All Products:</td>
        <td>{formatNumber(totalRevenue)}</td>
      </tr>
    </tfoot>
  </table>
</div>
);
};

export default RevenueTable;
