const elem = {
  chatArea: document.getElementById("chat-area"),
  inputArea: document.getElementById("input-area"),
  inputText: document.getElementById("input-text"),
};

const addUserMsgElement = (msgContent) => {
  const htmlStr = /* html */ ` 
    <div class="user-msg">
      <p class="user-msg-content">
        ${msgContent}
      </p>
      <span class="user-msg-arrow"></span>
    </div>`;

  const template = document.createElement("template");
  template.innerHTML = htmlStr.trim();
  elem.chatArea.appendChild(template.content.firstChild);
};

const addBotMsgElement = () => {
  const reps = Math.floor((Math.random() * 3) % 2);

  for (let i = 0; i < reps; i++) {
    const htmlStr = /* html */ `
      <div class="bot-msg">
        <span class="bot-msg-nickname">봇</span>
        <img class="bot-msg-img" src="./assets/boy.png" />
        <span class="bot-msg-arrow"></span>
        <p class="bot-msg-content">헉</p>
        <span>a</span>
      </div>`;

    const template = document.createElement("template");
    template.innerHTML = htmlStr.trim();
    elem.chatArea.appendChild(template.content.firstChild);
  }
};

//

elem.inputArea.addEventListener("submit", (e) => {
  e.preventDefault();

  const text = elem.inputText.value;
  console.log(text, !text);
  if (!text) return;

  elem.inputText.value = "";

  addUserMsgElement(text);
  addBotMsgElement();

  elem.chatArea.scrollTop = elem.chatArea.scrollHeight;
});
