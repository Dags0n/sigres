import React from 'react';
import './Products.css'; // Arquivo CSS para estilização
import { Typography } from '@mui/material';
import { NavLink } from 'react-router-dom';

const Products = () => {
    const products = [
        { id: 1, name: "Heineken Lata", price: "R$4,99", inStock: true, available: "5 unidades", sold: 11 },
        { id: 2, name: "Heineken Long", price: "R$6,99", inStock: true, available: "5 unidades", sold: 11 },
        { id: 3, name: "Heineken Balde", price: "R$19,99", inStock: true, available: "5 unidades", sold: 5 },
        { id: 4, name: "Skol Lata", price: "R$3,99", inStock: false, available: "Sem estoque", sold: 16 },
        { id: 1, name: "Heineken Lata", price: "R$4,99", inStock: true, available: "5 unidades", sold: 11 },
        { id: 2, name: "Heineken Long", price: "R$6,99", inStock: true, available: "5 unidades", sold: 11 },
        { id: 3, name: "Heineken Balde", price: "R$19,99", inStock: true, available: "5 unidades", sold: 5 },
        { id: 4, name: "Skol Lata", price: "R$3,99", inStock: false, available: "Sem estoque", sold: 16 },
        { id: 1, name: "Heineken Lata", price: "R$4,99", inStock: true, available: "5 unidades", sold: 11 },
        { id: 2, name: "Heineken Long", price: "R$6,99", inStock: true, available: "5 unidades", sold: 11 },
        { id: 3, name: "Heineken Balde", price: "R$19,99", inStock: true, available: "5 unidades", sold: 5 },
        { id: 4, name: "Skol Lata", price: "R$3,99", inStock: false, available: "Sem estoque", sold: 16 },
        { id: 1, name: "Heineken Lata", price: "R$4,99", inStock: true, available: "5 unidades", sold: 11 },
        { id: 2, name: "Heineken Long", price: "R$6,99", inStock: true, available: "5 unidades", sold: 11 },
        { id: 3, name: "Heineken Balde", price: "R$19,99", inStock: true, available: "5 unidades", sold: 5 },
        { id: 4, name: "Skol Lata", price: "R$3,99", inStock: false, available: "Sem estoque", sold: 16 },
        // Adicione mais produtos aqui se necessário
    ];

    const handleEdit = (productId) => {
        console.log(`Edit product with ID: ${productId}`);
        // Implementar lógica de edição
    };

    const handleDelete = (productId) => {
        console.log(`Delete product with ID: ${productId}`);
        // Implementar lógica de exclusão
    };

    return (
        <div className="product-list-container">
            <header className="product-list-header">
                <Typography variant="h4" sx={{ fontFamily: 'Poppins', fontWeight: 900, m: "0 0 10px 0", justifySelf: 'flex-start' }}>
                    Produtos
                </Typography>
                <NavLink
                    key='Adicionar Produto'
                    to='/products/add'
                    disablePadding
                >
                    <button type="submit" className="add-button" >
                        Novo Produto
                    </button>
                </NavLink>
            </header>
            <table className="product-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nome</th>
                        <th>Preço</th>
                        <th>Em estoque</th>
                        <th>Disponíveis</th>
                        <th>Vendidos</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((product) => (
                        <tr key={product.id}>
                            <td>{product.id.toString().padStart(2, "0")}</td>
                            <td>{product.name}</td>
                            <td>{product.price}</td>
                            <td>
                                <span className={`status ${product.inStock ? "in-stock" : "out-stock"}`}>
                                    {product.inStock ? "Sim" : "Não"}
                                </span>
                            </td>
                            <td>{product.available}</td>
                            <td>{product.sold}</td>
                            <td>
                                <NavLink
                                    key='Produto'
                                    to='/products/info'
                                    disablePadding
                                >
                                    <button className="action-button edit-button" onClick={() => handleEdit(product.id)}>
                                        ✏️
                                    </button>
                                </NavLink>
                                <button className="action-button delete-button" onClick={() => handleDelete(product.id)}>
                                    🗑️
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Products;
