import React, { useState, useEffect } from 'react';
import { AiFillHome } from "react-icons/ai";
import { BsFillGrid3X2GapFill } from "react-icons/bs";
import { RiContactsBook3Fill } from "react-icons/ri";
import { FiMoon, FiSun } from "react-icons/fi";
import Magnet from './ui/Magnet';

type SideBarProps = {
  onSideBarClick: (section: "home" | "projects" | "contact") => void;
};

const SideBar = ({ onSideBarClick }: SideBarProps) => {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [rotating, setRotating] = useState(false);

  useEffect(() => {
    document.documentElement.classList.add('dark');
  }, []);

  const toggleTheme = () => {
    setRotating(true);
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark', !isDarkMode);
    setTimeout(() => setRotating(false), 300);
  };

  return (
    <div className="hidden sm:flex fixed top-0 left-0 h-screen w-16 flex-col
              bg-white dark:bg-gray-900 shadow-lg justify-between
              transition-all duration-300 ease-linear">
      <div className="flex-grow-[0.1]"></div>
      <Divider />

      <div className="cursor-pointer" onClick={() => onSideBarClick("home")}>
        <Magnet padding={30} magnetStrength={4} wrapperClassName="w-full">
          <SideBarIcon icon={<AiFillHome size="26" />} text="Home" />
        </Magnet>
      </div>
      <Divider />

      <div className="cursor-pointer" onClick={() => onSideBarClick("projects")}>
        <Magnet padding={30} magnetStrength={4} wrapperClassName="w-full">
          <SideBarIcon icon={<BsFillGrid3X2GapFill size="32" />} text="Projects" />
        </Magnet>
      </div>
      <Divider />

      <div className="cursor-pointer" onClick={() => onSideBarClick("contact")}>
        <Magnet padding={30} magnetStrength={4} wrapperClassName="w-full">
          <SideBarIcon icon={<RiContactsBook3Fill size="28" />} text="Contact" />
        </Magnet>
      </div>
      <Divider />

      <div className="cursor-pointer" onClick={toggleTheme}>
        <Magnet padding={30} magnetStrength={4} wrapperClassName="w-full">
          <SideBarIcon
            icon={
              <span style={{ display: 'inline-block', transition: 'transform 300ms', transform: rotating ? 'rotate(180deg)' : 'rotate(0deg)' }}>
                {isDarkMode ? <FiSun size="28" /> : <FiMoon size="28" />}
              </span>
            }
            text="Toggle Theme"
          />
        </Magnet>
      </div>
      <Divider />

      <div className="flex-grow-[0.1]"></div>
    </div>
  );
};

type SideBarIconProps = {
  icon: React.ReactNode;
  text?: string;
};

const SideBarIcon = ({ icon, text = "label" }: SideBarIconProps) => (
  <div className="sidebar-icon group">
    {icon}
    <span className="sidebar-text group-hover:scale-100">
      {text}
    </span>
  </div>
);

const Divider = () => <hr className="sidebar-hr" />;

export default SideBar;
