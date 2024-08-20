import {useParams} from "react-router-dom";
import {lazy, useEffect} from "react";
import {buildFormikParams, formikInstance, generateFormikForm} from "../../../utility/formik/formikHelper";
import useVendorLogoLogic from "../hooks/useVendorLogoLogic";
import {StoreVendorLogo, UpdateVendorLogo} from "../types/vendorLogoForm";
import citySchema from "../validation/index";

const VendorLogoForm = lazy(() => import('../views/vendorLogoForm'))
export const emptyVendorLogo: StoreVendorLogo = {
    id: '',
}

const VendorLogoFormContainer = () => {
    const {getOneVendorLogoLogic, oneVendorLogo, oneVendorLogoLoading, updateVendorLogoLogic, storeVendorLogoLogic} = useVendorLogoLogic();
    const {id: id} = useParams();
    const inUpdate = id !== undefined;

    const formik = formikInstance({
        initialValues: !inUpdate ? emptyVendorLogo : {
            id: oneVendorLogo.id,
        },
        validationSchema: citySchema,
        onSubmit: (values: StoreVendorLogo|UpdateVendorLogo) => {
            if (inUpdate) {
                updateVendorLogoLogic(values, id, buildFormikParams(formik))
            } else {
                storeVendorLogoLogic(values, buildFormikParams(formik))
            }
        }});

    useEffect(() => {
        if (inUpdate) {
            getOneVendorLogoLogic(id)
        }
    }, []);

    return <VendorLogoForm
        inUpdate={inUpdate}
        formikObject={generateFormikForm(formik)}
        loading={oneVendorLogoLoading}
    />
}

export default VendorLogoFormContainer;