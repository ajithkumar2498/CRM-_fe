import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import TextBox from './TextBox';
import Loading from './Loader';
import Button from './Button';
import ModalWrapper from './ModalWrapper';
import { DialogTitle } from '@headlessui/react';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { addDeal, updateDeal } from '../redux/slices/dealSlice';

const AddDeal = ({ open, setOpen, dealData }) => {
  const dispatch = useDispatch();

  const defaultValues = {
    title: dealData?.title || '',
    value: dealData?.value || '',
    status: dealData?.status || 'open',
  };

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({ defaultValues });

  useEffect(() => {
    reset(defaultValues);
  }, [dealData, reset]);

  const handleOnSubmit = async (data) => {
    try {
      const action = dealData?._id
        ? await dispatch(updateDeal({ id: dealData._id, data }))
        : await dispatch(addDeal(data));

      if (action.meta.requestStatus === 'fulfilled') {
        toast.success(`Deal ${dealData?._id ? 'updated' : 'created'} successfully`);
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
          {dealData?._id ? 'Update Deal' : 'Add New Deal'}
        </DialogTitle>

        <div className="mt-2 flex flex-col gap-6">
          <TextBox
            placeholder="Deal title"
            type="text"
            name="title"
            label="Deal Title"
            className="w-full rounded"
            register={register('title', { required: 'Deal title is required!' })}
            error={errors.title?.message}
          />

          <TextBox
            placeholder="Value"
            type="number"
            name="value"
            label="Value"
            className="w-full rounded"
            register={register('value', { required: 'Value is required!' })}
            error={errors.value?.message}
          />

          <div>
            <label htmlFor="status" className="block mb-1 font-medium text-sm">
              Status
            </label>
            <select
              id="status"
              name="status"
              {...register('status', { required: 'Status is required!' })}
              className="w-full border rounded px-3 py-2 text-sm text-gray-700"
            >
              <option value="open">Open</option>
              <option value="won">Won</option>
              <option value="lost">Lost</option>
            </select>
            {errors.status && (
              <p className="text-red-500 text-sm mt-1">{errors.status.message}</p>
            )}
          </div>
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

export default AddDeal;
