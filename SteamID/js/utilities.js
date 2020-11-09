/*
	by Jan N. Sinnadurai
	Nidushan.com | @jan.sinnadurai
	Free for personal use under the CCA 3.0 license
*/
"use strict";

function getUserID(href) {
  href = href || location.href;
  const url = href.split("?")[0];
  const urlMatch = url.match(/(?:profiles|id|u)\/([^\/]+)/);
  const id = urlMatch[1];
  return id;
}

function copy(text) {
  const elTextarea = document.createElement("textarea");
  document.body.append(elTextarea);
  elTextarea.style.position = "fixed";
  elTextarea.value = text;
  elTextarea.focus();
  elTextarea.select();
  document.execCommand("Copy");
  elTextarea.remove();
}

function getSteamURL(user) {
  return `https://steamcommunity.com/profiles/${user.steamid}`;
}

function getSteamName(user) {
  return `${user.personaname}`;
}

function isUsingFlag(flag) {
  return flag !== "";
}

function isUseExtendedData(generateUserDetails, idType) {
  return generateUserDetails[idType];
}

async function getTextForUsers(usersData, idType) {
  /**
   * For each user:
   */
  const text = await Promise.all(usersData.map(user => getTextForSingleUser(user, idType)));
  return text.join("\n");
}

async function getTextForSingleUser(user, idType) {
  const {generateUserDetails, flag} = await new Promise(resolve =>
    chrome.storage.sync.get(["generateUserDetails", "flag"], resolve));

  const textArray = [user[idType]];
  if (isUsingFlag(flag)) {
    textArray.push(flag);
  }
  if (isUseExtendedData(generateUserDetails, idType)) {
    textArray.push(getSteamURL(user));
}
  return textArray.join(" ");
}