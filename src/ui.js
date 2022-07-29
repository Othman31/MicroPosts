const postsOutput = document.querySelector("#posts");
const titleInput = document.querySelector("#title");
const bodyInput = document.querySelector("#body");
const idInput = document.querySelector("#id");
const btn = document.querySelector("#post-submit");
const forState = "add";

export const showPosts = (data) => {
  let output = "";
  data.map((obj) => {
    let { id, title, body } = obj;
    output += `
    
    <div class="card pad deep-purple lighten-2 id="card" ">
    <h5 class="mrg-8tb" id="heading">${title}</h5>
    <p class="mrg-8tb">${body}</p>
      <div class="card-action">
         <a href="#" class=" edit deep-purple-text" data-id="${id}"
         ><i class="fa fa-pencil"></i></a>
         <a href="#" class="delete" data-id="${id}"
         ><i class="fa fa-remove"></i></a>
      </div>
    </div>
     `;
  });
  postsOutput.innerHTML = output;
};

export const clearfields = () => {
  titleInput.value = "";
  bodyInput.value = "";
};

const clearIdInput = () => {
  idInput.value = "";
};

export const showAlert = (msg) => {
  M.toast({ html: `${msg}`, classes: "deep-purple" });
};

//show the title,body and id in the input to edit them
export const fillForm = (data) => {
  titleInput.value = data.title;
  bodyInput.value = data.body;
  idInput.value = data.id;

  changeFormState("edit");
};

export const changeFormState = (type) => {
  if (type === "edit") {
    btn.textContent = "Update Post";
    btn.className = "teal lighten-2 btn-small teal-text text-darken-4";

    // Create cancel button
    const button = document.createElement("button");
    button.className =
      "pink accent-1 btn-small purple-text text-lighten-5 post-cancel";
    button.appendChild(document.createTextNode("Cancel Edit"));

    // Get Parent
    const cardForm = document.querySelector(".card-content");

    // Get element to insert before
    const formEnd = document.querySelector("form-end");
    // Insert the cancel button
    cardForm.insertBefore(button, formEnd);
  } else {
    btn.textContent = "Submit Post";
    btn.className =
      "deep-purple accent-1 btn-small deep-purple-text text-darken-2";

    // Remove cancel button if there
    if (document.querySelector(".post-cancel")) {
      document.querySelector(".post-cancel").remove();

      // Clear
      clearIdInput;

      // Clear title and body inputs
      clearfields();
    }
  }
};
