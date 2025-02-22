import "jsr:@supabase/functions-js/edge-runtime.d.ts";

console.log("Hello from Functions!");

Deno.serve(async (req) => {
  try {
    // Parse the JSON from the incoming request
    const { url } = await req.json();

    // Validate that the URL is present
    if (!url) {
      return new Response(JSON.stringify({ error: "URL is required" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const response = await fetch(
      `https://api.brightdata.com/datasets/v3/trigger?dataset_id=gd_lk538t2k2p1k3oos71&include_errors=true`,
      {
        headers: {
          Authorization: `Bearer ${Deno.env.get("BRIGHT_DATA_API_KEY")}`,
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify([{ url }]),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error("BrightData API Error:", errorText);
      return new Response(
        JSON.stringify({ error: "Failed to trigger collection", details: errorText }),
        { status: response.status, headers: { "Content-Type": "application/json" } }
      );
    }

    const data = await response.json();
    console.log("response: ", data);

    return new Response(JSON.stringify(data), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Function Error:", error);
    return new Response(JSON.stringify({ error: "Internal Server Error", message: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
});
