const API_URL = import.meta.env.VITE_URL_API ?? ''
const API_TOKEN = import.meta.env.VITE_API_TOKEN ?? ''

async function apiFetch<T>(path: string, options: RequestInit = {}, token = API_TOKEN): Promise<T> {
  const response = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
      ...options.headers,
    },
  })

  if (!response.ok) {
    throw new Error(`API error: ${response.status} ${response.statusText}`)
  }

  return response.json() as Promise<T>
}

export const apiClient = {
  get: <T>(path: string) => apiFetch<T>(path),
  post: <T>(path: string, body: unknown) =>
    apiFetch<T>(path, { method: 'POST', body: JSON.stringify(body) }),
  put: <T>(path: string, body: unknown) =>
    apiFetch<T>(path, { method: 'PUT', body: JSON.stringify(body) }),
  delete: <T>(path: string) => apiFetch<T>(path, { method: 'DELETE' }),
}

export function makeAuthClient(token: string) {
  return {
    get: <T>(path: string) => apiFetch<T>(path, {}, token),
    post: <T>(path: string, body: unknown) =>
      apiFetch<T>(path, { method: 'POST', body: JSON.stringify(body) }, token),
    put: <T>(path: string, body: unknown) =>
      apiFetch<T>(path, { method: 'PUT', body: JSON.stringify(body) }, token),
    delete: <T>(path: string) => apiFetch<T>(path, { method: 'DELETE' }, token),
  }
}
