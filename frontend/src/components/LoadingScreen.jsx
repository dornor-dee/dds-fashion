import { motion } from "framer-motion";

export default function LoadingScreen() {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={{ duration: 1.2, delay: 1.5 }}
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black"
    >
      <div className="text-center">
        <img
          src="/images/dds-fashion-logo.png"
          alt="DDS Fashion"
          className="mx-auto h-40 w-auto object-contain"
        />
        <p className="mt-6 text-sm font-black uppercase tracking-[0.5em] text-yellow-400">
          DDS Fashion
        </p>
      </div>
    </motion.div>
  );
}