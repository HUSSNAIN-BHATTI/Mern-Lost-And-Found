import React, { useEffect, useState } from "react";
import API from "../utils/api";

export default function Notifications() {
  const [notifications, setNotifications] = useState([]);
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);

  // Fetch notifications
  const fetchNotifications = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      if (!token) return;
      const res = await API.get("/notifications", {
        headers: { Authorization: `Bearer ${token}` }
      });
      setNotifications(res.data);
    } catch (err) {
      // Optionally handle error
    } finally {
      setLoading(false);
    }
  };

  // Fetch on mount
  useEffect(() => {
    fetchNotifications();
  }, []);

  // Fetch when dropdown is opened
  const handleShow = () => {
    setShow((s) => !s);
    if (!show) fetchNotifications();
  };

  // Mark a notification as read
  const markAsRead = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await API.put(`/notifications/${id}/read`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setNotifications((prev) =>
        prev.map((n) => (n._id === id ? { ...n, read: true } : n))
      );
    } catch (err) {
      // Optionally handle error
    }
  };

  // Mark all as read
  const markAllAsRead = async () => {
    for (const n of notifications.filter((n) => !n.read)) {
      await markAsRead(n._id);
    }
  };

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <div className="relative">
      <button
        className="relative"
        onClick={handleShow}
        aria-label="Show notifications"
      >
        <span className="text-white hover:text-blue-600">Notifications</span>
        {unreadCount > 0 && (
          <span className="absolute top-0 right-0 bg-red-500 text-white rounded-full px-1 text-xs">
            {unreadCount}
          </span>
        )}
      </button>
      {show && (
        <div className="absolute right-0 mt-2 w-80 bg-white shadow-lg rounded-lg z-50">
          <div className="p-4 border-b font-bold flex justify-between items-center">
            <span>Notifications</span>
            {unreadCount > 0 && (
              <button
                onClick={markAllAsRead}
                className="text-xs text-blue-600 hover:underline"
              >
                Mark all as read
              </button>
            )}
          </div>
          <ul className="max-h-64 overflow-y-auto">
            {loading ? (
              <li className="p-4 text-gray-500">Loading...</li>
            ) : notifications.length === 0 ? (
              <li className="p-4 text-gray-500">No notifications</li>
            ) : (
              notifications.map((n) => (
                <li
                  key={n._id}
                  className={`p-4 border-b last:border-b-0 flex justify-between items-start ${
                    n.read ? "bg-gray-50" : "bg-blue-50"
                  }`}
                >
                  <div>
                    <div>{n.message}</div>
                    <div className="text-xs text-gray-400">
                      {new Date(n.createdAt).toLocaleString()}
                    </div>
                  </div>
                  {!n.read && (
                    <button
                      onClick={() => markAsRead(n._id)}
                      className="ml-2 text-xs text-blue-600 hover:underline"
                    >
                      Mark as read
                    </button>
                  )}
                </li>
              ))
            )}
          </ul>
        </div>
      )}
    </div>
  );
}