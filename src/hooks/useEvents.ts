// hooks/useEvents.ts
"use client";

import { useState, useEffect } from "react";
import { IEventData, IEventResponse } from "@/lib/types/Event";

interface UseEventsResult {
  events: IEventData[];
  isLoading: boolean;
  isError: boolean;
  errorMessage: string | null;
  refresh: () => void;
}

export const useEvents = (token?: string): UseEventsResult => {
  const [events, setEvents] = useState<IEventData[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [refreshKey, setRefreshKey] = useState<number>(0); // Trigger refresh

  const fetchEvents = async () => {
    if (!token) {
      setIsError(true);
      setErrorMessage("Token is missing");
      return;
    }

    setIsLoading(true);
    setIsError(false);
    setErrorMessage(null);

    try {
      const res = await fetch(`http://localhost:3000/api/events`, {
        method: "GET",
        next: {
          revalidate: 60, // Revalidate every 60 seconds
          tags: ["events"],
        },
        headers: {
          "Content-Type": "application/json",
        },
      });

      const eventData: IEventResponse<IEventData[]> = await res.json();

      if (!res.ok || !eventData.success) {
        throw new Error(
          (eventData.message as string) || "Failed to fetch events",
        );
      }

      setEvents(eventData.data || []);
    } catch (err) {
      setIsError(true);
      setErrorMessage("Unknown error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token, refreshKey]);

  const refresh = () => setRefreshKey((prev) => prev + 1);

  return {
    events,
    isLoading,
    isError,
    errorMessage,
    refresh,
  };
};
