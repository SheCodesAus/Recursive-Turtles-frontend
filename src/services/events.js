
export async function getEventById(eventID) {
  const response = await fetch  (`${import.meta.env.VITE_API_URL}/events/${eventID}/`);

  if (!response.ok) {
    throw new Error("Failed to fetch event");
  }

  return response.json();
}

export async function getEventByCode(eventCode) {
  const response = await fetch  (`${import.meta.env.VITE_API_URL}/events/join/${eventCode}/`);

  if (!response.ok) {
    throw new Error("Failed to fetch event");
  }

  return response.json();
}

export async function loginFacilitator(credentials) {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/login/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  });

  if (!response.ok) {
    throw new Error("Login failed");
  }

  return response.json();
}

export async function postCreateEvent(data) {
  const accessToken = window.localStorage.getItem("access");

  if (!accessToken) {
    throw new Error("No access token found. Please log in.");
  }
  const response = await fetch(`${import.meta.env.VITE_API_URL}/events/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${accessToken}`,
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Failed to create event");
  }

  return response.json();
}

export async function getEventsPerFacilitator() {
  const accessToken = window.localStorage.getItem("access");

  if (!accessToken) {
    throw new Error("No access token found. Please log in.");
  }

  const response = await fetch(`${import.meta.env.VITE_API_URL}/events/`, {
    method: "GET",
    headers: {
      "Authorization": `Bearer ${accessToken}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch events");
  }

  return response.json();
}
