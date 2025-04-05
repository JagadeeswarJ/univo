// src/components/Header.jsx
export default function Header() {
    return (
      <header className="bg-white shadow-md fixed w-full top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-blue-600">Campus Connect</h1>
          <nav className="space-x-6 hidden md:block">
            <a href="#features" className="text-gray-700 hover:text-blue-600">Features</a>
            <a href="#events" className="text-gray-700 hover:text-blue-600">Events</a>
            <a href="#contact" className="text-gray-700 hover:text-blue-600">Contact</a>
          </nav>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
            Sign In
          </button>
        </div>
      </header>
    );
  }
  