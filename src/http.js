export const post = async (url, data) => {
  const response = await fetch(url, {
    method: "POST",
    headers: {
      //instead of headers I wrote headars :')
      "Content-type": "application/json",
    },
    body: JSON.stringify(data),
  });
  const resData = await response.json();
  return resData;
};

export const get = async (url) => {
  const response = await fetch(url);
  const resData = await response.json();
  return resData;
};

export const remove = async (url) => {
  const response = await fetch(url, {
    method: "DELETE",
    headers: {
      "Content-type": "application/json",
    },
  });
};

export const put = async (url, data) => {
  const response = await fetch(url, {
    method: "PUT",
    headers: {
      //instead of headers I wrote headars :')
      "Content-type": "application/json",
    },
    body: JSON.stringify(data),
  });
  const resData = await response.json();
  return resData;
};
