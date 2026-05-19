import { apiRequest } from "./api";

// Get all polls for an event
export function getPollsByEvent(eventId) {
  return apiRequest(`/events/${eventId}/polls/`);
}

// Create a new poll
export function createPoll(eventId, data) {
  return apiRequest(`/events/${eventId}/polls/`, {
    method: "POST",
    body: JSON.stringify(data),
  });
}

// Submit attendee poll response
export function submitPollResponse(pollId, data) {
  return apiRequest(`/polls/${pollId}/responses/`, {
    method: "POST",
    body: JSON.stringify(data),
  });
}

// Get poll results
export function getPollResults(pollId) {
  return apiRequest(`/polls/${pollId}/results/`);
}