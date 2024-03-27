const { exec } = require("child_process");
// exec will be used to run the any type of command

const path = require("path");
// Above is the path module, which is used to work with file and directory paths

const fs = require("fs");

const mime = require("mime-types");
// It is used to get the MIME type of a file, which is required to upload files to S3

const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");
// Above is the AWS SDK for JavaScript v3, which is used to interact with S3
// s3Client is used to interact with the S3 bucket
// PutObjectCommand is used to upload files to the S3 bucket

const s3Client = new S3Client({
  region: "", //us-west-1
  credentials: {
    accessKeyId: "", //process.env.AWS_ACCESS_KEY_ID
    secretAccessKey: "", //process.env.AWS_SECRET_ACCESS_KEY
  },
});

const PROJECT_ID = process.env.PROJECT_ID;
// The above is the project ID, which is passed as an environment variable

async function init() {
  console.log("Executing script.js");
  // The output folder is where the build will happen as shown in above logs

  const outDirPath = path.join(__dirname, "output");
  // Above code will create the output folder if it doesn't exist

  const p = exec(`cd ${outDirPath} && npm install && npm run build`);
  // Run npm install and npm run build in the output folder
  // on performing npm run build it'll generate a dist

  p.stdout.on("data", function (data) {
    console.log(data.toString());
  });
  // It'll print the output of the build process

  p.stdout.on("error", function (data) {
    console.error("Error: ", data.toString());
  });
  // It'll print the error if there is any

  p.on("close", async function () {
    console.log(`Build complete `);
    // After the build is complete, it'll shown in logs

    const distFolderPath = path.join(__dirname, "output", "dist");
    // Get all the files in the dist folder like -> index.html, main.js, style.css etc.

    const distFolderContents = fs.readdirSync(distFolderPath, {
      recursive: true,
    });
    // Go through the files inside the dest directory and get the content in the form of the array

    for (const file of distFolderContents) {
      const filePath = path.join(distFolderPath, file);
      if (fs.lstatSync(filePath).isDirectory()) continue;
      // above code will check if the file is a directory or not
      // if it is a directory then it'll continue to the next file in the loop

      console.log("Uploading file: ", filePath);
      // Upload to S3 bucket here the files that are in the dist folder
      //usin aws s3 v3 sdk
      // AWS SDKforJavaScript v3

      const command = new PutObjectCommand({
        Bucket: "bucket-name",
        Key: `__outputs/${PROJECT_ID}/${file}`, // on which path we are storing the file
        Body: fs.createReadStream(filePath), //by file path we are reading the file
        ContentType: mime.lookup(filePath) //by file path we are getting the type of the file
      });
      await s3Client.send(command); // Above code will send the file to the S3 bucket

      console.log("Uploading file: ", filePath);
    }

    // After the files are uploaded, we'll delete the output folder
    console.log("🚀 Good to go...");
  });
}

init();
