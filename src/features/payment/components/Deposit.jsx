import { useQuery } from "@tanstack/react-query";
import { getTransactionHistoryApi } from "../apis/getTransactionHistoryApi";
import { Spinner } from "@material-tailwind/react";

const Deposit = () => {
  const { data: transactions, isPending: isFetchingTransactions } = useQuery({
    queryKey: ["transactions_history"],
    queryFn: getTransactionHistoryApi,
  });

  if (isFetchingTransactions) {
    return (
      <div className="flex items-center justify-center mt-24 text-4xl">
        <Spinner style={{ marginLeft: "10px" }} /> جاري تحميل المعاملات...
      </div>
    );
  }

  if (!transactions?.length) {
    return <div className="flex items-center justify-center mt-24 text-4xl">لا يوجد معاملات</div>;
  }
  const validTransactions = transactions.filter(
    (transaction) => transaction.type === "completed"
  );

  return (
    <>
      {validTransactions.map((trans) => (
        <div key={trans.id}>
          <div className="flex flex-col items-center justify-between p-6 mx-32 transition-transform transform bg-green-400 shadow-lg lg:flex-row rounded-xl hover:scale-105">
            <>
              <div className="flex flex-col items-center text-2xl font-bold text-white">
                <span>`+{trans.amount}` ج.م</span>
                <span className="text-sm text-gray-200">عملية إيداع</span>
              </div>

              <div>
                <span className="text-lg text-white">
                  {trans.transactionDate.split("T")[0]}
                </span>
              </div>
            </>
          </div>
        </div>
      ))}
    </>
  );
};

export default Deposit;
