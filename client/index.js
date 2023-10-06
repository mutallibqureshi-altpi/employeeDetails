const formSubmit = document.getElementById("form-submit");
const firstName = document.getElementById("input-box1");
const lastName = document.getElementById("input-box2");
const role = document.getElementById("dropdown1");
const designation = document.getElementById("dropdown2");
const category = document.getElementById("dropdown3");
const dropdown = document.querySelectorAll("select");
let table = document.getElementsByTagName("table");

window.onload = async () => {
  // reading data
  const loadData = await fetch("http://localhost:5000/");
  const res = await loadData.json();
  const tbody = document.getElementsByClassName("tbody-data")[0];
  table = "";
  res.map((val) => {
    const { id, firstname, lastname, role_id, designation_id, category_id } =
      val;
    table += `
    <tr class="_${id} change-row">
    <td>${firstname}</td>
    <td>${lastname}</td>
    <td>${role_id}</td>
    <td>${designation_id}</td>
    <td>${category_id}</td>
    <td>
      <button id=${id} class="edit-btn">
        <i class="fa-regular fa-pen-to-square"></i>
      </button>
      <button id=${id} class = "delete-btn">
        <i class="fa-solid fa-trash"></i>
      </button>
      <button id=${id} class="save-btn" disabled>
        <i class="fa-solid fa-check"></i>
      </button>
    </td>
  </tr>
    `;
  });
  tbody.innerHTML = table;
  const editBtn = document.querySelectorAll(".edit-btn");
  const deleteBtn = document.querySelectorAll(".delete-btn");

  // update data
  editBtn.forEach((btn) =>
    btn.addEventListener("click", () => {
      const editBtnClass = "_" + btn.id;
      const currElement = document.querySelector("." + editBtnClass);

      if (currElement) {
        currElement.setAttribute("contenteditable", "true");
        const saveButton = currElement.querySelector(".save-btn");
        if (saveButton) {
          saveButton.removeAttribute("disabled");
          saveButton.addEventListener("click", () => {
            const updatedRow = {
              id: btn.id,
              firstname:
                currElement.querySelector("td:nth-child(1)").textContent,
              lastname:
                currElement.querySelector("td:nth-child(2)").textContent,
              role_id: currElement.querySelector("td:nth-child(3)").textContent,
              designation_id:
                currElement.querySelector("td:nth-child(4)").textContent,
              category_id:
                currElement.querySelector("td:nth-child(5)").textContent,
            };
            const url = `http://localhost:5000/${updatedRow.id}`;
            const options = {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(updatedRow),
            };

            fetch(url, options)
              .then((response) => {
                if (response) {
                  console.log("PUT request was successful");
                  currElement.removeAttribute("contenteditable");
                  saveButton.setAttribute("disabled", "true");
                } else {
                  console.error("PUT request failed");
                }
              })
              .catch((error) => {
                console.error("Network error:", error);
              });
            location.reload();
          });
        }
      } else {
        console.log("Element not found for class: " + editBtnClass);
      }
    })
  );

  // delete data
  deleteBtn.forEach((btn) => {
    btn.addEventListener("click", async () => {
      const url = `http://localhost:5000/${btn.id}`;

      const options = {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      };

      fetch(url, options)
        .then((response) => {
          if (response) {
            console.log("DELETE request was successful");
          } else {
            console.error("DELETE request failed");
          }
        })
        .catch((error) => {
          console.error("Network error:", error);
        });
      location.reload();
    });
  });
};

const submitFormBtn = async (e) => {
  e.preventDefault();

  // inserting data
  const data = {
    firstName: firstName.value,
    lastName: lastName.value,
    role: role.value,
    designation: designation.value,
    category: category.value,
  };

  try {
    const response = await fetch("http://localhost:5000", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const res = await response.json();
    console.log(res);
  } catch (error) {
    console.error("An error occurred:", error);
  }
  firstName.value = "";
  lastName.value = "";
  location.reload();
};

formSubmit.addEventListener("submit", submitFormBtn);
