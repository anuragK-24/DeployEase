const express = require("express");
const { generateSlug } = require("random-word-slugs");
// Above code is used to generate a random word for the project
// slug means a unique identifier for the project

const { ECSClient, RunTaskCommand, UpdateContainerInstancesStateCommand } = require("@aws-sdk/client-ecs");
// Above code is used to interact with the ECS service

const app = express();
const PORT = 9000;

const ecsClient = new ECSClient({
  region: "", //ap-south-1
  credentials: {
    accessKeyId: "", //process.env.AWS_ACCESS_KEY_ID
    secretAccessKey: "", //process.env.AWS_SECRET_ACCESS_KEY
  },
});
// Above code is used to create an ECS client

const config = {
  CLUSTER: "", // paste the cluster ARN
  TASK: "", // paste the task ARN
};
//  Above code is used to store the ECS cluster and task details
app.use(express.json());
const cors = require("cors");
app.use(cors());

app.post("/project", async (req, res) => {
  const { gitURL } = req.body;
  const projectSlug = generateSlug();
  // Above code is used to generate a random slug if the slug is not provided

  // Spin the container throught the api call
  const command = new RunTaskCommand({
    cluster: config.CLUSTER,
    taskDefinition: config.TASK,
    launchType: "FARGATE",
    count: 1,
    networkConfiguration: {
      awsvpcConfiguration: {
        assignPublicIp: "ENABLED",
        subnets: [
          "",
          "",
          "",
        ],
        securityGroups: [""],
      },
    },
    overrides: {
      containerOverrides: [
        {
          name: "",// Image name
          environment: [
            { name: "GIT_REPOSITORY_URL", value: gitURL },
            { name: "PROJECT_ID", value: projectSlug },
          ],
        },
      ],
    },
  });
  // Above code is used to create a RunTaskCommand object with the required parameters
  // The command will spin a container with the specified task definition and environment variables

  await ecsClient.send(command);
  // Above code is used to send the command to the ECS service

  return res.json({
    status: "queued",
    data: { projectSlug, url: `http://${projectSlug}.localhost:8000` },
  });
  // Above code is used to return the project slug and the URL to access the project
});

app.listen(PORT, () => console.log(`API Server Running..${PORT}`));
// Above code is used to start the API server on the specified port
