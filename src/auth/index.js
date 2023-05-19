import { API } from "../backend";

export const signin = (user) => {
  return fetch(`${API}/admin/signin`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  })
    .then((response) => {
     
      return response.json();
    }) //if everything gets right we get a response
    .catch((err) => console.log(err));
};
//a

export const authenticate = (data, next) => {
  if (typeof window !== "undefined") {
    //window obj is accessible
    localStorage.setItem("jwt", JSON.stringify(data));
    //jwt is a token
    next();
  }
};

export const isAuthenticated = () => {
  if (typeof window == "undefined") {
    //window obj is undeifined ie.no access therifore user not authenticated
    return false;
  }
  if (localStorage.getItem("jwt")) {
    return JSON.parse(localStorage.getItem("jwt"));
  } else {
    return false;
  }
};


export const signout = (next) => {
  if (typeof window !== "undefined") {
    //window obj is accessible
    localStorage.removeItem("jwt"); //removing after signout
    //jwt is a token
    next();

    //logout user from bkend
    return fetch(`${API}/admin/signout`, {
      method: "GET",
    })
      .then((response) => console.log("signout success"))
      .catch((err) => console.log(err));
  }
};
export const getAllUsers = async (userId, token) => {

  try {
    const response = await fetch(`${API}/users/all/${userId}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      }
    });
   
    return await response.json();
  } catch (err) {
    console.log(err);
  }
}

export const getAllUnmandateUsers = async (userId, token) => {

  try {
    const response = await fetch(`${API}/user/all/unmandate/${userId}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      }
    });

    return await response.json();
  } catch (err) {
    console.log(err);
  }
}
export const getAllMandateUsers = async (userId, token) => {

  try {
    const response = await fetch(`${API}/user/all/mandate/${userId}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      }
    });
 
    return await response.json();
  } catch (err) {
    console.log(err);
  }
}

export const getAllContacts = async (userId, token) => {

  try {
    const response = await fetch(`${API}/contacts/all/${userId}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      }
    });

    return await response.json();
  } catch (err) {
    console.log(err);
  }
}


export const fillContacts = async (details) => {

  try {
    const response = await fetch(`${API}/contactus`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",

      },
      body: JSON.stringify(details)
    });
  
    return await response.json();
  } catch (err) {
    console.log(err);
  }
}

export const getServices = async () => {
  try {
    const response = await fetch(`${API}/get/all/services`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",

      }
    });

    return await response.json();
  } catch (err) {
    // console.log(err);
  }

}

export const createServices = async (userId, token, data) => {
  try {
    const response = await fetch(`${API}/create/service/${userId}`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(data)
    });
  
    return await response.json();
  } catch (err) {
    console.log(err);
  }

}

export const removeServices = async (userId, token, data) => {
  try {
    const response = await fetch(`${API}/remove/service/${userId}`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(data)
    });
 
    return await response.json();
  } catch (err) {
    console.log(err);
  }

}

export const removeUser = async (userId, token, data) => {
  try {
    const response = await fetch(`${API}/remove/user/${userId}`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(data)
    });
 
    return await response.json();
  } catch (err) {
    console.log(err);
  }

}



export const removeContact = async (userId, token, data) => {
  try {
    const response = await fetch(`${API}/delete/contact/${userId}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(data)
    });
  
    return await response.json();
  } catch (err) {
    console.log(err);
  }

}

