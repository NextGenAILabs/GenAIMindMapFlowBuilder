import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { ReactFlowProvider } from '@xyflow/react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Landing } from './Landing.jsx';

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <ReactFlowProvider>
            <Router>
                <Routes>
                    <Route
                        path="/"
                        element={<App />}
                    />
                    <Route
                        path="/landing"
                        element={<Landing />}
                    />
                    {/* <App /> */}
                </Routes>
            </Router>
        </ReactFlowProvider>
    </StrictMode>
);
