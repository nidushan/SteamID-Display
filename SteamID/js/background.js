/*
	by Jan N. Sinnadurai
	Nidushan.com | @jan.sinnadurai
  Free for personal use under the CCA 3.0 license
*/
"use strict";

chrome.runtime.onInstalled.addListener(() => {
  initializeDefaultsInStorage();
});

chrome.runtime.onConnect.addListener(port => {
  if (port.name === "request-data") {
    port.onMessage.addListener(async ({ ids }) => {
      const data = await idsToMultiUserData(ids);
      port.postMessage(data);
    });
  }
});

//Right click copy buttons
chrome.contextMenus.create({
  title: "SteamID Display ─ Copy SteamID",
  id: "Steam ID 2",
  contexts: ["link"],
  targetUrlPatterns: [
    "https://steamcommunity.com/id/*",
    "https://steamcommunity.com/profiles/*",
    "https://backpack.tf/u/*"
  ]
});

chrome.contextMenus.create({
  title: "SteamID Display ─ Copy SteamURL",
  id: "steamURL",
  contexts: ["link"],
  targetUrlPatterns: [
    "https://steamcommunity.com/id/*",
    "https://steamcommunity.com/profiles/*",
    "https://backpack.tf/u/*"
  ]
});
/*
chrome.contextMenus.create({
  title: "Copy steamID3",
  id: "Steam 32-bit ID",
  contexts: ["link"],
  targetUrlPatterns: [
    "https://steamcommunity.com/id/*",
    "https://steamcommunity.com/profiles/*",
    "https://backpack.tf/u/*"
  ]
});

chrome.contextMenus.create({
  title: "Copy steamID64",
  id: "steamid",
  contexts: ["link"],
  targetUrlPatterns: [
    "https://steamcommunity.com/id/*",
    "https://steamcommunity.com/profiles/*",
    "https://backpack.tf/u/*"
  ]
});
*/
chrome.contextMenus.onClicked.addListener(async info => {
  const { menuItemId, linkUrl } = info;
  const id = getUserID(linkUrl);
  const _64bitID = await to64bitID(id);
  const userData = await idsToMultiUserData([_64bitID]);
  const textForSingleUser = await getTextForSingleUser(userData[0], menuItemId);
  copy(textForSingleUser);
});

const apiKey = "CDFA60E07B2DB4E4A0FA21C3A3C49111";

function getUrl64bit(id) {
  return `https://api.steampowered.com/ISteamUser/ResolveVanityURL/v0001?key=${apiKey}&vanityurl=${id}`;
}

function getUrlData(ids) {
  return `https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002?key=${apiKey}&steamids=${ids}`;
}

async function to64bitID(customURL) {
  if (Boolean(customURL.match(/7656119\d{10}/))) {
    return customURL;
  }
  return fetch(getUrl64bit(customURL))
    .then(data => data.json())
    .then(json => json.response.steamid);
}

async function getUsersData(_64bitIDs) {
  return fetch(getUrlData(await Promise.all(_64bitIDs))).then(data =>
    data.json()
  );
}

function toID(idType, data) {
  const steam64bitIdentifier = bigInt("0110000100000000", 16);
  const { steamid: _64bitID, communityvisibilitystate } = data;
  switch (idType) {
    case "id-2": {
      const id = bigInt(_64bitID);
      const X = Number(communityvisibilitystate !== 3);
      const Y = id.mod(2);
      const Z = id.subtract(steam64bitIdentifier).divide(2);
      return `STEAM_${X}:${Y}:${Z}`;
    }
    case "32": {
      const id = bigInt(_64bitID);
      const Y = id.subtract(steam64bitIdentifier);
      return `[U:1:${Y}]`;
    }
    case "steamurl": {
      const id = bigInt(_64bitID);
      return `https://steamcommunity.com/profiles/${id}`;
      //return `Link:`;
    }
  }
}

function getOtherIDs(data) {
  return {
    "Steam ID 2": toID("id-2", data),
    "Steam 32-bit ID": toID("32", data),
    "steamURL": toID("steamurl", data)
  };
}

function initializeDefaultsInStorage() {
  chrome.storage.sync.set({
    flag: "",
    generateUserDetails: {
      "Steam ID 2": false,
      "Steam 32-bit ID": false,
      steamid: false,
      steamURL: false
    }
  });
}

async function idsToMultiUserData(ids) {
  const userIDs = [...ids];
  const _64bitIDs = userIDs.map(to64bitID);
  let data = await getUsersData(_64bitIDs);
  data = data.response.players.map(user =>
    Object.assign(user, getOtherIDs(user))
  );
  return data;
}
