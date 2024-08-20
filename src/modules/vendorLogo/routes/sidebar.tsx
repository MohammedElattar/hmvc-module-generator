import {Circle} from "react-feather";
import vendorLogoRoutes from "../constants/routes";

const sideBar = [
    {
        id: "vendorLogo",
        title: "Vendor Logos",
        icon: <Circle size={20} />,
        navLink: vendorLogoRoutes.TABLE
    }
];

export default sideBar