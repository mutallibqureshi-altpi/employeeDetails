const designationForm = document.getElementById("designation-form");
const designationInput = document.getElementById("designation-input");
let table = document.querySelector(".table");
let tbody = document.getElementsByTagName("tbody")[0];

window.onload = async () => {
  const designationData = await fetch(
    "http://localhost:5000/getdesignation"
  ).then((res) => res.json());

  table = "";
  designationData.map((data) => {
    table += `
    <tr id=${data.id}>
    <td>${data.id}</td>
    <td>${data.designation}</td>
    <td>
    <button id=${data.id} type="button" class="edit-btn _${data.id}">
      <i class="fa-regular fa-pen-to-square"></i>
    </button>
    <button id=${data.id} class = "delete-btn">
      <i class="fa-solid fa-trash"></i>
    </button>
    <button id=${data.id} class="save-btn" disabled>
      <i class="fa-solid fa-check"></i>
    </button>
  </td>
    </tr>

    `;
  });
  tbody.innerHTML = table;
  const editBtn = document.querySelectorAll(".edit-btn");
  editBtn.forEach((btn) => {
    btn.addEventListener("click", async () => {
      const currElement = document.querySelector("." + btn.classList[1]);
      if (currElement) {
        const editRow = currElement.parentNode.parentElement.childNodes[3];
        editRow.setAttribute("contenteditable", "true");
        editRow.focus();

        const saveBtn = currElement.parentNode.querySelector(".save-btn");
        saveBtn.removeAttribute("disabled");
        saveBtn.addEventListener("click", async () => {
          const updatedRow = editRow.textContent;
          const data = {
            designation: updatedRow,
          };
          try {
            const designationUpdate = await fetch(
              `http://localhost:5000/getdesignation/${btn.id}`,
              {
                method: "PUT",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
              }
            );
            const response = await designationUpdate.json();
            console.log(response);
          } catch (err) {
            console.log("Error", err.message);
          }
          location.reload();
        });
      }
    });
  });
  const deleteBtn = document.querySelectorAll(".delete-btn");
  deleteBtn.forEach((btn) => {
    btn.addEventListener("click", async () => {
      try {
        const designationData = await fetch(
          `http://localhost:5000/getdesignation/${btn.id}`,
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const response = await designationData.json();
        console.log(response);
      } catch (err) {
        console.log("Error", err.message);
      }
      location.reload();
    });
  });
};

const designationFormSubmit = async () => {
  const data = {
    designation: designationInput.value,
  };
  try {
    const designationData = await fetch(
      "http://localhost:5000/getdesignation",
      {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const res = await designationData.json();
    console.log(res);
  } catch (err) {
    console.log("Error", err.message);
  }
};

designationForm.addEventListener("submit", designationFormSubmit);
