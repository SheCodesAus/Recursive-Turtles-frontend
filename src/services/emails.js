import { apiRequest } from "./api";

export function captureEmail(eventId, data) {
  return apiRequest(`/events/${eventId}/emails/`, {
    method: "POST",
    body: JSON.stringify({
      email: data,
      event: eventId,
    }
    ),
  });
}

export function getCapturedEmails(eventId) {
const accessToken = window.localStorage.getItem("access");

  if(!accessToken){
    throw new Error("Access token is required to fetch captured emails.");
  }
  return apiRequest(`/events/${eventId}/emails`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
}