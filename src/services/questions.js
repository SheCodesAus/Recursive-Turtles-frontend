import { apiRequest } from "./api";

export async function postQuestion(eventId, data) {
  return apiRequest(`/events/${eventId}/questions/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
        question_text: data.text,
        anonymous: data.anonymous,
    }),
  });
    }

export async function getQuestions(eventId) {
  return apiRequest(`/events/${eventId}/questions/`, {
    method: "GET",
  });

}