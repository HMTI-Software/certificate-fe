"use server";

export const submitRequestVerify = async (token: string) => {
  try {
    if (!token) {
      return {
        success: false,
        message: "Token is required.",
      };
    }
    const response = await fetch(
      `${process.env.BACKEND_URL}/api/auth/request-verify-email`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      },
    );

    if (!response.ok) {
      const errorData = await response.json();
      return {
        success: false,
        message: errorData.message || "Failed to send verification email.",
      };
    }
    const data = await response.json();
    if (!data.success) {
      return {
        success: false,
        message: data.message || "Failed to send verification email.",
      };
    }
    return {
      success: true,
      message: "Verification email sent successfully.",
    };
  } catch (error) {
    console.error("Error in submitRequestEmail : ", error);
    return {
      success: false,
      message: "An error occurred while processing your request.",
    };
  }
};
