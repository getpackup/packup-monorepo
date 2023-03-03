const encode = (data: { [key: string]: unknown }) =>
  Object.keys(data)
    .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(data[key] as string)}`)
    .join('&')

export const postFormUrlEncoded = async (formName: string, values: Record<string, string>) =>
  fetch('https://packupapp.com/', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: encode({
      'form-name': formName,
      ...values,
    }),
  })

export default postFormUrlEncoded
