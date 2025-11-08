// api/getWeather.ts
// import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: any, res: any) {
  const city = req.query.city as string;
  const apiKey = process.env.WEATHER_API_KEY;

  if (!city) return res.status(400).json({ error: "City not provided" });

  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
    );
    const data = await response.json();

    if (!response.ok) return res.status(response.status).json(data);

    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
}
