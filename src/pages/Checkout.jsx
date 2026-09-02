import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { CreditCard, Truck, Shield, ArrowLeft, Smartphone } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { formatPrice } from '../data/products';

export default function Checkout() {
  const { cart, cartTotal, clearCart } = useStore();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    firstName: '', lastName: '', email: '', phone: '',
    address: '', city: '', state: '', pincode: '',
    payment: 'card',
    cardNumber: '', cardName: '', cardExpiry: '', cardCvv: '',
    upiId: '',
  });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  if (cart.length === 0) {
    return (
      <div className="pt-32 pb-20 text-center">
        <h1 className="font-serif text-3xl mb-4">No items to checkout</h1>
        <Link to="/store" className="text-gold-600 hover:underline">Go to Store</Link>
      </div>
    );
  }

  const shipping = cartTotal >= 2999 ? 0 : 149;
  const total = cartTotal + shipping;

  const handleChange = (e) => {
    let { name, value } = e.target;

    // Card number formatting
    if (name === 'cardNumber') {
      value = value.replace(/\D/g, '').slice(0, 16);
      value = value.replace(/(\d{4})(?=\d)/g, '$1 ').trim();
    }
    if (name === 'cardExpiry') {
      value = value.replace(/\D/g, '').slice(0, 4);
      if (value.length >= 3) value = value.slice(0, 2) + '/' + value.slice(2);
    }
    if (name === 'cardCvv') {
      value = value.replace(/\D/g, '').slice(0, 4);
    }

    setForm({ ...form, [name]: value });
    if (errors[name]) setErrors({ ...errors, [name]: '' });
  };

  const validate = () => {
    const e = {};
    if (!form.firstName.trim()) e.firstName = 'Required';
    if (!form.lastName.trim()) e.lastName = 'Required';
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) e.email = 'Valid email required';
    if (!form.phone.trim() || form.phone.length < 10) e.phone = 'Valid phone required';
    if (!form.address.trim()) e.address = 'Required';
    if (!form.city.trim()) e.city = 'Required';
    if (!form.state.trim()) e.state = 'Required';
    if (!form.pincode.trim() || form.pincode.length < 6) e.pincode = 'Valid pincode required';

    if (form.payment === 'card') {
      const digits = form.cardNumber.replace(/\s/g, '');
      if (digits.length < 16) e.cardNumber = 'Enter 16-digit card number';
      if (!form.cardName.trim()) e.cardName = 'Name on card required';
      if (!/^\d{2}\/\d{2}$/.test(form.cardExpiry)) e.cardExpiry = 'Use MM/YY';
      if (form.cardCvv.length < 3) e.cardCvv = 'Invalid CVV';
    }
    if (form.payment === 'upi') {
      if (!form.upiId.trim() || !/^[\w.-]+@[\w]+$/.test(form.upiId)) {
        e.upiId = 'Enter valid UPI ID (e.g. name@upi)';
      }
    }

    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    setSubmitting(true);
    setTimeout(() => {
      clearCart();
      navigate('/order-success');
    }, 1200);
  };

  const inputClass = (field) =>
    `w-full px-4 py-3 rounded-lg border bg-white text-sm focus:outline-none focus:border-gold-400 transition-colors ${
      errors[field] ? 'border-maroon-400' : 'border-gold-200'
    }`;

  return (
    <div className="pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link to="/cart" className="inline-flex items-center gap-2 text-sm text-charcoal/60 hover:text-gold-600 mb-8">
          <ArrowLeft size={16} /> Back to Cart
        </Link>
        <h1 className="font-serif text-4xl mb-10">Checkout</h1>

        <form onSubmit={handleSubmit} className="grid lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2 space-y-8">
            {/* Contact */}
            <section className="bg-white rounded-xl border border-gold-100 p-6">
              <h2 className="font-serif text-xl mb-5">Contact Information</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-charcoal/60 mb-1.5">First Name</label>
                  <input name="firstName" value={form.firstName} onChange={handleChange} className={inputClass('firstName')} />
                  {errors.firstName && <p className="text-xs text-maroon-600 mt-1">{errors.firstName}</p>}
                </div>
                <div>
                  <label className="block text-xs font-medium text-charcoal/60 mb-1.5">Last Name</label>
                  <input name="lastName" value={form.lastName} onChange={handleChange} className={inputClass('lastName')} />
                  {errors.lastName && <p className="text-xs text-maroon-600 mt-1">{errors.lastName}</p>}
                </div>
                <div>
                  <label className="block text-xs font-medium text-charcoal/60 mb-1.5">Email</label>
                  <input type="email" name="email" value={form.email} onChange={handleChange} className={inputClass('email')} />
                  {errors.email && <p className="text-xs text-maroon-600 mt-1">{errors.email}</p>}
                </div>
                <div>
                  <label className="block text-xs font-medium text-charcoal/60 mb-1.5">Phone</label>
                  <input name="phone" value={form.phone} onChange={handleChange} className={inputClass('phone')} />
                  {errors.phone && <p className="text-xs text-maroon-600 mt-1">{errors.phone}</p>}
                </div>
              </div>
            </section>

            {/* Shipping */}
            <section className="bg-white rounded-xl border border-gold-100 p-6">
              <h2 className="font-serif text-xl mb-5 flex items-center gap-2">
                <Truck size={20} className="text-gold-500" /> Shipping Address
              </h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-medium text-charcoal/60 mb-1.5">Address</label>
                  <input name="address" value={form.address} onChange={handleChange} className={inputClass('address')} />
                  {errors.address && <p className="text-xs text-maroon-600 mt-1">{errors.address}</p>}
                </div>
                <div className="grid sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-charcoal/60 mb-1.5">City</label>
                    <input name="city" value={form.city} onChange={handleChange} className={inputClass('city')} />
                    {errors.city && <p className="text-xs text-maroon-600 mt-1">{errors.city}</p>}
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-charcoal/60 mb-1.5">State</label>
                    <input name="state" value={form.state} onChange={handleChange} className={inputClass('state')} />
                    {errors.state && <p className="text-xs text-maroon-600 mt-1">{errors.state}</p>}
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-charcoal/60 mb-1.5">Pincode</label>
                    <input name="pincode" value={form.pincode} onChange={handleChange} className={inputClass('pincode')} />
                    {errors.pincode && <p className="text-xs text-maroon-600 mt-1">{errors.pincode}</p>}
                  </div>
                </div>
              </div>
            </section>

            {/* Payment */}
            <section className="bg-white rounded-xl border border-gold-100 p-6">
              <h2 className="font-serif text-xl mb-5 flex items-center gap-2">
                <CreditCard size={20} className="text-gold-500" /> Payment Method
              </h2>
              <div className="space-y-3 mb-4">
                {[
                  { id: 'card', label: 'Credit / Debit Card', icon: CreditCard },
                  { id: 'upi', label: 'UPI', icon: Smartphone },
                  { id: 'cod', label: 'Cash on Delivery', icon: Truck },
                ].map((m) => (
                  <label
                    key={m.id}
                    className={`flex items-center gap-3 p-4 rounded-lg border cursor-pointer transition-all duration-200 ${
                      form.payment === m.id
                        ? 'border-gold-400 bg-gold-50 shadow-sm'
                        : 'border-gold-100 hover:border-gold-200'
                    }`}
                  >
                    <input
                      type="radio"
                      name="payment"
                      value={m.id}
                      checked={form.payment === m.id}
                      onChange={handleChange}
                      className="accent-gold-500"
                    />
                    <m.icon size={18} className={form.payment === m.id ? 'text-gold-600' : 'text-charcoal/50'} />
                    <span className="text-sm font-medium">{m.label}</span>
                  </label>
                ))}
              </div>

              {/* Dynamic payment forms */}
              <AnimatePresence mode="wait">
                {form.payment === 'card' && (
                  <motion.div
                    key="card-form"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="pt-4 border-t border-gold-100 space-y-4">
                      <p className="text-sm font-medium text-charcoal/70 mb-1">Card Details</p>
                      <div>
                        <label className="block text-xs font-medium text-charcoal/60 mb-1.5">Card Number</label>
                        <input
                          name="cardNumber"
                          value={form.cardNumber}
                          onChange={handleChange}
                          placeholder="1234 5678 9012 3456"
                          className={inputClass('cardNumber')}
                          inputMode="numeric"
                          autoComplete="cc-number"
                        />
                        {errors.cardNumber && <p className="text-xs text-maroon-600 mt-1">{errors.cardNumber}</p>}
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-charcoal/60 mb-1.5">Name on Card</label>
                        <input
                          name="cardName"
                          value={form.cardName}
                          onChange={handleChange}
                          placeholder="Full name as on card"
                          className={inputClass('cardName')}
                          autoComplete="cc-name"
                        />
                        {errors.cardName && <p className="text-xs text-maroon-600 mt-1">{errors.cardName}</p>}
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-medium text-charcoal/60 mb-1.5">Expiry (MM/YY)</label>
                          <input
                            name="cardExpiry"
                            value={form.cardExpiry}
                            onChange={handleChange}
                            placeholder="MM/YY"
                            className={inputClass('cardExpiry')}
                            inputMode="numeric"
                            autoComplete="cc-exp"
                          />
                          {errors.cardExpiry && <p className="text-xs text-maroon-600 mt-1">{errors.cardExpiry}</p>}
                        </div>
                        <div>
                          <label className="block text-xs font-medium text-charcoal/60 mb-1.5">CVV</label>
                          <input
                            name="cardCvv"
                            value={form.cardCvv}
                            onChange={handleChange}
                            placeholder="123"
                            type="password"
                            className={inputClass('cardCvv')}
                            inputMode="numeric"
                            autoComplete="cc-csc"
                          />
                          {errors.cardCvv && <p className="text-xs text-maroon-600 mt-1">{errors.cardCvv}</p>}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {form.payment === 'upi' && (
                  <motion.div
                    key="upi-form"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="pt-4 border-t border-gold-100 space-y-4">
                      <p className="text-sm font-medium text-charcoal/70 mb-1">UPI Details</p>
                      <div>
                        <label className="block text-xs font-medium text-charcoal/60 mb-1.5">UPI ID</label>
                        <input
                          name="upiId"
                          value={form.upiId}
                          onChange={handleChange}
                          placeholder="yourname@upi / @paytm / @ybl"
                          className={inputClass('upiId')}
                          autoComplete="off"
                        />
                        {errors.upiId && <p className="text-xs text-maroon-600 mt-1">{errors.upiId}</p>}
                      </div>
                      <p className="text-xs text-charcoal/50">
                        You will receive a payment request on your UPI app after placing the order.
                      </p>
                    </div>
                  </motion.div>
                )}

                {form.payment === 'cod' && (
                  <motion.div
                    key="cod-info"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="pt-4 border-t border-gold-100">
                      <p className="text-sm text-charcoal/60">
                        Pay with cash when your order is delivered. Please keep exact change ready if possible.
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </section>
          </div>

          {/* Order summary */}
          <div>
            <div className="sticky top-28 bg-white rounded-xl border border-gold-100 p-6">
              <h2 className="font-serif text-xl mb-5">Order Summary</h2>
              <div className="space-y-3 mb-5 max-h-60 overflow-y-auto">
                {cart.map((item) => (
                  <div key={item.id} className="flex gap-3 text-sm">
                    <img src={item.images[0]} alt="" className="w-14 h-16 object-cover rounded" />
                    <div className="flex-1 min-w-0">
                      <p className="line-clamp-1 font-medium">{item.name}</p>
                      <p className="text-charcoal/50">Qty: {item.quantity}</p>
                    </div>
                    <p className="font-medium shrink-0">{formatPrice(item.price * item.quantity)}</p>
                  </div>
                ))}
              </div>
              <div className="border-t border-gold-100 pt-4 space-y-2 text-sm mb-6">
                <div className="flex justify-between">
                  <span className="text-charcoal/60">Subtotal</span>
                  <span>{formatPrice(cartTotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-charcoal/60">Shipping</span>
                  <span>{shipping === 0 ? 'Free' : formatPrice(shipping)}</span>
                </div>
                <div className="flex justify-between text-base font-semibold pt-2 border-t border-gold-100">
                  <span>Total</span>
                  <span>{formatPrice(total)}</span>
                </div>
              </div>
              <button
                type="submit"
                disabled={submitting}
                className="w-full bg-gold-500 hover:bg-gold-400 disabled:opacity-60 text-charcoal font-semibold py-3.5 rounded-full transition-colors flex items-center justify-center gap-2"
              >
                {submitting ? 'Processing...' : 'Place Order'}
              </button>
              <p className="flex items-center justify-center gap-1.5 text-xs text-charcoal/40 mt-4">
                <Shield size={12} /> Secure checkout
              </p>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
