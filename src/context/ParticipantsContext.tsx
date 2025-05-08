"use client";

import { createContext, useContext, useCallback, useState } from "react";

interface ParticipantsContextType {
  refreshParticipants: () => Promise<void>;
  isRefreshing: boolean;
}

const ParticipantsContext = createContext<ParticipantsContextType | undefined>(
  undefined,
);

export function ParticipantsProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isRefreshing, setIsRefreshing] = useState(false);

  const refreshParticipants = useCallback(async () => {
    setIsRefreshing(true);
    await new Promise((resolve) => setTimeout(resolve, 500));
    setIsRefreshing(false);
  }, []);

  return (
    <ParticipantsContext.Provider value={{ refreshParticipants, isRefreshing }}>
      {children}
    </ParticipantsContext.Provider>
  );
}

export function useParticipantsContext() {
  const context = useContext(ParticipantsContext);
  if (context === undefined) {
    throw new Error(
      "useParticipantsContext must be used within a ParticipantsProvider",
    );
  }
  return context;
}
