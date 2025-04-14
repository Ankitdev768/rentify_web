import React, { useRef, useEffect, useState } from "react";
import { motion, useAnimation, useInView } from "framer-motion";
import { Player } from "@lottiefiles/react-lottie-player";
import MockupLogo from '../assets/MockupLogo.png'
import healthyAnim from "../animations/flat.json";
import vegModeAnim from "../animations/hostel.json";
import partyAnim from "../animations/mess.json";
import giftAnim from "../animations/shared-room.json";
import gourmetAnim from "../animations/single-room.json";
import offersAnim from "../animations/trusted.json";
import trainAnim from "../animations/verified.json";
import homelyAnim from "../animations/wallet.json";

const features = [
  { name: "Healthy", animation: healthyAnim },
  { name: "Veg Mode", animation: vegModeAnim },
  { name: "Plan a Party", animation: partyAnim },
  { name: "Gift Cards", animation: giftAnim },
  { name: "Gourmet", animation: gourmetAnim },
  { name: "Offers", animation: offersAnim },
  { name: "Food on Train", animation: trainAnim },
  { name: "Homely meals", animation: homelyAnim },
];

const AppFeatures = () => {
  const ref = useRef();
  const inView = useInView(ref, { margin: "-150px 0px" });
  const controls = useAnimation();
  const imageControls = useAnimation();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (inView && !isMobile) {
      controls.start("flyOut");
      imageControls.start("fadeIn");
    } else {
      controls.start("initial");
      imageControls.start("initial");
    }
  }, [inView, controls, imageControls, isMobile]);

  return (
    <div className="min-h-[50vh] bg-gradient-to-br from-gray-50 via-white to-gray-100 flex flex-col items-center justify-start py-24 text-center relative overflow-x-visible">
      <h2 className="text-4xl md:text-6xl font-bold text-red-500 mb-6">
        What’s waiting for you <br /> on the app?
      </h2>
      <p className="text-lg text-gray-600 mb-16 max-w-2xl">
        Scroll slowly to reveal the magic 💫
      </p>

      <div
        ref={ref}
        className="relative w-[280px] h-[550px] rounded-[2.5rem] border-[14px] border-black bg-black shadow-2xl overflow-visible z-10"
      >
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[100px] h-[28px] bg-black rounded-b-xl z-20" />

        <div className="relative w-full h-full bg-white rounded-[2rem] overflow-visible z-10 flex items-center justify-center">
          <div className="relative w-full h-full overflow-visible">
            {features.map((feature, idx) => {
              const isLeft = idx % 2 === 0;
              const row = Math.floor(idx / 2);
              const yOffset = 60 + row * 110;
              const leftPos = isLeft ? "-60px" : "160px";

              return (
                <motion.div
                  key={idx}
                  variants={{
                    initial: { x: 0, opacity: 1 },
                    flyOut: {
                      x: isMobile ? 0 : isLeft ? -200 : 200,
                      opacity: 1,
                      transition: {
                        type: "tween",
                        ease: "easeInOut",
                        duration: 0.7,
                        delay: idx * 0.1,
                      },
                    },
                  }}
                  animate={controls}
                  style={{
                    top: yOffset,
                    left: leftPos,
                  }}
                  className="absolute w-[150px] h-[90px] flex flex-col items-center justify-center bg-white rounded-2xl shadow-xl border border-gray-200 z-30 p-3"
                >
                  <Player
                    autoplay
                    loop
                    src={feature.animation}
                    style={{ height: "40px", width: "40px" }}
                  />
                  <p className="text-base font-semibold mt-2 text-center leading-tight">
                    {feature.name}
                  </p>
                </motion.div>
              );
            })}

            <motion.img
              src={MockupLogo}
              alt="App preview"
              style={{
                position: "absolute",
                top: "25%",
                transform: "translate(-50%, -50%)",
                borderRadius: "50%",
                objectFit: "cover",
                zIndex: 0,
              }}
              variants={{
                initial: { opacity: 0, y: 20 },
                fadeIn: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 1, ease: "easeOut", delay: 0.5 },
                },
              }}
              animate={imageControls}
            />
          </div>
        </div>
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 w-[80px] h-[6px] bg-gray-300 rounded-full" />
      </div>
    </div>
  );
};

export default AppFeatures;
