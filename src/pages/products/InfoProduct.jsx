import React from 'react';
import './AddProduct.css'; // Arquivo CSS para estilização
import { NavLink } from 'react-router-dom';

const InfoProduct = () => {

    return (
        <div className="cadastro-usuario-container">
            <main className="main-content">
                <section className="content">
                    <form className="form-cadastro-usuario">
                        <div className="form-group">
                            <label>Nome do Produto</label>
                            <input id="name" type="text" placeholder="Digite o nome do Produto" value={"Laranja no quilo"}/>
                        </div>
                        <div className="form-group">
                            <label>Preço</label>
                            <input id="price" type="text" placeholder="Digite o preço do Produto" value={"R$20,00"}/>
                        </div>
                        <div className='checkboxes'>
                            <div className="form-group">
                                <label>Participa do Happy Hour</label>
                                <input id="happyhour" type="checkbox" checked/>
                            </div>
                            <div className="form-group">
                                <label>Tem variação</label>
                                <input id="variacao" type="checkbox" checked/>
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
                            <NavLink
                                key='Produtos'
                                to='/products'
                                disablePadding
                            >
                                <button id="confirm-button" type="submit" className="confirm-button">
                                    Confirmar
                                </button>
                            </NavLink>
                        </div>
                    </form>
                </section>
            </main>
        </div>
    );
};

export default InfoProduct;
