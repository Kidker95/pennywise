// import { ArcElement, CategoryScale, Chart, Legend, LinearScale, Title, Tooltip } from 'chart.js';
// import { useEffect, useState } from "react";
// import { Doughnut } from "react-chartjs-2";
// import { chartUtil } from "../../../Utils/ChartUtil";
// import './CircleChart.css';

// // Register Chart.js components
// Chart.register(ArcElement, Tooltip, Legend, Title, CategoryScale, LinearScale);

// type CircleChartProps = {   
//     expenses: any[]; 
//     userId: number;  // ID of the logged-in user
// };

// const CircleChart = ({ expenses, userId }: CircleChartProps) => {
//     const [chartData, setChartData] = useState<any>(null);

//     const saveToSessionStorage = (key: string, data: any) => {
//         sessionStorage.setItem(key, JSON.stringify(data));
//     };

//     const loadFromSessionStorage = (key: string) => {
//         const storedData = sessionStorage.getItem(key);
//         return storedData ? JSON.parse(storedData) : null;
//     };

//     // Handle chart data recalculation and session storage
//     useEffect(() => {
//         if (expenses && expenses.length > 0) {
//             const userExpenseMap: { [key: string]: number } = {};
//             const partnerExpenseMap: { [key: string]: number } = {};

//             // Separate expenses by user and partner
//             expenses.forEach((expense) => {
//                 const amount = parseFloat(expense.amount);
//                 const name = expense.expenseName;

//                 if (!isNaN(amount)) {
//                     if (expense.userId === userId) {
//                         userExpenseMap[name] = (userExpenseMap[name] || 0) + amount;
//                     } else {
//                         partnerExpenseMap[name] = (partnerExpenseMap[name] || 0) + amount;
//                     }
//                 }
//             });

//             // Combine all unique expense names (categories) for the labels
//             const labels = Array.from(new Set([
//                 ...Object.keys(userExpenseMap),
//                 ...Object.keys(partnerExpenseMap)
//             ]));

//             // Ensure data for both user and partner is present for all labels (expense names)
//             const userData = labels.map(label => userExpenseMap[label] || 0);
//             const partnerData = labels.map(label => partnerExpenseMap[label] || 0);

//             // Prepare chart data
//             const chartSettings = chartUtil.getDoughnutChartSettings(labels, userData, partnerData);

//             // Save and set the chart data
//             setChartData(chartSettings);
//             saveToSessionStorage('chartData', chartSettings);
//         } else {
//             // If no expenses are available (empty list), clear the chart data and session storage
//             setChartData(null);
//             sessionStorage.removeItem('chartData');
//         }
//     }, [expenses, userId]);

//     // If no chart data is available, show a message
//     if (!chartData) return <div>No data available</div>;

//     return (
//         <div className="CircleChart">
//             <Doughnut data={chartData} />
//         </div>
//     );
// };

// export default CircleChart;







import { ArcElement, CategoryScale, Chart, Legend, LinearScale, Title, Tooltip } from 'chart.js';
import { useEffect, useState } from "react";
import { Doughnut } from "react-chartjs-2";
import './CircleChart.css';

Chart.register(ArcElement, Tooltip, Legend, Title, CategoryScale, LinearScale);

type CircleChartProps = {
    expenses: any[];
    userId: number;
};

// const CircleChart = ({ expenses, userId }: CircleChartProps) => {
//     const [chartData, setChartData] = useState<any>(null);

//     useEffect(() => {
//         if (expenses?.length > 0) {
//             const data = processExpenseData(expenses, userId);
//             setChartData(data);
//         } else {
//             setChartData(null);
//         }
//     }, [expenses, userId]);

//     const processExpenseData = (expenses: any[], userId: number) => {
//         const expenseMap = expenses.reduce((acc, expense) => {
//             const { amount, expenseName: category, userId: expenseUserId } = expense;
//             const parsedAmount = parseFloat(amount);

//             if (isNaN(parsedAmount)) return acc;

//             const type = expenseUserId === userId ? 'user' : 'partner';
//             if (!acc[type]) acc[type] = {};
//             acc[type][category] = (acc[type][category] || 0) + parsedAmount;

//             return acc;
//         }, { user: {}, partner: {} });

//         const categories = Array.from(new Set([
//             ...Object.keys(expenseMap.user),
//             ...Object.keys(expenseMap.partner)
//         ]));

//         return {
//             labels: categories,
//             datasets: [
//                 {
//                     label: 'Your Expenses',
//                     data: categories.map(cat => expenseMap.user[cat] || 0),
//                     backgroundColor: [
//                         '#4A90E2', '#50E3C2', '#F5A623', '#D0021B',
//                         '#7ED321', '#9013FE', '#417505', '#BD10E0'
//                     ],
//                     borderColor: '#ffffff',
//                     borderWidth: 2,
//                     hoverOffset: 4
//                 },
//                 {
//                     label: 'Partner Expenses',
//                     data: categories.map(cat => expenseMap.partner[cat] || 0),
//                     backgroundColor: [
//                         '#2E5C8F', '#30A593', '#B87A18', '#8F0214',
//                         '#508A16', '#5D0CA6', '#2C4E04', '#790B8F'
//                     ],
//                     borderColor: '#ffffff',
//                     borderWidth: 2,
//                     hoverOffset: 4
//                 }
//             ]
//         };
//     };

