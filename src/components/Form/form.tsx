'use client';

import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { contactFormSchema } from './schema';
import { FormDataType } from './type';
import { toast } from 'sonner';
import { EmailTemplate } from '@/utils/emailTemplate';

const defaultValues: FormDataType = {
  name: '',
  email: '',
  message: '',
  lastname: '',
  phone: '',
};

function Form() {
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormDataType>({
    resolver: zodResolver(contactFormSchema),
    defaultValues,
  });

  const onSubmit: SubmitHandler<FormDataType> = async (data) => {
    const loadingToast = toast.loading('Sending message...');
    setIsLoading(true);
    try {
      const formPayload = new FormData();
      formPayload.append('email', 'lisab@jttr.net');
      formPayload.append('subject', 'New query from Star Equipment Sales');
      formPayload.append('html', EmailTemplate({ values: data }));
      const response = await fetch(
        'https://api.carzoomo.com/socially/send-email',
        {
          method: 'POST',
          body: formPayload,
        },
      );

      if (!response.ok) throw new Error('Failed to submit form');
      toast.dismiss(loadingToast);
      toast.success('Message sent successfully!');
      reset();
    } catch (error) {
      console.error('Form submission error:', error);
      toast.dismiss(loadingToast);
      toast.error('Failed to send message. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-lg w-full bg-white rounded-xl p-8 shadow-md border border-gray-100 mx-auto"
    >
      <div className="flex flex-col md:flex-row gap-4 mb-4">
        <div className="flex-1">
          <input
            type="text"
            {...register('name')}
            placeholder="First Name"
            className="w-full p-3 border border-gray-300 rounded focus:border-[#007934] focus:ring-2 focus:ring-[#007934]/20 outline-none transition"
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
          )}
        </div>
        <div className="flex-1">
          <input
            type="text"
            {...register('lastname')}
            placeholder="Last Name"
            className="w-full p-3 border border-gray-300 rounded focus:border-[#007934] focus:ring-2 focus:ring-[#007934]/20 outline-none transition"
          />
          {errors.lastname && (
            <p className="text-red-500 text-sm mt-1">
              {errors.lastname.message}
            </p>
          )}
        </div>
      </div>
      <div className="flex flex-col md:flex-row gap-4 mb-4">
        <div className="flex-1">
          <input
            type="email"
            {...register('email')}
            placeholder="Email Address"
            className="w-full p-3 border border-gray-300 rounded focus:border-[#007934] focus:ring-2 focus:ring-[#007934]/20 outline-none transition"
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>
        <div className="flex-1">
          <input
            type="text"
            {...register('phone')}
            placeholder="Phone Number"
            className="w-full p-3 border border-gray-300 rounded focus:border-[#007934] focus:ring-2 focus:ring-[#007934]/20 outline-none transition"
          />
          {errors.phone && (
            <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>
          )}
        </div>
      </div>
      <div className="mb-4">
        <textarea
          {...register('message')}
          placeholder="Write your message"
          className="w-full p-3 border border-gray-300 rounded focus:border-[#007934] focus:ring-2 focus:ring-[#007934]/20 outline-none transition min-h-[100px] resize-none "
        />
        {errors.message && (
          <p className="text-red-500 text-sm mt-1">{errors.message.message}</p>
        )}
      </div>
      <button
        type="submit"
        disabled={isLoading}
        className="bg-[#007934] w-full mt-2 flex justify-center cursor-pointer text-white text-lg font-bold rounded-full py-3 hover:bg-[#02682e] transition"
      >
        {isLoading ? 'Sending...' : 'Send Message'}
      </button>
    </form>
  );
}
export default Form;
