import type { Route } from "./+types/sign-in";
import { Layout } from "../components/Layout";
import { Link, useNavigate } from "react-router";
import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { ErrorMessage } from "../components/ErrorMessage";
import { FormInput } from "../components/FormInput";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Вхід - Vasyl&Co" },
    { name: "description", content: "Увійдіть в свій акаунт" },
  ];
}

interface FormValues {
  email: string;
  password: string;
}

const validationSchema = Yup.object({
  email: Yup.string()
    .trim()
    .required("Введіть email")
    .email("Невірний формат email"),
  password: Yup.string()
    .required("Введіть пароль"),
});

export default function SignIn() {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const formik = useFormik<FormValues>({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      setIsSubmitting(true);
      setSubmitError(null);

      try {
        // TODO: Implement actual API call for user login
        await new Promise(resolve => setTimeout(resolve, 1000));
        navigate('/');
      } catch (error: any) {
        console.error('Failed to login:', error);
        setSubmitError(error.response?.data?.message || 'Не вдалося увійти. Перевірте свої дані.');
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
            Вхід
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

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full px-8 py-3 border border-gray-900 dark:border-white bg-gray-900 dark:bg-white text-white dark:text-gray-900 hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Обробка..." : "Увійти"}
            </button>

            <div className="text-center text-sm pt-4">
              <span className="text-gray-600 dark:text-gray-400">Ще не зареєстровані? </span>
              <Link
                to="/sign-up"
                className="text-gray-900 dark:text-white hover:underline font-medium"
              >
                Зареєструватися
              </Link>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
}
