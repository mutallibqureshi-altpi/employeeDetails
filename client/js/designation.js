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
    <button data-id=${data.id} type="button" class="edit-btn">
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
