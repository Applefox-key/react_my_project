import { initializeApp } from "https://www.gstatic.com/firebasejs/9.8.3/firebase-app.js";
// import * as Storage from "https://www.gstatic.com/firebasejs/9.8.3/firebase-storage.js";
import {
  getStorage,
  ref,
  listAll,
  getDownloadURL,
} from "https://www.gstatic.com/firebasejs/9.8.3/firebase-storage.js";

export function firebaseInit() {
  const firebaseConfig = {
    storageBucket: "gs://words-d2019.appspot.com",
  };
  initializeApp(firebaseConfig);
}

export async function getAvatarsFromStore() {
  firebaseInit();
  let imgarr = [];
  const storage = await getStorage();
  //const storageData = await Storage.ref(storage, "avatars/");
  const listRef = await ref(storage, "avatars");

  try {
    let res = await listAll(listRef);

    res.prefixes.forEach((folderRef) => {
      // All the prefixes under listRef.
      // You may call listAll() recursively on them.
    });
    res.items.forEach((itemRef, i) => {
      getDownloadURL(itemRef).then((url) => {
        console.log(itemRef);
        imgarr.push({ name: itemRef.name, url: url });
        if (imgarr.length == res.items.length) {
          localStorage.setItem("avatars", JSON.stringify(imgarr));
        }
      });
    });
    return imgarr;
  } catch (error) {}
}

export async function setImgToStorage(userKey = "", file) {
  // let img = document.getElementById("fileName");
  // const [file] = img.files;

  if (file) {
    let user;
    if (userKey) user = userKey;
    else user = window.location.hash.replace("#", "");
    const storage = await Storage.getStorage();
    const storageData = await Storage.ref(storage, "usersAvatar" + user);
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
