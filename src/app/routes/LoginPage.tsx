import { Link } from "react-router-dom";

export default function LoginPage() {
  return (
    <div>
      <h1>
        Go to
        <Link to={"/dashboard"} className="font-semibold">
          Dashboard
        </Link>
      </h1>
    </div>
  );
}
