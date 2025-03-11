import React, { useState } from "react";
import EditModal from "./EditModal";

const EmployeeCard = ({ employee }: { employee: any }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState<any>(null);

  const openEditModal = () => {
    setSelectedEmployee(employee);
    setIsModalOpen(true);
  };

  return (
    <div className="relative">
      
      <div className={`transition-all duration-300 ${isModalOpen ? "blur-md" : ""}`}>
        <div className="bg-white shadow-lg p-6 rounded-xl border border-gray-200 w-80 h-[280px]">
          <div className="w-full h-36 flex items-center justify-center">
            <img
              src={employee.image}
              alt={employee.name}
              className="w-full h-[145px] object-cover border-4 border-white shadow-md rounded-lg"
            />
          </div>

          <div className="flex items-center justify-between mt-3">
            <div>
              <h3 className="text-left text-2xl font-bold text-[#282866] pt-2">{employee.name}</h3>
              <p className="text-left text-sm text-[#303050]">{employee.role}</p>
              <p className="text-left text-gray-500">{employee.age} Years, {employee.gender}</p>
            </div>

            <div className="flex space-x-2">
              <button className="mb-6 cursor-pointer" onClick={openEditModal}>
                <img src="/assets/image-Photoroom.png" alt="Edit" className="w-4 h-4" />
              </button>
              <button className="mb-6 cursor-pointer">
                <img src="/assets/deleteicon.png" alt="Delete" className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

     
      <EditModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} employee={selectedEmployee} />
    </div>
  );
};

export default EmployeeCard;
