import { useFormik } from 'formik';
import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
  email: Yup.string().email().required(),
  password: Yup.string().min(6).required(),
  repeatPassword: Yup.string().test(
    'passwords-match',
    'Passwords must match',
    function (value) {
      return this.parent.password === value;
    }
  ),
});

function RegisterForm() {
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      repeatPassword: '',
    },
    onSubmit: (values) => {
      console.log(values);
    },
    validationSchema,
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <fieldset>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formik.values.email}
          onChange={formik.handleChange}
        />
        <pre>{formik.errors.email}</pre>
      </fieldset>

      <fieldset>
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formik.values.password}
          onChange={formik.handleChange}
        />
        <pre>{formik.errors.password}</pre>
      </fieldset>

      <fieldset>
        <input
          type="password"
          name="repeatPassword"
          placeholder="Repeat password"
          value={formik.values.repeatPassword}
          onChange={formik.handleChange}
        />
        <pre>{formik.errors.repeatPassword}</pre>
      </fieldset>

      <button type="submit">Register</button>
    </form>
  );
}

export default RegisterForm;
