import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Formik, Form } from "formik";
import { TextField } from "../FormsUI/formField";
import * as Yup from "yup";
import api from "../../utils/api";
import Modal from "../modal";

const EntryForm = ({ isAuthenticated }) => {
  const [success, setSucccess] = useState();
  const [failed, setFailed] = useState();
  const [isSubmitting, setIsSubmitting] = useState();

  const [logg, setLogg] = useState("");

  const [status, setStatus] = useState(false);
  const history = useHistory();

  const validate = Yup.object({
    phone: Yup.string().required("Phone is required"),
  });

  return (
    <div>
      <Formik
        initialValues={{
          phone: "",
        }}
        validationSchema={validate}
        onSubmit={(values) => {
          api
            .post("/visitor", values)
            .then((result) => {
              setLogg(result.data.type);
              setStatus(true);
              setFailed(false);
              setSucccess(true);
              setIsSubmitting(false);
            })
            .catch((error) => {
              if (error.response.status === 404) {
                history.push(`/new-entry/${error.response.data}`);
              }
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
                    <h2>{logg} successFully</h2>
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
                  <p className="lead">
                    <i className="fas fa-user" /> Log Entry{" "}
                  </p>
                  <Form>
                    <TextField label="Phone" name="phone" type="text" />

                    <button className="btn btn-primary mt-3" type="submit">
                      Submit{" "}
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
};
EntryForm.propTypes = {
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps)(EntryForm);
