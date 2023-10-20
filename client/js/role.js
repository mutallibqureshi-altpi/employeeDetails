let roleForm = document.getElementById("role-form");
const roleInput = document.getElementById("role-input");
let table = document.querySelector(".table");
let tbody = document.getElementsByTagName("tbody")[0];

window.onload = async () => {
  const fetchData = await fetch("http://localhost:5000/getrole").then((res) =>
    res.json()
  );
  table = "";
  fetchData.map((data) => {
    table += `
    <tr id=${data.id}>
    <td>${data.id}</td>
    <td>${data.role}</td>
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
    btn.addEventListener("click", () => {
      id = btn.id;
      console.log("click", { id });
    });
  });
};

const roleFormSubmit = async (e) => {
  e.preventDefault();
  const data = {
    role: roleInput.value,
  };
  try {
    const roleData = await fetch("http://localhost:5000/getrole", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const response = await roleData.json();
    console.log(response);
  } catch (err) {
    console.log("Error", err.message);
  }
  roleInput.value = "";
};

roleForm.addEventListener("submit", roleFormSubmit);
