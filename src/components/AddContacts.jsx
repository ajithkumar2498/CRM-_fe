import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import TextBox from './TextBox';
import Loading from './Loader';
import Button from './Button';
import ModalWrapper from './ModalWrapper';
import { DialogTitle } from '@headlessui/react';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { createContact, updateContact } from '../redux/slices/contactSlice';

const AddContact = ({ open, setOpen, contactData }) => {
  const dispatch = useDispatch();

  const defaultValues = {
    name: contactData?.name || '',
    email: contactData?.email || '',
    phone: contactData?.phone || '',
    company: contactData?.company || '',
    tags: contactData?.tags || ''
  };

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({ defaultValues });

  useEffect(() => {
    reset(defaultValues);
  }, [contactData, reset]);

  const handleOnSubmit = async (data) => {
    try {
      const action = contactData?._id
        ? await dispatch(updateContact({ id: contactData._id, data }))
        : await dispatch(createContact(data));

      if (action.meta.requestStatus === 'fulfilled') {
        toast.success(`Contact ${contactData?._id ? 'updated' : 'created'} successfully`);
        setOpen(false);
      } else {
        toast.error(action.payload || 'Operation failed');
      }
    } catch (err) {
      toast.error('Something went wrong');
    }
  };

  return (
    <ModalWrapper open={open} setOpen={setOpen}>
      <form onSubmit={handleSubmit(handleOnSubmit)}>
        <DialogTitle as="h2" className="text-base font-bold text-gray-900 mb-4">
          {contactData?._id ? 'Update Contact' : 'Add New Contact'}
        </DialogTitle>

        <div className="mt-2 flex flex-col gap-6">
          <TextBox
            placeholder="Full name"
            type="text"
            name="name"
            label="Full Name"
            className="w-full rounded"
            register={register('name', { required: 'Full name is required!' })}
            error={errors.name?.message}
          />
          <TextBox
            placeholder="Email Address"
            type="email"
            name="email"
            label="Email Address"
            className="w-full rounded"
            register={register('email', { required: 'Email Address is required!' })}
            error={errors.email?.message}
          />
          <TextBox
            placeholder="Phone Number"
            type="text"
            name="phone"
            label="Phone"
            className="w-full rounded"
            register={register('phone')}
            error={errors.phone?.message}
          />
          <TextBox
            placeholder="Tags"
            type="text"
            name="tags"
            label="Tags"
            className="w-full rounded"
            register={register('tags')}
            error={errors.company?.message}
          />
          <TextBox
            placeholder="Company Name"
            type="text"
            name="company"
            label="Company"
            className="w-full rounded"
            register={register('company')}
            error={errors.company?.message}
          />
        </div>

        {isSubmitting ? (
          <div className="py-5">
            <Loading />
          </div>
        ) : (
          <div className="py-3 mt-4 sm:flex sm:flex-row-reverse">
            <Button
              type="submit"
              className="bg-blue-600 px-8 text-sm font-semibold text-white hover:bg-blue-700 sm:w-auto"
              label="Submit"
            />
            <Button
              type="button"
              className="bg-white px-5 text-sm font-semibold text-gray-900 sm:w-auto"
              onClick={() => setOpen(false)}
              label="Cancel"
            />
          </div>
        )}
      </form>
    </ModalWrapper>
  );
};

export default AddContact;
