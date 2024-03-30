import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import axios from "axios";
import { Editor } from "@tinymce/tinymce-react";
import { API } from "../backend";

import {
  getAllUsers,
  isAuthenticated,
  getAllMandateUsers,
  getAllUnmandateUsers,
  createServices,
  getServices,
  removeServices,
  removeUser,
} from "../auth";
import Footer from "../Components/Footer";

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [users, setUsers] = useState([{}]);
  const userId = isAuthenticated().user._id;
  const token = isAuthenticated().token;
  const [opt, setOpt] = useState(1);
  const [error, setError] = useState("");
  const [mandateUsers, setMandateUsers] = useState([{}]);
  const [unmandateUsers, setUnMandateUsers] = useState([{}]);
  const [newservice, setNewService] = useState("");
  const [allServices, setAllServices] = useState([]);
  const [success, setSuccess] = useState("");
  const [reload, setReload] = useState(false);
  const [value, setValue] = useState("");
  const [filter, setFilter] = useState(false);
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [subject, setSubject] = useState("");
  const [text, setText] = useState("");
  const [attachment, setAttachment] = useState(null);
  const [sunshine, setSunshine] = useState("");
  const [category, setCategory] = useState("");
  const [emails, setEmails] = useState([{}]);
  const [emailist, setEmailList] = useState([{}]);
  const [flag, setFlag] = useState(false)
  const [allSunshine, setAllSunshine] = useState(["Aries", "Taurus", "Gemini", "Cancer", "Leo", "Virgo", "Libra", "Scorpio", "Sagittarius", "Capricorn", "Aquarius", "Pisces"])
  const user = isAuthenticated().user.email;

  const quillRef = useRef(null);
  function handleChange(value) {
    setValue(value);
  }

  const editorRef = useRef(null);

  useEffect(() => {
    getServices()
      .then((data) => {
        setAllServices(data);
      })
      .then((err) => {
        setError(err.toString())
      });
  }, [reload]);

  const selectedOption = () => {
    if (opt === 1) {
      return allUsers();
    } else if (opt === 2) {
      return allUnmandatedUsers();
    } else if (opt === 3) {
      return allMandatedUsers();
    } else if (opt === 4) {
      return createService();
    } else if (opt === 5) {
      return manageService();
    }
  };


  const manageNewService = async () => {
    // e.preventDefault();
    setText(editorRef.current.getContent());
    const formData = new FormData();
    formData.append("from", user);
    formData.append("to", emailist);
    formData.append("subject", subject);
    formData.append("html", editorRef.current.getContent());
    if (attachment) {
      formData.append("attachment", attachment);
    }

    try {
      const response = await axios.post(
        `${API}/send-mail`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      if (!response.data) {
        setError("Error in mailing");
      }
      setSuccess("Mail Has Been Successfully Sent!!");
    } catch (error) {
      setError(error)
    }
  };

  const createFilter = async () => {

      await axios.post(
        `${API}/getbyfilter`,
        { sunshine, category },
        {
          headers: { "Content-Type": "application/json" },
        }
      ).then((response)=>{

      
      
      if (!response.data ) {
        setFilter(false)
        setError("No user found in Database");
      }
      
      setEmails(response.data.user);

     
      let emaillist = [];

      
      for (let i = 0; i < emails.length; i++) {

        emaillist.push(emails[i].email);
      }
      
      if (emaillist.length === 0 ) {
        setFilter(false)
        setSuccess("")
        setError("No Data in Database To Create Filter Or Refresh ");
      }
else{

      setEmailList(emaillist.toString());
      setError("")
      
      setFilter(true);
      setSuccess("Filter Created Successfully  ");
  
    }
  }).catch(setFilter(false))
    
  };

  const manageService = () => {
    return (
      <div>
        {success && (
          <div class="alert alert-success" role="alert">
            {success}
          </div>
        )}

        {error && (
          <div class="alert alert-danger" role="alert">
            {error}
          </div>
        )}
        <div className="container-fluid border border-dark p-2">
          <div className="container border border-primary p-4 rounded">
            <h3 className="">Create Article Filter</h3>
            <hr />


            <h5 className=" ">Category:</h5>
            {/* <div class="form-outline mb-4 border border-dark rounded"> */}
            <select
              class="form-control custom-select custom-select-lg border border-dark mb-4"
              value={category}
              onChange={(e) => {
                setCategory(e.target.value);
                if (e.target.value === "Astrology") {
                  setFlag(true)
                } else {
                  setFlag(false)

                }

              }}
            >
              <option selected>Select Category</option>
              {allServices.map((data, index) => {
                return (
                  <option id={index} value={data.name_of_service}>
                    {data.name_of_service}
                  </option>
                );
              })}
            </select>


            {flag && <><h5 className=" ">Sunshine:</h5>
              {/* <div class="form-outline mb-4 border border-dark rounded"> */}
              <select
                class="form-control custom-select custom-select-lg border border-dark mb-4"
                value={sunshine}
                onChange={(e) => {
                  setSunshine(e.target.value);
                }}
              >
                <option selected>Select Category</option>
                {allSunshine.map((data, index) => {
                  return (
                    <option id={index} value={data}>
                      {data}
                    </option>
                  );
                })}
              </select>
            </>
            }




            <center>
              {" "}
              <button
                className="btn btn-success p-2 m-2"
                onClick={createFilter}
              >
                Create Filter
              </button>
            </center>

            {/* </div> */}
          </div>
          <br></br>
          {filter && (
            <div className="container border border-primary p-4 rounded">
              <h3 className="">Send Mail</h3>
              <hr />

              <h5 className="">Subject:</h5>
              <div class="form-outline mb-4">
                <input
                  type="email"
                  id="form1Example1"
                  class="form-control border border-dark"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                />
                <label class="form-label" for="form1Example1"></label>
              </div>
              <h5 className="">Message:</h5>
              <div class="form-outline mb-4 ">
                <Editor
                  apiKey="0ltak6mqsc85zswhjaip7caj4dmyo0tbtujyn7s1ynh9w7ts"
                  onInit={(evt, editor) => (editorRef.current = editor)}
                  initialValue="<p>This is the initial content of the editor.</p>"
                  init={{
                    height: 500,
                    menubar: false,
                    plugins: [
                      "advlist",
                      "autolink",
                      "lists",
                      "link",
                      "image",
                      "charmap",
                      "preview",
                      "anchor",
                      "searchreplace",
                      "visualblocks",
                      "code",
                      "fullscreen",
                      "insertdatetime",
                      "media",
                      "table",
                      "code",
                      "help",
                      "wordcount",
                    ],
                    toolbar:
                      "undo redo | blocks | " +
                      "bold italic forecolor | alignleft aligncenter " +
                      "alignright alignjustify | bullist numlist outdent indent | " +
                      "removeformat | help",
                    content_style:
                      "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
                  }}
                />
              </div>

              <br></br>
              <h5 className=" mt-4">Attachment :</h5>
              <div class="form-outline mb-4">
                <input
                  type="file"
                  id="form1Example1"
                  class="form-control border border-dark"
                  onChange={(e) => setAttachment(e.target.files[0])}
                />
                <label class="form-label" for="form1Example1"></label>
              </div>
              <center>
                <button
                  className="btn btn-success p-2 m-2"
                  onClick={manageNewService}
                >
                  Publish
                </button>
              </center>
            </div>
          )}
        </div>
      </div>
    );
  };

  useEffect(() => {
    getAllUsers(userId, token)
      .then((data) => {
        if (data.error) {
          setError(data.error);
        } else {
          setUsers(data);
        }
      })
      .catch((err) => {
        setError(err)
      });
  }, [reload]);

  useEffect(() => {
    getAllMandateUsers(userId, token)
      .then((data) => {
        if (data.error) {
          setError(data.error);
        } else {

          setMandateUsers(data);
        }
      })
      .catch((err) => {
        setError(err.toString())
      });
  }, []);

  useEffect(() => {
    getAllUnmandateUsers(userId, token)
      .then((data) => {
        if (data.error) {
          setError(data.error);
        } else {
          setUnMandateUsers(data);
        }
      })
      .catch((err) => {
        setError(err.toString())
      });
  }, []);

  const deleteUser = (id) => {
    removeUser(userId, token, { _id: id })
      .then((data) => {
        if (data.error) {
          setError(data.error);
        } else {
          setSuccess("Service Deletion Successfull");
          setReload(!reload);
        }
      })
      .catch((err) => {
        setError(err)
      });
  };
  const deleteService = (id) => {
    removeServices(userId, token, { _id: id })
      .then((data) => {
        if (data.error) {
          setError(data.error);
        } else {
          setSuccess("Service Deletion Successfull");
          setReload(!reload);
        }
      })
      .catch((err) => {
        setError(err.toString())
      });
  };
  const createService = () => {
    return (
      <div className="container-fluid border border-dark p-2">
        <div className="container border border-primary p-4">
          <h3 className="">Create Service</h3>
          <hr />
          {success && (
            <div class="alert alert-success" role="alert">
              {success}
            </div>
          )}

          {error && (
            <div class="alert alert-danger" role="alert">
              {error}
            </div>
          )}
          <h5 className="">Name of Service:</h5>
          <div class="form-outline mb-4">
            <input
              type="email"
              id="form1Example1"
              class="form-control border border-dark"
              value={newservice}
              onChange={(e) => setNewService(e.target.value)}
            />
            <label class="form-label" for="form1Example1"></label>
          </div>
          <center>
            <button className="btn btn-success" onClick={createNewService}>
              Create Service
            </button>
          </center>
        </div>
        <br></br>

        <div className="container p-4 border border-primary">
          <h3 className="">All Services</h3>
          <hr></hr>
          {allServices.map((data, index) => {
            return (
              <div
                key={index}
                className="container-fluid row border border dark p-2 mt-2  font-monospace border-3 "
              >
                <div className="col-8">
                  <span>
                    <b>Name of Service</b>:{data.firstname}{" "}
                    {data.name_of_service}
                  </span>
                </div>
                <div className="col-4 align-content-center ">
                  <button
                    className="btn btn-danger"
                    onClick={() => {
                      deleteService(data._id);
                    }}
                  >
                    Delete Service
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };
  const createNewService = () => {
    createServices(userId, token, { name_of_service: newservice })
      .then((data) => {
        if (data.error) {
          setError(data.error);
        } else {
          setSuccess("Service Created Successfully");
          setReload(!reload);
        }
      })
      .catch((err) => { });
  };
  const allUsers = () => {
    return (
      <div className="">
        {error !== undefined ? error : ""}
        {users.map((data, index) => {
          return (
            <div
              key={index}
              className="container-fluid row border border dark p-2 mt-2  font-monospace border-3 "
            >
              <div className="col-8">
                <span>
                  <b>Name</b>:{data.firstname} {data.lastname}
                </span>
                <br />
                <span>
                  <b>Email</b>:{data.email}
                </span>
              </div>
              <div className="col-4 align-content-center ">
                <button
                  className="btn btn-primary"
                  onClick={() => {
                    navigate("/user/detail", { state: { data: data } });
                  }}
                >
                  View Details
                </button>{" "}
                <button
                  className="btn btn-danger"
                  onClick={() => {
                    deleteUser(data._id);
                  }}
                >
                  Delete{" "}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    );
  };
  const allMandatedUsers = () => {
    return (
      <div className="">
        {error !== undefined ? error : ""}

        {mandateUsers.map((data, index) => {
          return (
            <div
              key={index}
              className="container-fluid row border border dark p-2 mt-2  font-monospace border-3 "
            >
              <div className="col-8">
                <span>
                  <b>Name</b>:{data.firstname} {data.lastname}
                </span>
                <br />
                <span>
                  <b>Email</b>:{data.email}
                </span>
              </div>
              <div className="col-4 align-content-center ">
                <button
                  className="btn btn-primary"
                  onClick={() => {
                    navigate("/user/detail", { state: { data: data } });
                  }}
                >
                  View Details
                </button>
                <button
                  className="btn btn-danger"
                  onClick={() => {
                    deleteUser(data._id);
                  }}
                >
                  Delete{" "}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  const allUnmandatedUsers = () => {
    return (
      <div className="">
        {error !== undefined ? error : ""}
        {unmandateUsers.map((data, index) => {
          return (
            <div
              key={index}
              className="container-fluid row border border dark p-2 mt-2  font-monospace border-3 "
            >
              <div className="col-8">
                <span>
                  <b>Name</b>:{data.firstname} {data.lastname}
                </span>
                <br />
                <span>
                  <b>Email</b>:{data.email}
                </span>
              </div>
              <div className="col-4 align-content-center ">
                <button
                  className="btn btn-primary"
                  onClick={() => {
                    navigate("/user/detail", { state: { data: data } });
                  }}
                >
                  View Details
                </button>
                <button
                  className="btn btn-danger ml-2"
                  onClick={() => {
                    deleteUser(data._id);
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className="container-fluid ">
      <div className="h-100 d-flex align-items-center justify-content-center  mt-2 p-2">
        <div class="btn-group shadow-0 border border-dark" role="group">
          <button
            type="button"
            class="btn btn-light"
            data-mdb-color="dark"
            onClick={() => {
              setOpt(1);
            }}
          >
            All Users
          </button>
          <button
            type="button"
            class="btn btn-light"
            data-mdb-color="dark"
            onClick={() => {
              setOpt(2);
            }}
          >
            Unmandated Users
          </button>
          <button
            type="button"
            class="btn btn-light"
            data-mdb-color="dark"
            onClick={() => {
              setOpt(3);
            }}
          >
            Mandated Users
          </button>
          <button
            type="button"
            class="btn btn-light"
            data-mdb-color="dark"
            onClick={() => {
              setOpt(4);
            }}
          >
            Create Service
          </button>
          <button
            type="button"
            class="btn btn-light"
            data-mdb-color="dark"
            onClick={() => {
              setOpt(5);
            }}
          >
            Manage Service
          </button>
        </div>
      </div>

      <div>{selectedOption()}</div>


      <Footer />
    </div>
  );
}
