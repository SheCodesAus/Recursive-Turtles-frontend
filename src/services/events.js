import { apiRequest } from "./api";

export async function getEventById(eventID) {
  return apiRequest(`/events/${eventID}/`);
}

export async function getEventByCode(eventCode) {
  return apiRequest(`/events/join/${eventCode}/`);
}

export async function loginFacilitator(credentials) {
  return apiRequest(`/login/`, {
    method: "POST",
    body: JSON.stringify(credentials),
  });
}

export async function postCreateEvent(data) {
  const accessToken = window.localStorage.getItem("access");

  if (!accessToken) {
    throw new Error("No access token found. Please log in.");
  }
  
  return apiRequest(`/events/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${accessToken}`,
    },
    body: JSON.stringify(data),
  });
}

export async function getEventsPerFacilitator() {
  const accessToken = window.localStorage.getItem("access");

  if (!accessToken) {
    throw new Error("No access token found. Please log in.");
  }
  return apiRequest(`/events/`, {
    method: "GET",
    headers: {
      "Authorization": `Bearer ${accessToken}`,
    },
  });
}

