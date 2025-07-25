export interface SupportOption {
  value: string;
  label: string;
  isDefault?: boolean;
}

export interface SupportFormData {
  selectedOption: string;
  message: string;
}

export interface SupportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export interface SupportRequestFormProps {
  onSubmit: (data: SupportFormData) => void;
  onCancel: () => void;
  isSubmitting?: boolean;
}

export const supportOptions: SupportOption[] = [
  { value: "general", label: "General help request", isDefault: true },
  { value: "issue-adding-content", label: "Issue adding a content" },
  { value: "missing-content", label: "Missing content" },
  { value: "update-account", label: "Request update to account details" },
  { value: "update-content-metadata", label: "Request update to content metadata" },
  { value: "creator-license", label: "Issue with creator license agreement" },
  { value: "identity-verification", label: "Help with identity verification" },
];
