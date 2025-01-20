import React, { useState } from 'react';
import './AddProduct.css'; // Arquivo CSS para estilização
import { Navigate, NavLink } from 'react-router-dom';

const AddProduct = () => {
    const [showNotification, setShowNotification] = useState(false);
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [happyHourPrice, setHappyHourPrice] = useState('');
    const [isHappyHour, setIsHappyHour] = useState(false); // Estado para controlar o checkbox do Happy Hour

    const handleHappyHourChange = (e) => {
        setIsHappyHour(e.target.checked); // Atualiza o estado quando o checkbox for alterado
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Criação do objeto com os dados do novo usuário
        const newProduct = {
            name: name,
            price: price,
            inHappyHour: isHappyHour,
            priceInHappyHour: isHappyHour ? happyHourPrice : 0
        };

        try {
            const token = localStorage.getItem('token');
            const response = await fetch('http://localhost:8080/product', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newProduct),
            });

            if (response.ok) {
                setShowNotification(true);
                setName('');
                setPrice('');
                setHappyHourPrice('');
                setIsHappyHour(false);
                setTimeout(() => {
                    setShowNotification(false);
                    Navigate('/products'); // Redireciona para a lista de usuários
                }, 3000);
            } else {
                alert('Erro ao cadastrar produto');
            }
        } catch (error) {
            console.error('Erro ao adicionar produto', error);
            alert('Erro ao adicionar produto');
        }
    };

    const handlePriceChange = (e) => {
        const value = parseFloat(e.target.value);

        // Garantir que o valor seja >= 0
        if (value >= 0) {
            setPrice(value);
        }
    };

    const handleHHPriceChange = (e) => {
        const value = parseFloat(e.target.value);

        // Garantir que o valor seja >= 0
        if (value >= 0) {
            setHappyHourPrice(value);
        }
    };

    return (
        <div className="cadastro-usuario-container">
            <main className="main-content">
                <section className="content">
                    <form className="form-cadastro-usuario">
                        <div className="form-group">
                            <label>Nome do Produto</label>
                            <input
                                type="text"
                                placeholder="Digite o nome do produto"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Preço</label>
                            <input
                                type="number"
                                min={0}
                                placeholder="Digite o preço do Produto"
                                value={price}
                                onChange={handlePriceChange}
                                required
                            />
                        </div>
                        <div className='checkboxes'>
                            <div className="form-group">
                                <label>Participa do Happy Hour</label>
                                <input
                                    type="checkbox"
                                    value={isHappyHour}
                                    onChange={handleHappyHourChange}
                                    required
                                />
                            </div>
                        </div>

                        {/* Exibe o campo de preço do Happy Hour se o checkbox estiver ativado */}
                        {isHappyHour && (
                            <div className="form-group">
                                <label>Preço no Happy Hour</label>
                                <input
                                    type="number"
                                    min={0}
                                    placeholder="Digite o preço no Happy Hour"
                                    value={happyHourPrice}
                                    onChange={handleHHPriceChange}
                                    required
                                />
                            </div>
                        )}

                        <div className="form-actions">
                            <NavLink
                                key='Produtos'
                                to='/products'
                                disablePadding
                            >
                                <button type="button" className="cancel-button">
                                    Cancelar
                                </button>
                            </NavLink>
                            <button id="confirm-button" type="submit" className="confirm-button" onClick={handleSubmit}>
                                Confirmar
                            </button>
                        </div>
                    </form>

                    {/* Notificação */}
                    {showNotification && (
                        <div className="notification">
                            Produto cadastrado com sucesso! 🎉
                        </div>
                    )}
                </section>
            </main>
        </div>
    );
};

export default AddProduct;
