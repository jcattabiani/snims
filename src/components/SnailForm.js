import React from 'react';
import { useForm } from 'react-hook-form';

const SnailForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = (data) => {
    console.log(data); // Replace with your form submission logic
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          {...register('name', { required: 'This field is required.' })}
          maxLength={20}
        />
        {errors.name && <span>{errors.name.message}</span>}
      </div>
      <div>
        <label htmlFor="color">Color:</label>
        <input
          type="color"
          id="color"
          {...register('color', { required: 'This field is required.' })}
        />
        {errors.color && <span>{errors.color.message}</span>}
      </div>
      <div>
        <label htmlFor="personality">Personality:</label>
        <input
          type="text"
          id="personality"
          {...register('personality', { required: 'This field is required.' })}
        />
        {errors.personality && <span>{errors.personality.message}</span>}
      </div>
      <div>
        <label htmlFor="backstory">Backstory:</label>
        <textarea
          id="backstory"
          {...register('backstory', { required: 'This field is required.' })}
          maxLength={150}
        />
        {errors.backstory && <span>{errors.backstory.message}</span>}
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default SnailForm;