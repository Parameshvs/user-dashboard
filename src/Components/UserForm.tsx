import React from 'react';
import { useForm } from 'react-hook-form';
import { useUserContext } from '../context/UserContext';
import { User } from '../types/types';

const UserForm: React.FC = () => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm<User>();
  const { addUser } = useUserContext();

  const onSubmit = (data: User) => {
    const newUser = { ...data, id: Date.now() };
    addUser(newUser);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label>Name</label>
        <input {...register('name', { required: 'Name is required' })} />
        {errors.name && <span>{errors.name.message}</span>}
      </div>

      <div>
        <label>Email</label>
        <input {...register('email', { required: 'Email is required' })} />
        {errors.email && <span>{errors.email.message}</span>}
      </div>

      <div>
        <label>Role</label>
        <select {...register('role', { required: 'Role is required' })}>
          <option value="">Select Role</option>  
          <option value="admin">Admin</option>
          <option value="user">User</option>
        </select>
        {errors.role && <span>{errors.role.message}</span>}
      </div>

      <button type="submit">Add User</button>
    </form>
  );
};

export default UserForm;
