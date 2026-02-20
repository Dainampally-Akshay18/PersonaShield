// API layer

const BASE_URL = 'https://personashield.onrender.com';

export async function uploadResume(file) {
  const formData = new FormData();
  formData.append('file', file);

  const response = await fetch(`${BASE_URL}/api/v1/analyze/upload-pdf`, {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    throw new Error('Failed to upload resume');
  }

  return response.json();
}
