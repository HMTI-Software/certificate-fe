// hooks/useParticipants.ts
"use client";

import { useState, useEffect, useCallback } from "react";
import {
  IParticipantData,
  IParticipantResponse,
} from "@/lib/types/Participants";
import { useParticipantsContext } from "@/context/ParticipantsContext";

interface UseParticipantsResult {
  participants: IParticipantData[];
  isLoading: boolean;
  isError: boolean;
  errorMessage: string | null;
}

export const useParticipants = (
  token?: string,
  eventUid?: string,
  options?: { autoFetch?: boolean },
): UseParticipantsResult => {
  const { autoFetch = true } = options || {};
  const [participants, setParticipants] = useState<IParticipantData[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const { isRefreshing } = useParticipantsContext();

  const fetchParticipants = useCallback(async () => {
    if (!token || !eventUid) {
      setIsError(true);
      setErrorMessage(token ? "Event UID is missing" : "Token is missing");
      return;
    }

    setIsLoading(true);
    setIsError(false);
    setErrorMessage(null);

    try {
      const res = await fetch(`/api/events/${eventUid}/participants`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const participantsData: IParticipantResponse<IParticipantData[]> =
        await res.json();

      if (!res.ok || !participantsData.success) {
        throw new Error(
          (participantsData.message as string) ||
            "Failed to fetch participants",
        );
      } else {
        setParticipants(participantsData.data || []);
      }
    } catch (err) {
      setIsError(true);
      setErrorMessage(
        err instanceof Error ? err.message : "Unknown error occurred",
      );
    } finally {
      setIsLoading(false);
    }
  }, [token, eventUid]);

  useEffect(() => {
    if (autoFetch || isRefreshing) {
      fetchParticipants();
    }
  }, [autoFetch, fetchParticipants, isRefreshing]);

  return {
    participants,
    isLoading: isLoading || isRefreshing,
    isError,
    errorMessage,
  };
};
