import { FaHome, FaUtensils } from "react-icons/fa";
import { motion } from "framer-motion";

const NotFoundPage = () => {
  const handleReportIssue = () => {
    console.log("Issue reported");
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-2xl w-full text-center space-y-8 bg-card p-8 rounded-lg shadow-lg"
      >
        <div className="relative">
          <h1 className="text-[150px] font-bold text-primary opacity-20 select-none">
            404
          </h1>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <FaUtensils className="text-6xl text-accent" aria-hidden="true" />
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-3xl font-bold text-foreground">
            Oops! Page Not Found
          </h2>
          <p className="text-lg text-muted-foreground">
            The page you're looking for seems to have gone on a little vacation.
            Perhaps it's taste-testing our new menu items!
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-md font-semibold transition-colors hover:bg-opacity-90"
            onClick={() => (window.location.href = "/")}
          >
            <FaHome className="text-xl" aria-hidden="true" />
            Return to Home
          </motion.button>

          <button
            onClick={handleReportIssue}
            className="text-accent hover:text-opacity-80 underline transition-colors"
          >
            Report this issue
          </button>
        </div>

        <div className="pt-8 border-t border-border">
          <p className="text-sm text-muted-foreground">
            If you believe this is a mistake, please contact our support team.
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default NotFoundPage;
