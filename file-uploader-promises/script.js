const startBtn = document.getElementById("btn");
const container = document.getElementById("container");
/* eslint-disable @typescript-eslint/no-unused-vars */
function destroyPopup(popup) {
  popup.remove();
}

function ask({ title, cancel = false }) {
  return new Promise((resolve) => {
    const popup = document.createElement("form");

    popup.classList.add("popup");
    popup.classList.add("open");

    popup.insertAdjacentHTML(
      "afterbegin",
      `<fieldset class="files">
          <label>${title}</label>
          <input type="file" name="input" />
          <button type="submit">Submit</button>
        </fieldset>`
    );

    if (cancel) {
      const cancelBtn = document.createElement("button");
      cancelBtn.type = "button";
      cancelBtn.textContent = "Skip";

      popup.appendChild(cancelBtn);

      cancelBtn.addEventListener("click", () => {
        resolve(null);
        destroyPopup(popup);
      });
    }

    function uploadFile(e) {
      e.preventDefault(); // для того чтобы после нажатия сабмит значения не сохранялись в адресную строку
      const inputValue = e.target.input.value;
      resolve(inputValue); // делаем ресолв, так как он уже ответил на наш запрос
      destroyPopup(popup);
    }

    popup.addEventListener(
      "submit",
      (e) => {
        if (e.target.input.value == "") {
          alert("You haven't upload any file! Start again please!");
        } else {
          uploadFile(e);
        }
      },
      { once: true }
    ); // только один раз слушать событие сабмит (конфигурация)

    document.body.appendChild(popup);
  });
}
const questions = [
  {
    title: "Please upload first file: YOUR PHOTO",
  },
  {
    title: "Please upload second file: YOUR PERSONAL INFO DOCUMENT",
  },
  {
    title: "Please upload third file: YOUR CV",
    cancel: true,
  },
];

async function askAll() {
  for (const question of questions) {
    const answer = await ask(question);
    console.log(answer);
  }
}
startBtn.addEventListener("click", () => {
  container.style.display = "none";
  askAll();
});
