import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import { SliderPicker } from 'react-color';

const SnailForm = ({ onClose, onSnailSubmit }) => {
  const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm();
  const [personalityFields, setPersonalityFields] = useState([]);
  const [color, setColor] = useState('#bf4040');

  const addPersonalityField = () => {
    console.log(color)
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
    setColor(color.hex); // Update the color state
  };

  const onSubmit = (data) => {

    const { name, backstory } = data;
    const personalityTraits = personalityFields.map((field) => field.value);
    const formData = {
      name,
      backstory,
      color,
      personality: personalityTraits,
    };

    onSnailSubmit(formData);
    onClose();

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
              color={watch('color') || color}
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
                color: watch('color') || color, // Set the initial color value
                borderColor: watch('color') || color, // Set the initial color value
                outlineColor: watch('color') || color, // Set the initial color value
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
            style={{ backgroundColor: watch('color') || color }} // Set the initial color value
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