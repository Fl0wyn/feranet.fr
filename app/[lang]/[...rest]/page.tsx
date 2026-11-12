import { notFound } from "next/navigation";

// Toute URL inconnue affiche la page 404 dans le layout (et donc la bonne langue).
export default function CatchAll() {
  notFound();
}
