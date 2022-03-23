import React, {Suspense} from 'react'
import { Route, Routes } from "react-router-dom";

const Details = React.lazy(() => import("components/stocks-details"));
const StocksList = React.lazy(() => import("components/stocks-list"));

function StocksPage() {
    return (
        <Routes>
            <Route path="/" element={
                <Suspense fallback={<>...</>}>
                  <StocksList />
                </Suspense>
              } />
              <Route path="/details/:id" element={
                <Suspense fallback={<>...</>}>
                  <Details />
                </Suspense>
              } />
        </Routes>
    )
}

export default StocksPage