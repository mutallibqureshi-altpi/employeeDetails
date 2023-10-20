let categoryForm = document.getElementById("category-form");
const categoryInput = document.getElementById("category-input");
const categoryFormSubmit = async (e) => {
  e.preventDefault();
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
  categoryInput.value = "";
};

categoryForm.addEventListener("submit", categoryFormSubmit);
