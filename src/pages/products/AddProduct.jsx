import React, { useState } from 'react';
import './AddProduct.css'; // Arquivo CSS para estilização
import { NavLink } from 'react-router-dom';

const AddProduct = () => {
    const [showNotification, setShowNotification] = useState(false);

    const handleConfirm = (e) => {
        e.preventDefault();
        setShowNotification(true);

        document.getElementById("name").value = "";
        document.getElementById("price").value = "";
        document.getElementById("happyhour").checked = false;
        document.getElementById("variacao").checked = false;

        document.getElementById("confirm-button").style.backgroundColor = "#106212";

        // Ocultar a notificação automaticamente após 3 segundos
        setTimeout(() => {
            setShowNotification(false);
        }, 3000);
        setTimeout(() => {
            document.getElementById("confirm-button").style.backgroundColor = "#4caf50";
        }, 1000);
    };

    return (
        <div className="cadastro-usuario-container">
            <main className="main-content">
                <section className="content">
                    <form className="form-cadastro-usuario">
                        <div className="form-group">
                            <label>Nome do Produto</label>
                            <input id="name" type="text" placeholder="Digite o nome do Produto" />
                        </div>
                        <div className="form-group">
                            <label>Preço</label>
                            <input id="price" type="text" placeholder="Digite o preço do Produto" />
                        </div>
                        <div className='checkboxes'>
                            <div className="form-group">
                                <label>Participa do Happy Hour</label>
                                <input id="happyhour" type="checkbox" />
                            </div>
                            <div className="form-group">
                                <label>Tem variação</label>
                                <input id="variacao" type="checkbox" />
                            </div>
                        </div>
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
                            <button id="confirm-button" type="submit" className="confirm-button" onClick={handleConfirm}>
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
