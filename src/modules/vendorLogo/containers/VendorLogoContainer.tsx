import usePagination, {generatePaginationObject} from "../../../utility/hooks/usePagination";
import useSearch from "../../../utility/hooks/useSearch";
import {lazy} from "react";
import useVendorLogoLogic from "../hooks/useVendorLogoLogic";
import {useSelector} from "react-redux";
import {RootState} from "../../../redux/store.ts";

const VendorLogoTable = lazy(() => import('../views/vendorLogoTable'))
const VendorLogoContainer = () => {
    const { all, meta, deleteVendorLogoLogic, getAllVendorLogosLogic } = useVendorLogoLogic()
    const {handleSearch} = useSearch(getAllVendorLogosLogic);
    const object = usePagination(getAllVendorLogosLogic);
    const tableLoading = useSelector((state: RootState) => state.vendorLogoReducer.all.loading)
    const deleteLoading = useSelector((state: RootState) => state.vendorLogoReducer.deleteLoading);

    return <VendorLogoTable
        loading={ tableLoading || deleteLoading }
        data={all}
        handleDelete={deleteVendorLogoLogic}
        handleSearch={handleSearch}
        paginationObject={generatePaginationObject(object, meta)}
    />
}

export default VendorLogoContainer; 