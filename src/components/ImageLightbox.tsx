import { useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

interface ImageLightboxProps {
  images: string[];
  selectedIndex: number | null;
  onClose: () => void;
  onSelectIndex: (index: number) => void;
}

const ImageLightbox = ({
  images,
  selectedIndex,
  onClose,
  onSelectIndex,
}: ImageLightboxProps) => {
  const isOpen = selectedIndex !== null && selectedIndex >= 0 && selectedIndex < images.length;

  const handlePrev = useCallback(() => {
    if (selectedIndex === null) return;
    const prevIndex = (selectedIndex - 1 + images.length) % images.length;
    onSelectIndex(prevIndex);
  }, [selectedIndex, images.length, onSelectIndex]);

  const handleNext = useCallback(() => {
    if (selectedIndex === null) return;
    const nextIndex = (selectedIndex + 1) % images.length;
    onSelectIndex(nextIndex);
  }, [selectedIndex, images.length, onSelectIndex]);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      } else if (e.key === "ArrowLeft") {
        handlePrev();
      } else if (e.key === "ArrowRight") {
        handleNext();
      }
    };

    // Lock scroll when open
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose, handlePrev, handleNext]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-md select-none p-4"
          onClick={onClose}
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 md:top-6 md:right-6 z-20 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all duration-200 hover:scale-110 active:scale-95 border border-white/10 shadow-lg cursor-pointer"
            aria-label="Close"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Previous button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              handlePrev();
            }}
            className="absolute left-3 md:left-8 top-1/2 -translate-y-1/2 z-20 p-3.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all duration-200 hover:scale-110 active:scale-95 border border-white/10 shadow-lg cursor-pointer"
            aria-label="Previous image"
          >
            <ChevronLeft className="w-7 h-7" />
          </button>

          {/* Next button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleNext();
            }}
            className="absolute right-3 md:right-8 top-1/2 -translate-y-1/2 z-20 p-3.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all duration-200 hover:scale-110 active:scale-95 border border-white/10 shadow-lg cursor-pointer"
            aria-label="Next image"
          >
            <ChevronRight className="w-7 h-7" />
          </button>

          {/* Main Image */}
          <div 
            className="relative max-w-[90vw] max-h-[85vh] flex items-center justify-center overflow-hidden rounded-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <AnimatePresence mode="wait">
              <motion.img
                key={selectedIndex}
                src={images[selectedIndex!]}
                alt={`Photo ${selectedIndex! + 1}`}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className="max-w-[90vw] max-h-[82vh] object-contain rounded-xl shadow-2xl border border-white/10 pointer-events-auto"
              />
            </AnimatePresence>
          </div>

          {/* Counter badge */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 px-5 py-2 rounded-full bg-white/10 border border-white/15 text-white/90 text-sm font-semibold tracking-wider backdrop-blur-md shadow-xl">
            {selectedIndex! + 1} / {images.length}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ImageLightbox;
