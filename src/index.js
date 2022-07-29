import "./style.css";
import { get, post, remove, put } from "./http.js";
import {
  showPosts,
  showAlert,
  fillForm,
  clearfields,
  changeFormState,
} from "./ui.js";

// Get posts on DOM load
document.addEventListener("DOMContentLoaded", getPosts);

// Listen for add post
document.querySelector("#post-submit").addEventListener("click", addPost);

// Listen for delete
document.querySelector("#posts").addEventListener("click", removePost);

// Listen for edit state
document.querySelector("#posts").addEventListener("click", enableEdit);

// Listen for cancel btn
document.querySelector(".card-content").addEventListener("click", cancelEdit);

function getPosts() {
  get("http://localhost:3000/posts")
    .then((data) => showPosts(data))
    .catch((err) => console.log(err));
}

function addPost() {
  const title = document.querySelector("#title").value;
  const body = document.querySelector("#body").value;
  const idInput = document.querySelector("#id").value;

  if (title === "" || body === "") {
    showAlert("FILL ALL INPUTS");
  } else {
    const data = {
      title: title,
      body: body,
    };

    // Check for ID
    if (idInput === "") {
      // Empty mean it's not in edit mode
      post("http://localhost:3000/posts", data)
        .then((data) => {
          showAlert("Poste ADDED");
          getPosts();
          clearfields();
        })
        .catch((err) => console.log(err));
    } else {
      // this mean the id has a number so we are in Edit mode
      put(`http://localhost:3000/posts/${idInput}`, data).then((data) => {
        showAlert("Poste UPDATED");
        changeFormState("add");
        getPosts();
        clearfields();
      });
    }
  }
}

// Delete Post
function removePost(e) {
  e.preventDefault();
  // Checking if the parent has a child with delete class
  if (e.target.parentElement.classList.contains("delete")) {
    // Get the id of the poste which we set as data-id in the ui showPosts function
    // parent element is the a
    const id = e.target.parentElement.dataset.id;

    remove(`http://localhost:3000/posts/${id}`)
      .then((data) => {
        showAlert("POSTE REMOVED");
        getPosts();
      })
      .catch((err) => console.log(err));
  }
}

// Enable Edit state
function enableEdit(e) {
  if (e.target.parentElement.classList.contains("edit")) {
    const id = e.target.parentElement.dataset.id;

    // Selecting the title starting from the i that contain the class edit
    const title =
      e.target.parentElement.parentElement.previousElementSibling
        .previousElementSibling.textContent;

    // Selecting the body starting from the i that contain the class edit
    const body =
      e.target.parentElement.parentElement.previousElementSibling.textContent;

    const data = {
      id: id,
      title: title,
      body: body,
    };
    fillForm(data);
  }
  e.preventDefault();
}

// Cancel Edit state
function cancelEdit(e) {
  if (e.target.classList.contains("post-cancel")) {
    changeFormState("add");
  }
  e.preventDefault();
}
