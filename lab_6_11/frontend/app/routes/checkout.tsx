import type { Route } from "./+types/checkout";
import { Layout } from "../components/Layout";
import { ErrorMessage } from "../components/ErrorMessage";
import { FormInput } from "../components/FormInput";
import { FormSelect } from "../components/FormSelect";
import { useAppSelector, useAppDispatch } from "../store/hooks";
import { selectCartItems, selectCartTotalAmount, clearCart } from "../store/cartSlice";
import { Link, useNavigate } from "react-router";
import { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { carriersApi, type Carrier } from "../services/carriers.api";
import { carrierLocationsApi, type CarrierLocation } from "../services/carrierLocations.api";
import { ordersApi } from "../services/orders.api";
import { PAYMENT_METHOD_OPTIONS } from "../utils/filters";
import { ProtectedRoute } from "../components/ProtectedRoute";

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
  carrierId: string;
  pickupLocation: string;
  paymentMethod: string;
}

const validationSchema = Yup.object({
  firstName: Yup.string()
    .trim()
    .required("Введіть ім'я")
    .max(30, "Ім'я не повинно перевищувати 30 символів"),
  lastName: Yup.string()
    .trim()
    .required("Введіть прізвище")
    .max(30, "Прізвище не повинно перевищувати 30 символів"),
  email: Yup.string()
    .trim()
    .required("Введіть email")
    .email("Невірний формат email"),
  phone: Yup.string()
    .required("Введіть телефон")
    .test('phone-format', 'Невірний формат телефону. Очікується: +380XXXXXXXXX або 0XXXXXXXXX', (value) => {
      if (!value) return false;
      const cleaned = value.replace(/[\s\-\(\)]/g, '');
      return /^(\+?38)?0\d{9}$/.test(cleaned);
    }),
  city: Yup.string()
    .trim()
    .required("Введіть місто"),
  carrierId: Yup.string()
    .required("Оберіть спосіб доставки"),
  pickupLocation: Yup.string()
    .required("Оберіть місце видачі"),
  paymentMethod: Yup.string()
    .required("Оберіть спосіб оплати"),
});

