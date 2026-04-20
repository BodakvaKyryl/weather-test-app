import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const sp = url.searchParams;
    const type = sp.get("type");

    if (!type) {
      return NextResponse.json(
        { error: "Missing `type` query param" },
        { status: 400 }
      );
    }

    const apiKey = process.env.OPENWEATHER_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "Server misconfigured: OPENWEATHER_API_KEY is not set" },
        { status: 500 }
      );
    }

    const BASE = "https://api.openweathermap.org/data/2.5";
    const GEO = "https://api.openweathermap.org/geo/1.0";

    const params = new URLSearchParams({
      appid: apiKey,
      units: "metric",
    });

    let target = "";

    switch (type) {
      case "current": {
        const lat = sp.get("lat");
        const lon = sp.get("lon");
        if (!lat || !lon) {
          return NextResponse.json(
            { error: "`lat` and `lon` are required for type=current" },
            { status: 400 }
          );
        }
        params.set("lat", lat);
        params.set("lon", lon);
        target = `${BASE}/weather`;
        break;
      }

      case "forecast": {
        const lat = sp.get("lat");
        const lon = sp.get("lon");
        if (!lat || !lon) {
          return NextResponse.json(
            { error: "`lat` and `lon` are required for type=forecast" },
            { status: 400 }
          );
        }
        params.set("lat", lat);
        params.set("lon", lon);
        target = `${BASE}/forecast`;
        break;
      }

      case "reverse": {
        const lat = sp.get("lat");
        const lon = sp.get("lon");
        if (!lat || !lon) {
          return NextResponse.json(
            { error: "`lat` and `lon` are required for type=reverse" },
            { status: 400 }
          );
        }
        params.set("lat", lat);
        params.set("lon", lon);
        params.set("limit", "1");
        target = `${GEO}/reverse`;
        break;
      }

      case "search": {
        const q = sp.get("q");
        if (!q) {
          return NextResponse.json(
            { error: "`q` is required for type=search" },
            { status: 400 }
          );
        }
        params.set("q", q);
        params.set("limit", "5");
        target = `${GEO}/direct`;
        break;
      }

      default:
        return NextResponse.json(
          { error: "Invalid `type` query param" },
          { status: 400 }
        );
    }

    const targetUrl = `${target}?${params.toString()}`;

    const resp = await fetch(targetUrl);

    // Pipe the response back to client preserving status and content-type
    const contentType = resp.headers.get("content-type") || "application/json";
    const bodyText = await resp.text();

    return new Response(bodyText, {
      status: resp.status,
      headers: { "content-type": contentType },
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
