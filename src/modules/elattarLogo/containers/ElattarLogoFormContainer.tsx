import {useParams} from "react-router-dom";
import {lazy, useEffect} from "react";
import {buildFormikParams, formikInstance, generateFormikForm} from "../../../utility/formik/formikHelper";
import useElattarLogoLogic from "../hooks/useElattarLogoLogic";
import {StoreElattarLogo, UpdateElattarLogo} from "../types/elattarLogoForm";
import citySchema from "../validation/index";

const ElattarLogoForm = lazy(() => import('../views/elattarLogoForm'))
export const emptyElattarLogo: StoreElattarLogo = {
    id: '',
}

const ElattarLogoFormContainer = () => {
    const {getOneElattarLogoLogic, oneElattarLogo, oneElattarLogoLoading, updateElattarLogoLogic, storeElattarLogoLogic} = useElattarLogoLogic();
    const {id: id} = useParams();
    const inUpdate = id !== undefined;

    const formik = formikInstance({
        initialValues: !inUpdate ? emptyElattarLogo : {
            id: oneElattarLogo.id,
        },
        validationSchema: citySchema,
        onSubmit: (values: StoreElattarLogo|UpdateElattarLogo) => {
            if (inUpdate) {
                updateElattarLogoLogic(values, id, buildFormikParams(formik))
            } else {
                storeElattarLogoLogic(values, buildFormikParams(formik))
            }
        }});

    useEffect(() => {
        if (inUpdate) {
            getOneElattarLogoLogic(id)
        }
    }, []);

    return <ElattarLogoForm
        inUpdate={inUpdate}
        formikObject={generateFormikForm(formik)}
        loading={oneElattarLogoLoading}
    />
}

export default ElattarLogoFormContainer;