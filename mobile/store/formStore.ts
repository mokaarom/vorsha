import { create } from 'zustand';

export interface FormFieldDefinition {
  id: string;
  labelEn: string;
  labelBn: string;
  type: 'text' | 'number' | 'phone' | 'nid' | 'date' | 'select';
  placeholderEn?: string;
  placeholderBn?: string;
  options?: { labelEn: string; labelBn: string; value: string }[];
  required: boolean;
  validationRegex?: string;
  helpTextEn?: string;
  helpTextBn?: string;
}

export interface FormTemplate {
  id: string;
  titleEn: string;
  titleBn: string;
  departmentEn: string;
  departmentBn: string;
  category: string;
  fields: FormFieldDefinition[];
  stepsCount: number;
}

interface FormStoreState {
  activeTemplate: FormTemplate | null;
  currentStep: number;
  formData: Record<string, any>;
  formErrors: Record<string, string>;
  isSubmitting: boolean;
  setActiveTemplate: (template: FormTemplate | null) => void;
  setCurrentStep: (step: number) => void;
  setFieldValue: (fieldId: string, value: any) => void;
  setFieldError: (fieldId: string, error: string) => void;
  clearFieldError: (fieldId: string) => void;
  resetForm: () => void;
}

export const useFormStore = create<FormStoreState>((set) => ({
  activeTemplate: null,
  currentStep: 0,
  formData: {},
  formErrors: {},
  isSubmitting: false,
  setActiveTemplate: (activeTemplate) =>
    set({
      activeTemplate,
      currentStep: 0,
      formData: {},
      formErrors: {},
    }),
  setCurrentStep: (currentStep) => set({ currentStep }),
  setFieldValue: (fieldId, value) =>
    set((state) => ({
      formData: { ...state.formData, [fieldId]: value },
      formErrors: { ...state.formErrors, [fieldId]: '' },
    })),
  setFieldError: (fieldId, error) =>
    set((state) => ({
      formErrors: { ...state.formErrors, [fieldId]: error },
    })),
  clearFieldError: (fieldId) =>
    set((state) => {
      const next = { ...state.formErrors };
      delete next[fieldId];
      return { formErrors: next };
    }),
  resetForm: () =>
    set({
      activeTemplate: null,
      currentStep: 0,
      formData: {},
      formErrors: {},
      isSubmitting: false,
    }),
}));

