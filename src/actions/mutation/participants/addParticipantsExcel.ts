"use server";

import { revalidateTag } from "next/cache";

export const addParticipantsByExcel = async (
  file: File,
  token: string | undefined,
  eventUid: string,
) => {
  try {
    if (!eventUid) {
      return {
        success: false,
        message: "Event UID is required",
      };
    }

    if (!token) {
      return {
        success: false,
        message: "Token is required",
      };
    }

    if (!file) {
      return {
        success: false,
        message: "File is required",
      };
    }

    const formData = new FormData();
    formData.append("excel", file);

    const res = await fetch(
      `${process.env.FRONTEND_URL}/api/events/${eventUid}/participants/add-excel?token=${token}`,
      {
        method: "POST",
        body: formData,
      },
    );

    const responseData = await res.json();

    if (!res.ok || !responseData.success) {
      return {
        success: false,
        message: responseData.message || "Failed to upload file",
      };
    } else {
      revalidateTag("participants");
      return {
        success: true,
        message: "Excel uploaded and participants added successfully",
      };
    }
  } catch (error) {
    console.error("ERROR IN PARTICIPANTS ADD BY EXCEL (SERVER ACTION):", error);
    return {
      success: false,
      message: "An unknown error occurred while uploading Excel file",
    };
  }
};
