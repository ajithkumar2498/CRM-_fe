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
import { addCompany, updateCompany } from '../redux/slices/companySlice';


const AddCompany = ({ open, setOpen, companyData }) => {
  const dispatch = useDispatch();

  const defaultValues = {
    name: companyData?.name || '',
    industry: companyData?.industry || '',
    phone: companyData?.phone || '',
    address: companyData?.address || '',
    tags: companyData?.tags || ''
  };

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({ defaultValues });

  useEffect(() => {
    reset(defaultValues);
  }, [companyData, reset]);

  const handleOnSubmit = async (data) => {
    try {
      const action = companyData?._id
        ? await dispatch(updateCompany({ id: companyData._id, data }))
        : await dispatch(addCompany(data));

      if (action.meta.requestStatus === 'fulfilled') {
        toast.success(`Contact ${companyData?._id ? 'updated' : 'created'} successfully`);
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
          {companyData?._id ? 'Update Contact' : 'Add New Contact'}
        </DialogTitle>

        <div className="mt-2 flex flex-col gap-6">
          <TextBox
            placeholder="Company name"
            type="text"
            name="name"
            label="company name"
            className="w-full rounded"
            register={register('name', { required: 'Company Name is required!' })}
            error={errors.name?.message}
          />
          <TextBox
            placeholder="Industry"
            type="text"
            name="industry"
            label="industry"
            className="w-full rounded"
            register={register('industry', { required: 'Industry is required!' })}
            error={errors.industry?.message}
          />
          <TextBox
            placeholder="Phone Number"
            type="text"
            name="phone"
            label="Phone"
            className="w-full rounded"
            register={register('phone', { required: 'Phone is required!' })}
            error={errors.phone?.message}
          />
          <TextBox
            placeholder="Tags"
            type="text"
            name="tags"
            label="Tags"
            className="w-full rounded"
            register={register('tags')}
            error={errors.tags?.message}
          />
          <TextBox
            placeholder="Address"
            type="text"
            name="address"
            label="Address"
            className="w-full rounded"
            register={register('address', { required: 'Address is required!' })}
            error={errors.address?.message}
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

export default AddCompany;
