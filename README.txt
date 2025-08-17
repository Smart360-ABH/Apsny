Minimal public Vercel project that exposes /api/chat serverless function.
Deployment steps:
1. Go to Vercel and create a new project -> Import -> Upload (select this ZIP).
2. Set Environment Variable in Project Settings: OPENAI_API_KEY = sk-...
3. Deploy. After deployment, POST to /api/chat with JSON { "message": "Hello" }.
Test with curl (Windows PowerShell):
  curl.exe -i -X POST -H "Content-Type: application/json" -d "{\"message\":\"Hi\"}" https://<your-deploy>/api/chat
