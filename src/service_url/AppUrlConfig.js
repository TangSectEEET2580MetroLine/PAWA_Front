const API_BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:3000";

export const HOST_URL = API_BASE_URL;
export const HOST_URL_LOGIN    = `${API_BASE_URL}/api/auth/login`;
//export const HOST_URL_GG_LOGIN = `${API_BASE_URL}/login/oauth2/code/google`;
export const HOST_URL_GG_LOGIN = `${API_BASE_URL}/oauth2/authorization/google`;
export const HOST_URL_REGISTER = `${API_BASE_URL}/api/auth/register`;
export const HOST_URL_TICKETS         = `${API_BASE_URL}/api/tickets`;
export const HOST_URL_WALLET    = `${API_BASE_URL}/api/wallets`;
export const HOST_URL_LINES     = `${API_BASE_URL}/metro-line`;
export const HOST_URL_TICKETS_TYPE    = `${API_BASE_URL}/api/ticket-types`;
// matches @RequestMapping("/api/payments") + @PostMapping("/checkout-session") :contentReference[oaicite:0]{index=0}:contentReference[oaicite:1]{index=1}
export const HOST_URL_STRIPE_CHECKOUT = `${API_BASE_URL}/api/payments/checkout-session`;

// Ticket purchase
// matches @RequestMapping("/api/tickets") + @PostMapping("/purchase") :contentReference[oaicite:2]{index=2}:contentReference[oaicite:3]{index=3}
export const HOST_URL_TICKET_PURCHASE = `${API_BASE_URL}/api/tickets/purchase`;

export const STRIPE_PUBLISHABLE_KEY =
  process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY ||
  "pk_test_51RQLqR4KAHNayHiUcS4qfQBE3CW1LMjFFbOLy4ZtZtjclhnArzYeEWXqqVwYYfgx1sAmBQ9fi0f4lycv9gnvbfes0017SX43ke"; // or leave blank and error if missing  

