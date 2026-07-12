import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <main style={{ padding: "20px" }}>
      <h1>404 - Page Not Found</h1>
      <Link to="/">Go Home</Link>
    </main>
  );
}
