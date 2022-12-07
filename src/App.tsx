import React, { FC, lazy, Suspense } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

const UsersRating = lazy(() => import('./components/UsersRating/UsersRating'));

const App:FC = () => {
  return (
    <div className='appWrapper'>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path='/' element={<UsersRating />} />
        </Routes>
      </Suspense>
    </div>
  );
};

const AppWrapper = () => {
  return (
    <BrowserRouter basename={window.location.pathname || ''}>
      <App />
    </BrowserRouter>
  )
};

export default AppWrapper;
