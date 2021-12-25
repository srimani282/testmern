import React, { useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import PropTypes from "prop-types";
import { Formik, Form } from "formik";
import { TextField } from "../FormsUI/formField";
import * as Yup from "yup";
import Modal from "../modal";

import api from "../../utils/api";

function NewEntryForm(props) {
  const [success, setSucccess] = useState();
  const [failed, setFailed] = useState();
  const [isSubmitting, setIsSubmitting] = useState();

  const [status, setStatus] = useState(false);
  const history = useHistory();

  const { ph } = useParams();
  const validate = Yup.object({
    phone: Yup.string().required("Phone is required"),
    name: Yup.string().required("Name is required"),
    address: Yup.string().required("Address is required"),
    purpose: Yup.string().required("Purpose is required"),
  });
  return (
    <div>
      <Formik
        initialValues={{
          phone: ph,
          name: "",
          address: "",
          purpose: "",
        }}
        validationSchema={validate}
        onSubmit={(values) => {
          api
            .post("/visitor/new", values)
            .then((result) => {
              setStatus(true);
              setFailed(false);
              setSucccess(true);
              setIsSubmitting(false);
            })
            .catch((error) => {
              console.log(error.response);
              setStatus(true);
              setSucccess(false);
              setFailed(true);
              setIsSubmitting(false);
            });
        }}
      >
        {(formik) => (
          <section className="container">
            {status && (
              <Modal closeModal={() => setStatus(false)}>
                {success > 0 ? (
                  <>
                    <h2>Uploaded successFully</h2>
                  </>
                ) : null}
                {failed > 0 ? (
                  <>
                    <h2>Failed submitting</h2>
                  </>
                ) : null}
              </Modal>
            )}
            <div className="mt-3">
              <div className="row">
                <div className="col-md-5">
                  <Form>
                    <TextField label="Phone" name="phone" type="text" />

                    <TextField label="Name" name="name" type="text" />

                    <TextField label="Address" name="address" type="text" />

                    <TextField label="Purpose" name="purpose" type="text" />
                    <button className="btn btn-primary mt-3" type="submit">
                      Submit
                    </button>
                  </Form>
                </div>
              </div>
            </div>
          </section>
        )}
      </Formik>
    </div>
  );
}

NewEntryForm.propTypes = {};

export default NewEntryForm;
