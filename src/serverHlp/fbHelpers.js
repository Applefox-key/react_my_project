// import * as Database from "https://www.gstatic.com/firebasejs/9.8.3/firebase-database.js";

import { initializeApp } from "https://www.gstatic.com/firebasejs/9.8.3/firebase-app.js";
import * as Storage from "https://www.gstatic.com/firebasejs/9.8.3/firebase-storage.js";
import {
  getDatabase,
  ref,
  set,
  get,
  update,
  query,
  push,
  startAt,
} from "https://www.gstatic.com/firebasejs/9.8.3/firebase-database.js";
import imgProfile from "../img/profile.ico";
import { getOverlayDirection } from "react-bootstrap/esm/helpers";

// function getRefDb(){
//   const db =  getDatabase();
//   let user = window.location.hash.replace('#edit','');
//   return ref(db, 'UF/users/'+user);

//   };

export function firebaseInit() {
  const firebaseConfig = {
    storageBucket: "gs://words-d2019.appspot.com",
  };
  initializeApp(firebaseConfig);
}

export async function setImgToStorage(userKey = "") {
  let img = document.getElementById("fileName");
  const [file] = img.files;

  if (file) {
    let user;
    if (userKey) user = userKey;
    else user = window.location.hash.replace("#", "");
    const storage = await Storage.getStorage();
    const storageData = await Storage.ref(storage, "Images/avatar_" + user);
    let task = await Storage.uploadBytesResumable(storageData, file, {
      contentType: file.type,
    });
    if (task) {
      console.log("Uploaded a blob or file!");
      let curl = await Storage.getDownloadURL(task.task.snapshot.ref);
      if (curl) return curl;
    }
  } else if (!/profile\.ico/.test(document.getElementById("profileImg").src))
    return document.getElementById("profileImg").src;
  return "";
}

export async function getAv(av) {
  firebaseInit();
  const storage = await Storage.getStorage();

  console.log(storage);

  const storageData = await Storage.ref(storage, `${av}.jpg`);
  let task = await Storage.getDownloadURL(storageData);
  console.log({ id: av, url: task });
  return task;
}
