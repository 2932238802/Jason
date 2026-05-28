const DEFAULT_TIMEOUT = 10000

function buildUrl(url, params) {
  if (!params) {
    return url
  }

  const searchParams = new URLSearchParams()

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      searchParams.append(key, value)
    }
  })

  const queryString = searchParams.toString()

  if (!queryString) {
    return url
  }

  return `${url}?${queryString}`
}

async function request(url, options = {}) {
  const {
    method = 'GET',
    params,
    data,
    headers = {},
    timeout = DEFAULT_TIMEOUT,
  } = options

  const controller = new AbortController()
  // 超时 就滚
  const timer = setTimeout(() => controller.abort(), timeout)
  const requestUrl = buildUrl(url, params)

  try {
    const response = await fetch(requestUrl, {
      method,
      headers: {
        'Content-Type': 'application/json',
        ...headers,
      },
      body: data === undefined ? undefined : JSON.stringify(data),
      signal: controller.signal,
    })

    const contentType = response.headers.get('content-type') || ''
    const responseData = contentType.includes('application/json')
      ? await response.json()
      : await response.text()
    if (!response.ok) {
      const error = new Error(`HTTP ${response.status}`)
      error.status = response.status
      error.data = responseData
      throw error
    }

    return responseData
  } catch (error) {
    if (error.name === 'AbortError') {
      throw new Error('请求超时')
    }

    throw error
  } finally {
    clearTimeout(timer)
  }
}

export const http = {
  get(url, params, options = {}) {
    return request(url, {
      ...options,
      method: 'GET',
      params,
    })
  },

  post(url, data, options = {}) {
    return request(url, {
      ...options,
      method: 'POST',
      data,
    })
  },

  put(url, data, options = {}) {
    return request(url, {
      ...options,
      method: 'PUT',
      data,
    })
  },

  del(url, params, options = {}) {
    return request(url, {
      ...options,
      method: 'DELETE',
      params,
    })
  },
}
