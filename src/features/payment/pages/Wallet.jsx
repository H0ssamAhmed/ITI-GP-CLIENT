import { Link, Outlet } from 'react-router-dom';
import { LuWallet } from 'react-icons/lu';
import Withdraw from '../components/Withdraw';
import Deposit from '../components/Deposit';
import { useQuery } from '@tanstack/react-query';
import { getStudentBalance } from '../apis/getStudentBalance';
import { Spinner } from '@material-tailwind/react';

const Wallet = () => {
  function handleRedirect() {
    const currentURL = new URL(window.location.href);
    const params = new URLSearchParams({
      id: 225815383,
      pending: false,
      amount_cents: 100000,
      success: true,
      is_auth: false,
      is_capture: false,
      is_standalone_payment: true,
      is_voided: false,
      is_refunded: false,
      is_3d_secure: true,
      integration_id: 4843371,
      profile_id: 998274,
      has_parent_transaction: false,
      order: 254153510,
      created_at: '2024-10-12T19:21:41.740549',
      currency: 'EGP',
      merchant_commission: 0,
      discount_details: '[]',
      is_void: false,
      is_refund: false,
      error_occured: false,
      refunded_amount_cents: 0,
      captured_amount: 0,
      updated_at: '2024-10-12T19:22:16.451102',
      is_settled: false,
      bill_balanced: false,
      is_bill: false,
      owner: 1848223,
      'data.message': 'Approved',
      'source_data.type': 'card',
      'source_data.pan': 1111,
      'source_data.sub_type': 'Visa',
      acq_response_code: '00',
      txn_response_code: 'APPROVED',
      hmac: 'e625f40aaed7e8a82c573338e312e6d781ea1355f048ccfeb7569f207dfc10c3963b690bf78ef0309dfff32fdeef397e1949bc9e068cffd673008fbbebbc2849',
    });

    const redirectUrl = `${
      currentURL.origin
    }/wallet/checkout/result?${params.toString()}`;
    window.location.href = redirectUrl;
  }
  const { data: balance, isPending: isFetchingBalance } = useQuery({
    queryKey: ['balance'],
    queryFn: getStudentBalance,
    enabled: true,
    staleTime: Infinity,
    cacheTime: Infinity,
  });

  return (
    <>
      <div
        className="relative bg-no-repeat bg-cover"
        style={{
          backgroundImage:
            "linear-gradient(-90deg, rgba(246, 245, 238, 0) 0%, #818cf8 100%), url('/src/assets/wallet/wallet-pattern.svg')",
        }}
      >
        {/* Set a specific height for the gradient background */}
        <div className="flex h-[30rem] items-center justify-between max-w-[120rem] pb-20  mx-auto container">
          <div>
            <h1 className="text-[5rem] font-bold">المحفظة</h1>
            <p
              className="text-gray-500 font-semibold text-[2rem]"
              onClick={handleRedirect}
            >
              يمكنك متابعة كل عمليات الإيداع أو السحب من محفظتك.
            </p>
          </div>
          <div>
            <img
              className="hidden md:block lg:block"
              src="/src/assets/wallet/wallet-vector.svg"
              alt="Wallet Icon"
            />
          </div>
        </div>

        {/* Centered red container */}
        <div className="absolute top-[25rem] left-1/2 transform -translate-x-1/2 w-full max-w-[108rem]">
          <div className="flex justify-between items-center w-full bg-white rounded-md shadow-lg p-4">
            {isFetchingBalance ? (
              <div className="flex gap-4 items-center">
                <Spinner style={{ marginLeft: '.5rem' }} />
                <span className="text-[4rem]">جار تحميل الرصيد...</span>
              </div>
            ) : (
              <div className="flex gap-4 items-center">
                <span className="text-[4rem]">
                  {' '}
                  {balance ? balance : 'لا يوجد رصيد في محفظتك'}
                </span>
                <span className="text-[3rem]">ج.م</span>
              </div>
            )}
            <div>
              <Link
                to="/wallet/checkout"
                className="bg-yellow-300 hover:bg-yellow-200 flex items-center p-4 gap-4 justify-between rounded-full "
              >
                <LuWallet />
                <span className="font-semibold">شحن المحفظة</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white mt-36 mb-44 flex flex-col gap-4">
        <Withdraw />
        <Deposit />
      </div>
    </>
  );
};

export default Wallet;
