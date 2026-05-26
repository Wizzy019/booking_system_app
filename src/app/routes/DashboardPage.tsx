import { Link } from "react-router-dom";

function DashboardPage() {
  return (
    <div>
      <h1>
        Go back to
        <Link to={"/"} className="font-semibold">
          BookingPage
        </Link>
      </h1>
    </div>
  );
}

export default DashboardPage;
