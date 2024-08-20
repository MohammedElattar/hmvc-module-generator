import { lazy } from "react";
import vendorLogoRoutes from "../constants/routes";

const VendorLogoContainer = lazy(() => import('../containers/VendorLogoContainer'));
const VendorLogoFormContainer = lazy(() => import('../containers/VendorLogoFormContainer'))
const vendorLogo = [
    {
        path: vendorLogoRoutes.TABLE,
        element: <VendorLogoContainer/>
    },
    {
        path: vendorLogoRoutes.EDIT,
        element: <VendorLogoFormContainer />
    },
    {
        path: vendorLogoRoutes.ADD,
        element: <VendorLogoFormContainer />
    }
];

export default vendorLogo