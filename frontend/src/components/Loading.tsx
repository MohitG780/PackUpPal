import React from "react";
import { Loader2, PlaneTakeoff } from "lucide-react";

const Loading = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-blue-100 to-indigo-200 dark:from-gray-900 dark:to-gray-800 transition-colors">
      <div className="animate-spin mb-6">
        <Loader2 className="w-12 h-12 text-indigo-600 dark:text-white" />
      </div>
      <div className="flex items-center gap-2 text-xl font-semibold text-indigo-700 dark:text-white">
        <PlaneTakeoff className="w-6 h-6" />
        <span>Planning your next adventure...</span>
      </div>
      <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">
        Fetching destinations and trip ideas for you
      </p>
    </div>
  );
};

export default Loading;
