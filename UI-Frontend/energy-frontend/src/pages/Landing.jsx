import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function Landing() {
  return (
    <div className="min-h-screen bg-gradient-to-br
      from-green-100 via-white to-blue-100
      dark:from-gray-900 dark:via-gray-800 dark:to-gray-900
      text-gray-900 dark:text-white">

      {/* HERO SECTION */}
      <div className="max-w-7xl mx-auto px-6 py-24 text-center">

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-6xl font-extrabold mb-6"
        >
          ⚡ Smart Energy Usage Tracker
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-10"
        >
          Track electricity usage, predict bills, earn rewards, and save energy
          with intelligent insights — all in one dashboard.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="flex justify-center gap-6"
        >
          <Link
            to="/login"
            className="px-8 py-3 rounded-lg bg-green-600 text-white
              hover:bg-green-700 transition shadow-lg"
          >
            Login
          </Link>

          <Link
            to="/register"
            className="px-8 py-3 rounded-lg border border-green-600
              text-green-600 dark:text-green-400
              hover:bg-green-600 hover:text-white transition shadow-lg"
          >
            Register
          </Link>
        </motion.div>
      </div>

      {/* FEATURES SECTION */}
      <div className="max-w-7xl mx-auto px-6 pb-20 grid
        grid-cols-1 md:grid-cols-3 gap-8">

        {[
          {
            title: "📊 Usage Analytics",
            desc: "Visualize daily energy consumption with interactive charts."
          },
          {
            title: "🎁 Reward Points",
            desc: "Earn points for saving energy and consistent tracking."
          },
          {
            title: "💡 Smart Tips",
            desc: "Get daily energy-saving tips powered by insights."
          }
        ].map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.2 }}
            viewport={{ once: true }}
            className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow hover:shadow-xl transition"
          >
            <h3 className="text-xl font-semibold mb-3">
              {item.title}
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              {item.desc}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
