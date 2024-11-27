import React from "react";
import './Orders.css';
import { Typography } from "@mui/material";

const Orders = () => {
    const pedidos = [
        {
            produto: "Heineken Lata",
            preco: "R$4,99",
            quantidade: "5 unidades",
            total: "R$24,95",
            mesa: "01",
            horario: "23:59:01 23/10/2024",
            adicionadoPor: "Administrador",
        },
        {
            produto: "Skol Lata",
            preco: "R$2,99",
            quantidade: "3 unidades",
            total: "R$8,97",
            mesa: "02",
            horario: "23:58:45 23/10/2024",
            adicionadoPor: "Garçom 1",
        },
        {
            produto: "Pipoca Bokus",
            preco: "R$1,99",
            quantidade: "10 unidades",
            total: "R$19,99",
            mesa: "01",
            horario: "23:58:25 23/10/2024",
            adicionadoPor: "Garçom 2",
        },
        {
            produto: "Heineken Lata",
            preco: "R$4,99",
            quantidade: "5 unidades",
            total: "R$24,95",
            mesa: "01",
            horario: "23:57:01 23/10/2024",
            adicionadoPor: "Beltano",
        },
        {
            produto: "Skol Lata",
            preco: "R$2,99",
            quantidade: "3 unidades",
            total: "R$8,97",
            mesa: "02",
            horario: "23:51:45 23/10/2024",
            adicionadoPor: "Sicrano",
        },
        {
            produto: "Pipoca Bokus",
            preco: "R$1,99",
            quantidade: "10 unidades",
            total: "R$19,99",
            mesa: "01",
            horario: "21:58:25 23/10/2024",
            adicionadoPor: "Fulano, o retorno ",
        },
    ];

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
                            <td style={styles.td}>{pedido.produto}</td>
                            <td style={styles.td}>{pedido.preco}</td>
                            <td style={styles.td}>{pedido.quantidade}</td>
                            <td style={styles.td}>{pedido.total}</td>
                            <td style={styles.td}>{pedido.mesa}</td>
                            <td style={styles.td}>{pedido.horario}</td>
                            <td style={styles.td}>{pedido.adicionadoPor}</td>
                        </tr>
                    ))}
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
