import type { Route } from "./+types/sign-up";
import { Layout } from "../components/Layout";
import { Link, useNavigate } from "react-router";
import { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { ErrorMessage } from "../components/ErrorMessage";
import { FormInput } from "../components/FormInput";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { setCredentials, selectIsAuthenticated } from "../store/authSlice";
import { authApi } from "../services/auth.api";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Реєстрація - Vasyl&Co" },
    { name: "description", content: "Створіть новий акаунт" },
  ];
}

interface FormValues {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const validationSchema = Yup.object({
  firstName: Yup.string()
    .trim()
    .required("Введіть ім'я")
    .min(2, "Ім'я повинно містити мінімум 2 символи")
    .max(30, "Ім'я не повинно перевищувати 30 символів"),
  lastName: Yup.string()
    .trim()
    .required("Введіть прізвище")
    .min(2, "Прізвище повинно містити мінімум 2 символи")
    .max(30, "Прізвище не повинно перевищувати 30 символів"),
  email: Yup.string()
    .trim()
    .required("Введіть email")
    .email("Невірний формат email"),
  password: Yup.string()
    .required("Введіть пароль")
    .min(8, "Пароль повинен містити мінімум 8 символів")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      "Пароль повинен містити принаймні одну велику літеру, одну малу літеру та одну цифру"
    ),
  confirmPassword: Yup.string()
    .required("Підтвердіть пароль")
    .oneOf([Yup.ref('password')], "Паролі не співпадають"),
});

export default function SignUp() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  const formik = useFormik<FormValues>({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      setIsSubmitting(true);
      setSubmitError(null);

      try {
        const response = await authApi.signUp({
          email: values.email,
          password: values.password,
          firstName: values.firstName,
          lastName: values.lastName,
        });

        dispatch(setCredentials({
          user: {
            id: response.user.id,
            email: response.user.email,
            username: `${response.user.firstName} ${response.user.lastName}`.trim() || response.user.email.split('@')[0],
          },
          token: response.token,
        }));

        navigate('/');
      } catch (error: any) {
        console.error('Failed to sign up:', error);
        setSubmitError(error.response?.data?.message || 'Не вдалося зареєструватися. Спробуйте ще раз.');
      } finally {
        setIsSubmitting(false);
      }
    },
  });

  return (
    <Layout>
      <div className="container mx-auto px-4 pt-24 pb-16 bg-white dark:bg-gray-950 min-h-screen">
        <div className="max-w-md mx-auto">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white text-center mb-12">
            Реєстрація
          </h1>

          {submitError && (
            <div className="mb-6">
              <ErrorMessage
                message={submitError}
                onClose={() => setSubmitError(null)}
              />
            </div>
          )}

          <form onSubmit={formik.handleSubmit} className="space-y-6">
            <FormInput
              label="Ім'я"
              id="firstName"
              name="firstName"
              type="text"
              placeholder="Введіть ім'я"
              value={formik.values.firstName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              disabled={isSubmitting}
              touched={formik.touched.firstName}
              error={formik.errors.firstName}
            />

            <FormInput
              label="Прізвище"
              id="lastName"
              name="lastName"
              type="text"
              placeholder="Введіть прізвище"
              value={formik.values.lastName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              disabled={isSubmitting}
              touched={formik.touched.lastName}
              error={formik.errors.lastName}
            />

            <FormInput
              label="Електронна пошта"
              id="email"
              name="email"
              type="email"
              placeholder="example@email.com"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              disabled={isSubmitting}
              touched={formik.touched.email}
              error={formik.errors.email}
            />

            <FormInput
              label="Пароль"
              id="password"
              name="password"
              type="password"
              placeholder="Введіть пароль"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              disabled={isSubmitting}
              touched={formik.touched.password}
              error={formik.errors.password}
            />

            <FormInput
              label="Підтвердження пароля"
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              placeholder="Повторіть пароль"
              value={formik.values.confirmPassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              disabled={isSubmitting}
              touched={formik.touched.confirmPassword}
              error={formik.errors.confirmPassword}
            />

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full px-8 py-3 border border-gray-900 dark:border-white bg-gray-900 dark:bg-white text-white dark:text-gray-900 hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Обробка..." : "Зареєструватися"}
            </button>

            <div className="text-center text-sm pt-4">
              <span className="text-gray-600 dark:text-gray-400">Вже є акаунт? </span>
              <Link
                to="/sign-in"
                className="text-gray-900 dark:text-white hover:underline font-medium"
              >
                Увійти
              </Link>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
}
