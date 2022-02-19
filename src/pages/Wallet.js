import React from 'react';
import Header from '../components/Header';
import Expenses from '../components/Expenses';
import ExpenseTable from '../components/ExpenseTable';
import './Wallet.css';

class Wallet extends React.Component {
  render() {
    return (
      <main className="wallet">
        <Header />
        <div className="expenses">
          <Expenses />
          <ExpenseTable />
        </div>
      </main>
    );
  }
}

export default Wallet;
