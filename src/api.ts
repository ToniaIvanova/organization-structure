import { DEFAULT_HEADERS } from "./consts";

export const getUsers = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/users`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Access-Control-Allow-Origin": "*",
    },
  });
  const data = await res.json();
  return data;
};

export const addUser = async (name: string) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/users`, {
    method: "POST",
    headers: DEFAULT_HEADERS,
    body: JSON.stringify({
      name,
    }),
  });
  const data = await res.json();
  return data;
};

export const deleteUser = async (userId: string) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/users/${userId}`, {
    method: "DELETE",
    headers: DEFAULT_HEADERS,
  });
  const data = await res.json();
  return data;
};

export const assignManager = async (
  subordinateId: string,
  managerId: string
) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/users/manager`, {
    method: "PUT",
    headers: DEFAULT_HEADERS,
    body: JSON.stringify({
      managerId,
      subordinateId,
    }),
  });
  const data = await res.json();
  return data;
};
