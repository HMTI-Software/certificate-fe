"use server";

const useGetIP = async () => {
  try {
    const response = await fetch(`${process.env.BACKEND}/api/get-ip`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return { ip: data.ip, error: null };
  } catch (err) {
    return {
      ip: null,
      error: err instanceof Error ? err.message : "An unknown error occurred",
    };
  }
};

export default useGetIP;
