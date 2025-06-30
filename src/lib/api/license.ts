import { api } from './client';
import { useQuery } from '@tanstack/react-query';

// License status interface
export interface LicenseStatus {
  isSigned: boolean;
  signedAt?: string;
  expiresAt?: string;
  licenseType: string;
  licenseId: string;
  userId: string;
  agreements: {
    terms: boolean;
    contentManagement: boolean;
    dataPrivacy: boolean;
  };
}

// License agreement interface
export interface LicenseAgreement {
  id: string;
  title: string;
  content: string;
  version: string;
  updatedAt: string;
}

/**
 * Get the current license status for the user
 * @returns Promise with license status
 */
export const getLicenseStatus = async (): Promise<LicenseStatus> => {
  return api.get<LicenseStatus>('/prod/license/status');
};

/**
 * Get the license agreement document
 * @param licenseId - Optional license ID
 * @returns Promise with license agreement
 */
export const getLicenseAgreement = async (
  licenseId?: string
): Promise<LicenseAgreement> => {
  return api.get<LicenseAgreement>('/prod/license/agreement', { licenseId });
};

/**
 * Sign the license agreement
 * @param agreements - Agreement checkboxes status
 * @returns Promise with updated license status
 */
export const signLicenseAgreement = async (
  agreements: {
    terms: boolean;
    contentManagement: boolean;
    dataPrivacy: boolean;
  }
): Promise<LicenseStatus> => {
  return api.post<LicenseStatus, { agreements: typeof agreements }>(
    '/prod/license/sign',
    { agreements }
  );
};

/**
 * Custom hook for fetching license status
 * @returns useQuery result with license status
 */
export const useLicenseStatus = () => {
  let isSigned = false;
    if (isSigned) {
      return {data: {
        isSigned: true,
        signedAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(), // 30 days ago
        expiresAt: new Date(Date.now() + 335 * 24 * 60 * 60 * 1000).toISOString(), // 335 days from now
        licenseType: 'Enterprise',
        licenseId: 'lic_' + Math.random().toString(36).substring(2, 15),
        userId: 'usr_' + Math.random().toString(36).substring(2, 15),
        agreements: {
          terms: true,
          contentManagement: true,
          dataPrivacy: true
        }
      }, isLoading: false, error: null};
    } else {
      return {data: {
        isSigned: false,
        licenseType: 'Enterprise',
        licenseId: 'lic_' + Math.random().toString(36).substring(2, 15),
        userId: 'usr_' + Math.random().toString(36).substring(2, 15),
        agreements: {
          terms: false,
          contentManagement: false,
          dataPrivacy: false
        }
      }, isLoading: false, error: null};
  }
  /*return useQuery<LicenseStatus, Error>({
    queryKey: ['licenseStatus'],
    queryFn: getLicenseStatus,
  });*/
};

/**
 * Custom hook for fetching license agreement
 * @param licenseId - Optional license ID
 * @returns useQuery result with license agreement
 */
export const useLicenseAgreement = (licenseId?: string) => {
  return useQuery<LicenseAgreement, Error>({
    queryKey: ['licenseAgreement', licenseId],
    queryFn: () => getLicenseAgreement(licenseId),
  });
};

// Export default
export default {
  getLicenseStatus,
  getLicenseAgreement,
  signLicenseAgreement,
  useLicenseStatus,
  useLicenseAgreement,
};
