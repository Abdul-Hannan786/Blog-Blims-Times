import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { auth, db, storage } from "./firebaseConfig";
import { BlogType, UpdateProfileType } from "@/Types/all-types";
import { toast } from "react-toastify";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";

export async function saveUser(email: string, userName: string, uid: string) {
  try {
    const docRef = doc(db, "users", uid);
    const user = {
      email,
      userName,
      uid,
      userType: "user",
    };
    await setDoc(docRef, user);
  } catch (error) {
    console.log(error);
  }
}

export async function saveBlog({
  title,
  file,
  videoFile,
  tag,
  content,
  slug,
  createdDate,
}: BlogType) {
  const uid = auth.currentUser?.uid;
  if (!uid) toast.error("User is not logged in");

  try {
    const uploadImage = async () => {
      if (!file) return;
      const imageRef = ref(
        storage,
        `images/blog-images/${makeImageName(file)}`
      );
      const uploadTask = uploadBytesResumable(imageRef, file);

      return new Promise((resolve, reject) => {
        uploadTask.on(
          "state_changed",
          (snapshot) => {
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log("Upload is " + progress + "% done");
          },
          (error) => {
            console.error("Upload error: ", error);
            reject(error);
          },
          async () => {
            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
            console.log("File available at", downloadURL);
            resolve(downloadURL);
          }
        );
      });
    };

    const uploadVideo = async () => {
      if (!videoFile) return;
      const videoRef = ref(storage, `videos/${makeImageName(videoFile)}`);
      const uploadTask = uploadBytesResumable(videoRef, videoFile);

      return new Promise((resolve, reject) => {
        uploadTask.on(
          "state_changed",
          (snapshot) => {
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log("Upload is " + progress + "% done");
          },
          (error) => {
            console.error("Upload error: ", error);
            reject(error);
          },
          async () => {
            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
            console.log("File available at", downloadURL);
            resolve(downloadURL);
          }
        );
      });
    };

    const imageURL = await uploadImage();
    const videoURL = await uploadVideo();

    const newBlog = {
      title,
      tag,
      content,
      slug,
      createdDate,
      imageURL,
      videoURL,
    };
    const collectionRef = collection(db, "blogs");
    const docRef = await addDoc(collectionRef, newBlog);

    const docRefToUpdate = doc(db, "blogs", docRef.id);
    await updateDoc(docRefToUpdate, {
      firebaseID: docRef.id,
    });
    toast.success("Blog Added Successfully!");
  } catch (error) {
    console.error("Error adding blog: ", error);
    toast.error("Couldn't add blog!");
  }
}

function makeImageName(file: File) {
  const imageName = file.name.split(".");
  const lastIndex = imageName.length - 1;
  const imageType = imageName[lastIndex];
  const newName = `${crypto.randomUUID()}.${imageType}`;
  return newName;
}

export async function DeleteBlog(id: string) {
  const docRef = doc(db, "blogs", id);
  await deleteDoc(docRef);
}

export async function updateBlog({
  title,
  tag,
  content,
  firebaseID,
  file,
  videoFile,
}: BlogType) {
  const uid = auth.currentUser?.uid;

  if (!uid) {
    toast.error("User is not authenticated!");
    return;
  }
  if (!firebaseID) return;
  try {
    const docRef = doc(db, "blogs", firebaseID);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      toast.error("Blog does not exist!");
      return;
    }

    const existingBlog = docSnap.data();
    let imageURL = existingBlog.imageURL;

    try {
      if (file) {
        const uploadImage = async () => {
          const imageRef = ref(
            storage,
            `images/blog-images/${makeImageName(file)}`
          );
          const uploadTask = uploadBytesResumable(imageRef, file);

          return new Promise<string>((resolve, reject) => {
            uploadTask.on(
              "state_changed",
              (snapshot) => {
                const progress =
                  (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log("Upload is " + progress + "% done");
              },
              (error) => {
                console.error("Upload error: ", error);
                reject(error);
              },
              async () => {
                const downloadURL = await getDownloadURL(
                  uploadTask.snapshot.ref
                );
                console.log("File available at", downloadURL);
                resolve(downloadURL);
              }
            );
          });
        };

        // Update imageURL with the newly uploaded image
        imageURL = await uploadImage();
      }

      const uploadVideo = async () => {
        if (!videoFile) return;
        const videoRef = ref(storage, `videos/${makeImageName(videoFile)}`);
        const uploadTask = uploadBytesResumable(videoRef, videoFile);

        return new Promise((resolve, reject) => {
          uploadTask.on(
            "state_changed",
            (snapshot) => {
              const progress =
                (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
              console.log("Upload is " + progress + "% done");
            },
            (error) => {
              console.error("Upload error: ", error);
              reject(error);
            },
            async () => {
              const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
              console.log("File available at", downloadURL);
              resolve(downloadURL);
            }
          );
        });
      };

      const videoURL = await uploadVideo();
      const collectionRef = doc(db, "blogs", firebaseID);
      let updatedBlog;
      if (videoURL) {
        updatedBlog = {
          title,
          tag,
          content,
          videoURL,
          imageURL,
        };
      } else {
        updatedBlog = {
          title,
          tag,
          content,
          imageURL,
        };
      }

      await updateDoc(collectionRef, updatedBlog);
      toast.success("Blog edited successfully!");
    } catch (error) {
      console.error("Error updating blog:", error);
      toast.error("Failed to edit the blog.");
    }
  } catch (e) {
    console.log(e);
  }
}

export async function UpdateProfile({
  userName,
  contactInfo,
  hobbies,
  DOB,
  bio,
  file,
}: UpdateProfileType) {
  const uid = auth.currentUser?.uid;
  if (!uid) {
    toast.error("Authenticate to view profile");
    return;
  }

  const docRef = doc(db, "users", uid);

  if (!file) {
    const user = {
      userName,
      contactInfo,
      hobbies,
      DOB,
      bio,
    };
    await updateDoc(docRef, user);
    toast.success("Profile updated successfully!");
    return;
  }

  try {
    const uploadImage = async () => {
      if (!file) return;
      const imageRef = ref(
        storage,
        `images/profile-images/${makeImageName(file)}`
      );
      const uploadTask = uploadBytesResumable(imageRef, file);

      return new Promise((resolve, reject) => {
        uploadTask.on(
          "state_changed",
          (snapshot) => {
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log("Upload is " + progress + "% done");
          },
          (error) => {
            console.error("Upload error: ", error);
            reject(error);
          },
          async () => {
            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
            console.log("File available at", downloadURL);
            resolve(downloadURL);
          }
        );
      });
    };

    const imageURL = await uploadImage();
    if (!imageURL) toast.error("Error in uploading image");

    const user = {
      userName,
      contactInfo,
      hobbies,
      DOB,
      bio,
      imageURL,
    };

    await updateDoc(docRef, user);
    toast.success("Profile updated successfully!");
  } catch (e) {
    console.log(e);
    toast.error("Error in updating profile");
  }
}

