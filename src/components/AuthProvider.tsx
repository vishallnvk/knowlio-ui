'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { getCurrentUser, signOut, fetchAuthSession } from 'aws-amplify/auth';
import { Hub } from 'aws-amplify/utils';
import { Amplify } from 'aws-amplify';
import { useRouter } from 'next/navigation';
import awsConfig from '../aws-config.json';

interface User {
  username: string;
  email?: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signOutUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Configure Amplify first
    Amplify.configure({
      Auth: {
        Cognito: {
          userPoolId: awsConfig.aws_user_pools_id,
          userPoolClientId: awsConfig.aws_user_pools_web_client_id,
          signUpVerificationMethod: 'code',
          loginWith: {
            oauth: {
              domain: awsConfig.domain,
              scopes: ['openid', 'email', 'profile'],
              redirectSignIn: awsConfig.redirectSignIn,
              redirectSignOut: awsConfig.redirectSignOut,
              responseType: 'code',
              providers: ['Google']
            }
          }
        }
      }
    });

    // Listen for authentication events
    const hubListener = Hub.listen('auth', ({ payload }) => {
      console.log('Auth event:', payload.event, payload);
      switch (payload.event) {
        case 'signedIn':
          checkAuthState().then(() => {
            router.push('/dashboard');
          });
          break;
        case 'signedOut':
        case 'tokenRefresh':
          checkAuthState();
          break;
      }
    });

    // Check initial auth state
    checkAuthState();

    return () => hubListener();
  }, [router]);

  const checkAuthState = async () => {
    try {
      const currentUser = await getCurrentUser();
      setUser({
        username: currentUser.username,
        email: currentUser.signInDetails?.loginId
      });
    } catch (error) {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const signOutUser = async () => {
    try {
      await signOut();
      setUser(null);
      router.push('/');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, signOutUser }}>
      {children}
    </AuthContext.Provider>
  );
}
