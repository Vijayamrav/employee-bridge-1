import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="w-64 bg-purple-900 text-white min-h-screen p-4">
      <h2 className="text-2xl font-bold">NexaAdmin</h2>
      <nav className="mt-6">
        <Link to="#" className="block py-2 hover:bg-purple-700">🔍 Search</Link>
        <Link to="#" className="block py-2 hover:bg-purple-700">👥 Users</Link>
        <Link to="#" className="block py-2 hover:bg-purple-700">📝 Form</Link>
      </nav>
    </div>
  );
};

export default Sidebar;
