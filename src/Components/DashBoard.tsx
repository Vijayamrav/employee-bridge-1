import { useAuth } from "../Components/Contexts/UsernameConetxt";
import Sidebar from "./SideBar";
import EmployeeCard from "./EmployeeCard";
import { useEffect,useState } from "react";
import axios from "axios";


interface Employee {
  name: string;
  role: string;
  age: number;
  gender: string;
  image: string;
}


const Dashboard: React.FC = () => {
  const { username } = useAuth();
  const [employees,setEmployees]=useState<Employee[]>([])
   useEffect(() =>{
   const fetchEmployees=async ()=>{
    try{
    const result= await axios.get("http://localhost:5000/employees")
    const employees=await result.data
    setEmployees(employees)
    
    }
    catch(err){
      console.log("error",err)
    }
   }
  fetchEmployees()
},[])

  return (
    <div className="flex w-screen h-auto bg-white">
      <Sidebar />
      <div className="flex-1 p-6">
        <h1 className="text-xl font-semibold text-[#101828] text-left">Welcome back, {username || "Guest"}</h1>
        <p className="text-left text-base text-[#475467] ">Track, manage, and handle your Employees.</p>
        <div className="grid grid-cols-3 gap-15 mt-6">
          {employees.map((emp, index) => (
            <EmployeeCard key={index} employee={emp} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
