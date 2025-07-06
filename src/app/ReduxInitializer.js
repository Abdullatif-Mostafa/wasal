'use client';

import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { loadUserFromStorage } from '@/RTK/Reducers/authSlice';

const ReduxInitializer = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadUserFromStorage());
  }, [dispatch]);

  return null;
};

export default ReduxInitializer;
