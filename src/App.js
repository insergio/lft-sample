import React, { Suspense } from 'react';
import { Route, Routes, Outlet, BrowserRouter as Router } from "react-router-dom";
import { QueryClient, QueryClientProvider } from 'react-query'

import './App.scss';
import 'react-toastify/dist/ReactToastify.css';
import Header from './components/header';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false
    },
  }
})

const Login = React.lazy(() => import("./components/login"));
const StocksPage = React.lazy(() => import("pages/stocks"));

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router >
        <div className="App">
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={
                <Suspense fallback={<>...</>}>
                  <Login />
                </Suspense>
              } />
              <Route path="stocks/*" element={
                <Suspense fallback={<>...</>}>
                  <StocksPage />
                </Suspense>
              } />
            </Route>
          </Routes>
        </div>
      </Router>
    </QueryClientProvider>
  );
}

function Layout() {
  return (
    <div>
      <Header />
      <Outlet />
    </div>
  );
}

export default App;
