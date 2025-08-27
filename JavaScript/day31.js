// Day 31: Fetch API & JSON Demo

document
  .getElementById("fetchBtn")
  .addEventListener("click", async function () {
    const resultDiv = document.getElementById("jsonResult");
    resultDiv.textContent = "Loading...";
    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/users"
      );
      if (!response.ok) throw new Error("Network response was not ok");
      const data = await response.json();
      resultDiv.textContent = formatUsers(data);
      resultDiv.style.color = "#00b894";
    } catch (err) {
      resultDiv.textContent = "Error: " + err.message;
      resultDiv.style.color = "#e74c3c";
    }
  });

function formatUsers(users) {
  return users
    .map(
      (user) =>
        `Name: ${user.name}\nEmail: ${user.email}\nCity: ${user.address.city}\n---`
    )
    .join("\n");
}
