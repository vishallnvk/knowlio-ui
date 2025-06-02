import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Hub } from 'aws-amplify/utils';

/**
 * AuthListener - Component that listens for authentication events from AWS Amplify
 * Handles redirects based on authentication state changes
 */
function AuthListener() {
  const navigate = useNavigate();

  useEffect(() => {
    // Listen for auth events from Amplify
    const unsubscribe = Hub.listen('auth', ({ payload }) => {
      switch (payload.event) {
        case 'signInWithRedirect':
          console.log('OAuth sign in initiated');
          break;
        case 'signInWithRedirect_success':
          console.log('OAuth sign in success');
          navigate('/dashboard');
          break;
        case 'signInWithRedirect_failure':
          console.log('OAuth sign in failed');
          navigate('/login');
          break;
        case 'signedIn':
          console.log('User signed in');
          break;
        case 'signedOut':
          console.log('User signed out');
          navigate('/');
          break;
        case 'customOAuthState':
          console.log('Custom OAuth state', payload.data);
          break;
        default:
          break;
      }
    });

    // Cleanup function to unsubscribe when component unmounts
    return () => unsubscribe();
  }, [navigate]);

  // This component doesn't render anything
  return null;
}

export default AuthListener;
