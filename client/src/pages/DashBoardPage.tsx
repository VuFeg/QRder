import { AnimatePresence, motion } from "framer-motion";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { FiBell } from "react-icons/fi";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const Dashboard = () => {
  const chartData = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
      {
        label: "Revenue",
        data: [12000, 19000, 15000, 25000, 22000, 30000, 28000],
        borderColor: "rgb(247, 37, 133)",
        tension: 0.4,
      },
    ],
  };

  const topSellingItems = [
    { name: "Margherita Pizza", sales: 145, revenue: 2175 },
    { name: "Chicken Burger", sales: 120, revenue: 1440 },
    { name: "Caesar Salad", sales: 98, revenue: 980 },
    { name: "Pasta Carbonara", sales: 87, revenue: 1305 },
  ];

  return (
    <div className="min-h-screen bg-background flex">
      <AnimatePresence>
        <motion.div
          //   initial={{
          //     width: isSidebarOpen ? "calc(100% - 240px)" : "calc(100% - 80px)",
          //   }}
          //   animate={{
          //     width: isSidebarOpen ? "calc(100% - 240px)" : "calc(100% - 80px)",
          //   }}
          transition={{ duration: 0.5 }}
          className={`flex-1 p-8`}
        >
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold text-foreground">
              Dashboard Overview
            </h2>
            <div className="flex items-center gap-4">
              <motion.button
                whileTap={{ scale: 0.95 }}
                className="p-2 rounded-full hover:bg-secondary relative"
              >
                <FiBell />
                <span className="absolute top-0 right-0 w-2 h-2 bg-destructive rounded-full"></span>
              </motion.button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {[
              { label: "Total Orders", value: "486", change: "+12.5%" },
              { label: "Total Revenue", value: "$8,459", change: "+8.2%" },
              { label: "Average Order Value", value: "$17.4", change: "-2.4%" },
              { label: "Active Tables", value: "12/15", change: "80%" },
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-card p-6 rounded-lg shadow-sm"
              >
                <h3 className="text-muted-foreground mb-2">{stat.label}</h3>
                <div className="flex items-end justify-between">
                  <span className="text-2xl font-bold text-foreground">
                    {stat.value}
                  </span>
                  <span
                    className={`text-sm ${
                      stat.change.startsWith("+")
                        ? "text-chart-2"
                        : "text-destructive"
                    }`}
                  >
                    {stat.change}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="lg:col-span-2 bg-card p-6 rounded-lg shadow-sm"
            >
              <h3 className="text-lg font-semibold mb-4">Revenue Trend</h3>
              <Line data={chartData} options={{ responsive: true }} />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-card p-6 rounded-lg shadow-sm"
            >
              <h3 className="text-lg font-semibold mb-4">Top Selling Items</h3>
              <div className="space-y-4">
                {topSellingItems.map((item, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center"
                  >
                    <div>
                      <p className="font-medium text-foreground">{item.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {item.sales} orders
                      </p>
                    </div>
                    <p className="text-primary font-semibold">
                      ${item.revenue}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default Dashboard;
