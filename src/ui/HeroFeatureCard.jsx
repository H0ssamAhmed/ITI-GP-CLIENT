function HeroFeatureCard({ children }) {
  return (
    <div className=" px-3 w-[15rem] lg:w-[20rem] h-[9rem] rounded-lg flex items-center justify-center gap-y-4 gap-x-4 bg-brand-200">
      {children}
    </div>
  );
}

export default HeroFeatureCard;
