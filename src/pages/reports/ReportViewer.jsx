import React from "react";
import "./ReportViewer.css";

const ReportViewer = ({ data, type }) => {
    // Função para calcular o total
    const calculateTotal = (items) => {
        return items.reduce((total, item) => {
            const price = item.productVariant
                ? item.productVariant.price
                : item.product
                    ? item.product.price
                    : 0;
            return total + price * (item.amount || 0);
        }, 0);
    };

    const totalAmount = calculateTotal(data);

    return (
        <div className="report-viewer">
            <h1>{type === "orders" ? "Relatório de Pedidos" : "Relatório de Faturamento"}</h1>

            {type === "orders" ? (
                Array.isArray(data) && data.length > 0 ? (
                    <table className="report-table">
                        <thead>
                            <tr>
                                <th>Variante de Produto</th>
                                <th>Nome do Produto</th>
                                <th>Preço do Produto</th>
                                <th>Quantidade</th>
                                <th>Total</th>
                                <th>Feito por</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((order) => (
                                <tr key={order.id}>
                                    <td>{order.isVariant ? "Sim" : "Não"}</td>
                                    <td>
                                        {order.productVariant
                                            ? order.productVariant.name
                                            : order.product
                                                ? order.product.name
                                                : "N/A"}
                                    </td>
                                    <td>
                                        {order.productVariant
                                            ? order.productVariant.price
                                            : order.product
                                                ? order.product.price
                                                : "N/A"}
                                    </td>
                                    <td>{order.amount ? order.amount : "N/A"}</td>
                                    <td>
                                        R$
                                        {order.amount *
                                            (order.productVariant
                                                ? order.productVariant.price
                                                : order.product
                                                    ? order.product.price
                                                    : 0)}
                                    </td>
                                    <td>{order.createdBy ? order.createdBy.username : "N/A"}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <p>Sem informações disponíveis</p>
                )
            ) : Array.isArray(data) && data.length > 0 ? (
                <table className="report-table">
                    <thead>
                        <tr>
                            <th>Vendido em</th>
                            <th>Nome do Produto</th>
                            <th>Preço do Produto</th>
                            <th>Quantidade</th>
                            <th>Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((sale) => (
                            <tr key={sale.id}>
                                <td>
                                    {sale.time}
                                </td>
                                <td>
                                    {sale.productVariant
                                        ? sale.productVariant.name
                                        : sale.product
                                            ? sale.product.name
                                            : "N/A"}
                                </td>
                                <td>
                                    {sale.productVariant
                                        ? sale.productVariant.price
                                        : sale.product
                                            ? sale.product.price
                                            : "N/A"}
                                </td>
                                <td>{sale.amount ? sale.amount : "N/A"}</td>
                                <td>
                                    R$
                                    {sale.amount *
                                        (sale.productVariant
                                            ? sale.productVariant.price
                                            : sale.product
                                                ? sale.product.price
                                                : 0)}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                    <tfoot>
                        <tr>
                            <td colSpan="4" style={{ textAlign: "right" }}><h3>Faturamento Total do Período:</h3></td>
                            <td>
                                R$ {totalAmount.toFixed(2)}
                            </td>
                        </tr>
                    </tfoot>
                </table>
            ) : (
                <p>Sem informações disponíveis</p>
            )}
        </div>
    );
};

export default ReportViewer;
