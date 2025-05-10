export const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.3 } },
};

export const slideUp = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.3 } },
};

export const typingIndicator = {
  animate: {
    y: [0, -5, 0],
    transition: {
      y: {
        repeat: Infinity,
        duration: 0.6,
        ease: "easeInOut",
      },
    },
  },
};