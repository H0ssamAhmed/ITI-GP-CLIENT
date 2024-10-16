import { useQuery } from "@tanstack/react-query";
import { getTransactionHistoryApi } from "../apis/getTransactionHistoryApi";
import { Spinner } from "@material-tailwind/react";

const TransactionCard = ({ trans, type }) => {
  const colors = {
    completed: "bg-green-400",
    pending: "bg-gray-500",
    failed: "bg-red-400",
  };
  
  return (
    <div className={`flex flex-col items-center justify-between p-6 mx-32 transition-transform transform ${colors[type]} shadow-lg lg:flex-row rounded-xl hover:scale-105`}>
      <div className="flex flex-col items-center text-2xl font-bold text-white">
        <span>+{trans.amount} ج.م</span>
        <span className="text-sm text-gray-200 mt-2">{`عملية ${type === 'completed' ? 'إيداع' : type === 'pending' ? 'معلقة' : 'فاشلة'}`}</span>
      </div>
      <div>
        <span className="text-lg text-white">
          {trans.transactionDate.split("T")[0]}
        </span>
      </div>
    </div>
  );
};

const Deposit = () => {
  const { data: transactions, isLoading } = useQuery({
    queryKey: ["transactions_history"],
    queryFn: getTransactionHistoryApi,
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center mt-24 text-4xl">
        <Spinner style={{ marginLeft: "10px" }} /> جاري تحميل المعاملات...
      </div>
    );
  }

  if (!transactions?.length) {
    return <div className="flex items-center justify-center mt-24 text-4xl">لا يوجد معاملات</div>;
  }

  const categorizedTransactions = {
    completed: transactions.filter(transaction => transaction.type === "completed"),
    pending: transactions.filter(transaction => transaction.type === "pending"),
    failed: transactions.filter(transaction => transaction.type === "failed"),
  };

  return (
    <>
      {Object.entries(categorizedTransactions).map(([type, trans]) =>
        trans.map(transaction => (
          <TransactionCard key={transaction.id} trans={transaction} type={type} />
        ))
      )}
    </>
  );
};

export default Deposit;
