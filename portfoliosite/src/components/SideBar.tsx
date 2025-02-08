import { BsGearFill } from 'react-icons/bs';
import { AiFillHome } from "react-icons/ai";
import { BsFillGrid3X2GapFill } from "react-icons/bs";
import { RiContactsBook3Fill } from "react-icons/ri";
import { FiLink2 } from "react-icons/fi";

type SideBarProps = {
    onSideBarClick: (section: | "home" | "projects" | "contact" | "links") => void;
};

const SideBar = ( {onSideBarClick} : SideBarProps) => {
    return (
        <div className="fixed top-0 left-0 h-screen w-16 flex flex-col
                  bg-white dark:bg-gray-900 shadow-lg justify-between">
            <div className="flex-grow-[0.2]"></div>
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
            <SideBarIcon icon={<BsGearFill size="26" />} />
            <div className="flex-grow-[0.2]"></div>
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