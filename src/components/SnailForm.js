import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import { SliderPicker } from 'react-color';

const SnailForm = ({ onClose }) => {
  const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm();
  const [personalityFields, setPersonalityFields] = useState([]);

  const addPersonalityField = () => {
    const newField = {
      key: Date.now().toString(), // Generate a unique key for the field
      value: ''
    };
    setPersonalityFields([...personalityFields, newField]);
  };

  const removePersonalityField = (key) => {
    setPersonalityFields((prevFields) => {
      const updatedFields = prevFields.filter((field) => field.key !== key);
      return updatedFields;
    });
  };

  const handleColorChange = (color) => {
    setValue('color', color.hex);
  };

  const onSubmit = (data) => {
  const { name, backstory, color } = data;

  // Retrieve personality traits from the form fields
  const personalityTraits = personalityFields.map((field) => field.value);

  const formData = {
    name,
    backstory,
    color,
    personality: personalityTraits,
  };

  console.log(formData);

  // Replace with form submission logic
};

  return (
    <div>
      <h2 className="form-title">Create New Snail</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="snail-form">
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <TextField
            id="name"
            {...register('name', { required: 'This field is required.' })}
            variant="outlined"
            size="small"
            className="form-input"
          />
          {errors.name && <span className="form-error">{errors.name.message}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="color">Color:</label>
          <div className="color-picker-container">
            <SliderPicker
              color={watch('color')}
              onChange={handleColorChange}
              className="form-color-picker"
            />
          </div>
          {errors.color && <span className="form-error">{errors.color.message}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="backstory">Backstory:</label>
          <TextField
            id="backstory"
            {...register('backstory', { required: 'This field is required.' })}
            variant="outlined"
            size="small"
            className="form-input"
          />
          {errors.backstory && <span className="form-error">{errors.backstory.message}</span>}
        </div>

        {personalityFields.length > 0 && (
          <div className="form-group">
            <h3 className="personality-heading" style={{ textAlign: 'center', margin: '0 auto' }}>
             Personality:
            </h3>
          </div>
        )}

        {personalityFields.map((field) => (
          <div className="form-group" key={field.key}>
            <div className="personality-field">
              <TextField
                {...register(`personality${field.key}`, { required: 'This field is required.' })}
                variant="outlined"
                size="small"
                className="form-input"
                onChange={(e) => {
                  field.value = e.target.value; // Update the value of the field
                }}
              />
              {personalityFields.length > 1 && (
                <IconButton onClick={() => removePersonalityField(field.key)}>
                  <DeleteIcon />
                </IconButton>
              )}
            </div>
            {errors[`personality${field.key}`] && (
              <span className="form-error">{errors[`personality${field.key}`].message}</span>
            )}
          </div>
        ))}

        {personalityFields.length < 5 && (
          <div className="form-group">
            <Button
              variant="outlined"
              fullWidth
              onClick={addPersonalityField}
              style={{
                color: watch('color'),
                borderColor: watch('color'),
                outlineColor: watch('color'),
              }}
            >
              Add Personality Trait
            </Button>
          </div>
        )}

        <div className="button-group">
          <Button
            type="submit"
            variant="contained"
            style={{ backgroundColor: watch('color') }}
            color="primary"
          >
            Submit
          </Button>
          <Button
            type="button"
            variant="contained"
            style={{ backgroundColor: '#333333' }}
            color="secondary"
            onClick={onClose}
          >
            Close
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SnailForm;