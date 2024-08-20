import usePagination, {generatePaginationObject} from "../../../utility/hooks/usePagination";
import useSearch from "../../../utility/hooks/useSearch";
import {lazy} from "react";
import useElattarLogoLogic from "../hooks/useElattarLogoLogic";
import {useSelector} from "react-redux";
import {RootState} from "../../../redux/store.ts";

const ElattarLogoTable = lazy(() => import('../views/elattarLogoTable'))
const ElattarLogoContainer = () => {
    const { all, meta, deleteElattarLogoLogic, getAllElattarLogosLogic } = useElattarLogoLogic()
    const {handleSearch} = useSearch(getAllElattarLogosLogic);
    const object = usePagination(getAllElattarLogosLogic);
    const tableLoading = useSelector((state: RootState) => state.elattarLogoReducer.all.loading)
    const deleteLoading = useSelector((state: RootState) => state.elattarLogoReducer.deleteLoading);

    return <ElattarLogoTable
        loading={ tableLoading || deleteLoading }
        data={all}
        handleDelete={deleteElattarLogoLogic}
        handleSearch={handleSearch}
        paginationObject={generatePaginationObject(object, meta)}
    />
}

export default ElattarLogoContainer; 