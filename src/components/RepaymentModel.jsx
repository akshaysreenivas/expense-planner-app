import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Line } from "react-chartjs-2"; // Importing the Line component from react-chartjs-2
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const RepaymentModel = () => {
  // Retrieving the list of accounts from Redux store

  const accounts = useSelector((state) => state.account.accounts);

  const [monthlyPayment, setMonthlyPayment] = useState(0);

  // Calculating the total balance of all accounts
  const totalBalance = accounts.reduce(
    (total, account) => total + account.balance,
    0
  );
  // Handler for updating the monthly payment input
  const handleMonthlyPaymentChange = (e) => {
    setMonthlyPayment(parseFloat(e.target.value));
  };

  // calculating the time series of remaining balances
  const calculateTimeSeries = () => {
    const initialBalance = accounts.reduce(
      (total, account) => total + account.balance,
      0
    );
    const timeSeriesData = [initialBalance];
    let currentBalance = initialBalance;
    for (let month = 0; month < 12; month++) {
      currentBalance -= monthlyPayment;
      if (currentBalance < 0) {
        currentBalance = 0;
      }
      timeSeriesData.push(currentBalance);
    }

    return timeSeriesData;
  };

  const timeSeriesData = calculateTimeSeries();

  // Data for the Line chart
  const data = {
    labels: Array.from({ length: timeSeriesData.length }, (_, i) => `${i + 1}`),
    datasets: [
      {
        label: "Remaining Balance",
        data: timeSeriesData,
        fill: false,
        borderColor: "blue",
      },
    ],
  };

  const options = {
    responsive: true,
  };
  return (
    <div className="repayment-model">
      <h2>Initial Balance: ₹ {totalBalance}</h2>
      <div className="monthly-payment-div">
        <label htmlFor="monthly-payment-input">Monthly Payment:</label>
        <input
          type="number"
          id="monthly-payment-input"
          value={monthlyPayment}
          onChange={handleMonthlyPaymentChange}
        />
      </div>
      <div>
        <h3>Balance of accounts after a number of months</h3>
        <Line options={options} data={data} />
      </div>
    </div>
  );
};

export default RepaymentModel;
