'use client';

import { useEffect } from 'react';
import { useAppDispatch } from '../../store/hooks';
import { useGetCurrentUserQuery } from '../../store/api/authApi';
import { setCredentials, clearCredentials } from '../../store/slices/authSlice';

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  const dispatch = useAppDispatch();
  const { data: user, isLoading, isError } = useGetCurrentUserQuery(undefined, {
    // You can add additional options here if needed
  });

  useEffect(() => {
    if (user) {
      dispatch(setCredentials(user));
    } else if (isError) {
      dispatch(clearCredentials());
    }
  }, [user, isError, dispatch]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return <>{children}</>;
}