/** @format */

import { useEffect, useState } from "react";

export default function AdminTab() {
  const [users, setUsers] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [selectedUser, setSelectedUser] = useState<string | null>(null);
  const [newPassword, setNewPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const fetchUsers = async () => {
    const token = localStorage.getItem("token") || "";
    try {
      const response = await fetch("/api/admin", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      if (response.ok) {
        setUsers(data.admins);
      } else {
        setError(data.error || "Failed to fetch users");
      }
    } catch (error) {
      setError("Error fetching users");
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleAddAdmin = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem("token") || "";
    try {
      const response = await fetch("/api/admin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ username, password, role: "admin" }),
      });

      const data = await response.json();
      if (response.ok) {
        setSuccessMessage(data.message);
        setError(null);
        setUsername("");
        setPassword("");
        fetchUsers();
      } else {
        setError(data.error);
        setSuccessMessage(null);
      }
    } catch (error) {
      setError("Failed to add admin");
      setSuccessMessage(null);
    }
  };

  const handleDeleteAdmin = async (userToDelete: string) => {
    if (!confirm(`Are you sure you want to delete admin "${userToDelete}"?`)) {
      return;
    }

    const token = localStorage.getItem("token") || "";
    try {
      const response = await fetch("/api/admin", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ username: userToDelete }),
      });

      const data = await response.json();
      if (response.ok) {
        setSuccessMessage(data.message);
        setError(null);
        fetchUsers();
      } else {
        setError(data.error);
        setSuccessMessage(null);
      }
    } catch (error) {
      setError("Failed to delete admin");
      setSuccessMessage(null);
    }
  };

  const handleUpdatePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedUser) return;

    const token = localStorage.getItem("token") || "";
    try {
      const response = await fetch("/api/admin", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          username: selectedUser,
          newPassword,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        setSuccessMessage(data.message);
        setError(null);
        setNewPassword("");
        setSelectedUser(null);
      } else {
        setError(data.error);
        setSuccessMessage(null);
      }
    } catch (error) {
      setError("Failed to update password");
      setSuccessMessage(null);
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Admin Management</h1>
      <p className="text-gray-600 mb-8">
        Admin Management feature is accessible only to superadmin.
      </p>

      {/* Add Admin Form */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">Add Admin</h2>
        <form onSubmit={handleAddAdmin} className="space-y-4">
          <div>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>
          <div>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Add Admin
          </button>
        </form>
      </div>

      {/* Update Password Modal */}
      {selectedUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-xl font-semibold mb-4">
              Update Password for {selectedUser}
            </h3>
            <form onSubmit={handleUpdatePassword} className="space-y-4">
              <input
                type="password"
                placeholder="New Password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
              <div className="flex gap-4">
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Update
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedUser(null)}
                  className="flex-1 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Users List */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">All Users</h2>
        <div className="space-y-4">
          {users.map((user: any) => (
            <div
              key={user.id}
              className="flex items-center justify-between p-4 border rounded-lg"
            >
              <div>
                <span className="font-semibold">{user.username}</span>
                <span className="ml-2 text-gray-600">({user.role})</span>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setSelectedUser(user.username)}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Update Password
                </button>
                <button
                  onClick={() => handleDeleteAdmin(user.username)}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Messages */}
      {error && (
        <div className="mt-4 p-4 bg-red-100 text-red-700 rounded-lg">
          {error}
        </div>
      )}
      {successMessage && (
        <div className="mt-4 p-4 bg-green-100 text-green-700 rounded-lg">
          {successMessage}
        </div>
      )}
    </div>
  );
}
