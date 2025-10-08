const footerEl = document.createElement("footer");
document.body.appendChild(footerEl);

const footer = document.querySelector("footer");

const today = new Date();
const thisYear = today.getFullYear();

const copyright = document.createElement("p");
copyright.innerHTML = `Alysia Martin ${thisYear}`;
footer.appendChild(copyright);

const skills = ["JavaScript", "HTML", "CSS", "GitHub"];
const skillsSection = document.getElementById("skills");
const skillsList = skillsSection.querySelector("ul");

for (let i = 0; i < skills.length; i++) {
    const skill = document.createElement("li");
    skill.innerText = skills[i];
    skillsList.appendChild(skill);
}

const messageForm = document.forms['leave_message'];

messageForm.addEventListener('submit', function (event) {
  event.preventDefault();

  const name = event.target.usersName.value;
  const email = event.target.usersEmail.value;
  const message = event.target.usersMessage.value;

  console.log(name, email, message);

  const messageSection = document.getElementById('messages');
  const messageList = messageSection.querySelector('ul');

  const newMessage = document.createElement('li');
  newMessage.innerHTML = `<a href="mailto:${email}">${name}</a> <span>${message}</span>`;

  const removeButton = document.createElement('button');
  removeButton.innerText = 'remove';
  removeButton.type = 'button';

  removeButton.addEventListener('click', function () {
    const entry = removeButton.parentNode;
    entry.remove();
  });

  newMessage.appendChild(removeButton);
  messageList.appendChild(newMessage);

  messageForm.reset();
});
