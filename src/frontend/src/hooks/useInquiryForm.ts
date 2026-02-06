import { useState } from 'react';
import { useSaveInquiry } from './useQueries';

interface FormData {
  name: string;
  email: string;
  phone: string;
  date: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
  eventType?: string;
  date?: string;
  message?: string;
  submit?: string;
}

interface InquiryFormData extends FormData {
  eventType: string;
}

export function useInquiryForm() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    date: '',
    message: ''
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSuccess, setIsSuccess] = useState(false);

  const saveInquiryMutation = useSaveInquiry();

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateForm = (data: InquiryFormData): FormErrors => {
    const newErrors: FormErrors = {};

    if (!data.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!data.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(data.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!data.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    }

    if (!data.eventType) {
      newErrors.eventType = 'Please select an event type';
    }

    if (!data.date) {
      newErrors.date = 'Preferred date is required';
    }

    if (!data.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (data.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
    }

    return newErrors;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (data: InquiryFormData) => {
    const validationErrors = validateForm(data);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});

    try {
      const timestamp = BigInt(Date.now());
      const fullMessage = `Event Type: ${data.eventType}\nPreferred Date: ${data.date}\n\n${data.message}`;
      
      await saveInquiryMutation.mutateAsync({
        name: data.name,
        email: data.email,
        phone: data.phone,
        message: fullMessage,
        timestamp,
      });

      setIsSuccess(true);
    } catch (error: any) {
      console.error('Failed to submit inquiry:', error);
      setErrors({ submit: 'Failed to submit inquiry. Please try again.' });
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      email: '',
      phone: '',
      date: '',
      message: ''
    });
    setErrors({});
    setIsSuccess(false);
  };

  return {
    formData,
    errors,
    isSubmitting: saveInquiryMutation.isPending,
    isSuccess,
    handleChange,
    handleSubmit,
    resetForm
  };
}
