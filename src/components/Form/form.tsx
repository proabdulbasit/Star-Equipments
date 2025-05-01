/* eslint-disable import/no-extraneous-dependencies */
'use client';

import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { contactFormSchema } from './schema';
import { FormDataType } from './type';
// eslint-disable-next-line import/no-extraneous-dependencies
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
      formPayload.append('email', process.env.NEXT_PUBLIC_CLIENT_EMAIL || '');
      formPayload.append('subject', 'New query from Star Detail');
      formPayload.append('html', EmailTemplate({ values: data }));
      const response = await fetch(process.env.NEXT_PUBLIC_API_BASE_URL || '', {
        method: 'POST',
        body: formPayload,
      });

      if (!response.ok) throw new Error('Failed to submit form');
      toast.dismiss(loadingToast);
      toast.success('Message sent successfully!');
      alert('Message sent successfully!');
      reset();
    } catch (error) {
      console.error('Form submission error:', error);
      toast.dismiss(loadingToast);
      alert('Failed to send message. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-[570px] shadow py-5 px-10 m-10 rounded-bl-3xl rounded-tr-3xl  roboto-condensed"
    >
      <div className="gap-3 flex">
        <div>
          <input
            type="text"
            {...register('name')}
            placeholder="FIrst Name"
            className="p-4 border-x-transparent border-t-transparent outline-none text-[#11111399] border-b-gray-300 border"
          />
          {errors.name && <p className="text-red-500">{errors.name.message}</p>}
        </div>
        <div>
          <input
            type="text"
            {...register('lastname')}
            placeholder="Last Name"
            className="p-4 border-x-transparent border-t-transparent outline-none text-[#11111399] border-b-gray-300 border"
          />
          {errors.lastname && (
            <p className="text-red-500">{errors.lastname.message}</p>
          )}
        </div>
      </div>
      <div className="my-5 gap-3 flex">
        <div>
          <input
            type="text"
            {...register('email')}
            placeholder="Email Address"
            className="p-4 border-x-transparent border-t-transparent outline-none text-[#11111399] border-b-gray-300 border"
          />
          {errors.email && (
            <p className="text-red-500">{errors.email.message}</p>
          )}
        </div>
        <div>
          <input
            type="text"
            {...register('phone')}
            placeholder="Phone NUmber"
            className="p-4 border-x-transparent border-t-transparent outline-none text-[#11111399] border-b-gray-300 border"
          />
          {errors.phone && (
            <p className="text-red-500">{errors.phone.message}</p>
          )}
        </div>
      </div>
      <div>
        <label className="text-[#007934] font-bold text-lg">
          Select Subject
        </label>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <input type="checkbox" className="w-4 h-4" />
            <p>General Inquiry</p>
          </div>
          <div className="flex items-center gap-2">
            <input type="checkbox" className="w-4 h-4" />
            <p>Construction</p>
          </div>{' '}
          <div className="flex items-center gap-2">
            <input type="checkbox" className="w-4 h-4" />
            <p>Parts and Accessories</p>
          </div>
        </div>
      </div>
      <div>
        <input
          type="text"
          {...register('message')}
          placeholder="write your message"
          className="p-4 border-x-transparent w-full border-t-transparent outline-none text-[#11111399] border-b-gray-300 border"
        />
        {errors.message && (
          <p className="text-red-500">{errors.message.message}</p>
        )}
      </div>
      <button
        type="submit"
        className="bg-[#007934] mx-auto mt-5 flex justify-center cursor-pointer text-white text-xl rounded-full text-center w-[203px] py-4"
      >
        Send Message
      </button>
    </form>
  );
}
export default Form;
