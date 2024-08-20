import {Row, Form, Card, CardBody, CardTitle, CardHeader} from 'reactstrap'
import {toastLoader} from "../../../utility/helpers/toastHelper";
import SubmitForm from "../../../components/form/SubmitForm";

const ElattarLogoForm = ({inUpdate, formikObject, loading}) => {
    const {handleSubmit, values, errors, handleBlur, handleChange, isSubmitting} = formikObject;

    toastLoader(loading)

    return (
        <Card>
            <CardHeader>
                <CardTitle tag='h4'>{inUpdate ? 'Update' : 'Add'} Elattar Logo</CardTitle>
            </CardHeader>
            <CardBody>
                <Form onSubmit={handleSubmit}>
                    <Row>
                        <SubmitForm isSubmitting={isSubmitting}/>
                    </Row>
                </Form>
            </CardBody>
        </Card>
    )
}

export default ElattarLogoForm