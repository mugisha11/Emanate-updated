Instagram-powered News setup

This project supports loading the `News` feed from Instagram posts you publish. The site fetches Instagram media via a small serverless endpoint and then displays them in the existing News layout.

Quick setup steps:

- Create a Facebook developer app and get an Instagram Basic Display or Instagram Graph API access token for the Instagram account you want to pull from. For stable access prefer a Business/Creator account and a long-lived token.
- Add these environment variables to your deployment platform (Netlify/Vercel/Azure):
  - `INSTAGRAM_USER_ID` — the numeric Instagram user id
  - `INSTAGRAM_ACCESS_TOKEN` — long-lived access token (keep secret)
If deploying to a host, the Instagram endpoint will be exposed under your server (e.g. `/api/instagram`). For now Instagram integration is planned and will be implemented server-side later.
- On the frontend you can override the API endpoint with a Vite env var: `VITE_INSTAGRAM_API_ENDPOINT` — default is `/api/instagram`.

Security notes:
- Keep `INSTAGRAM_ACCESS_TOKEN` secret — do not commit it to source.
- Prefer a server-side or serverless endpoint so your token is not exposed to the browser.

Next steps I can do for you:
- Add a Vercel Serverless function variant
- Wire the endpoint path into the production Vite config or deployment docs
- Implement pagination or media-type filtering (only images, hide reels)

