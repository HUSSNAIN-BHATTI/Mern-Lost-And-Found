// src/pages/HomePage.jsx
import React from "react";
import { Link } from "react-router-dom";
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

export default function HomePage() {
  const mainRef = useRef(null);
  const heading1Ref = useRef(null);
  const heading2Ref = useRef(null);
  const videoRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const tl = gsap.timeline();

    // Heading 1 Animation
    tl.to(heading1Ref.current, {
      x: -80,
      duration: 1,
      scrollTrigger: {
        trigger: heading1Ref.current,
        start: "top 30%",
        end: "top 0",
        scrub: 3
      }
    });

    // Heading 2 Animation
    tl.to(heading2Ref.current, {
      x: 80,
      duration: 1,
      scrollTrigger: {
        trigger: heading2Ref.current,
        start: "top 54%",
        end: "top 0",
        scrub: 3
      }
    });
  

    // Cleanup function
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <div ref={mainRef} className="main bg-transparent min-h-screen">
      <div className="page1 min-h-screen w-full">
        <div className="page1-content">
          <h1 
            ref={heading1Ref}
            className="text-9xl text-white mt-[10vw] ml-[7vw]"
          >
            Lost Something?
          </h1>
          <h2 
            ref={heading2Ref}
            className="text-9xl text-white ml-[32vw]"
          >
            Not A Problem.
          </h2>
          <div className="page1content h-[5vw] w-[40%] mx-[30%] mt-[1.5vw] text-white capitalize text-center">
            <p>
              we help you reconnect.
              Found something? Help return it to its rightful owner.
            </p>
          </div>
        </div>
      </div>
      <div className="page2 min-h-[40vh] w-full p-[4vw_2.4vw] border-b-2 border-[#bababa]">
        <footer className="text-center text-[#0F0D0D]">
          &copy; 2025 Lost And Found | All Rights Reserved
        </footer>
      </div>
    </div>
  );
}