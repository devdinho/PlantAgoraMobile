export interface FormFieldOption {
  value: string;
  label: string;
}

export type FieldType = 'boolean' | 'radio' | 'checkbox' | 'text' | 'textarea' | 'custom';

export interface FormField {
  id: string;
  type: FieldType | string; // Permitir string do JSON
  question: string;
  required?: boolean;
  options?: FormFieldOption[];
  placeholder?: string;
  validation?: {
    minLength?: number;
    maxLength?: number;
    pattern?: string;
  };
  conditionalField?: {
    showWhen: string; // ID do campo
    equals: string | boolean; // Valor que deve ter
    field: FormField; // Campo que aparece condicionalmente
  };
  customComponent?: string; // Nome do componente customizado
  customProps?: Record<string, any>;
}

export interface FormConfig {
  id: string;
  title: string;
  icon: string;
  storageKey: string;
  fields: FormField[];
}

export interface FormData {
  [key: string]: any;
} 