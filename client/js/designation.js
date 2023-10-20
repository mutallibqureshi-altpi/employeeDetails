let designationForm = document.getElementById("designation-form");
const designationInput = document.getElementById("designation-input");
const designationFormSubmit = async (e) => {
  e.preventDefault();
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
    const response = await designationData.json();
    console.log(response);
  } catch (err) {
    console.log("Error", err.message);
  }
  designationInput.value = "";
};

designationForm.addEventListener("submit", designationFormSubmit);
