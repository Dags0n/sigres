import React, { useState } from "react";
import "./Reports.css";
import { Typography } from "@mui/material";
import ReportViewer from "./ReportViewer";

const Reports = () => {
    const [initDate, setInitDate] = useState("");
    const [finalDate, setFinalDate] = useState("");
    const [reportData, setReportData] = useState(null);
    const [reportType, setReportType] = useState("");  // Novo estado para armazenar o tipo de relatório

    const handleGenerateReport = async (type) => {
        try {
            setReportType(type);  // Define o tipo de relatório

            const token = localStorage.getItem("token");
            const response = await fetch(`http://localhost:8080/report/${type}`, {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    initDate: `${initDate} 00:00:00`,
                    finalDate: `${finalDate} 23:59:59`,
                }),
            });

            if (response.ok) {
                const data = await response.json();
                setReportData(data);  // Atualiza os dados do relatório
            } else {
                console.error("Erro na resposta da API:", response.statusText);
            }
        } catch (error) {
            console.error("Erro ao gerar relatório:", error);
        }
    };

    return (
        <div className="relatorios-container">
            <Typography
                variant="h4"
                sx={{
                    fontFamily: "Poppins",
                    fontWeight: 900,
                    m: "0 0 20px 0",
                    justifySelf: "flex-start",
                }}
            >
                Relatórios
            </Typography>

            {/* Relatórios de Pedidos */}
            <div className="relatorios-secao">
                <div className="relatorios-filtro">
                    <label>
                        Data Inicial:
                        <input
                            type="date"
                            value={initDate}
                            onChange={(e) => setInitDate(e.target.value)}
                        />
                    </label>
                    <label>
                        Data Final:
                        <input
                            type="date"
                            value={finalDate}
                            onChange={(e) => setFinalDate(e.target.value)}
                        />
                    </label>

                </div>
            </div>

            {/* Relatórios de Extratos */}
            <div className="relatorios-secao">
                <div className="relatorios-filtro">
                    <button
                        className="relatorio-botao"
                        onClick={() => handleGenerateReport("orders")}
                    >
                        📄 Gerar Relatório de Pedidos
                    </button>
                    <button
                        className="relatorio-botao"
                        onClick={() => handleGenerateReport("extract")}
                    >
                        📄 Gerar Relatório de Faturamento
                    </button>
                </div>
            </div>

            {/* Componente para exibir o relatório */}
            {reportData && <ReportViewer data={reportData} type={reportType} />}
        </div>
    );
};

export default Reports;
