const Withdraw = () => {
  return (
    <div className="flex flex-col lg:flex-row items-center justify-between p-6 mx-32 bg-red-400 rounded-xl shadow-lg transition-transform transform hover:scale-105">
      <div className="flex flex-col items-center font-bold text-2xl text-white">
        <span>-50 ج.م</span>
        <span className="text-sm text-gray-200">عملية سحب</span>
      </div>

      <div>
        <span className="text-lg text-white">15/10/2025</span>
      </div>
    </div>
  );
};

export default Withdraw;
