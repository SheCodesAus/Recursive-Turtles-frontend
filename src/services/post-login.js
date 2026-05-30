import { apiRequest } from "./api";

export async function postLogin(email,password) {
    return apiRequest(`/login/`, {
        method: "POST",
        headers:{
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            "email": email,
            "password": password,
        }),
    });   
}