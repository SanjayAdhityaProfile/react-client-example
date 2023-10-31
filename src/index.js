import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Board, DashBoard, LoginPage, SignUpPage, PrivateRoutes } from './allModules';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);

function App() {
  return (
    <>
      <div className='App'>
        <Router>
          <Routes>
            <Route element={<PrivateRoutes />}>
              <Route element={<DashBoard />} path="/" exact />
              <Route element={<Board />} path="/board/:boardId" />
            </Route>
            <Route element={<LoginPage />} path="/login" />
            <Route element={<SignUpPage />} path="/signup" />
          </Routes>
        </Router>
      </div>
    </>
  );
}


