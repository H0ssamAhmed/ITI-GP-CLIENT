import { Link, Outlet } from "react-router-dom";
import { LuWallet } from "react-icons/lu";
import Withdraw from "../components/Withdraw";
import Deposit from "../components/Deposit";

const Wallet = () => {
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
            <p className="text-gray-500 font-semibold text-[2rem]">
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
            <div className="flex gap-4 items-center">
              <span className="text-[4rem]">0</span>
              <span className="text-[3rem]">ج.م</span>
            </div>
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
