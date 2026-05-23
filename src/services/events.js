import { apiRequest } from "./api";

// Get all events
export function getEvents() {
  return apiRequest("/events/");
}

// Get event by numeric ID
export function getEventById(eventId) {
  return apiRequest(`/events/${eventId}/`);
}

// Get event by event code
export function getEventByCode(eventCode) {
  return apiRequest(`/events/join/${eventCode}/`);
}
// Create event
export function createEvent(data) {
  return apiRequest("/events/", {
    method: "POST",
    body: JSON.stringify(data),
  });
}