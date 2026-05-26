import { Link } from "react-router-dom";

function BookingPage() {
  return (
    <div>
      <h1>
        Go to
        <Link to={"/login"} className="font-semibold">
          Login
        </Link>
      </h1>
    </div>
  );
}

export default BookingPage;
