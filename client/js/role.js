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
    <button id=${data.id} type="button" class ="edit-btn _${data.id}">
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
    console.log(btn);
    btn.addEventListener("click", async () => {
      btn.setAttribute("disabled", "");
      const currElement = document.querySelector("." + btn.classList[1]);
      if (currElement) {
        const editRow = currElement.parentNode.parentElement.childNodes[3];
        editRow.setAttribute("contenteditable", "true");
        editRow.focus();

        const saveBtn = currElement.parentNode.querySelector(".save-btn");
        saveBtn.removeAttribute("disabled");
        saveBtn.addEventListener("click", async () => {
          const updatedRow = editRow.textContent;
          console.log(updatedRow);

          const data = {
            role: updatedRow,
          };
          try {
            const roleUpdate = await fetch(
              `http://localhost:5000/getrole/${btn.id}`,
              {
                method: "PUT",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
              }
            );
            const response = await roleUpdate.json();
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
        const roleData = await fetch(
          `http://localhost:5000/getrole/${btn.id}`,
          {
            method: "delete",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const response = await roleData.json();
        console.log(response);
      } catch (err) {
        console.log("Error", err.message);
      }
      location.reload();
    });
  });
};

const roleFormSubmit = async () => {
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
};

roleForm.addEventListener("submit", roleFormSubmit);
