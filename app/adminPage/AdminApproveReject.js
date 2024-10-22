import { useState } from 'react';

export async function AdminApprove(email) {
  console.log(email);
  const [loading, setLoading] = useState();

  try {
    const response = await fetch(
      `http://127.1.0.1:8000/v1/memories/users/admin/approval/${email}`
    );

    if (!response.ok) {
      throw new Error('Something went wrong');
    }

    const data = await response.json();
    return data;
  } catch (err) {
    throw new Error('Failed to approve the account');
  }
}
