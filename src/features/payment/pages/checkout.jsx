import { useState } from 'react'; // Import useState for managing state
import { HiArrowRight } from 'react-icons/hi';
import { useMoveBack } from '../../../hooks/useMoveBack';
import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { chargeWalletApi } from '../apis/chargeWalletApi';
import { toast } from 'react-toastify';
import { Spinner } from '@material-tailwind/react';

const Checkout = () => {
  const [isChecked, setIsChecked] = useState(false); // State for checkbox
  const [amount, setAmount] = useState(''); // State for input amount
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  // Form submission handler
  const onSubmit = (data) => {
    console.log('Submitted amount:', +data.amount);
    mutatePayment(Number(data.amount));
    // Handle successful submission (e.g., API call or state update)
  };

  const { mutate: mutatePayment, isPending: isPaymentProcessing } = useMutation(
    {
      mutationFn: chargeWalletApi,
      onSuccess: (paymentUrl) => {
        window.location.href = paymentUrl;
      },
      onError: () => {
        toast.error('Failed to charge wallet. Please try again.', {
          type: 'error',
          toastId: 'charge-wallet-error',
        });
      },
    }
  );
  // Function to handle checkbox change
  const handleCheckboxChange = () => {
    setIsChecked(!isChecked); // Toggle checkbox state
    if (isChecked) setAmount(''); // Reset amount if unchecked
  };

  return (
    <>
      <button
        onClick={useMoveBack()}
        className="bg-brand-500 flex items-center justify-center mt-5 mr-5  text-white font-semibold py-4 px-6 rounded-lg shadow-md hover:bg-brand-600 transition duration-200"
      >
        <HiArrowRight />
        الرجوع إلى الخلف
      </button>
      <div className="h-full flex flex-col lg:flex-row mb-60 p-10 items-center justify-between ">
        {/* Main content area */}
        <div className="flex flex-col gap-6 w-full lg:w-[60%]">
          <h1 className="font-bold text-4xl text-gray-800">
            إختار وسيلة الدفع
          </h1>
          <div className="bg-gray-300 rounded-lg flex flex-col justify-center items-center p-6">
            {/* Change the background color based on checkbox state */}
            <div
              className={`w-full rounded-md p-4 shadow-lg transition-all duration-300 ${
                isChecked ? 'bg-brand-400 text-white' : 'bg-white text-gray-800'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex flex-col items-start gap-4">
                  <div className="flex gap-4 items-center">
                    <img
                      className="w-12 h-12"
                      src="/src/assets/wallet/payment-card.svg"
                      alt="Payment Method"
                    />
                    <span className="text-lg text-[2rem] font-semibold">
                      بطاقات الدفع
                    </span>
                  </div>
                  <div className="flex gap-4">
                    <img
                      className="w-16 h-auto"
                      src="/src/assets/wallet/mscard.png"
                      alt="MasterCard"
                    />
                    <img
                      className="w-16 h-auto"
                      src="/src/assets/wallet/meeza.png"
                      alt="Meeza"
                    />
                    <img
                      className="w-16 h-auto"
                      src="/src/assets/wallet/visa.png"
                      alt="Visa"
                    />
                  </div>

                  <span className="text-[1.3rem] text-gray-600">
                    قد يفرض عليك البنك رسومًا إضافية.
                  </span>
                </div>

                {/* Checkbox */}
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={handleCheckboxChange} // Handle checkbox change
                    className="w-6 h-6 accent-brand-500" // Custom checkbox styling
                  />
                </div>
              </div>
            </div>
            {/* Input for amount when checkbox is checked */}
            {isChecked && (
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="mt-4 w-full flex items-center justify-between"
              >
                <input
                  type="number"
                  {...register('amount', {
                    required: 'هذا الحقل مطلوب',
                    min: {
                      value: 1,
                      message: 'يجب أن يكون المبلغ أكبر من 0',
                    },
                  })} // Register input with validation rules
                  placeholder="أدخل المبلغ"
                  className={`border border-gray-300 rounded-md p-3 w-full lg:w-80 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 ${
                    errors.amount ? 'border-red-500' : ''
                  }`}
                />
                {errors.amount && (
                  <span className="text-red-500 text-xs">
                    {errors.amount.message}
                  </span>
                )}

                <button
                  disabled={isPaymentProcessing}
                  type="submit"
                  className="bg-green-500 flex items-center justify-center mt-5 ml-4 text-white font-semibold py-3 px-6 rounded-lg shadow-md hover:bg-green-600 transition duration-200"
                >
                  {isPaymentProcessing ? (
                    <>
                      جاري الدفع <Spinner style={{ marginRight: '8px' }} />
                    </>
                  ) : (
                    'تأكيد المبلغ'
                  )}
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Illustration on the right */}
        <div className="flex flex-col items-center justify-center mb-6 lg:mb-0">
          <img
            src="/src/assets/wallet/paymentcard.svg" // Replace with your illustration path
            alt="Payment Illustration"
            className="hidden md:block w-[40rem] -rotate-12 h-96" // Adjust width as needed
          />
        </div>
      </div>
    </>
  );
};

export default Checkout;
