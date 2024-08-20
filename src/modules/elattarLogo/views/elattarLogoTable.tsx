import {toastLoader} from "../../../utility/helpers/toastHelper";
import CustomTable from "../../../components/table/CustomTable";
import getColumns from "./columns";
import {parseRoute} from "../../../utility/helpers/routeHelper";
import AddButton from "../../../components/table/AddButton";
import elattarLogoRoutes from "../constants/routes";
import ElattarLogoTableObject from "../interfaces/{elattarLogoTableObject.ts";

const ElattarLogoTable =  ({ data, paginationObject, handleDelete, handleSearch, loading }) => {
    const buttons = [<AddButton to={elattarLogoRoutes.ADD} key={0}/>]
    const routeParser = (row: ElattarLogoTableObject) => {
        const {id} = row;
        return parseRoute(elattarLogoRoutes.EDIT, {id})
    };

    toastLoader(loading)

    return <CustomTable
        buttons={buttons}
        handleSearch={handleSearch}
        columns={getColumns({ handleDelete, routeParser })}
        data={data}
        pagination={true}
        paginationObject={paginationObject}
        title='Elattar Logos'
    />
}

export default ElattarLogoTable