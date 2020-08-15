import React from 'react';
import IndexRoutes from './Routes/index'
import './assets/styles/global.css'
import {AuthProvider} from './contexts/auth'

function App() {
  return (
    <AuthProvider>
      <IndexRoutes />
    </AuthProvider>
  );
}

export default App;