export default function Checkout() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const items = useAppSelector(selectCartItems);
  const [showError, setShowError] = useState(false);
  const [carriers, setCarriers] = useState<Carrier[]>([]);
  const [carrierLocations, setCarrierLocations] = useState<CarrierLocation[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  // Fetch active carriers on component mount
  useEffect(() => {
    const fetchCarriers = async () => {
      try {
        const activeCarriers = await carriersApi.getAll();
        setCarriers(activeCarriers);
      } catch (error) {
        console.error('Failed to fetch carriers:', error);
      }
    };
    fetchCarriers();
  }, []);

  const formik = useFormik<FormValues>({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      city: '',
      carrierId: '',
      pickupLocation: '',
      paymentMethod: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      setIsSubmitting(true);
      setSubmitError(null);

      try {
        // Prepare order items from cart
        const orderItems = items.map(item => ({
          productId: item.product.id,
          quantity: item.quantity,
        }));

        // Create order
        const orderData = {
          firstName: values.firstName,
          lastName: values.lastName,
          email: values.email,
          phone: values.phone,
          city: values.city,
          carrierId: values.carrierId ? parseInt(values.carrierId) : null,
          pickupLocation: values.pickupLocation,
          paymentMethod: values.paymentMethod as any,
          items: orderItems,
        };

        const createdOrder = await ordersApi.create(orderData);
        dispatch(clearCart());
        navigate('/order-success', {
          state: { order: createdOrder }
        });
      } catch (error: any) {
        console.error('Failed to create order:', error);
        setSubmitError(error.response?.data?.message || 'Не вдалося оформити замовлення. Спробуйте ще раз.');
      } finally {
        setIsSubmitting(false);
      }
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

  // Fetch carrier locations when carrier is selected
  useEffect(() => {
    const fetchLocations = async () => {
      if (formik.values.carrierId) {
        try {
          const locations = await carrierLocationsApi.getAll({
            carrierId: parseInt(formik.values.carrierId)
          });
          setCarrierLocations(locations);
          // Reset pickup location when carrier changes
          formik.setFieldValue('pickupLocation', '');
        } catch (error) {
          console.error('Failed to fetch carrier locations:', error);
          setCarrierLocations([]);
        }
      } else {
        setCarrierLocations([]);
        formik.setFieldValue('pickupLocation', '');
      }
    };
    fetchLocations();
  }, [formik.values.carrierId]);

  if (items.length === 0) {
    return (
      <ProtectedRoute>
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
      </ProtectedRoute>
    );
  }

  return (
    <ProtectedRoute>
    <Layout>
      <div className="container mx-auto px-4 pt-24 pb-12 bg-white dark:bg-gray-950 min-h-screen">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white text-center mb-12">
          Оформлення замовлення
        </h1>

        <form onSubmit={handleSubmit} className="max-w-2xl mx-auto">
          <div className="space-y-6 mb-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <FormInput
                label="Ім'я"
                type="text"
                id="firstName"
                name="firstName"
                value={formik.values.firstName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.errors.firstName}
                touched={formik.touched.firstName}
                placeholder="Введіть ім'я"
              />

              <FormInput
                label="Прізвище"
                type="text"
                id="lastName"
                name="lastName"
                value={formik.values.lastName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.errors.lastName}
                touched={formik.touched.lastName}
                placeholder="Введіть прізвище"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <FormInput
                label="Email"
                type="email"
                id="email"
                name="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.errors.email}
                touched={formik.touched.email}
                placeholder="example@email.com"
              />

              <FormInput
                label="Телефон"
                type="tel"
                id="phone"
                name="phone"
                value={formik.values.phone}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.errors.phone}
                touched={formik.touched.phone}
                placeholder="+380 XX XXX XX XX"
              />
            </div>

            <FormInput
              label="Місто"
              type="text"
              id="city"
              name="city"
              value={formik.values.city}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.errors.city}
              touched={formik.touched.city}
              placeholder="Введіть місто"
            />

            <FormSelect
              label="Спосіб доставки"
              id="carrierId"
              name="carrierId"
              value={formik.values.carrierId}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.errors.carrierId}
              touched={formik.touched.carrierId}
            >
              <option value="">Оберіть спосіб доставки</option>
              {carriers.map((carrier) => (
                <option key={carrier.id} value={carrier.id}>
                  {carrier.name}
                </option>
              ))}
            </FormSelect>

            {formik.values.carrierId && (
              <FormSelect
                label={carriers.find(c => c.id === parseInt(formik.values.carrierId))?.code === 'self-pickup'
                  ? 'Локація магазину'
                  : 'Відділення перевізника'}
                id="pickupLocation"
                name="pickupLocation"
                value={formik.values.pickupLocation}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.errors.pickupLocation}
                touched={formik.touched.pickupLocation}
              >
                <option value="">Оберіть локацію</option>
                {carrierLocations.map((location) => (
                  <option key={location.id} value={location.id}>
                    {location.name} - {location.address}
                  </option>
                ))}
              </FormSelect>
            )}

            <FormSelect
              label="Спосіб оплати"
              id="paymentMethod"
              name="paymentMethod"
              value={formik.values.paymentMethod}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.errors.paymentMethod}
              touched={formik.touched.paymentMethod}
            >
              <option value="">Оберіть спосіб оплати</option>
              {PAYMENT_METHOD_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </FormSelect>
          </div>

          {showError && Object.keys(formik.errors).length > 0 && (
            <ErrorMessage
              message="О, ні! Скоригуйте введені дані і спробуйте знову."
              onClose={() => setShowError(false)}
            />
          )}

          {submitError && (
            <ErrorMessage
              message={submitError}
              onClose={() => setSubmitError(null)}
            />
          )}

          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-12">
            <Link
              to="/cart"
              className="w-full sm:w-auto text-center px-8 py-3 border-2 border-gray-900 dark:border-white text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              Назад
            </Link>
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full sm:w-auto px-8 py-3 bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors font-bold text-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Обробка...' : 'Продовжити'}
            </button>
          </div>
        </form>
      </div>
    </Layout>
    </ProtectedRoute>
  );
}
