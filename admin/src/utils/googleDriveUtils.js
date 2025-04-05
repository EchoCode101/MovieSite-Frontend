import { gapi } from "gapi-script";
import config from "./js/config.js";
// Correct destructuring
const { CLIENT_ID, API_KEY } = config;
console.log(CLIENT_ID, API_KEY);
const SCOPES = "https://www.googleapis.com/auth/drive.file";

export const initGoogleDrive = () => {
  gapi.load("client:auth2", () => {
    gapi.client.init({
      apiKey: API_KEY,
      clientId: CLIENT_ID,
      scope: SCOPES,
      discoveryDocs: [
        "https://www.googleapis.com/discovery/v1/apis/drive/v3/rest",
      ],
    });
  });
};

export const uploadFileToGoogleDrive = async (file) => {
  try {
    const authInstance = gapi.auth2.getAuthInstance();
    if (!authInstance.isSignedIn.get()) {
      await authInstance.signIn(); // Ensure the user is signed in
    }

    const accessToken = gapi.auth.getToken()?.access_token;
    if (!accessToken) {
      throw new Error("Failed to retrieve access token. Please sign in again.");
    }

    const form = new FormData();
    form.append(
      "metadata",
      new Blob([JSON.stringify({ name: file.name })], {
        type: "application/json",
      })
    );
    form.append("file", file);

    const response = await fetch(
      "https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        body: form,
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Google Drive API Error:", errorData);
      throw new Error(
        `Failed to upload file: ${errorData.error?.message || "Unknown error"}`
      );
    }

    const data = await response.json();
    console.log("Uploaded File:", data);
    return data.id; // Return the file ID for further processing
  } catch (error) {
    console.error("Error uploading file to Google Drive:", error);
    throw error;
  }
};

export const updateFilePermissions = async (fileId) => {
  try {
    const response = await gapi.client.drive.permissions.create({
      fileId,
      resource: {
        role: "reader",
        type: "anyone",
      },
    });

    if (response.status === 200) {
      // Return the Google Drive embed link
      return `https://drive.google.com/file/d/${fileId}/preview`;
    } else {
      throw new Error("Failed to update file permissions.");
    }
  } catch (error) {
    console.error("Error updating file permissions:", error);
    return null;
  }
};
