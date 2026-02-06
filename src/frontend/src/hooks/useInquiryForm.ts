import { useState } from 'react';

interface FormData {
  name: string;
  email: string;
  date: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
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
    date: '',
    message: ''
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

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
    
    // Clear error for this field when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = (data: InquiryFormData) => {
    const validationErrors = validateForm(data);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsSubmitting(true);
    setErrors({});

    // Simulate form submission (store in browser state only)
    setTimeout(() => {
      // Store inquiry in session storage (browser state only)
      const inquiries = JSON.parse(sessionStorage.getItem('inquiries') || '[]');
      inquiries.push({
        ...data,
        timestamp: new Date().toISOString()
      });
      sessionStorage.setItem('inquiries', JSON.stringify(inquiries));

      setIsSubmitting(false);
      setIsSuccess(true);
    }, 1000);
  };

  const resetForm = () => {
    setFormData({
      name: '',
      email: '',
      date: '',
      message: ''
    });
    setErrors({});
    setIsSuccess(false);
  };

  return {
    formData,
    errors,
    isSubmitting,
    isSuccess,
    handleChange,
    handleSubmit,
    resetForm
  };
}
