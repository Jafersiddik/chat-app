
import './assets/style.css';
import React from 'react'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Layout from './component/Layout/layout';
import allRoutes from './routes';
import authRoutes from './routes/auth';
import NoAuthlayout from './component/Layout/authLayout';
import AuthMiddleware from './routes/authmiddleware';

function App() {
  return (
    <>
      <Router>
        <Routes>
          {allRoutes && allRoutes.map((route, id) => {
            return (
              <Route key={id} path={route.path} element={<AuthMiddleware><Layout>{route.component}</Layout></AuthMiddleware>} />
            )
          })}
          {authRoutes && authRoutes.map((route, id) => {
            return (<Route key={id} path={route.path} element={<NoAuthlayout>{route.component}</NoAuthlayout>} />)
          })}
        </Routes>
      </Router>
    </>
  );
}

export default App;
