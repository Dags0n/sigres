import React, { useEffect, useState } from "react";
import './Orders.css';
import { Typography } from "@mui/material";

const Orders = () => {
    const [pedidos, setPedidos] = useState([]); // Estado para armazenar os pedidos
    const [total, setTotal] = useState(0); // Estado para armazenar o total dos pedidos

    // Carregar os pedidos ao montar o componente
    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const token = localStorage.getItem('token'); // Obtenha o token JWT do localStorage
                const response = await fetch('http://localhost:8080/order', {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`, // Adiciona o token ao cabeçalho
                        'Content-Type': 'application/json',
                    }
                });
                if (response.ok) {
                    const data = await response.json();
                    setPedidos(data); // Atualiza o estado com os pedidos recebidos
                    calculateTotal(data); // Calcula o total dos pedidos
                } else {
                    console.error('Erro ao buscar pedidos');
                }
            } catch (error) {
                console.error('Erro ao fazer a requisição', error);
            }
        };

        fetchOrders();
    }, []); // O array vazio garante que isso aconteça apenas uma vez ao montar

    // Função para calcular o total de todos os pedidos
    const calculateTotal = (pedidos) => {
        const total = pedidos.reduce((acc, pedido) => {
            if (pedido.product && pedido.amount) {
                return acc + (pedido.product.price * pedido.amount);
            }
            if (pedido.productVariant && pedido.amount) {
                return acc + (pedido.productVariant.price * pedido.amount);
            }
            return acc;
        }, 0);
        setTotal(total);
    };

    return (
        <div style={{ padding: "20px" }}>
            <Typography variant="h4" sx={{ fontFamily: 'Poppins', fontWeight: 900, m: "0 0 20px 0", justifySelf: 'flex-start' }}>
                Pedidos Realizados
            </Typography>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                    <tr>
                        <th style={styles.th}>Produto</th>
                        <th style={styles.th}>Preço</th>
                        <th style={styles.th}>Quantidade</th>
                        <th style={styles.th}>Total</th>
                        <th style={styles.th}>Mesa</th>
                        <th style={styles.th}>Horário</th>
                        <th style={styles.th}>Adicionado por</th>
                    </tr>
                </thead>
                <tbody>
                    {pedidos.map((pedido, index) => (
                        <tr key={index} style={styles.tr}>
                            <td style={styles.td}>{pedido.product ? pedido.product.name : (pedido.productVariant ? pedido.productVariant.name : 'N/A')}</td>
                            <td style={styles.td}>{pedido.product ? pedido.product.price : (pedido.productVariant ? pedido.productVariant.price : 'N/A')}</td>
                            <td style={styles.td}>{pedido.amount} unidades</td>
                            <td style={styles.td}>{pedido.product ? `R$${(pedido.product.price * pedido.amount).toFixed(2)}` : (pedido.productVariant ? `R$${(pedido.productVariant.price * pedido.amount).toFixed(2)}` : 'N/A')}</td>
                            <td style={styles.td}>{pedido.desk ? pedido.desk.id : 'N/A'}</td>
                            <td style={styles.td}>{pedido.time}</td>
                            <td style={styles.td}>{pedido.createdBy ? pedido.createdBy.username : 'N/A'}</td>
                        </tr>
                    ))}
                    {pedidos.length > 0 && (
                        <tr style={styles.tr}>
                            <td colSpan="3" style={styles.td}><strong>Total</strong></td>
                            <td style={styles.td}><strong>R${total.toFixed(2)}</strong></td>
                            <td colSpan="3" style={styles.td}></td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

const styles = {
    th: {
        border: "1px solid #ccc",
        padding: "10px",
        backgroundColor: "#f4f4f4",
        textAlign: "left",
    },
    td: {
        border: "1px solid #ccc",
        padding: "10px",
    },
    tr: {
        backgroundColor: "#fff",
    },
};

export default Orders;
