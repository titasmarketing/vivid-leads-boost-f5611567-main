import { motion } from "framer-motion";

const WHATSAPP_URL = "https://tintim.link/whatsapp/27ec1702-33f6-457f-a432-2e2a2f8a6c1c/f07ca4cf-f49c-4dd7-9f01-2a0c6403c8b9";

const FloatingWhatsApp = () => {
  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="fixed bottom-6 right-6 z-50 flex items-center gap-3 group"
    >
      {/* Tooltip on hover */}
      <span className="hidden sm:inline-block opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0 transition-all duration-300 bg-zinc-900/90 text-white text-xs font-semibold px-3.5 py-2 rounded-xl shadow-xl backdrop-blur-md border border-white/10 whitespace-nowrap pointer-events-none">
        Chat via WhatsApp
      </span>

      <a
        href={WHATSAPP_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Contact via WhatsApp"
        className="relative flex items-center justify-center w-14 h-14 md:w-16 md:h-16 bg-[#25D366] hover:bg-[#20ba5a] text-white rounded-full shadow-[0_8px_30px_rgba(37,211,102,0.45)] hover:shadow-[0_12px_35px_rgba(37,211,102,0.6)] transition-all duration-300 hover:scale-110 active:scale-95 border-2 border-white/20"
      >
        {/* Slow Pulsing Outer Ring */}
        <span className="absolute inset-0 rounded-full bg-[#25D366] opacity-35 animate-ping [animation-duration:3s] pointer-events-none" />

        {/* Official WhatsApp Logo SVG */}
        <svg
          viewBox="0 0 24 24"
          className="w-7 h-7 md:w-8 md:h-8 fill-white relative z-10 drop-shadow-sm"
          aria-hidden="true"
        >
          <path fillRule="evenodd" clipRule="evenodd" d="M18.403 5.597A9.858 9.858 0 0 0 11.42 2.708c-5.46 0-9.9 4.44-9.9 9.9 0 1.745.455 3.447 1.32 4.948L1.5 22.5l5.093-1.336a9.89 9.89 0 0 0 4.827 1.254h.004c5.46 0 9.9-4.44 9.9-9.9 0-2.64-1.029-5.12-2.92-7.021zM11.42 20.59h-.003a8.216 8.216 0 0 1-4.192-1.15l-.301-.178-3.118.818.832-3.04-.196-.312a8.204 8.204 0 0 1-1.258-4.308c0-4.536 3.69-8.226 8.23-8.226 2.196 0 4.26.855 5.813 2.41 1.552 1.553 2.406 3.618 2.405 5.814 0 4.537-3.69 8.227-8.227 8.227zm4.512-6.166c-.247-.124-1.463-.722-1.69-.804-.227-.083-.392-.124-.557.124-.165.247-.64.804-.784.97-.144.165-.288.185-.535.061-.247-.124-1.044-.385-1.989-1.228-.735-.656-1.232-1.465-1.376-1.712-.144-.247-.015-.38.109-.504.111-.11.247-.288.371-.432.124-.144.165-.247.247-.412.083-.165.041-.309-.02-.432-.062-.124-.557-1.34-.763-1.835-.2-.482-.403-.416-.557-.424-.144-.008-.309-.008-.474-.008s-.433.062-.66.309c-.227.247-.866.845-.866 2.062 0 1.216.887 2.39 1.01 2.555.124.165 1.746 2.666 4.23 3.738.591.255 1.053.407 1.413.521.593.188 1.133.161 1.56.098.477-.07 1.463-.598 1.669-1.175.206-.577.206-1.072.144-1.175-.062-.103-.227-.185-.474-.309z" />
        </svg>
      </a>
    </motion.div>
  );
};

export default FloatingWhatsApp;
