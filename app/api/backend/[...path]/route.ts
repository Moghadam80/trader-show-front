const backendUrl = process.env.BACKEND_API_URL ?? "http://localhost:4000";

async function forwardRequest(
  request: Request,
  { params }: { params: Promise<{ path: string[] }> },
) {
  const { path } = await params;
  const incomingUrl = new URL(request.url);
  const targetUrl = new URL(
    `/${path.map(encodeURIComponent).join("/")}${incomingUrl.search}`,
    backendUrl,
  );
  const contentType = request.headers.get("content-type");

  try {
    const response = await fetch(targetUrl, {
      method: request.method,
      headers: contentType ? { "content-type": contentType } : undefined,
      body:
        request.method === "GET" || request.method === "HEAD"
          ? undefined
          : await request.arrayBuffer(),
      cache: "no-store",
    });

    return new Response(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers: {
        "content-type":
          response.headers.get("content-type") ?? "application/json",
      },
    });
  } catch {
    return Response.json(
      {
        message:
          "Unable to connect to the backend. Please check that the API is running.",
      },
      { status: 502 },
    );
  }
}

export const GET = forwardRequest;
export const POST = forwardRequest;
