import { Link } from "react-router-dom";
import LinkWithUnderline from "./LinkWithUnderline";

function SeeMore() {
  return (
    <div className="text-center"  >
      <Link to="/courses">
      <LinkWithUnderline fontSize={`2rem`} >
        شاهد المزيد &larr;
      </LinkWithUnderline>
      </Link>
     
    </div>
  );
}

export default SeeMore;
