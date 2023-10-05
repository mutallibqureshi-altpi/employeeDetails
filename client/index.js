const formSubmit = document.getElementById("form-submit");
const firstName = document.getElementById("input-box1");
const lastName = document.getElementById("input-box2");
const role = document.getElementById("dropdown1");
const designation = document.getElementById("dropdown2");
const category = document.getElementById("dropdown3");
const dropdown = document.querySelectorAll("select");
let table = document.getElementsByTagName("table");

window.onload = async () => {
  const loadData = await fetch("http://localhost:5000/");
  const res = await loadData.json();
  console.log(res);
  const test = document.getElementsByClassName("kuch")[0];
  res.map((val) => {
    const { firstname, lastname, role_id, designation_id, category_id } = val;
    table += `
    <tr class="_1 change-row" id="1">
    <td>${firstname}</td>
    <td>${lastname}</td>
    <td>${role_id}</td>
    <td>${designation_id}</td>
    <td>${category_id}</td>
    <td>
      <button id="1" class="edit-btn">
        <i class="fa-regular fa-pen-to-square"></i>
      </button>
      <button id="delete">
        <i class="fa-solid fa-trash"></i>
      </button>
      <button id="save" disabled>
        <i class="fa-solid fa-check"></i>
      </button>
    </td>
  </tr>
    `;
  });
  // table = `
  // <tr class="_1 change-row" id="1">
  //   <td>Mark</td>
  //   <td>Otto</td>
  //   <td>Developer</td>
  //   <td>Senior</td>
  //   <td>Front-End</td>
  //   <td>
  //     <button id="1" class="edit-btn">
  //       <i class="fa-regular fa-pen-to-square"></i>
  //     </button>
  //     <button id="delete">
  //       <i class="fa-solid fa-trash"></i>
  //     </button>
  //     <button id="save" disabled>
  //       <i class="fa-solid fa-check"></i>
  //     </button>
  //   </td>
  // </tr>
  // <tr class="_2 change-row" id="2">
  //   <td contenteditable="true">Jacob</td>
  //   <td>Thornton</td>
  //   <td>Tester</td>
  //   <td>Junior</td>
  //   <td>Back-End</td>
  //   <td>
  //     <button id="2" class="edit-btn">
  //       <i class="fa-regular fa-pen-to-square"></i>
  //     </button>
  //     <button id="delete">
  //       <i class="fa-solid fa-trash"></i>
  //     </button>
  //   </td>
  // </tr>
  // <tr class="_3">
  //   <td>Larry the Bird</td>
  //   <td>demo</td>
  //   <td>Designer</td>
  //   <td>Intern</td>
  //   <td>HR</td>
  //   <td>
  //     <button id="3" class="edit-btn">
  //       <i class="fa-regular fa-pen-to-square"></i>
  //     </button>
  //     <button id="delete">
  //       <i class="fa-solid fa-trash"></i>
  //     </button>
  //   </td>
  // </tr>

  // `;
  test.innerHTML = table;
  const editBtn1 = document.querySelectorAll(".edit-btn");
  const deleteBtn = document.querySelectorAll("#delete");
  const saveBtn = document.querySelectorAll(".save");

  editBtn1.forEach((btn) =>
    btn.addEventListener("click", () => {
      // const selectClass = document.querySelectorAll(".change-row");
      // selectClass.forEach((data) => {
      //   if (data.id === btn.id) {
      //     data.setAttribute("contenteditable", true);
      //     saveBtn.removeAttribute("disabled");
      //   }
      // });
      const validClassName = "_" + btn.id;
      const targetElement = document.querySelector("." + validClassName);

      if (targetElement) {
        targetElement.setAttribute("contenteditable", true);
        saveBtn.removeAttribute("disabled");
      } else {
        console.log("Element not found for class: " + validClassName);
      }

      deleteBtn.forEach((btn) => {
        btn.addEventListener("click", () => console.log("click"));
      });
    })
  );
};

const submitFormBtn = async (e) => {
  e.preventDefault();
  const data = {
    firstName: firstName.value,
    lastName: lastName.value,
    role: role.value,
    designation: designation.value,
    category: category.value,
  };

  try {
    const response = await fetch("http://localhost:5000/", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      const res = await response.json();
      console.log(res);
    } else {
      console.error("Server error:", response.status, response.statusText);
    }
  } catch (error) {
    console.error("An error occurred:", error);
  }
  firstName.value = "";
  lastName.value = "";
};

formSubmit.addEventListener("submit", submitFormBtn);
