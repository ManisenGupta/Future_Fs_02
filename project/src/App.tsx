import React from 'react';
import { WeatherProvider } from './context/WeatherContext';
import Layout from './components/Layout';
import Dashboard from './components/Dashboard';

function App() {
  return (
    <WeatherProvider>
      <Layout>
        <Dashboard />
      </Layout>
    </WeatherProvider>
  );
}

export default App;