import { Link } from "react-router-dom";
export default function NotFound() {
  return (
    <div className="text-center p-12">
      <h1 className="font-extrabold text-9xl text-emerald-800">404</h1>
      <h4>Pagina non trovata</h4>
      <Link to="/">è possibile tornare alla Home</Link>
    </div>
  );
}
