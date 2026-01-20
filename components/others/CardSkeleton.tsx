"use client";
import { motion } from "framer-motion";

function JobCardSkeleton() {
  return (
    <motion.div
      initial={{ y: 100, opacity: 0.5 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{
        delay: 0.1,
        duration: 0.8,
        ease: "easeOut",
      }}
      className="bg-[#172931] max-w-xs h-full p-3 rounded-md animate-pulse"
    >
      <div className="relative bg-[#22363D] rounded-xl h-full shadow-md overflow-hidden max-w-xs">
        <div className="flex flex-col h-full p-4 gap-3">
          {/* Company logo + name */}
          <div className="flex justify-end items-center gap-2">
            <div className="w-10 h-10 bg-gray-600 rounded-full" />
            <div className="w-20 h-3 bg-gray-600 rounded" />
          </div>

          {/* Job Title + Date */}
          <div className="flex justify-between items-center">
            <div className="w-32 h-4 bg-gray-600 rounded" />
            <div className="w-16 h-3 bg-gray-600 rounded" />
          </div>

          {/* Description */}
          <div className="space-y-2">
            <div className="w-full h-3 bg-gray-600 rounded" />
            <div className="w-4/5 h-3 bg-gray-600 rounded" />
          </div>

          {/* Location */}
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 bg-gray-500 rounded-full" />
            <div className="w-24 h-3 bg-gray-600 rounded" />
          </div>

          {/* Job Type + Applied */}
          <div className="flex gap-2 justify-between items-center text-xs font-medium">
            <div className="w-16 h-6 bg-gray-600 rounded" />
            <div className="w-16 h-4 bg-gray-600 rounded" />
          </div>

          {/* Required Skills */}
          <div className="flex flex-wrap gap-2 mt-2 mb-2 pb-2">
            <div className="w-12 h-5 bg-gray-600 rounded" />
            <div className="w-14 h-5 bg-gray-600 rounded" />
            <div className="w-10 h-5 bg-gray-600 rounded" />
          </div>

          {/* Education / Experience / Deadline */}
          <div className="space-y-2">
            <div className="w-28 h-3 bg-gray-600 rounded" />
            <div className="w-32 h-3 bg-gray-600 rounded" />
            <div className="w-24 h-3 bg-gray-600 rounded" />
          </div>

          {/* Apply Button */}
          <div className="mt-auto w-full h-10 bg-gray-600 rounded" />
        </div>
      </div>
    </motion.div>
  );
}

export default JobCardSkeleton;
