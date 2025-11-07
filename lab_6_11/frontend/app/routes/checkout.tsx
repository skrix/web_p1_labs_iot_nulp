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
  city: string;
  deliveryMethod: string;
  pickupLocation: string;
  paymentMethod: string;
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
      city: '',
      deliveryMethod: '',
      pickupLocation: '',
      paymentMethod: '',
    },
    validate: (values) => {
      const errors: Partial<Record<keyof FormValues, string>> = {};

      if (!values.firstName.trim()) {
        errors.firstName = "Введіть ім'я";
      } else if (values.firstName.length > 30) {
        errors.firstName = "Ім'я не повинно перевищувати 30 символів";
      }

      if (!values.lastName.trim()) {
        errors.lastName = "Введіть прізвище";
      } else if (values.lastName.length > 30) {
        errors.lastName = "Прізвище не повинно перевищувати 30 символів";
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

      if (!values.city.trim()) {
        errors.city = "Введіть місто";
      }

      if (!values.deliveryMethod) {
        errors.deliveryMethod = "Оберіть спосіб доставки";
      }

      if (!values.pickupLocation) {
        errors.pickupLocation = "Оберіть місце видачі";
      }

      if (!values.paymentMethod) {
        errors.paymentMethod = "Оберіть спосіб оплати";
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

            {/* City Field */}
            <div>
              <label
                htmlFor="city"
                className="block text-sm font-medium text-gray-900 dark:text-white mb-2"
              >
                Місто
              </label>
              <input
                type="text"
                id="city"
                name="city"
                value={formik.values.city}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={`w-full px-4 py-3 border ${
                  formik.touched.city && formik.errors.city
                    ? 'border-red-500 focus:ring-red-500'
                    : 'border-gray-300 dark:border-gray-700 focus:ring-gray-900 dark:focus:ring-white'
                } bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 transition-colors`}
                placeholder="Введіть місто"
              />
              {formik.touched.city && formik.errors.city && (
                <p className="mt-1 text-sm text-red-500">{formik.errors.city}</p>
              )}
            </div>

            {/* Delivery Method */}
            <div>
              <label
                htmlFor="deliveryMethod"
                className="block text-sm font-medium text-gray-900 dark:text-white mb-2"
              >
                Спосіб доставки
              </label>
              <select
                id="deliveryMethod"
                name="deliveryMethod"
                value={formik.values.deliveryMethod}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={`w-full px-4 py-3 border ${
                  formik.touched.deliveryMethod && formik.errors.deliveryMethod
                    ? 'border-red-500 focus:ring-red-500'
                    : 'border-gray-300 dark:border-gray-700 focus:ring-gray-900 dark:focus:ring-white'
                } bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 transition-colors appearance-none cursor-pointer`}
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3E%3Cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3E%3C/svg%3E")`,
                  backgroundPosition: 'right 0.5rem center',
                  backgroundRepeat: 'no-repeat',
                  backgroundSize: '1.5em 1.5em',
                  paddingRight: '2.5rem',
                }}
              >
                <option value="">Оберіть спосіб доставки</option>
                <option value="nova-poshta">Нова Пошта</option>
                <option value="ukrposhta">Укрпошта</option>
                <option value="meest">Meest Express</option>
                <option value="self-pickup">Самовивіз</option>
              </select>
              {formik.touched.deliveryMethod && formik.errors.deliveryMethod && (
                <p className="mt-1 text-sm text-red-500">{formik.errors.deliveryMethod}</p>
              )}
            </div>

            {/* Pickup Location */}
            {formik.values.deliveryMethod && (
              <div>
                <label
                  htmlFor="pickupLocation"
                  className="block text-sm font-medium text-gray-900 dark:text-white mb-2"
                >
                  {formik.values.deliveryMethod === 'self-pickup'
                    ? 'Локація магазину'
                    : 'Відділення перевізника'}
                </label>
                <select
                  id="pickupLocation"
                  name="pickupLocation"
                  value={formik.values.pickupLocation}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={`w-full px-4 py-3 border ${
                    formik.touched.pickupLocation && formik.errors.pickupLocation
                      ? 'border-red-500 focus:ring-red-500'
                      : 'border-gray-300 dark:border-gray-700 focus:ring-gray-900 dark:focus:ring-white'
                  } bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 transition-colors appearance-none cursor-pointer`}
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3E%3Cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3E%3C/svg%3E")`,
                    backgroundPosition: 'right 0.5rem center',
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: '1.5em 1.5em',
                    paddingRight: '2.5rem',
                  }}
                >
                  <option value="">Оберіть локацію</option>
                  {formik.values.deliveryMethod === 'nova-poshta' ? (
                    <>
                      <option value="np-1">Відділення №1 - вул. Хрещатик, 1</option>
                      <option value="np-2">Відділення №5 - вул. Шевченка, 15</option>
                      <option value="np-3">Відділення №12 - просп. Перемоги, 42</option>
                      <option value="np-4">Відділення №20 - вул. Лесі Українки, 8</option>
                      <option value="np-5">Відділення №33 - вул. Бандери, 25</option>
                    </>
                  ) : formik.values.deliveryMethod === 'ukrposhta' ? (
                    <>
                      <option value="up-1">Відділення №1 - вул. Центральна, 5</option>
                      <option value="up-2">Відділення №3 - вул. Грушевського, 12</option>
                      <option value="up-3">Відділення №7 - просп. Незалежності, 30</option>
                      <option value="up-4">Відділення №10 - вул. Франка, 18</option>
                    </>
                  ) : formik.values.deliveryMethod === 'meest' ? (
                    <>
                      <option value="meest-1">Відділення №1 - вул. Городоцька, 25</option>
                      <option value="meest-2">Відділення №2 - вул. Наукова, 7</option>
                      <option value="meest-3">Відділення №5 - просп. В. Чорновола, 53</option>
                      <option value="meest-4">Відділення №8 - вул. Стрийська, 120</option>
                    </>
                  ) : formik.values.deliveryMethod === 'self-pickup' ? (
                    <>
                      <option value="shop-center">Магазин - вул. Театральна, 10 (Центр)</option>
                      <option value="shop-mall">Магазин - ТРЦ King Cross Leopolis</option>
                      <option value="shop-victoria">Магазин - ТРЦ Victoria Gardens</option>
                    </>
                  ) : null}
                </select>
                {formik.touched.pickupLocation && formik.errors.pickupLocation && (
                  <p className="mt-1 text-sm text-red-500">{formik.errors.pickupLocation}</p>
                )}
              </div>
            )}

            {/* Payment Method */}
            <div>
              <label
                htmlFor="paymentMethod"
                className="block text-sm font-medium text-gray-900 dark:text-white mb-2"
              >
                Спосіб оплати
              </label>
              <select
                id="paymentMethod"
                name="paymentMethod"
                value={formik.values.paymentMethod}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={`w-full px-4 py-3 border ${
                  formik.touched.paymentMethod && formik.errors.paymentMethod
                    ? 'border-red-500 focus:ring-red-500'
                    : 'border-gray-300 dark:border-gray-700 focus:ring-gray-900 dark:focus:ring-white'
                } bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 transition-colors appearance-none cursor-pointer`}
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3E%3Cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3E%3C/svg%3E")`,
                  backgroundPosition: 'right 0.5rem center',
                  backgroundRepeat: 'no-repeat',
                  backgroundSize: '1.5em 1.5em',
                  paddingRight: '2.5rem',
                }}
              >
                <option value="">Оберіть спосіб оплати</option>
                <option value="cash">Готівка при отриманні</option>
                <option value="card">Банківська карта (Visa/Mastercard)</option>
                <option value="online">Онлайн оплата (Apple Pay/Google Pay)</option>
                <option value="bank-transfer">Банківський переказ</option>
              </select>
              {formik.touched.paymentMethod && formik.errors.paymentMethod && (
                <p className="mt-1 text-sm text-red-500">{formik.errors.paymentMethod}</p>
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
