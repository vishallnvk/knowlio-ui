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
  firstName?: string;
  lastName?: string;
  name?: string;
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
      const session = await fetchAuthSession();
      
      // Extract name information from user attributes
      let firstName = '';
      let lastName = '';
      let fullName = '';
      let email = '';
      
      // Try to get name from ID token if available
      if (session.tokens?.idToken) {
        const payload = session.tokens.idToken.payload;
        
        firstName = (payload.given_name as string) || '';
        lastName = (payload.family_name as string) || '';
        fullName = (payload.name as string) || '';
        email = (payload.email as string) || '';
        
        // Also try alternative attribute names that might be present
        if (!firstName && payload.first_name) {
          firstName = payload.first_name as string;
        }
        if (!lastName && payload.last_name) {
          lastName = payload.last_name as string;
        }
      }
      
      // Fallback to getting email from signInDetails if not in token
      if (!email) {
        email = currentUser.signInDetails?.loginId || '';
      }
      
      // Compute display name with better fallback logic
      let displayName = '';
      if (firstName && lastName) {
        displayName = `${firstName} ${lastName}`.trim();
      } else if (firstName) {
        displayName = firstName;
      } else if (lastName) {
        displayName = lastName;
      } else if (fullName) {
        displayName = fullName;
      } else if (email && email.includes('@')) {
        // Extract name from email (e.g., john.doe@example.com -> John Doe)
        const emailName = email.split('@')[0];
        displayName = emailName.split('.').map(part => 
          part.charAt(0).toUpperCase() + part.slice(1)
        ).join(' ');
      } else {
        // Last resort: use username, but this should rarely happen
        displayName = currentUser.username;
      }
      
      setUser({
        username: currentUser.username,
        email: email,
        firstName: firstName,
        lastName: lastName,
        name: displayName
      });
    } catch (error) {
      console.error('Error checking auth state:', error);
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
