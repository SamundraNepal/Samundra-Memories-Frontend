export async function GetLogedUserData() {
  const token = sessionStorage.getItem("cookies");
  const response = await fetch(
    "http://127.0.0.1:8000/v1/memories/user/userData",
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      //      credentials: "include", // Include cookies
    }
  );

  if (response.ok) {
    const data = await response.json();
    return data; // Return the data if successful
  } else {
    const errorData = await response.json();
    throw new Error(
      `Failed to get data: ${errorData.message || "Unknown error"}`
    );
  }
}
