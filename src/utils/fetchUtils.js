// Helper function to handle JSON response
const handleJSONResponse = async (response) => {
  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }

  const data = await response.json();
  return data;
};

// Reusable function for making API requests
const apiFetch = async (
  endpoint,
  method = "GET",
  body = null,
  headers = {},
  includeCredentials = false
) => {
  const url = `${endpoint}`;

  const options = {
    method,
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
    mode: "cors", // Enable CORS
    credentials: includeCredentials ? "include" : "same-origin", // Include credentials if needed
  };

  if (body) {
    options.body = JSON.stringify(body);
  }

  try {
    const response = await fetch(url, options);
    const data = await handleJSONResponse(response);
    return data;
  } catch (error) {
    console.error("API error:", error.message);
    throw error;
  }
};

export default apiFetch;
