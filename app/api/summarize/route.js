
import * as cheerio from "cheerio";

async function fetchHTML(url) {
  const res = await fetch(url, { headers: { "User-Agent": "Mozilla/5.0" } });
  if (!res.ok) throw new Error(`Failed to fetch ${url}: ${res.status}`);
  return await res.text();
}

function extractMetadata($, url) {
  const title =
    $('meta[property="og:title"]').attr("content") ||
    $("title").text().trim() ||
    "";

  const favicon =
    $('link[rel="icon"]').attr("href") ||
    $('link[rel="shortcut icon"]').attr("href") ||
    new URL("/favicon.ico", url).href;

  return { title, favicon };
}

function extractContentSummary($) {
  const paragraphs = $("p")
    .map((_, el) => $(el).text().trim())
    .get()
    .filter((t) => t.length > 60 && t.length < 800); // skip too short or too long

  if (paragraphs.length === 0) return "No readable content found.";

  // Heuristic: pick the paragraph with most commas (probaby rich text, i guess?)
  const bestPara = paragraphs.reduce((a, b) =>
    (b.match(/,/g) || []).length > (a.match(/,/g) || []).length ? b : a
  );

  // Clean up extra spaces and line breaks
  return bestPara.replace(/\s+/g, " ");
}

export async function POST(req) {
  try {
    const { urls } = await req.json();
    if (!Array.isArray(urls) || urls.length === 0)
      return Response.json({ error: "No URLs provided" }, { status: 400 });

    const results = await Promise.all(
      urls.map(async (url) => {
        try {
          const html = await fetchHTML(url);
          const $ = cheerio.load(html);

          const { title, favicon } = extractMetadata($, url);
          const summary = extractContentSummary($);

          return { url, title, summary, favicon };
        } catch (err) {
          console.error(`Error processing ${url}:`, err.message);
          return { url, error: "Failed to extract content" };
        }
      })
    );

    return Response.json({ results });
  } catch (err) {
    console.error("Server error:", err.message);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}
