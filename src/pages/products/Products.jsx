import React, { useEffect, useState } from 'react';
import './Products.css'; // Arquivo CSS para estilização
import { Typography } from '@mui/material';
import { useNavigate, NavLink } from 'react-router-dom';
import { isUserAdmin } from '../../services/authService';

const Products = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const isAdmin = isUserAdmin();
    const navigate = useNavigate();

    // Função para buscar os produtos e suas variantes da API
    const fetchProducts = async () => {
        try {
            const token = localStorage.getItem('token');

            // Fetch para produtos
            const response = await fetch('http://localhost:8080/product', {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });
            const productsData = await response.json();

            // Fetch para variantes de cada produto
            const productsWithVariants = await Promise.all(
                productsData.map(async (product) => {
                    const variantsResponse = await fetch(`http://localhost:8080/product-variant/by-product/${product.id}`, {
                        method: 'GET',
                        headers: {
                            Authorization: `Bearer ${token}`,
                            'Content-Type': 'application/json',
                        },
                    });
                    const variants = await variantsResponse.json();
                    return { ...product, variants };
                })
            );

            setProducts(productsWithVariants);
        } catch (error) {
            console.error('Erro ao buscar produtos e variantes:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const handleEdit = async (productId) => {
        localStorage.setItem("product-id", productId);
        navigate("/product-variant/add");
    };

    const handleProductDelete = async (productId) => {
        const confirmDelete = window.confirm('Tem certeza que deseja excluir este produto? Suas variantes também serão excluídas...');
        if (confirmDelete) {
            const token = localStorage.getItem('token');
            try {
                const response = await fetch(`http://localhost:8080/product/${productId}`, {
                    method: 'DELETE',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    }
                });

                if (response.ok) {
                    alert('Produto excluído com sucesso!');
                    fetchProducts();
                } else {
                    alert('Erro ao excluir produto!');
                }
            } catch (error) {
                console.error('Erro ao excluir produto', error);
                alert('Erro ao excluir produto!');
            }
        }
    };

    const handleVariantDelete = async (productId) => {
        const confirmDelete = window.confirm('Tem certeza que deseja excluir esta variante?');
        if (confirmDelete) {
            const token = localStorage.getItem('token');
            try {
                const response = await fetch(`http://localhost:8080/product-variant/${productId}`, {
                    method: 'DELETE',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    }
                });

                if (response.ok) {
                    alert('Produto excluído com sucesso!');
                    fetchProducts();
                } else {
                    alert('Erro ao excluir produto!');
                }
            } catch (error) {
                console.error('Erro ao excluir produto variante', error);
                alert('Erro ao excluir produto!');
            }
        }
    };

    // Carrega um carregamento enquanto os produtos estão sendo buscados
    if (loading) {
        return <Typography>Carregando produtos...</Typography>;
    }

    return (
        <div className="product-list-container">
            <header className="product-list-header">
                <Typography variant="h4" sx={{ fontFamily: 'Poppins', fontWeight: 900, m: "0 0 10px 0", justifySelf: 'flex-start' }}>
                    Produtos
                </Typography>
                {isAdmin ? 
                <NavLink
                    key='Adicionar Produto'
                    to='/products/add'
                    disablePadding
                >
                    <button type="submit" className="add-button" >
                        Novo Produto
                    </button>
                </NavLink>
                    : ""}
            </header>
            <table className="product-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nome</th>
                        <th>Variante?</th>
                        <th>Preço</th>
                        <th>Em estoque</th>
                        <th>Disponíveis</th>
                        {isAdmin ? <th>Ações</th> : ""}
                    </tr>
                </thead>
                <tbody>
                    {products.map((product) => (
                        <React.Fragment key={product.id}>
                            <tr>
                                <td>{product.id}</td>
                                <td>{product.name}</td>
                                <td>
                                    <span className={'status-badge out-of-stock'}>
                                        Não
                                    </span>
                                </td>
                                <td>{product.price}</td>
                                <td>
                                    <span className={`status-badge ${product.amount > 0 ? 'in-stock' : 'out-of-stock'}`}>
                                        {product.amount > 0 ? 'Sim' : 'Não'}
                                    </span>
                                </td>
                                <td>
                                    {product.amount > 0
                                        ? `${product.amount} unidade${product.amount > 1 ? 's' : ''}`
                                        : 'Sem estoque'}
                                </td>
                                {isAdmin ?
                                    <td>
                                        <button className="action-button edit-button" onClick={() => handleEdit(product.id)}>
                                            ➕
                                        </button>
                                        <button className="action-button delete-button" onClick={() => handleProductDelete(product.id)}>
                                            🗑️
                                        </button>
                                    </td>
                                    : ""}
                            </tr>
                            {product.variants.length > 0 && (
                                <>
                                    {product.variants.map((variant) => (
                                        <tr key={variant.id}>
                                            <td>
                                                {variant.id}
                                            </td>
                                            <td>
                                                {variant.name}
                                            </td>
                                            <td>
                                                <span className={'status-badge in-stock'}>
                                                    Sim
                                                </span>
                                            </td>
                                            <td>
                                                {variant.price}
                                            </td>
                                            <td>
                                                <span className={`status-badge ${variant.amount > 0 ? 'in-stock' : 'out-of-stock'}`}>
                                                    {variant.amount > 0 ? 'Sim' : 'Não'}
                                                </span>
                                            </td>
                                            <td>
                                                {variant.amount > 0
                                                    ? `${variant.amount} unidade${variant.amount > 1 ? 's' : ''}`
                                                    : 'Sem estoque'}
                                            </td>
                                            {isAdmin ?
                                                <td>
                                                    <button className="action-button delete-button" onClick={() => handleVariantDelete(variant.id)}>
                                                        🗑️
                                                    </button>
                                                </td>
                                                : ""}
                                        </tr>
                                    ))}
                                </>
                            )}
                        </React.Fragment>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Products;
