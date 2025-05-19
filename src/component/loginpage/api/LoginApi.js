import sendHttpRequest from "../../../http_call/HttpRequest";
import { HOST_URL_LOGIN ,HOST_URL_REGiSTER, HOST_URL} from "../../../service_url/AppUrlConfig";
import { PASSENGER_URL_ADD,PASSENGER_URL } from "../../../service_url/PassengerUrlConfig";
import { jwtDecode } from "jwt-decode";

export async function loginUser(email, password) {
  const url = `${HOST_URL_LOGIN}`; // Adjust endpoint if needed
  const body = { email, password };

  return await sendHttpRequest(url, "POST", body);
}

export async function registerUser(email, password) {
  const url = `${HOST_URL_REGiSTER}`; // Adjust endpoint if needed
  const body = { 
    email, 
    password, 
    role: "PASSENGER", 
    enabled: true 
  };

  return await sendHttpRequest(url, "POST", body);
}

export async function deleteUserById(id) {
  const url = `${HOST_URL}/${id}`;
  return await sendHttpRequest(url, "DELETE");
}

export async function createPassenger(passengerData) {
  return await sendHttpRequest(PASSENGER_URL_ADD, "POST", passengerData);
}

// Fetch passenger by ID from token and update user state
export async function fetchAndSetPassenger(dispatch, token, ACTIONS) {
  try {
    const decoded = jwtDecode(token);
    console.log("Decoded token:", decoded);
    const id = decoded.userId;
    if (!id) throw new Error("User ID not found in token.");

    const url = `${PASSENGER_URL}/${id}`;
    const response = await sendHttpRequest(url, "GET");

    if (response.status === 200 && response.json) {
      dispatch({ type: ACTIONS.SET_PASSENGER, payload: response.json });
      return response.json;
    } else {
      throw new Error(response.json?.message || "Passenger not found.");
    }
  } catch (err) {
    // Optionally handle error or dispatch an error action
    console.error("Failed to fetch passenger:", err);
    return null;
  }
}

