
// Add React import to resolve namespace usage in handleChange
import React, { useState, useCallback } from 'react';

interface FormState {
  title: string;
  description: string;
}

interface ValidationErrors {
  title?: string;
  description?: string;
}

export const useTaskForm = (initialState: FormState = { title: '', description: '' }) => {
  const [values, setValues] = useState<FormState>(initialState);
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validate = useCallback((data: FormState): ValidationErrors => {
    const newErrors: ValidationErrors = {};
    if (!data.title.trim()) {
      newErrors.title = 'Title is required';
    } else if (data.title.length < 3) {
      newErrors.title = 'Title must be at least 3 characters';
    }

    if (data.description.length > 0 && data.description.length < 5) {
      newErrors.description = 'Description must be at least 5 characters';
    }
    return newErrors;
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setValues(prev => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name as keyof ValidationErrors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const resetForm = () => {
    setValues(initialState);
    setErrors({});
  };

  return {
    values,
    errors,
    isSubmitting,
    setIsSubmitting,
    setErrors,
    handleChange,
    validate,
    resetForm
  };
};
