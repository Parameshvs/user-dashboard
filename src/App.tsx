import React from 'react';
import UserForm from './Components/UserForm';
import UserTable from './Components/UserTable';
import { UserProvider } from './context/UserContext';
import './App.css';

const App: React.FC = () => {
  return (
    <UserProvider>
      <div className="app-container">
        <h1 className="app-title">User Management Dashboard</h1>
        <UserForm />
        <UserTable />
      </div>
    </UserProvider>
  );
};

export default App;
