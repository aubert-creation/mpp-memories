import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const NotFoundRedirect = () => {
  const navigate = useNavigate();
  useEffect(() => {
    navigate('/404');
  }, [navigate]);
  return <div />;
};

export default NotFoundRedirect;
