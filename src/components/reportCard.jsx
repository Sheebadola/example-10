// eslint-disable-next-line no-unused-vars
import React, { useEffect } from 'react';
import { Formik, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { FormattedMessage, useIntl } from 'react-intl';

const StudentReportCard = () => {
  const intl = useIntl();

  useEffect(() => {
    const setYupLocale = () => {
      Yup.setLocale({
        mixed: {
          required: intl.formatMessage({ id: 'form.validation.required' }),
        },
        number: {
          min: intl.formatMessage({ id: 'form.validation.min' }),
          max: intl.formatMessage({ id: 'form.validation.max' }),
        },
      });
    };

    setYupLocale();
  }, [intl]);

  const validationSchema = Yup.object().shape({
    name: Yup.string().required(),
    math: Yup.number().required().min(0).max(100),
    science: Yup.number().required().min(0).max(100),
    english: Yup.number().required().min(0).max(100),
  });

  const handleSubmit = (values) => {
    console.log("yo yo");
    console.log(values);
  };

  return (
    <div>
      <h1>
        <FormattedMessage id="form.title" defaultMessage="Student Report Card" />
      </h1>
      <Formik
        initialValues={{ name: '', math: '', science: '', english: '' }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <form>
          <div>
            <label htmlFor="name">
              <FormattedMessage id="form.name" defaultMessage="Name" />
            </label>
            <Field type="text" id="name" name="name" />
            <ErrorMessage name="name" component="div" />
          </div>
          <div>
            <label htmlFor="math">
              <FormattedMessage id="form.math" defaultMessage="Math" />
            </label>
            <Field type="number" id="math" name="math" />
            <ErrorMessage name="math" component="div" />
          </div>
          <div>
            <label htmlFor="science">
              <FormattedMessage id="form.science" defaultMessage="Science" />
            </label>
            <Field type="number" id="science" name="science" />
            <ErrorMessage name="science" component="div" />
          </div>
          <div>
            <label htmlFor="english">
              <FormattedMessage id="form.english" defaultMessage="English" />
            </label>
            <Field type="number" id="english" name="english" />
            <ErrorMessage name="english" component="div" />
          </div>
          <button type="submit">
            <FormattedMessage id="form.submit" defaultMessage="Submit" />
          </button>
        </form>
      </Formik>
    </div>
  );
};


export default StudentReportCard;
