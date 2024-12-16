import React, { useState } from 'react';
import { useUserContext } from '../context/UserContext';
import { User } from '../types/types';

const UserTable: React.FC = () => {
  const { users, deleteUser, updateUser } = useUserContext();
  const [editUserId, setEditUserId] = useState<number | null>(null);
  const [editUserData, setEditUserData] = useState<Partial<User>>({});
  const [currentPage, setCurrentPage] = useState(1);
  const [sortKey, setSortKey] = useState<keyof User | null>(null);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  const usersPerPage = 5;
  const totalPages = Math.ceil(users.length / usersPerPage);

  const handleEditClick = (user: User) => {
    setEditUserId(user.id);
    setEditUserData(user);
  };

  const handleSaveClick = () => {
    if (editUserData.id) {
      updateUser(editUserData as User);
    }
    setEditUserId(null);
    setEditUserData({});
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setEditUserData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSort = (key: keyof User) => {
    if (key === sortKey) {
      setSortDirection((prev) => (prev === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortKey(key);
      setSortDirection('asc');
    }
  };

  const sortedUsers = [...users].sort((a, b) => {
    if (!sortKey) return 0;
    if (a[sortKey] < b[sortKey]) return sortDirection === 'asc' ? -1 : 1;
    if (a[sortKey] > b[sortKey]) return sortDirection === 'asc' ? 1 : -1;
    return 0;
  });

  const paginatedUsers = sortedUsers.slice(
    (currentPage - 1) * usersPerPage,
    currentPage * usersPerPage
  );

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  return (
    <div>
      <table className="user-table">
        <thead>
          <tr>
            <th onClick={() => handleSort('id')}>ID</th>
            <th onClick={() => handleSort('name')}>
              Name
              {sortKey === 'name' && (sortDirection === 'asc' ? ' ↑' : ' ↓')}
            </th>
            <th onClick={() => handleSort('email')}>Email</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {paginatedUsers.map((user) => (
            <tr key={user.id}>
              {editUserId === user.id ? (
                <>
                  <td>{user.id}</td>
                  <td>
                    <input
                      name="name"
                      value={editUserData.name || ''}
                      onChange={handleChange}
                    />
                  </td>
                  <td>
                    <input
                      name="email"
                      value={editUserData.email || ''}
                      onChange={handleChange}
                    />
                  </td>
                  <td>
                    <select
                      name="role"
                      value={editUserData.role || 'user'}
                      onChange={handleChange}
                      className="role-select"
                    >
                      <option value="admin">Admin</option>
                      <option value="user">User</option>
                    </select>
                  </td>
                  <td>
                    <button className="save-button" onClick={handleSaveClick}>Save</button>
                    <button className="cancel-button" onClick={() => setEditUserId(null)}>Cancel</button>
                  </td>
                </>
              ) : (
                <>
                  <td>{user.id}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.role}</td>
                  <td>
                    <button className="edit-button" onClick={() => handleEditClick(user)}>Edit</button>
                    <button className="delete-button" onClick={() => deleteUser(user.id)}>Delete</button>
                  </td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>

      <div className="pagination">
        <button
          className="page-button"
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <button
          className="page-button"
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default UserTable;
