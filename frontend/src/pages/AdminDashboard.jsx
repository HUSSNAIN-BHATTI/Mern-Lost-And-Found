import React, { useEffect, useState } from "react";
import API from "../utils/api";
import { useNavigate } from "react-router-dom";

const statusOptions = ["pending", "approved", "rejected"];

export default function AdminDashboard() {
  const [claims, setClaims] = useState([]);
  const [users, setUsers] = useState([]);
  const [lostItems, setLostItems] = useState([]);
  const [foundItems, setFoundItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const token = localStorage.getItem("adminToken");

  // Helper for API calls with auth
  const fetchWithAuth = async (url, method = "get", data = null) => {
    try {
      const res = await API({
        url,
        method,
        data,
        headers: { Authorization: `Bearer ${token}` },
      });
      return res.data;
    } catch (err) {
      throw err.response?.data?.message || "Server error";
    }
  };

  // Fetch all admin data
  const fetchAll = async () => {
    setLoading(true);
    setError("");
    try {
      const [claimsData, usersData, lostData, foundData] = await Promise.all([
        fetchWithAuth("/admin/claims"),
        fetchWithAuth("/admin/users"),
        fetchWithAuth("/admin/lost"),
        fetchWithAuth("/admin/found"),
      ]);
      setClaims(claimsData);
      setUsers(usersData);
      setLostItems(lostData);
      setFoundItems(foundData);
    } catch (err) {
      setError(err.toString());
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!token) {
      navigate("/admin/login");
      return;
    }
    fetchAll();
    // eslint-disable-next-line
  }, [navigate]);

  // Update claim status
  const handleStatusChange = async (claimId, newStatus) => {
    try {
      await API.put(`/admin/claims/${claimId}`, { status: newStatus }, {
  headers: { Authorization: `Bearer ${token}` }
});
      setClaims((prev) =>
        prev.map((c) => (c._id === claimId ? { ...c, status: newStatus } : c))
      );
    } catch (err) {
      alert("Failed to update status: " + err);
    }
  };

  // Block/unblock user
  const handleBlockUser = async (userId) => {
    try {
      await fetchWithAuth(`/admin/users/${userId}/block`, "put");
      setUsers((prev) =>
        prev.map((u) =>
          u._id === userId ? { ...u, isBlocked: !u.isBlocked } : u
        )
      );
    } catch (err) {
      alert("Failed to update user: " + err);
    }
  };

  // Delete user
  const handleDeleteUser = async (userId) => {
    if (!window.confirm("Delete this user?")) return;
    try {
      await fetchWithAuth(`/admin/users/${userId}`, "delete");
      setUsers((prev) => prev.filter((u) => u._id !== userId));
    } catch (err) {
      alert("Failed to delete user: " + err);
    }
  };

  // Delete lost item
  const handleDeleteLost = async (itemId) => {
    if (!window.confirm("Delete this lost item?")) return;
    try {
      await fetchWithAuth(`/admin/lost/${itemId}`, "delete");
      setLostItems((prev) => prev.filter((i) => i._id !== itemId));
    } catch (err) {
      alert("Failed to delete lost item: " + err);
    }
  };

  // Delete found item
  const handleDeleteFound = async (itemId) => {
    if (!window.confirm("Delete this found item?")) return;
    try {
      await fetchWithAuth(`/admin/found/${itemId}`, "delete");
      setFoundItems((prev) => prev.filter((i) => i._id !== itemId));
    } catch (err) {
      alert("Failed to delete found item: " + err);
    }
  };

  if (loading) return <div className="text-center mt-10">Loading dashboard...</div>;
  if (error) return <div className="text-red-500 text-center mt-10">{error}</div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 p-8">
      <h1 className="text-4xl font-bold mb-8 text-center bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-transparent bg-clip-text">
        Admin Dashboard
      </h1>

      {/* Claims Section */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">Claims</h2>
        <div className="overflow-x-auto rounded-lg shadow">
          <table className="min-w-full divide-y divide-gray-200 bg-white">
            <thead className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-bold text-white uppercase tracking-wider">User</th>
                <th className="px-4 py-3 text-left text-xs font-bold text-white uppercase tracking-wider">Lost Item</th>
                <th className="px-4 py-3 text-left text-xs font-bold text-white uppercase tracking-wider">Found Item</th>
                <th className="px-4 py-3 text-left text-xs font-bold text-white uppercase tracking-wider">Proof</th>
                <th className="px-4 py-3 text-left text-xs font-bold text-white uppercase tracking-wider">Status</th>
                <th className="px-4 py-3 text-left text-xs font-bold text-white uppercase tracking-wider">Submitted</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {claims.length > 0 ? (
                claims.map((claim, idx) => (
                  <tr
                    key={claim._id}
                    className={idx % 2 === 0 ? "bg-gray-50 hover:bg-blue-50" : "bg-white hover:bg-blue-50"}
                  >
                    <td className="px-4 py-3 align-top">
                      {claim.user ? (
                        <>
                          <div className="font-medium">{claim.user.name}</div>
                          <div className="text-xs text-gray-500">{claim.user.email}</div>
                        </>
                      ) : (
                        <span className="text-gray-400 italic">Unknown User</span>
                      )}
                    </td>
                    <td className="px-4 py-3 align-top">
                      <div className="font-medium">{claim.lostItem?.itemName}</div>
                      <div className="text-xs text-gray-500">{claim.lostItem?.description}</div>
                    </td>
                    <td className="px-4 py-3 align-top">
                      <div className="font-medium">{claim.foundItem?.itemName}</div>
                      <div className="text-xs text-gray-500">{claim.foundItem?.description}</div>
                    </td>
                    <td className="px-4 py-3 align-top">
                      {claim.document ? (
                        <a
                          href={`http://localhost:5000/uploads/${claim.document}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 underline"
                        >
                          View
                        </a>
                      ) : (
                        <span className="text-gray-400">No Proof</span>
                      )}
                    </td>
                    <td className="px-4 py-3 align-top">
                      <select
                        value={claim.status}
                        onChange={(e) => handleStatusChange(claim._id, e.target.value)}
                        className={`border rounded px-2 py-1 text-sm ${claim.status === "approved"
                            ? "bg-green-100 text-green-700"
                            : claim.status === "rejected"
                              ? "bg-red-100 text-red-700"
                              : "bg-yellow-100 text-yellow-700"
                          }`}
                      >
                        {statusOptions.map((opt) => (
                          <option key={opt} value={opt}>
                            {opt.charAt(0).toUpperCase() + opt.slice(1)}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td className="px-4 py-3 align-top text-xs text-gray-500">
                      {new Date(claim.createdAt).toLocaleString()}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="text-center p-4 text-gray-400">
                    No claims available.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>

      {/* Users Section */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">Users</h2>
        <div className="overflow-x-auto rounded-lg shadow">
          <table className="min-w-full divide-y divide-gray-200 bg-white">
            <thead className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-bold text-white uppercase tracking-wider">Name</th>
                <th className="px-4 py-3 text-left text-xs font-bold text-white uppercase tracking-wider">Email</th>
                <th className="px-4 py-3 text-left text-xs font-bold text-white uppercase tracking-wider">Status</th>
                <th className="px-4 py-3 text-left text-xs font-bold text-white uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {users.length > 0 ? (
                users.map((user, idx) => (
                  <tr
                    key={user._id}
                    className={idx % 2 === 0 ? "bg-gray-50 hover:bg-blue-50" : "bg-white hover:bg-blue-50"}
                  >
                    <td className="px-4 py-3">{user.name}</td>
                    <td className="px-4 py-3">{user.email}</td>
                    <td className="px-4 py-3">
                      {user.isBlocked ? (
                        <span className="text-red-500">Blocked</span>
                      ) : (
                        <span className="text-green-600">Active</span>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      <button
                        onClick={() => handleBlockUser(user._id)}
                        className={`px-2 py-1 rounded mr-2 ${user.isBlocked
                            ? "bg-green-500 text-white"
                            : "bg-red-500 text-white"
                          }`}
                      >
                        {user.isBlocked ? "Unblock" : "Block"}
                      </button>
                      <button
                        onClick={() => handleDeleteUser(user._id)}
                        className="px-2 py-1 rounded bg-gray-300 text-gray-700"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="text-center p-4 text-gray-400">
                    No users found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>

      {/* Lost Items Section */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">Lost Items</h2>
        <div className="overflow-x-auto rounded-lg shadow">
          <table className="min-w-full divide-y divide-gray-200 bg-white">
            <thead className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-bold text-white uppercase tracking-wider">Item Name</th>
                <th className="px-4 py-3 text-left text-xs font-bold text-white uppercase tracking-wider">Description</th>
                <th className="px-4 py-3 text-left text-xs font-bold text-white uppercase tracking-wider">Last Seen Location</th>
                <th className="px-4 py-3 text-left text-xs font-bold text-white uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {lostItems.length > 0 ? (
                lostItems.map((item, idx) => (
                  <tr
                    key={item._id}
                    className={idx % 2 === 0 ? "bg-gray-50 hover:bg-blue-50" : "bg-white hover:bg-blue-50"}
                  >
                    <td className="px-4 py-3">{item.itemName}</td>
                    <td className="px-4 py-3">{item.description}</td>
                    <td className="px-4 py-3">{item.lastSeenLocation}</td>
                    <td className="px-4 py-3">
                      <button
                        onClick={() => handleDeleteLost(item._id)}
                        className="px-2 py-1 rounded bg-red-500 text-white"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="text-center p-4 text-gray-400">
                    No lost items found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>

      {/* Found Items Section */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">Found Items</h2>
        <div className="overflow-x-auto rounded-lg shadow">
          <table className="min-w-full divide-y divide-gray-200 bg-white">
            <thead className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-bold text-white uppercase tracking-wider">Item Name</th>
                <th className="px-4 py-3 text-left text-xs font-bold text-white uppercase tracking-wider">Description</th>
                <th className="px-4 py-3 text-left text-xs font-bold text-white uppercase tracking-wider">Found Location</th>
                <th className="px-4 py-3 text-left text-xs font-bold text-white uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {foundItems.length > 0 ? (
                foundItems.map((item, idx) => (
                  <tr
                    key={item._id}
                    className={idx % 2 === 0 ? "bg-gray-50 hover:bg-blue-50" : "bg-white hover:bg-blue-50"}
                  >
                    <td className="px-4 py-3">{item.itemName}</td>
                    <td className="px-4 py-3">{item.description}</td>
                    <td className="px-4 py-3">{item.foundLocation}</td>
                    <td className="px-4 py-3">
                      <button
                        onClick={() => handleDeleteFound(item._id)}
                        className="px-2 py-1 rounded bg-red-500 text-white"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="text-center p-4 text-gray-400">
                    No found items found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}