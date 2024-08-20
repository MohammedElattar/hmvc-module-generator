import {toastLoader} from "../../../utility/helpers/toastHelper";
import CustomTable from "../../../components/table/CustomTable";
import getColumns from "./columns";
import {parseRoute} from "../../../utility/helpers/routeHelper";
import AddButton from "../../../components/table/AddButton";
import vendorLogoRoutes from "../constants/routes";
import VendorLogoTableObject from "../interfaces/{vendorLogoTableObject.ts";

const VendorLogoTable =  ({ data, paginationObject, handleDelete, handleSearch, loading }) => {
    const buttons = [<AddButton to={vendorLogoRoutes.ADD} key={0}/>]
    const routeParser = (row: VendorLogoTableObject) => {
        const {id} = row;
        return parseRoute(vendorLogoRoutes.EDIT, {id})
    };

    toastLoader(loading)

    return <CustomTable
        buttons={buttons}
        handleSearch={handleSearch}
        columns={getColumns({ handleDelete, routeParser })}
        data={data}
        pagination={true}
        paginationObject={paginationObject}
        title='Vendor Logos'
    />
}

export default VendorLogoTable