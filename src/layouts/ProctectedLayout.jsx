import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function MainLayout({ children }) {
  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <Navbar />

      {/* THIS FIXES FOOTER VISIBILITY */}
      <div className="flex-1 flex justify-center px-4 py-6">
        {children}
      </div>

      <Footer />
    </div>
  );
}
