export const all = async (params) => {
  const res = await fetch("http://localhost:3001/todos");
  const data = res.json();
  return data;
};

export const create = async (variables) => {
  const res = await fetch("http://localhost:3001/create", {
    method: "POST",
    body: JSON.stringify({ title: variables.title }),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });
  const data = res.json();
  return data;
};

export const update = async (variables) => {
  const res = await fetch("http://localhost:3001/update/" + variables.id, {
    method: "PUT",
  });
  const data = res.json();
  return data;
};
export const del = async (variables) => {
  const res = await fetch("http://localhost:3001/delete/" + variables.id, {
    method: "DELETE",
  });
  const data = res.json();
  return data;
};
