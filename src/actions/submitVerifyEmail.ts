"use server";

const submitVerifyEmail = async (token: string) => {
  try {
    if (!token) {
      console.error("Token is required");
      return {
        success: false,
        message: "Token is required",
      };
    }

    const res = await fetch(
      `${process.env.FRONTEND_URL}/api/auth/verify-email`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token }),
      },
    );

    if (!res.ok) {
      const errorData = await res.json();
      console.error("Error data", errorData);
      return {
        success: false,
        message: errorData.message || "Error verifying email",
      };
    }

    const data = await res.json();
    if (!data.success) {
      return {
        success: false,
        message: data.message || "Error verifying email",
      };
    }
    return {
      success: true,
      message: "Email verified successfully",
    };
  } catch (error) {
    console.error("Error verifying email", error);
    return {
      success: false,
      message: "Error verifying email",
    };
  }
};

export default submitVerifyEmail;
