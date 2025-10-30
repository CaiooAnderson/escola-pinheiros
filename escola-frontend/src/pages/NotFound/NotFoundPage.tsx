import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background text-center px-4">
      <h1 className="text-6xl font-primary font-bold text-primary mb-4 animate-pulse">
        404
      </h1>
      <p className="text-xl font-secondary text-gray-600 mb-6">
        Ops! A página que você procura não existe.
      </p>
      <Link
        to="/"
        className="px-6 py-3 rounded-lg bg-primary text-white font-semibold hover:bg-primary-dark transition"
      >
        Voltar para a página inicial
      </Link>
    </div>
  );
}
