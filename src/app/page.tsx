import Link from "next/link";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <Link href="/documents/50" className="hover:underline">Hello clique içi pour voir les documents</Link>
    </div>
  );
}
