import { Suspense } from "react";
import HomeClient from "./home-client";

function Loading() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="rounded-xl2 border border-iefp-line bg-white/70 backdrop-blur shadow-soft p-6">
        <p className="text-sm text-iefp-muted">a carregar…</p>
      </div>
    </div>
  );
}

export default function Page() {
  return (
    <Suspense fallback={<Loading />}>
      <HomeClient />
    </Suspense>
  );
}
