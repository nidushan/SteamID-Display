/*
	by Jan N. Sinnadurai
	Nidushan.com | @jan.sinnadurai
	Free for personal use under the CCA 3.0 license
*/
(async () => {
  if (isUserPage()) {
    const data = await getSingleUserData();

    const userDataToPrint = [
      {
        idName: "SteamID",
        idType: "Steam ID 2",
        data
      }/*,
      {
        idName: "SteamID3",
        idType: "Steam 32-bit ID",
        data
      },
      {
        idName: "SteamID64",
        idType: "steamid",
        data
      }*/,
      {
        idName: "SteamURL",
        idType: "steamURL",
        data
      }
    ];

    /**
     * Insert the data
     */
    appendUserDataToUI(userDataToPrint);

    /**
     * Initialize click events
     */
    initializeSingleUserClickEvents();
  } else if (isSocialManagementPage()) {
    const elPage = document.querySelector(".friends_content");
    const elContainer = document.querySelector(".manage_action").parentElement;

    appendButtonsToContainer(elContainer);
    const contentObserver = new MutationObserver(mutations => {
      if (!isFriendsManagerPage(mutations)) {
        return;
      }

      const elContainer = document.querySelector(".manage_action")
        .parentElement;
      appendButtonsToContainer(elContainer);
    });
    contentObserver.observe(elPage, {
      attributes: true,
      attributeFilter: ["class"]
    });
  }
})();

("use strict");

function isUserPage() {
  return Boolean(document.querySelector(".playerAvatarAutoSizeInner"));
}

function getHTML(userDataDetails) {
  return `
    <table>
      ${userDataDetails
        .map(
          iser => `
        <tr>
            <td class="steam-ids__id-name">${iser.idName}</td>
            <td>
              <a class="whiteLink steam-ids__id-copy" data-data='${JSON.stringify(
                iser.data
              )}' data-id-type="${iser.idType}">${iser.data[iser.idType]}</a>
            </td>
        </tr>
    `
        )
        .join("")}
</table>
    `;
}

function appendUserDataToUI(ids) {
  const elParent = document.querySelector(".profile_item_links");

  const elContainer = document.createElement("div");
  elParent.insertBefore(elContainer, elParent.firstElementChild);

  elContainer.classList.add("steam-ids");
  elContainer.innerHTML = getHTML(ids);
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      elContainer.classList.add("steam-ids--visible");
    });
  });
}

async function copyIdOnClick(e) {
  function isUsersChecked() {
    const elUsersChecked = document.querySelectorAll(
      ".select_friend_checkbox:checked"
    );
    return elUsersChecked.length > 0;
  }

  function getCheckedUsersData() {
    function elementToID(element) {
      while (!element.querySelector(".selectable_overlay")) {
        element = element.parentElement;
      }
      const elA = element.querySelector(".selectable_overlay");
      return getUserID(elA.href);
    }

    const elUsersChecked = document.querySelectorAll(
      ".select_friend_checkbox:checked"
    );
    const ids = Array.from(elUsersChecked).map(elementToID);

    return new Promise(resolve => {
      const port = chrome.runtime.connect({ name: "request-data" });
      port.postMessage({ ids });
      port.onMessage.addListener(resolve);
    });
  }

  function getColor(colorType) {
    const colors = {
      success: "purple",
      error: "red"
    };
    return colors[colorType];
  }

  function inputTransition(elButton, colorType) {
    elButton.style.background = getColor(colorType);

    setTimeout(() => {
      elButton.style.background = "";
    }, 500);
  }

  const {
    target: { parentElement: elButton }
  } = e;
  if (!isUsersChecked()) {
    inputTransition(elButton, "error");
    return;
  }

  const {
    dataset: { copyId: idType }
  } = elButton;

  /**
   * Convert the users' IDs to the ID that is corresponding the clicked-button
   */
  const usersData = await getCheckedUsersData();

  /**
   * Generate strings for each user. Add flags if the user wants them for the clicked ID
   */
  const text = await getTextForUsers(usersData, idType);

  /**
   * Copy the generated text
   */
  copy(text);
  inputTransition(elButton, "success");
}

function createCopyButton(text, id) {
  const elButton = document.createElement("span");
  elButton.classList.add("manage_action", "btnv6_lightblue_blue", "btn_medium");
  elButton.innerHTML = `<span>${text}</span>`;
  elButton.dataset.copyId = id;
  elButton.addEventListener("click", copyIdOnClick);
  return elButton;
}

function getLastActionChildInFriendsManager() {
  const elActionButtons = document.querySelectorAll(".manage_action");
  return elActionButtons[elActionButtons.length - 1];
}

async function getSingleUserData() {
  const id = getUserID(location.href);
  const port = chrome.runtime.connect({ name: "request-data" });
  port.postMessage({ ids: [id] });
  const users = await new Promise(resolve =>
    port.onMessage.addListener(resolve)
  );
  return users[0];
}

function initializeSingleUserClickEvents() {
  const elContainer = document.querySelector(".steam-ids");
  elContainer.addEventListener("click", async e => {
    const { target: elID } = e;
    if (elID.classList.contains("steam-ids__id-copy")) {
      const { dataset } = elID;
      const text = await getTextForSingleUser(
        JSON.parse(dataset.data),
        dataset.idType
      );
      copy(text);
    }
  });
}

function appendButtonsToContainer(elContainer) {
  const elFragment = document.createDocumentFragment();
  elFragment.append(
    /**
     * Add ID button
     */
    createCopyButton("SteamID", "Steam ID 2"),
    createCopyButton("SteamURL", "steamURL")
  );

  elContainer.insertBefore(
    elFragment,
    getLastActionChildInFriendsManager().nextElementSibling
  );
}

function isSocialManagementPage() {
  return Boolean(document.querySelector(".friends_content"));
}

function isFriendsManagerPage(mutations) {
  const { target: elPage } = mutations[0];
  return elPage.firstElementChild.id === "friends_list";
}
