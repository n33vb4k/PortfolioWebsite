import React, { useState } from 'react';
import { AiFillHome } from "react-icons/ai";
import { BsFillGrid3X2GapFill } from "react-icons/bs";
import { RiContactsBook3Fill } from "react-icons/ri";
import { FiLink2, FiMoon, FiSun } from "react-icons/fi";

type SideBarProps = {
    onSideBarClick: (section: | "home" | "projects" | "contact" | "links") => void;
}; 

const SideBar = ( {onSideBarClick} : SideBarProps) => {
    const [isDarkMode, setIsDarkMode] = useState(false);

    const toggleTheme = () => {
        setIsDarkMode(!isDarkMode);
        document.documentElement.classList.toggle('dark', !isDarkMode);
    }

    return (
        <div className="fixed top-0 left-0 h-screen w-16 flex flex-col
                  bg-white dark:bg-gray-900 shadow-lg justify-between">
            <div className="flex-grow-[0.1]"></div>
            <Divider />
            <div className="cursor-pointer" onClick={() => onSideBarClick("home")}>
                <SideBarIcon icon={<AiFillHome size="26" />} text='Home'/>
            </div>
            <Divider />
            <div className="cursor-pointer" onClick={() => onSideBarClick("projects")}>
                <SideBarIcon icon={<BsFillGrid3X2GapFill size="32" />} text='Projects'/>
            </div>
            <Divider />
            <div className="cursor-pointer" onClick={() => onSideBarClick("contact")}>
                <SideBarIcon icon={<RiContactsBook3Fill size="28" />} text='Contact'/>
            </div>
            <Divider />
            <div className="cursor-pointer" onClick={() => onSideBarClick("links")}>
                <SideBarIcon icon={<FiLink2 size="28" />} text='Links' />
            </div>
            <Divider />
            <div className="cursor-pointer" onClick={toggleTheme}>
                <SideBarIcon icon={isDarkMode? <FiSun size="28" /> : <FiMoon size="28" />} text="Toggle Theme" />
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

const SideBarIcon = ({ icon, text = "label"}: SideBarIconProps) => (
    <div className="sidebar-icon group">
        {icon}
        <span className="sidebar-text group-hover:scale-100">
            {text}
        </span>
    </div>

    
);

const Divider = () => (<hr className="sidebar-hr" />);

export default SideBar;