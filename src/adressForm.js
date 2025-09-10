import React, { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

// Sample dynamic options
const studyOptions = [
  { label: "Engineering", value: "engineering" },
  { label: "Medical", value: "medical" },
  { label: "Commerce", value: "commerce" },
];

const countryOptions = [
  { label: "India", value: "india" },
  { label: "USA", value: "usa" },
  { label: "UK", value: "uk" },
];

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  dob: Yup.date().required("Date of birth is required"),
  study: Yup.string().required("Study field is required"),
  country: Yup.string().required("Country is required"),
});

export default function ConfirmOrders() {
  const [studies, setStudies] = useState([]);
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    // Simulate fetching dynamic data
    setTimeout(() => {
      setStudies(studyOptions);
      setCountries(countryOptions);
    }, 1000);
  }, []);

  return (
    <div className="form-container" style={{ maxWidth: "400px", margin: "auto" }}>
      <h2>Login Form</h2>
      <Formik
        initialValues={{
          name: "",
          dob: "",
          study: "",
          country: "",
        }}
        validationSchema={validationSchema}
        onSubmit={(values, actions) => {
          console.log("Form Data", values);
          actions.setSubmitting(false);
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <div>
              <label>Name:</label>
              <Field type="text" name="name" />
              <ErrorMessage name="name" component="div" style={{ color: "red" }} />
            </div>

            <div>
              <label>Date of Birth:</label>
              <Field type="date" name="dob" />
              <ErrorMessage name="dob" component="div" style={{ color: "red" }} />
            </div>

            <div>
              <label>Study:</label>
              <Field as="select" name="study">
                <option value="">Select study</option>
                {studies.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </Field>
              <ErrorMessage name="study" component="div" style={{ color: "red" }} />
            </div>

            <div>
              <label>Country:</label>
              <Field as="select" name="country">
                <option value="">Select country</option>
                {countries.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </Field>
              <ErrorMessage name="country" component="div" style={{ color: "red" }} />
            </div>

            <div style={{ marginTop: "20px" }}>
              <button type="submit" disabled={isSubmitting}>
                Submit
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}
