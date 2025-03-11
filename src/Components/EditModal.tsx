import axios from "axios";
import React, { useState, useEffect } from "react";

const EditModal = ({ isOpen, onClose, employee }: { isOpen: boolean; onClose: () => void; employee: any }) => {
  if (!isOpen) return null;

  const [formData, setFormData] = useState({
    name: "",
    profession: "",
    dob: "",
    gender: "",
  });

  useEffect(() => {
    if (employee) {
      setFormData({
        name: employee.name,
        profession: employee.profession || "",
        dob: employee.dob || "",
        gender: employee.gender || "",
      });
    }
  }, [employee]);

  const calculateAge = (dob: string) => {
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--; 
    }
    
    return age;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    if (name === "dob") {
      const calculatedAge = calculateAge(value);
      setFormData({ ...formData, dob: value, age: calculatedAge });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async () => {
    const updatedData = {
      ...formData,
      age: calculateAge(formData.dob), // Ensure age is sent dynamically
    };

    try {
      const response = await axios.patch(`http://localhost:5000/employees/${employee.id}`, updatedData);

      if (response.status === 200) {
        onClose();
      }
    } catch (error) {
      console.error("Update failed", error);
      alert("Update failed. Please try again.");
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/30 backdrop-blur-md z-50">
      <div className="bg-white p-6 rounded-xl shadow-lg w-[400px]">
        
        <div className="flex justify-between items-center border-b pb-2">
          <h2 className="text-xl font-bold text-gray-900">Edit Employee</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-800 text-lg cursor-pointer">
            ✖
          </button>
        </div>

        <div className="mt-4">
          <label className="block text-sm text-gray-600">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter Full Name"
            className="w-full p-2 border rounded-lg mt-1"
          />

          <label className="block mt-3 text-sm text-gray-600">Profession</label>
          <select
            name="profession"
            value={formData.profession}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg mt-1"
          >
            <option>Select Profession</option>
            <option value="Frontend Developer">Frontend Developer</option>
            <option value="Backend Developer">Backend Developer</option>
            <option value="Full Stack Developer">Full Stack Developer</option>
            <option value="UI/UX Designer">UI/UX Designer</option>
            <option value="Project Manager">Project Manager</option>
          </select>

          {/* DOB & Gender in the Same Line */}
          <div className="flex gap-3 mt-3">
            <div className="w-1/2">
              <label className="block text-sm text-gray-600">DOB</label>
              <input
                type="date"
                name="dob"
                value={formData.dob}
                onChange={handleChange}
                className="w-full p-2 border rounded-lg mt-1"
              />
            </div>
            <div className="w-1/2">
              <label className="block text-sm text-gray-600">Gender</label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className="w-full p-2 border rounded-lg mt-1"
              >
                <option>Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>
          </div>

          <button onClick={handleSubmit} className="w-full bg-[#4F378B] text-white mt-4 p-2 rounded-lg">
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditModal;
