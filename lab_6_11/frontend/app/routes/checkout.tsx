import type { Route } from "./+types/checkout";
import { Layout } from "../components/Layout";
import { useAppSelector } from "../store/hooks";
import { selectCartItems, selectCartTotalAmount } from "../store/cartSlice";
import { Link, useNavigate } from "react-router";
import { useState } from "react";
import { SocialLinks } from "../components/SocialLinks";
import { useFormik } from "formik";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Оформлення замовлення - Vasyl&Co" },
    { name: "description", content: "Оформіть замовлення" },
  ];
}

interface FormValues {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
}

export default function Checkout() {
  const navigate = useNavigate();
  const items = useAppSelector(selectCartItems);
  const [showError, setShowError] = useState(false);

  const formik = useFormik<FormValues>({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      address: '',
    },
    validate: (values) => {
      const errors: Partial<Record<keyof FormValues, string>> = {};

      if (!values.firstName.trim()) {
        errors.firstName = "Введіть ім'я";
      }

      if (!values.lastName.trim()) {
        errors.lastName = "Введіть прізвище";
      }

      if (!values.email.trim()) {
        errors.email = "Введіть email";
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
        errors.email = "Невірний формат email";
      }

      if (!values.phone.trim()) {
        errors.phone = "Введіть телефон";
      } else if (!/^(\+?38)?0\d{9}$/.test(values.phone.replace(/[\s\-\(\)]/g, ''))) {
        errors.phone = "Невірний формат телефону. Очікується: +380XXXXXXXXX або 0XXXXXXXXX";
      }

      if (!values.address.trim()) {
        errors.address = "Введіть адресу";
      }

      return errors;
    },
    onSubmit: (values) => {
      // TODO: Send to backend
      console.log('Form submitted:', values);
      alert('Замовлення успішно оформлено! (Demo)');
      navigate('/catalog');
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    formik.handleSubmit(e);

    if (Object.keys(formik.errors).length > 0) {
      setShowError(true);
      setTimeout(() => setShowError(false), 5000);
    }
  };

  if (items.length === 0) {
    return (
      <Layout>
        <div className="container mx-auto px-4 pt-24 pb-12 bg-white dark:bg-gray-950 min-h-screen">
          <div className="text-center py-12">
            <p className="text-gray-600 dark:text-gray-400 text-lg mb-6">
              Ваш кошик порожній. Додайте товари перед оформленням замовлення.
            </p>
            <Link
              to="/catalog"
              className="inline-block px-8 py-3 border border-gray-900 dark:border-white text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              Перейти до каталогу
            </Link>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 pt-24 pb-12 bg-white dark:bg-gray-950 min-h-screen">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white text-center mb-12">
          Оформлення замовлення
        </h1>

        <form onSubmit={handleSubmit} className="max-w-2xl mx-auto">
          {/* Form Fields */}
          <div className="space-y-6 mb-8">
            {/* First Name and Last Name Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label
                  htmlFor="firstName"
                  className="block text-sm font-medium text-gray-900 dark:text-white mb-2"
                >
                  Ім'я
                </label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formik.values.firstName}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={`w-full px-4 py-3 border ${
                    formik.touched.firstName && formik.errors.firstName
                      ? 'border-red-500 focus:ring-red-500'
                      : 'border-gray-300 dark:border-gray-700 focus:ring-gray-900 dark:focus:ring-white'
                  } bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 transition-colors`}
                  placeholder="Введіть ім'я"
                />
                {formik.touched.firstName && formik.errors.firstName && (
                  <p className="mt-1 text-sm text-red-500">{formik.errors.firstName}</p>
                )}
              </div>

              <div>
                <label
                  htmlFor="lastName"
                  className="block text-sm font-medium text-gray-900 dark:text-white mb-2"
                >
                  Прізвище
                </label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={formik.values.lastName}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={`w-full px-4 py-3 border ${
                    formik.touched.lastName && formik.errors.lastName
                      ? 'border-red-500 focus:ring-red-500'
                      : 'border-gray-300 dark:border-gray-700 focus:ring-gray-900 dark:focus:ring-white'
                  } bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 transition-colors`}
                  placeholder="Введіть прізвище"
                />
                {formik.touched.lastName && formik.errors.lastName && (
                  <p className="mt-1 text-sm text-red-500">{formik.errors.lastName}</p>
                )}
              </div>
            </div>

            {/* Email and Phone Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-900 dark:text-white mb-2"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={`w-full px-4 py-3 border ${
                    formik.touched.email && formik.errors.email
                      ? 'border-red-500 focus:ring-red-500'
                      : 'border-gray-300 dark:border-gray-700 focus:ring-gray-900 dark:focus:ring-white'
                  } bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 transition-colors`}
                  placeholder="example@email.com"
                />
                {formik.touched.email && formik.errors.email && (
                  <p className="mt-1 text-sm text-red-500">{formik.errors.email}</p>
                )}
              </div>

              <div>
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium text-gray-900 dark:text-white mb-2"
                >
                  Телефон
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formik.values.phone}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={`w-full px-4 py-3 border ${
                    formik.touched.phone && formik.errors.phone
                      ? 'border-red-500 focus:ring-red-500'
                      : 'border-gray-300 dark:border-gray-700 focus:ring-gray-900 dark:focus:ring-white'
                  } bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 transition-colors`}
                  placeholder="+380 XX XXX XX XX"
                />
                {formik.touched.phone && formik.errors.phone && (
                  <p className="mt-1 text-sm text-red-500">{formik.errors.phone}</p>
                )}
              </div>
            </div>

            {/* Address Field */}
            <div>
              <label
                htmlFor="address"
                className="block text-sm font-medium text-gray-900 dark:text-white mb-2"
              >
                Адреса доставки
              </label>
              <input
                type="text"
                id="address"
                name="address"
                value={formik.values.address}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={`w-full px-4 py-3 border ${
                  formik.touched.address && formik.errors.address
                    ? 'border-red-500 focus:ring-red-500'
                    : 'border-gray-300 dark:border-gray-700 focus:ring-gray-900 dark:focus:ring-white'
                } bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 transition-colors`}
                placeholder="Введіть повну адресу доставки"
              />
              {formik.touched.address && formik.errors.address && (
                <p className="mt-1 text-sm text-red-500">{formik.errors.address}</p>
              )}
            </div>
          </div>

          {/* Error Alert */}
          {showError && Object.keys(formik.errors).length > 0 && (
            <div className="mb-8 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 flex items-center justify-between">
              <p className="text-red-700 dark:text-red-400">
                О, ні! Змініть декілька речей і спробуйте знову.
              </p>
              <button
                type="button"
                onClick={() => setShowError(false)}
                className="text-red-700 dark:text-red-400 hover:text-red-900 dark:hover:text-red-300"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-12">
            <Link
              to="/cart"
              className="w-full sm:w-auto text-center px-8 py-3 border-2 border-gray-900 dark:border-white text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              Назад
            </Link>
            <button
              type="submit"
              className="w-full sm:w-auto px-8 py-3 bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors font-bold text-lg"
            >
              Продовжити
            </button>
          </div>
        </form>
      </div>
    </Layout>
  );
}
