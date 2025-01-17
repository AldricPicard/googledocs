"use client";

import { ReactNode } from "react";
import {
  LiveblocksProvider,
  RoomProvider,
  ClientSideSuspense,
} from "@liveblocks/react/suspense";
import { useParams } from "next/navigation";

export function Room({ children }: { children: ReactNode }) {
    const params = useParams();
    
  return (
    <LiveblocksProvider publicApiKey={"pk_dev_58BoDEzAdw6H_FZWJfRQkLACgYNbLerrsMAtrsnil_aioEgZoBwbxKF3R0iIYZ56"}>
      <RoomProvider id={params.documentId as string}>
        <ClientSideSuspense fallback={<div>Loading…</div>}>
          {children}
        </ClientSideSuspense>
      </RoomProvider>
    </LiveblocksProvider>
  );
}