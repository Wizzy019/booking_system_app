import { motion } from "framer-motion";
import Logo from "../../assets/logo.svg";

export default function LogoLoader() {
  const dots = Array.from({ length: 12 });

  return (
    <div className="relative flex items-center justify-center">
      {/* LOGO BREATHING */}
      <motion.img
        src={Logo}
        alt="logo"
        className="w-14 h-14 absolute"
        animate={{
          scale: [1, 1.08, 1],
          opacity: [1, 0.7, 1],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* ORBITING DOTS */}
      <motion.div
        className="absolute"
        animate={{ rotate: 360 }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        {dots.map((_, i) => {
          const angle = (i / dots.length) * 360;

          return (
            <motion.div
              key={i}
              className="absolute h-2 w-2 bg-black rounded-full"
              style={{
                transform: `rotate(${angle}deg) translate(40px)`,
              }}
              animate={{
                scale: [0.6, 1, 0.6],
                opacity: [0.4, 1, 0.4],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.1,
                ease: "easeInOut",
              }}
            />
          );
        })}
      </motion.div>
    </div>
  );
}