//     if (!chartData) {
//         return (
//             <div className="no-data">
//                 <p>No expense data available</p>
//                 <span className="hint">Add expenses to see your statistics</span>
//             </div>
//         );
//     }

//     return (
//         <div className="circle-chart">
//             <Doughnut 
//                 data={chartData}
//                 options={{
//                     responsive: true,
//                     maintainAspectRatio: false,
//                     plugins: {
//                         legend: {
//                             position: 'bottom',
//                             labels: {
//                                 padding: 20,
//                                 usePointStyle: true,
//                                 font: {
//                                     size: 12,
//                                     family: "'Inter', sans-serif"
//                                 }
//                             }
//                         },
//                         tooltip: {
//                             backgroundColor: 'rgba(255, 255, 255, 0.9)',
//                             titleColor: '#1a1a1a',
//                             bodyColor: '#1a1a1a',
//                             bodyFont: {
//                                 size: 13
//                             },
//                             padding: 12,
//                             boxPadding: 8,
//                             borderColor: '#e5e7eb',
//                             borderWidth: 1,
//                             displayColors: true,
//                             callbacks: {
//                                 label: (context) => {
//                                     const label = context.dataset.label || '';
//                                     const value = context.parsed || 0;
//                                     return `${label}: $${value.toFixed(2)}`;
//                                 }
//                             }
//                         }
//                     }
//                 }}
//             />
//         </div>
//     );
// };

const CircleChart = ({ expenses, userId }: CircleChartProps) => {
    const [chartData, setChartData] = useState<any>(null);

    useEffect(() => {
        if (expenses?.length > 0) {
            const data = processExpenseData(expenses, userId);
            setChartData(data);
        } else {
            setChartData(null);
        }
    }, [expenses, userId]);

    const processExpenseData = (expenses: any[], userId: number) => {
        const expenseMap = expenses.reduce((acc, expense) => {
            const { amount, expenseName: category, userId: expenseUserId } = expense;
            const parsedAmount = parseFloat(amount);

            if (isNaN(parsedAmount)) return acc;

            const type = expenseUserId === userId ? 'user' : 'partner';
            if (!acc[type]) acc[type] = {};
            acc[type][category] = (acc[type][category] || 0) + parsedAmount;

            return acc;
        }, { user: {}, partner: {} });

        const categories = Array.from(new Set([
            ...Object.keys(expenseMap.user),
            ...Object.keys(expenseMap.partner)
        ]));

        return {
            labels: categories,
            datasets: [
                {
                    label: 'Your Expenses',
                    data: categories.map(cat => expenseMap.user[cat] || 0),
                    backgroundColor: [
                        '#4A90E2', '#50E3C2', '#F5A623', '#D0021B',
                        '#7ED321', '#9013FE', '#417505', '#BD10E0'
                    ],
                    borderColor: '#8eaab4',
                    borderWidth: 2,
                    hoverOffset: 4
                },
                {
                    label: 'Partner Expenses',
                    data: categories.map(cat => expenseMap.partner[cat] || 0),
                    backgroundColor: [
                        '#2E5C8F', '#30A593', '#B87A18', '#8F0214',
                        '#508A16', '#5D0CA6', '#2C4E04', '#790B8F'
                    ],
                    borderColor: '#8eaab4',
                    borderWidth: 2,
                    hoverOffset: 4
                }
            ]
        };
    };

    if (!chartData) {
        return (
            <div className="no-data">
                <p>No expense data available</p>
                <span className="hint">Add expenses to see your statistics</span>
            </div>
        );
    }

    return (
        <div className="circle-chart">
            <Doughnut
                data={chartData}
                options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            position: 'bottom',
                            labels: {
                                padding: 20,
                                usePointStyle: true,
                                font: {
                                    size: 12,
                                    family: "'Inter', sans-serif"
                                },
                                color: '#bcccce'
                            }
                        },
                        tooltip: {
                            backgroundColor: 'rgba(61, 88, 110, 0.95)',
                            titleColor: '#bcccce',
                            bodyColor: '#bcccce',
                            bodyFont: {
                                size: 13
                            },
                            padding: 12,
                            boxPadding: 8,
                            borderColor: '#8eaab4',
                            borderWidth: 1,
                            displayColors: true,
                            callbacks: {
                                label: (context) => {
                                    const label = context.dataset.label || '';
                                    const value = context.parsed || 0;
                                    return `${label}: $${value.toFixed(2)}`;
                                }
                            }
                        }
                    }
                }}
            />
        </div>
    );
};

export default CircleChart;