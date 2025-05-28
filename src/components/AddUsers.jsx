import React from 'react'
import { useForm } from 'react-hook-form';
import{useDispatch, useSelector} from "react-redux"
import TextBox from './TextBox';
import Loading from './Loader';
import {toast} from "react-toastify"
import Button from './Button';
import ModalWrapper from './ModalWrapper';
import { DialogTitle } from '@headlessui/react';
import { updateUserProfile } from '../redux/slices/userSlice';


const AddUsers = ({open, setOpen, userData}) => {

      const defaultValues = userData ?? {};
  const { user } = useSelector((state) => state.auth);
  const { loading } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues });

  const handleOnSubmit = async (data) => {
    try {
      const resultAction = await dispatch(updateUserProfile(data));
      console.log("RESULT ACTION", resultAction);
      if (updateUserProfile.fulfilled.match(resultAction)) {
        toast.success("Profile updated successfully!");
        setOpen(false);
      } else {
        toast.error(resultAction.payload || "Update failed");
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };
  
  return <>
  <ModalWrapper open={open} setOpen={setOpen}>
    <form onSubmit={handleSubmit(handleOnSubmit)} className=''>
      <DialogTitle
        as='h2'
        className='text-base font-bold leading-6 text-gray-900 mb-4'
      >
        {userData?._id ?  "UPDATE PROFILE" : "ADD NEW USER" }
      </DialogTitle>
      <div className='mt-2 flex flex-col gap-6'>
        <TextBox
          placeholder='Full name'
          type='text'
          name='name'
          label='Full Name'
          className='w-full rounded'
          register={register("name", {
            required: "Full name is required!",
          })}
          error={errors.name ? errors.name.message : ""}
        />
        <TextBox
          placeholder='Email Address'
          type='email'
          name='email'
          label='Email Address'
          className='w-full rounded'
          register={register("email", {
            required: "Email Address is required!",
          })}
          error={errors.email ? errors.email.message : ""}
        />
      </div>

      {loading? (
        <div className='py-5'>
          <Loading />
        </div>
      ) : (
        <div className='py-3 mt-4 sm:flex sm:flex-row-reverse'>
          <Button
            type='submit'
            className='bg-blue-600 px-8 text-sm font-semibold text-white hover:bg-blue-700  sm:w-auto'
            label='Submit'
          />

          <Button
            type='button'
            className='bg-white px-5 text-sm font-semibold text-gray-900 sm:w-auto'
            onClick={() => setOpen(false)}
            label='Cancel'
          />
        </div>
      )}
    </form>
  </ModalWrapper>
</>
}

export default AddUsers
