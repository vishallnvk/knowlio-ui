import { api } from './client';
import { useQuery } from '@tanstack/react-query';

// Licensing consent interfaces
export interface LicensingConsent {
  ai_training_consent?: boolean;
  ai_reference_consent?: boolean;
  ai_marketplace_consent?: boolean;
}

export interface GetConsentAttributesResponse {
  success: boolean;
  data: LicensingConsent;
  message?: string;
}

export interface SaveConsentAttributesResponse {
  success: boolean;
  message: string;
}

/**
 * Get current AI consent attributes
 * @returns Promise with current licensing consent preferences
 */
export const getAiConsentAttributes = async (): Promise<GetConsentAttributesResponse> => {
  try {
    const response = await api.post<GetConsentAttributesResponse, {
      processor_name: string;
      action: string;
      payload: {};
    }>('/prod/users/ai-consent-attributes', {
      processor_name: 'user',
      action: 'get_ai_consents',
      payload: {}
    });
    
    return response;
  } catch (error: any) {
    console.error('Error fetching AI consent attributes:', error);
    throw new Error(error.message || 'Failed to fetch licensing preferences');
  }
};

/**
 * Save AI consent attributes
 * @param consentData - Licensing consent preferences to save
 * @returns Promise with save result
 */
export const saveAiConsentAttributes = async (consentData: LicensingConsent): Promise<SaveConsentAttributesResponse> => {
  try {
    const response = await api.post<SaveConsentAttributesResponse, {
      processor_name: string;
      action: string;
      payload: LicensingConsent;
    }>('/prod/users/ai-consents', {
      processor_name: 'user',
      action: 'update_ai_consents',
      payload: consentData
    });
    
    return response;
  } catch (error: any) {
    console.error('Error saving AI consent attributes:', error);
    throw new Error(error.message || 'Failed to save licensing preferences');
  }
};

/**
 * Custom hook for fetching AI consent attributes
 * @returns useQuery result with licensing consent preferences
 */
export const useAiConsentAttributes = () => {
  return useQuery<GetConsentAttributesResponse, Error>({
    queryKey: ['aiConsentAttributes'],
    queryFn: getAiConsentAttributes,
  });
};

// User Agreement interfaces
export interface UserAgreementConsent {
  ai_user_agreement_consent?: boolean;
  ai_user_agreement_version?: string;
}

export interface GetUserAgreementResponse {
  success: boolean;
  data: UserAgreementConsent;
  message?: string;
}

export interface SaveUserAgreementResponse {
  success: boolean;
  message: string;
}

/**
 * Get current user agreement attributes
 * @returns Promise with current user agreement status
 */
export const getUserAgreementAttributes = async (): Promise<GetUserAgreementResponse> => {
  try {
    const response = await api.post<GetUserAgreementResponse, {
      processor_name: string;
      action: string;
      payload: {};
    }>('/prod/users/agreement-attributes', {
      processor_name: 'user',
      action: 'get_user_agreement_attributes',
      payload: {}
    });
    
    return response;
  } catch (error: any) {
    console.error('Error fetching user agreement attributes:', error);
    throw new Error(error.message || 'Failed to fetch user agreement status');
  }
};

/**
 * Save user agreement attributes
 * @param agreementData - User agreement consent data to save
 * @returns Promise with save result
 */
export const saveUserAgreementAttributes = async (agreementData: UserAgreementConsent): Promise<SaveUserAgreementResponse> => {
  try {
    const response = await api.post<SaveUserAgreementResponse, {
      processor_name: string;
      action: string;
      payload: UserAgreementConsent;
    }>('/prod/users/user-agreement', {
      processor_name: 'user',
      action: 'update_user_agreement',
      payload: agreementData
    });
    
    return response;
  } catch (error: any) {
    console.error('Error saving user agreement attributes:', error);
    throw new Error(error.message || 'Failed to save user agreement');
  }
};

/**
 * Custom hook for fetching user agreement attributes
 * @returns useQuery result with user agreement status
 */
export const useUserAgreementAttributes = () => {
  return useQuery<GetUserAgreementResponse, Error>({
    queryKey: ['userAgreementAttributes'],
    queryFn: getUserAgreementAttributes,
  });
};

// Export default
export default {
  getAiConsentAttributes,
  saveAiConsentAttributes,
  useAiConsentAttributes,
  getUserAgreementAttributes,
  saveUserAgreementAttributes,
  useUserAgreementAttributes,
};
