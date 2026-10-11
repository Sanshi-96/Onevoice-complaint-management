import { useEffect, useState } from "react";
import API from "../services/api";

import {
  FaUserShield,
  FaUsers,
  FaPlus,
  FaEnvelope,
  FaPhoneAlt,
  FaClock,
  FaEdit,
  FaTrashAlt,
  FaList,
  FaMapMarkerAlt,
} from "react-icons/fa";

function UserManagementAdmin({ darkMode, panelClass }) {
  const [viewType, setViewType] = useState("authorities");

  const [authorities, setAuthorities] = useState([]);
  const [citizens, setCitizens] = useState([]);

  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [editingItem, setEditingItem] = useState(null);

const [form, setForm] = useState({
  fullName: "",
  email: "",
  phone: "",

  province: "",
  district: "",
  city: "",

  department: "",

  area: "",
  address: "",

  isActive: true,
});

const resetForm = () => {
  setForm({
    fullName: "",
    email: "",
    phone: "",

    province: "",
    district: "",
    city: "",

    department: "",

    area: "",
    address: "",

    isActive: true,
  });
};

  const inputClass = darkMode
    ? "bg-[#2e2e2e] text-white border border-white/20 rounded-xl px-4 py-3 w-full outline-none text-sm"
    : "bg-gray-100 text-dark border border-gray-300 rounded-xl px-4 py-3 w-full outline-none text-sm";

  const activeTabClass = "bg-primary text-white shadow-md";
  const inactiveTabClass = darkMode
    ? "bg-white/10 text-white/70 hover:bg-white/20"
    : "bg-gray-100 text-dark/70 hover:bg-red-50";

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

const openAddModal = () => {
  setEditingItem(null);

  setForm({
    fullName: "",
    email: "",
    phone: "",

    province: "",
    district: "",
    city: "",

    department: "",

    area: "",
    address: "",

    isActive: true,
  });

  setShowModal(true);
};

const openEditModal = (item) => {
  setEditingItem(item);

  setForm({
    fullName: item.fullName || "",
    email: item.email || "",
    phone: item.phone || "",

    province:
      item.authorityArea?.province || "",

    district:
      item.authorityArea?.district || "",

    city:
      item.authorityArea?.city || "",

    area: item.authorityArea?.area || "",
    department:
      item.department || "",

    address:
      item.address || "",

    isActive:
      item.isActive ?? true,
  });

  setShowModal(true);
};

  const handleSave = async (e) => {
  e.preventDefault();

  try {
    setLoading(true);

    const token = localStorage.getItem("token");

    // ================================
    // CREATE AUTHORITY
    // ================================
    if (viewType === "authorities" && !editingItem) {

  const authorityData = {
    fullName: form.fullName,
    email: form.email,
    phone: form.phone,
    province: form.province,
    district: form.district,
    city: form.city,
    department: form.department,
    isActive: form.isActive,
  };

  console.log("🔥 AUTHORITY DATA:", authorityData);

  await API.post(
    "/users/authority",
    authorityData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );

  await fetchAuthorities();

  setShowModal(false);
  setEditingItem(null);
  resetForm();

  alert("Authority account created successfully.");

  return;
}

    // ================================
    // UPDATE AUTHORITY / CITIZEN
    // ================================
    if (editingItem) {
      const updateData = {
        fullName: form.fullName.trim(),
        email: form.email.trim(),
        phone: form.phone.trim(),
      };

      if (viewType === "authorities") {
        updateData.area = form.area.trim();
        updateData.province = form.province.trim();
  updateData.district = form.district.trim();
  updateData.city = form.city.trim();
        updateData.department = form.department.trim();
      }

      await API.patch(
        `/users/${editingItem._id}`,
        updateData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (viewType === "authorities") {
        await fetchAuthorities();
      } else {
        await fetchCitizens();
      }

      setShowModal(false);
      setEditingItem(null);
      resetForm();

      alert("User updated successfully.");

      return;
    }

  } catch (error) {
    console.error(
      "❌ USER SAVE ERROR:",
      error.response?.data || error
    );

    alert(
      error.response?.data?.message ||
      "Unable to save user."
    );

  } finally {
    setLoading(false);
  }
};

const handleUpdateUser = async () => {
  if (!editingItem?._id) {
    alert("No user selected.");
    return;
  }

  try {
    setLoading(true);

    const token = localStorage.getItem("token");

    const response = await API.patch(
      `/users/${editingItem._id}`,
      {
        fullName: form.fullName,
        email: form.email,
        phone: form.phone,

        department: form.department,

        province: form.province,
        district: form.district,
        city: form.city,

        role: editingItem.role,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log(
      "✅ UPDATED USER:",
      response.data.user
    );

    // Reload from MongoDB
    if (viewType === "authorities") {
      await fetchAuthorities();
    } else {
      await fetchCitizens();
    }

    setShowModal(false);
    setEditingItem(null);
    resetForm();

    alert("User updated successfully.");

  } catch (error) {
    console.error(
      "❌ UPDATE ERROR:",
      error.response?.data || error
    );

    alert(
      error.response?.data?.message ||
      "Failed to update user."
    );

  } finally {
    setLoading(false);
  }
};

const handleDelete = async (userId) => {
  const confirmed = window.confirm(
    "Are you sure you want to delete this user? This action cannot be undone."
  );

  if (!confirmed) return;

  try {
    const token = localStorage.getItem("token");

    const response = await API.delete(
      `/users/${userId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log(
      "✅ USER DELETE RESPONSE:",
      response.data
    );

    if (viewType === "authorities") {
      await fetchAuthorities();
    } else {
      await fetchCitizens();
    }

    alert(
      response.data?.message ||
      "User deleted successfully."
    );

  } catch (error) {
    console.error(
      "❌ DELETE USER ERROR:",
      error.response?.data || error
    );

    alert(
      error.response?.data?.message ||
      "Failed to delete user."
    );
  }
};

  const currentTotal =
    viewType === "authorities" ? authorities.length : citizens.length;

    // Fetch Functions

  const fetchAuthorities = async () => {
  try {
    setLoading(true);

    const token = localStorage.getItem("token");

    const res = await API.get("/users/authorities", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    setAuthorities(res.data.authorities);
  } catch (err) {
    console.log(err);
  } finally {
    setLoading(false);
  }
};

const fetchCitizens = async () => {
  try {
    const token = localStorage.getItem("token");

    const res = await API.get("/users/citizens", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log("Citizens Array");
    console.table(res.data.citizens);

    setCitizens(res.data.citizens);

    setCitizens(res.data.citizens || []);
  } catch (error) {
    console.log(error);
  }
};

useEffect(() => {
  fetchAuthorities();
  fetchCitizens();
}, []);

  return (
    <>
      <div className={`${panelClass} rounded-[24px] p-5 shadow-card`}>
        <div className="flex gap-3 mb-5">
          <button
            onClick={() => setViewType("authorities")}
            className={`px-5 py-3 rounded-xl text-sm font-bold flex items-center gap-2 transition ${
              viewType === "authorities" ? activeTabClass : inactiveTabClass
            }`}
          >
            <FaUserShield />
            Authorities
          </button>

          <button
            onClick={() => setViewType("citizens")}
            className={`px-5 py-3 rounded-xl text-sm font-bold flex items-center gap-2 transition ${
              viewType === "citizens" ? activeTabClass : inactiveTabClass
            }`}
          >
            <FaUsers />
            Citizens
          </button>
        </div>

        <div
          className={`rounded-2xl px-5 py-4 mb-5 flex items-center justify-between ${
            darkMode ? "bg-white/10" : "bg-white shadow-md"
          }`}
        >
          <div className="flex items-center gap-3">
            {viewType === "authorities" ? (
              <FaUserShield className="text-primary text-2xl" />
            ) : (
              <FaUsers className="text-primary text-2xl" />
            )}

            <div>
              <h2 className="text-2xl font-black text-primary">
                {viewType === "authorities"
                  ? "Manage Authorities"
                  : "Manage Citizens"}
              </h2>
              <p className="text-xs opacity-60">
                {viewType === "authorities"
                  ? "View, edit, and manage authority accounts."
                  : "View, edit, and manage registered citizen accounts."}
              </p>
            </div>
          </div>

          <button
            onClick={openAddModal}
            className="bg-primary text-white px-5 py-2.5 rounded-xl text-sm font-bold hover:bg-red-800 transition flex items-center gap-2"
          >
            <FaPlus />
            {viewType === "authorities" ? "Add Authority" : "Add Citizen"}
          </button>
        </div>

        <div
          className={`rounded-2xl overflow-hidden border ${
            darkMode ? "border-white/10" : "border-gray-200"
          }`}
        >
          <div className="bg-primary text-white px-5 py-3 flex items-center justify-between">
            <h3 className="font-black text-sm flex items-center gap-2">
              <FaList />
              {viewType === "authorities"
                ? "Authority List"
                : "Citizen Directory"}
            </h3>

            <span className="bg-white text-primary px-3 py-1 rounded-full text-[11px] font-black">
              {currentTotal} Total
            </span>
          </div>

          {viewType === "authorities" ? (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[1050px] text-sm table-fixed">
                <thead>
                  <tr className={`${darkMode ? "bg-white/10 text-white/70" : "bg-gray-100 text-dark/60"} uppercase`}>
                    <th className="w-[22%] py-3 px-4 text-left font-black">Authority</th>
                    <th className="w-[23%] py-3 px-4 text-left font-black">Contact Info</th>
                    <th className="w-[11%] py-3 px-4 text-left font-black">Area</th>
                    <th className="w-[13%] py-3 px-4 text-left font-black">Department</th>
                    <th className="w-[9%] py-3 px-4 text-left font-black">Status</th>
                    <th className="w-[12%] py-3 px-4 text-left font-black">Last Login</th>
                    <th className="w-[10%] py-3 px-4 text-left font-black">Created</th>
                    <th className="w-[10%] py-3 px-4 text-center font-black">Actions</th>
                  </tr>
                </thead>

                <tbody>
  {authorities.map((item) => (
    <tr
      key={item._id}
      className={`border-t ${
        darkMode
          ? "border-white/10 hover:bg-white/5"
          : "border-gray-200 hover:bg-red-50"
      }`}
    >
      <td className="py-3 px-4">
        <div className="flex items-center gap-3 min-w-0">

          <div className="w-10 h-10 rounded-full bg-primary/15 text-primary flex items-center justify-center font-black shrink-0">
            {item.fullName?.charAt(0).toUpperCase()}
          </div>

          <div className="min-w-0">
            <h4 className="font-black truncate">
              {item.fullName}
            </h4>

            <p className="text-xs opacity-60 truncate">
              ID: {item._id.slice(-6)}
            </p>
          </div>

        </div>
      </td>

      <td className="py-3 px-4">

        <p className="flex items-center gap-2 opacity-80 truncate">
          <FaEnvelope />
          {item.email}
        </p>

        <p className="flex items-center gap-2 opacity-80 mt-1 truncate">
          <FaPhoneAlt />
          {item.phone}
        </p>

      </td>

      <td className="py-3 px-4 font-black truncate">
        {item.authorityArea?.area || "-"}
      </td>

      <td className="py-3 px-4 truncate">
        {item.department || "-"}
      </td>

      <td className="py-3 px-4">

        <span
          className={`inline-flex px-3 py-1 rounded-full text-xs font-black ${
            item.isActive
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {item.isActive ? "Active" : "Inactive"}
        </span>

      </td>

      <td className="py-3 px-4">

        <p className="flex items-center gap-2 opacity-70 truncate">
          <FaClock />
          {item.lastLogin
            ? new Date(item.lastLogin).toLocaleString()
            : "Never"}
        </p>

      </td>

      <td className="py-3 px-4 opacity-70 truncate">
        {new Date(item.createdAt).toLocaleDateString()}
      </td>

      <td className="py-3 px-4">
  <div className="flex justify-center gap-2">

    {/* EDIT */}
    <button
      onClick={() => openEditModal(item)}
      className="w-8 h-8 border border-blue-400 text-blue-500 rounded-lg flex items-center justify-center hover:bg-blue-50"
      title="Edit User"
    >
      <FaEdit />
    </button>

    {/* DELETE */}
    <button
      onClick={() => handleDelete(item._id)}
      className="w-8 h-8 border border-primary text-primary rounded-lg flex items-center justify-center hover:bg-red-50"
      title="Delete User"
    >
      <FaTrashAlt />
    </button>

  </div>
</td>
    </tr>
  ))}
</tbody>
              </table>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[950px] text-sm table-fixed">
                <thead>
                  <tr className={`${darkMode ? "bg-white/10 text-white/70" : "bg-gray-100 text-dark/60"} uppercase`}>
                    <th className="w-[22%] py-3 px-4 text-left font-black">Citizen</th>
                    <th className="w-[25%] py-3 px-4 text-left font-black">Contact Info</th>
                    <th className="w-[25%] py-3 px-4 text-left font-black">Type</th>
                    <th className="w-[10%] py-3 px-4 text-left font-black">Status</th>
                    <th className="w-[10%] py-3 px-4 text-left font-black">Created</th>
                    <th className="w-[8%] py-3 px-4 text-center font-black">Actions</th>
                  </tr>
                </thead>

                <tbody>
  {citizens.map((item) => (
    <tr
      key={item._id}
      className={`border-t ${
        darkMode
          ? "border-white/10 hover:bg-white/5"
          : "border-gray-200 hover:bg-red-50"
      }`}
    >
      <td className="py-3 px-4">
        <div className="flex items-center gap-3 min-w-0">

          <div className="w-10 h-10 rounded-full bg-primary/15 text-primary flex items-center justify-center font-black shrink-0">
            {item.fullName?.charAt(0).toUpperCase()}
          </div>

          <div className="min-w-0">
            <h4 className="font-black truncate">
              {item.fullName}
            </h4>

            <p className="text-xs opacity-60 truncate">
              ID: {item._id.slice(-6)}
            </p>
          </div>

        </div>
      </td>

      <td className="py-3 px-4">

        <p className="flex items-center gap-2 opacity-80 truncate">
          <FaEnvelope />
          {item.email}
        </p>

        <p className="flex items-center gap-2 opacity-80 mt-1 truncate">
          <FaPhoneAlt />
          {item.phone}
        </p>

      </td>

      <td className="py-3 px-4">

        <p className="flex items-center gap-2 opacity-80 truncate">
          <FaMapMarkerAlt />
          Citizen Account
        </p>

        <p className="text-xs bg-gray-100 text-dark px-2 py-1 rounded-md inline-block mt-1">
          Registered User
        </p>

      </td>

      <td className="py-3 px-4">

        <span
          className={`inline-flex px-3 py-1 rounded-full text-xs font-black ${
            item.isActive
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {item.isActive ? "Active" : "Inactive"}
        </span>

      </td>

      <td className="py-3 px-4 opacity-70 truncate">
        {new Date(item.createdAt).toLocaleDateString()}
      </td>

      <td className="py-3 px-4">
  <div className="flex justify-center gap-2">

    {/* EDIT */}
    <button
      onClick={() => openEditModal(item)}
      className="w-8 h-8 border border-blue-400 text-blue-500 rounded-lg flex items-center justify-center hover:bg-blue-50"
      title="Edit User"
    >
      <FaEdit />
    </button>

    {/* DELETE */}
    <button
      onClick={() => handleDelete(item._id)}
      className="w-8 h-8 border border-primary text-primary rounded-lg flex items-center justify-center hover:bg-red-50"
      title="Delete User"
    >
      <FaTrashAlt />
    </button>

  </div>
</td>
    </tr>
  ))}
</tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/70 z-[9999] flex items-center justify-center px-4">
          <div className={`w-full max-w-[560px] max-h-[90vh] overflow-y-auto rounded-[26px] p-8 relative ${
            darkMode ? "bg-[#202020] text-white" : "bg-[#e0e0e0] text-dark"
          }`}>
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-5 right-6 text-2xl font-black"
            >
              ×
            </button>

            <h2 className="text-2xl font-black mb-6">
              {editingItem ? "Edit" : "Add New"}{" "}
              {viewType === "authorities" ? "Authority" : "Citizen"}
            </h2>

            <form onSubmit={handleSave} className="space-y-5">

  <input
    name="fullName"
    value={form.fullName}
    onChange={handleChange}
    placeholder="Full Name"
    className={inputClass}
    required
  />

  <input
    type="email"
    name="email"
    value={form.email}
    onChange={handleChange}
    placeholder="Email Address"
    className={inputClass}
    required
  />

  <input
    name="phone"
    value={form.phone}
    onChange={handleChange}
    placeholder="Phone Number"
    className={inputClass}
    required
  />

  {viewType === "authorities" ? (
  <>
    <input
      name="province"
      value={form.province}
      onChange={handleChange}
      placeholder="Province"
      className={inputClass}
      required
    />

    <input
      name="district"
      value={form.district}
      onChange={handleChange}
      placeholder="District"
      className={inputClass}
      required
    />

    <input
      name="city"
      value={form.city}
      onChange={handleChange}
      placeholder="City"
      className={inputClass}
      required
    />

    <input
      name="department"
      value={form.department}
      onChange={handleChange}
      placeholder="Department"
      className={inputClass}
      required
    />
  </>
) : (
    <>
      <input
        name="address"
        value={form.address}
        onChange={handleChange}
        placeholder="Address"
        className={inputClass}
      />

      <input
        name="city"
        value={form.city}
        onChange={handleChange}
        placeholder="City"
        className={inputClass}
      />
    </>
  )}

  <select
    name="isActive"
    value={form.isActive}
    onChange={(e) =>
      setForm({
        ...form,
        isActive: e.target.value === "true",
      })
    }
    className={inputClass}
  >
    <option value="true">Active</option>
    <option value="false">Inactive</option>
  </select>

  <button
    type="submit"
    disabled={loading}
    className="w-full bg-primary text-white py-4 rounded-xl font-black hover:bg-red-800 transition disabled:opacity-60"
  >
    {loading
      ? "Saving..."
      : editingItem
      ? "Update"
      : "Create Account"}
  </button>

</form>
          </div>
        </div>
      )}
    </>
  );
}

export default UserManagementAdmin;