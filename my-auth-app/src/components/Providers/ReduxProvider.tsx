'use client';

import { Provider } from 'react-redux';
import { store } from '../../store';
import { useEffect } from 'react';
import { useAppDispatch } from '../../store/hooks';
import { fetchUser } from '../../store/slices/authSlice';

function AuthInitializer({ children }: { children: React.ReactNode }) {
  const dispatch = useAppDispatch();

  useEffect(() => {
    // Check if user is authenticated on app load
    const token = localStorage.getItem('auth_token');
    if (token) {
      dispatch(fetchUser());
    }
  }, [dispatch]);

  return <>{children}</>;
}

export default function ReduxProvider({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <AuthInitializer>
        {children}
      </AuthInitializer>
    </Provider>
  );
}