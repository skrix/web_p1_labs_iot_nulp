import type { Route } from "./+types/sign-up";
import { Layout } from "../components/Layout";
import { Link, useNavigate } from "react-router";
import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { ErrorMessage } from "../components/ErrorMessage";
import { FormInput } from "../components/FormInput";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Реєстрація - Vasyl&Co" },
    { name: "description", content: "Створіть новий акаунт" },
  ];
}

interface FormValues {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const validationSchema = Yup.object({
  username: Yup.string()
    .trim()
    .required("Введіть ім'я користувача")
    .min(3, "Ім'я користувача повинно містити мінімум 3 символи")
    .max(30, "Ім'я користувача не повинно перевищувати 30 символів"),
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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const formik = useFormik<FormValues>({
    initialValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      setIsSubmitting(true);
      setSubmitError(null);

      try {
        // TODO: Implement actual API call for user registration
        await new Promise(resolve => setTimeout(resolve, 1000));
        navigate('/');
      } catch (error: any) {
        console.error('Failed to register:', error);
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
              label="Ім'я користувача"
              id="username"
              name="username"
              type="text"
              placeholder="Введіть ім'я користувача"
              value={formik.values.username}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              disabled={isSubmitting}
              touched={formik.touched.username}
              error={formik.errors.username}
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
