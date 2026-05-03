const Navbar = () => {
  return (
    <nav className="w-full bg-[#1E1E2F] text-white fixed top-0 z-50 shadow-lg">
      <div className="flex justify-between items-center px-8 py-4">
        

        <h1 className="text-3xl font-bold tracking-wide">
          Kotakhuruf
        </h1>


        <div className="flex gap-6 text-lg">
          <button className="hover:text-gray-300">
            Sign Up
          </button>

          <button className="hover:text-gray-300">
            Login
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;