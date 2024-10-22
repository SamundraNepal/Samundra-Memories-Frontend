export const apiLink = 'http://127.0.0.1:8000/v1/memories';

export async function GetLogedUserData() {
  const token = sessionStorage.getItem('cookies');
  const response = await fetch(`${apiLink}/user/userData`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    //      credentials: "include", // Include cookies
  });

  if (response.ok) {
    const data = await response.json();
    return data; // Return the data if successful
  } else {
    const errorData = await response.json();
    throw new Error(
      `Failed to get data: ${errorData.message || 'Unknown error'}`
    );
  }
}

export async function handleAdminData() {
  const token = sessionStorage.getItem('cookies');
  try {
    const response = await fetch(`${apiLink}/users/admin/data`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      //      credentials: "include", // Include cookies
    });

    if (!response.ok) {
      const userError = await response.json();
      throw new Error('Failed to get the data', userError);
    }
    const data = await response.json();
    return data;
  } catch (err) {
    throw new Error('Failed to get the data ', err.message);
  }
}

export async function loadImages() {
  const token = sessionStorage.getItem('cookies'); // Replace with the actual token

  try {
    const response = await fetch(`${apiLink}/images/images`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorMessage = await response.json();
      throw new Error('Following is the error : ' + errorMessage.message);
    }
    const data = await response.json();

    return data;
  } catch (err) {
    throw new Error('Failed to get the images : ' + err.message);
  }
}

export async function loadVideos() {
  const token = sessionStorage.getItem('cookies'); // Replace with the actual token

  try {
    const response = await fetch(`${apiLink}/videos/videos`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorMessage = await response.json();
      throw new Error('Following is the error : ' + errorMessage.message);
    }
    const data = await response.json();

    return data;
  } catch (err) {
    throw new Error('Failed to get the images : ' + err.message);
  }
}

export async function loadTrashImages() {
  const token = sessionStorage.getItem('cookies'); // Replace with the actual token

  try {
    const response = await fetch(`${apiLink}/images/trashImages`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorMessage = await response.json();
      throw new Error('Following is the error : ' + errorMessage.message);
    }
    const data = await response.json();
    return data;
  } catch (err) {
    throw new Error('Failed to get the deleted images : ' + err.message);
  }
}

export async function loadTrashVideos() {
  const token = sessionStorage.getItem('cookies'); // Replace with the actual token

  try {
    const response = await fetch(`${apiLink}/videos/trashVideos`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorMessage = await response.json();
      throw new Error('Following is the error : ' + errorMessage.message);
    }
    const data = await response.json();
    return data;
  } catch (err) {
    throw new Error('Failed to get the deleted Videos : ' + err.message);
  }
}
