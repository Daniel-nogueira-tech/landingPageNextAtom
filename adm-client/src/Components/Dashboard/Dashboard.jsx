import React from 'react';
import './Dashboard.css';
import { motion } from 'framer-motion';
import {
    FaUsers,
    FaDollarSign,
    FaPercentage,
    FaCommentDots,
    FaCheckCircle,
    FaExclamationCircle
} from 'react-icons/fa';
import Sidebar from '../Sidebar/Sidebar';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
    Filler
} from 'chart.js';
import { Line, Doughnut } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
    Filler
);

const Dashboard = () => {
    // Mock Data for Charts
    const lineChartData = {
        labels: ['01/Oct', '05/Oct', '10/Oct', '15/Oct', '20/Oct', '25/Oct', '30/Oct'],
        datasets: [
            {
                label: 'Faturamento',
                data: [1200, 1900, 3000, 2500, 4200, 3800, 5000],
                borderColor: '#9d4edd', // Purple tone
                backgroundColor: 'rgba(157, 78, 221, 0.2)', // Purple tone with opacity for filler
                tension: 0.4,
                fill: true
            },
            {
                label: 'Reembolsos',
                data: [100, 50, 200, 150, 300, 100, 250],
                borderColor: '#ff4d4d', // Redish tone
                backgroundColor: 'rgba(255, 77, 77, 0.2)',
                tension: 0.4,
                fill: true
            }
        ]
    };

    const doughnutChartData = {
        labels: ['Free', 'Pro', 'Premium'],
        datasets: [
            {
                data: [5000, 1500, 800],
                backgroundColor: ['#48bfe3', '#5e60ce', '#7400b8'],
                borderWidth: 0,
                hoverOffset: 4
            }
        ]
    };

    const chartOptions = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
                labels: { color: '#e0e0e0' }
            }
        },
        scales: {
            x: { ticks: { color: '#a0a0a0' }, grid: { color: 'rgba(255,255,255,0.05)' } },
            y: { ticks: { color: '#a0a0a0' }, grid: { color: 'rgba(255,255,255,0.05)' } }
        }
    };

    const doughnutOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'bottom',
                labels: { color: '#e0e0e0' }
            }
        }
    };

    return (
        <div className="admin-dashboard-container">
            {/* Sidebar Component */}
            <Sidebar />


            {/* Main Content */}
            <main className="admin-main-content">
                <header className="main-header">
                    <h1>Visão Geral</h1>
                    <div className="admin-profile">
                        <span>Admin</span>
                        <div className="avatar">A</div>
                    </div>
                </header>

                {/* Metric Cards */}
                <section className="metrics-grid">
                    {[
                        { title: 'Total Assinantes', value: '7,300', icon: <FaUsers />, color: 'blue' },
                        { title: 'Faturamento Mensal', value: 'R$ 42.500', icon: <FaDollarSign />, color: 'green' },
                        { title: 'Taxa de Churn', value: '3.2%', icon: <FaPercentage />, color: 'red' },
                        { title: 'Novos Comentários (Hoje)', value: '18', icon: <FaCommentDots />, color: 'purple' },
                    ].map((metric, index) => (
                        <motion.div
                            key={index}
                            className="metric-card glass-panel"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                        >
                            <div className="metric-info">
                                <h3>{metric.title}</h3>
                                <p className="metric-value">{metric.value}</p>
                            </div>
                            <div className={`metric-icon-wrapper ${metric.color}`}>
                                {metric.icon}
                            </div>
                        </motion.div>
                    ))}
                </section>

                {/* Charts Section */}
                <section className="charts-grid">
                    <motion.div
                        className="chart-container glass-panel"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.4 }}
                    >
                        <h3>Faturamento vs Reembolsos (30 dias)</h3>
                        <div className="line-chart-wrapper" style={{ width: '100%' }}>
                            <Line data={lineChartData} options={chartOptions} />
                        </div>
                    </motion.div>

                    <motion.div
                        className="chart-container glass-panel"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.5 }}
                    >
                        <h3>Distribuição de Planos</h3>
                        <div className="doughnut-chart-wrapper">
                            <Doughnut data={doughnutChartData} options={doughnutOptions} />
                        </div>
                    </motion.div>
                </section>

                {/* Activity Feed */}
                <section className="activity-section glass-panel">
                    <h3>Atividades Recentes</h3>
                    <ul className="activity-feed">
                        <li className="activity-item">
                            <div className="activity-icon success"><FaCheckCircle /></div>
                            <div className="activity-content">
                                <p><strong>Venda confirmada:</strong> Plano Premium - Usuário X</p>
                                <span className="activity-time">Há 5 minutos</span>
                            </div>
                        </li>
                        <li className="activity-item">
                            <div className="activity-icon info"><FaCommentDots /></div>
                            <div className="activity-content">
                                <p><strong>Novo comentário no Fórum:</strong> "Dúvida sobre Bitcoin" - Usuário Y</p>
                                <span className="activity-time">Há 15 minutos</span>
                            </div>
                        </li>
                        <li className="activity-item">
                            <div className="activity-icon danger"><FaExclamationCircle /></div>
                            <div className="activity-content">
                                <p><strong>Novo reembolso solicitado:</strong> Usuário Z</p>
                                <span className="activity-time">Há 1 hora</span>
                            </div>
                        </li>
                    </ul>
                </section>
            </main>
        </div>
    );
};

export default Dashboard;