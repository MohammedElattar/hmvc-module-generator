import { lazy } from "react";
import elattarLogoRoutes from "../constants/routes";

const ElattarLogoContainer = lazy(() => import('../containers/ElattarLogoContainer'));
const ElattarLogoFormContainer = lazy(() => import('../containers/ElattarLogoFormContainer'))
const elattarLogo = [
    {
        path: elattarLogoRoutes.TABLE,
        element: <ElattarLogoContainer/>
    },
    {
        path: elattarLogoRoutes.EDIT,
        element: <ElattarLogoFormContainer />
    },
    {
        path: elattarLogoRoutes.ADD,
        element: <ElattarLogoFormContainer />
    }
];

export default elattarLogo