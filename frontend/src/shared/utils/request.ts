import type { ApiResponse } from "shared/api/types";
const activeRequests = new Set<string>();

export async function request<T>(
  url: string,
  method: "GET" | "POST" | "PATCH" | "DELETE",
  body?: unknown
): Promise<ApiResponse<T>> {
   const requestKey = `${method}:${url}`;
  
  if (activeRequests.has(requestKey)) {
    return { data: undefined, error: 'Request already in progress' };
  }

  activeRequests.add(requestKey);
  try {
    const response = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
      },
      method,
      credentials: "include",
      body: body ? JSON.stringify(body) : undefined,
    });

   
    const text = await response.text();
    

    if (!response.headers.get('content-type')?.includes('application/json') && response.status >= 400) {
      throw new Error(`Server returned HTML: ${text.slice(0, 100)}...`);
    }

    const data = JSON.parse(text);
    return { data, error: null };
  } catch (e) {
    return {
      data: undefined,
      error: e instanceof Error ? e.message : "Unknown error",
    };
  }finally {
    activeRequests.delete(requestKey);
  }
}
