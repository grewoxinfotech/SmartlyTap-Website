"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";

export default function LegacyProfileRoute() {
  const router = useRouter();
  const params = useParams<{ cardId: string }>();

  useEffect(() => {
    router.replace(`/r/${params.cardId}`);
  }, [params.cardId, router]);

  return null;
}