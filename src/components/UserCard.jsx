const UserCard = ({ type }) => {
  return (
    <div className="rounded-2xl odd:bg-brand-200 even:bg-yellow-200">
      <div className="felx">
        <span></span>
        <img src="/src/assets/dashboard/me" />
      </div>
    </div>
  );
};

export default UserCard;
