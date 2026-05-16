# Workshop Navigator
> Recursive Turtles

## Table of Contents
- [Workshop Navigator](#workshop-navigator)
  - [Table of Contents](#table-of-contents)
  - [Mission Statement](#mission-statement)
  - [Features](#features)
    - [Summary](#summary)
    - [Users](#users)
    - [Core Features](#core-features)
    - [Pages / Endpoint Functionality](#pages--endpoint-functionality)
    - [Nice To Haves](#nice-to-haves)
  - [Technical Implementation](#technical-implementation)
    - [Back-End](#back-end)
    - [Front-End](#front-end)
    - [Git \& Deployment](#git--deployment)
  - [Target Audience](#target-audience)
  - [Back-End Implementation](#back-end-implementation)
    - [API Specification](#api-specification)
      - [Events](#events)
      - [Polls](#polls)
      - [Poll Responses](#poll-responses)
      - [Questions](#questions)
      - [Feedback](#feedback)
      - [Emails](#emails)
    - [Object Definitions](#object-definitions)
      - [Users](#users-1)
      - [Events](#events-1)
      - [Polls](#polls-1)
      - [Poll Responses](#poll-responses-1)
      - [Questions](#questions-1)
      - [Feedback](#feedback-1)
      - [Email Capture](#email-capture)
    - [Database Schema](#database-schema)

## Mission Statement

Workshop Navigator is a mobile-first presentation and workshop engagement tool designed to improve audience interaction and data collection during live events. It is intended for professional facilitators and keynote speakers, particularly Scott Millar, who want a simple and effective way to encourage participation from Gen X and older corporate audiences.

Many presentations and workshops suffer from low engagement because attendees may be shy, passive, or hesitant to ask questions in front of colleagues or managers. Workshop Navigator reduces those barriers by allowing attendees to join instantly through a QR code or direct link, participate in live polls, submit anonymous questions, and access presentation resources after the event.

On the presenter side, Workshop Navigator provides a simple dashboard for reviewing audience engagement, captured questions, email interest, and event outcomes for future topic planning and client reporting.

The overall goal is to create a sleek, professional, easy-to-read interaction tool that supports live engagement without distracting from the presentation itself.

---

## Features

### Summary

Workshop Navigator is a real-time presentation engagement platform that allows attendees to:

- join instantly with no login
- participate in live polls
- ask anonymous questions
- provide feedback
- share their email for follow-up resources

Facilitators can:

- create and manage events
- run live polls
- view questions
- collect audience insights
- review and export results later

---

### Users

| Type | Access | Role Type Assignment |
| :--- | :--- | :--- |
| Presenter / Admin | Full access. Can log in, create and manage events, create polls, review questions, view captured emails, and export results. | Scott Millar / admin team |
| Event Support / Approver | Can log in, assist with event management, view submitted questions and responses, and support presenter workflow. | AV support / event support |
| Guest Participant | Can join via QR code or event link, answer live polls, ask questions with or without sharing their name, and enter an email to access presentation resources. | Public workshop / presentation attendees |

---

### Core Features

| Feature | Access | Notes / Conditions |
| :--- | :--- | :--- |
| Join Event | Guest | Access via QR code or direct link as the primary flow, with optional manual event code entry as a backup if needed. No account required for MVP. |
| Live Polls | Guest | Simple, easy-to-read response flow. Mobile friendly. |
| Ask a Question | Guest | Anonymous by default, with optional name sharing. Designed for low-pressure participation. |
| Access Presentation Library | Guest | Email required. Optional workshop updates toggle. |
| Presenter Dashboard | Presenter / Admin | View participants, poll responses, questions, and captured emails. |
| Export Results | Presenter / Admin | Export event results and engagement data. |
| Feedback Link | Guest | Optional and lightweight. Can be offered after slide access flow. |

---

### Pages / Endpoint Functionality

| Endpoint / Page | Functionality | Comments |
| :--- | :--- | :--- |
| Join Event | Join via QR code or direct link. | Primary join flow is QR code or direct link; manual event code entry may be supported as a backup option if needed. |
| Event Home | Presents main participant actions: Live Poll, Ask a Question, and Get the Slides. | Text-first navigation for accessibility. |
| Ask a Question | Submit a question with a **Name (optional)** field and a toggle to share name. | Built for shy or passive audiences. |
| Get the Slides | Enter email, choose workshop updates on/off, and access presentation library. | Presentation library acts as the free value offer. |
| Presenter Dashboard | View event metrics, review recent questions, and export results. | Simplified dashboard for MVP. |

---

### Nice To Haves

- word clouds
- gamification
- advanced analytics dashboards
- user accounts
- live moderation tools
- pre-event attendee input
- Canva-adjacent workflow improvements

---

## Technical Implementation

### Back-End

- Django
- Django REST Framework
- Python
- SQLite for development
- optional PostgreSQL for production

### Front-End

- React (Vite)
- mobile-first design
- JavaScript or TypeScript
- HTML
- CSS
- Fetch or Axios for API calls

### Git & Deployment

- GitHub
- two repositories:
  - front-end
  - back-end
- Netlify for front-end deployment
- Heroku or Render for back-end deployment

This application can be developed as two linked repositories: one for the front-end React app and one for the back-end Django REST Framework API.

---

## Target Audience

Workshop Navigator is primarily designed for Gen X and older professional users attending conferences, workshops, and keynote presentations.

These users are familiar with mobile devices but often value usability, readability, and efficiency over trend-based or overly decorative interfaces.

The interface is designed to support people who may use reading glasses or prefer stronger contrast, larger buttons, and text-based navigation.

The product is also designed for presenters such as Scott Millar, who need a streamlined way to encourage engagement, capture questions, and review event insights afterward.

The result is a tool that supports both participant comfort and presenter usefulness in real-time event settings.

---

## Back-End Implementation

### API Specification

#### Events

| HTTP Method | URL | Purpose | Request Body | Success Code | Authentication |
| :--- | :--- | :--- | :--- | :--- | :--- |
| POST | `/events` | Create event | `{ "title": "string", "event_code": "string", "status": "string" }` | 201 | Presenter / Admin |
| GET | `/events/code/:code` | Join event by manual event code | N/A | 200 | Open access |
| GET | `/events/:id` | Get event details | N/A | 200 | Open access |

#### Polls

| HTTP Method | URL | Purpose | Request Body | Success Code | Authentication |
| :--- | :--- | :--- | :--- | :--- | :--- |
| POST | `/events/:id/polls` | Create poll | `{ "question": "string", "options": [] }` | 201 | Presenter / Admin |
| GET | `/events/:id/polls` | Get polls for event | N/A | 200 | Open access |

#### Poll Responses

| HTTP Method | URL | Purpose | Request Body | Success Code | Authentication |
| :--- | :--- | :--- | :--- | :--- | :--- |
| POST | `/polls/:id/responses` | Submit poll response | `{ "response": "string" }` | 201 | Open access |

#### Questions

| HTTP Method | URL | Purpose | Request Body | Success Code | Authentication |
| :--- | :--- | :--- | :--- | :--- | :--- |
| POST | `/events/:id/questions` | Submit question | `{ "text": "string", "name": "string", "anonymous": true }` | 201 | Open access |
| GET | `/events/:id/questions` | Get questions for event | N/A | 200 | Presenter / Admin |
| POST | `/questions/:id/upvote` | Upvote question | N/A | 200 | Open access |

#### Feedback

| HTTP Method | URL | Purpose | Request Body | Success Code | Authentication |
| :--- | :--- | :--- | :--- | :--- | :--- |
| POST | `/events/:id/feedback` | Submit feedback | `{ "rating": integer, "comment": "string" }` | 201 | Open access |

#### Emails

| HTTP Method | URL | Purpose | Request Body | Success Code | Authentication |
| :--- | :--- | :--- | :--- | :--- | :--- |
| POST | `/events/:id/emails` | Capture email | `{ "email": "string", "workshop_updates": boolean }` | 201 | Open access |

---

### Object Definitions

#### Users

| Field | Data Type |
| :--- | :--- |
| User_ID (PK) | integer |
| Username | string |
| Email | string |
| Password | string |
| Role | string |
| Created_At | datetime |

#### Events

| Field | Data Type |
| :--- | :--- |
| Event_ID (PK) | integer |
| Title | string |
| Event_Code | string |
| Status | string |
| Created_At | datetime |

#### Polls

| Field | Data Type |
| :--- | :--- |
| Poll_ID (PK) | integer |
| Event_ID (FK) | integer |
| Question | string |
| Options | array / JSON |
| Is_Live | boolean |

#### Poll Responses

| Field | Data Type |
| :--- | :--- |
| PollResponse_ID (PK) | integer |
| Poll_ID (FK) | integer |
| Response | string |
| Created_At | datetime |

#### Questions

| Field | Data Type |
| :--- | :--- |
| Question_ID (PK) | integer |
| Event_ID (FK) | integer |
| Text | string |
| Name | string |
| Anonymous | boolean |
| Upvotes | integer |
| Created_At | datetime |

#### Feedback

| Field | Data Type |
| :--- | :--- |
| Feedback_ID (PK) | integer |
| Event_ID (FK) | integer |
| Rating | integer |
| Comment | string |
| Created_At | datetime |

#### Email Capture

| Field | Data Type |
| :--- | :--- |
| EmailCapture_ID (PK) | integer |
| Event_ID (FK) | integer |
| Email | string |
| Workshop_Updates | boolean |
| Created_At | datetime |

---

### Database Schema

Add your database schema image inside an `img` folder and use the path below:
