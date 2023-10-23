const categoryForm = document.getElementById("category-form");
const categoryInput = document.getElementById("category-input");
let table = document.querySelector(".table");
let tbody = document.getElementsByTagName("tbody")[0];

window.onload = async () => {
  const categoryData = await fetch("http://localhost:5000/getcategory").then(
    (res) => res.json()
  );

  table = "";
  categoryData.map((data) => {
    table += `
    <tr id=${data.id}>
    <td>${data.id}</td>
    <td>${data.category}</td>
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
        const categoryData = await fetch(
          `http://localhost:5000/getcategory/${btn.id}`,
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const response = await categoryData.json();
        console.log(response);
      } catch (err) {
        console.log("Error", err.message);
      }
      location.reload();
    });
  });
};

const categoryFormSubmit = async () => {
  const data = {
    category: categoryInput.value,
  };
  try {
    const categoryData = await fetch("http://localhost:5000/getcategory", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const response = await categoryData.json();
    console.log(response);
  } catch (err) {
    console.log("Error", err.message);
  }
};

categoryForm.addEventListener("submit", categoryFormSubmit);
