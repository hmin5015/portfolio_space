import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import {
  DynamoDBDocumentClient,
  ScanCommand,
  GetCommand,
  PutCommand,
  DeleteCommand,
} from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({
  convertEmptyValues: true,
  removeUndefinedValues: true,
});

const dynamo = DynamoDBDocumentClient.from(client);

const tableName = "User";

const docClient = DynamoDBDocumentClient.from(client, {
  marshallOptions: {
    removeUndefinedValues: true,
  },
});

export const handler = async (event, context) => {
  console.log('Incoming Event:', event);
  
  let body;
  let statusCode = 200;
  const headers = {
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "OPTIONS,GET,POST,PUT",
  };

  // Validate incoming request based on the method
  if (event.httpMethod === "GET" && !event.queryStringParameters.UserId) {
    console.error('Invalid request for GET method: Missing UserId.');
    return {
      statusCode: 400,
      body: JSON.stringify({ message: 'Invalid request: Missing UserId.' }),
    };
  }

  if (event.httpMethod === "POST" || event.httpMethod === "PUT") {
    //console.log("PUT Body:", event.body);
    
    //const { UserId, BirthDate, EmailAddress, MobileNumber, UserName } = event.body;
    //console.log(UserId);

    // Validate required fields for POST/PUT
    //if (UserId == undefined) {
    //  console.error('Invalid request for POST/PUT method: Missing UserId in the request body');
    //  return {
    //    statusCode: 400,
    //    body: JSON.stringify({ message: 'Invalid request: Missing UserId in the request body' }),
    //  };
    //}
  }

  try {
    let command;

    // Determine the command based on the HTTP method
    switch (event.httpMethod) {
      case "GET":
        const userId = event.queryStringParameters.UserId;
        command = new GetCommand({
          TableName: "User",
          Key: {
            UserId: userId,
          },
        });
        break;
      case "POST":
        // Handle the logic for POST
        // ...
        break;
      case "PUT":
        const { UserId, BirthDate, EmailAddress, MobileNumber, UserName } = JSON.parse(event.body);
        command = new PutCommand({
          TableName: "User",
          Item: {
            UserId: UserId,
            BirthDate: BirthDate,
            EmailAddress: EmailAddress,
            MobileNumber: MobileNumber,
            UserName: UserName,
          },
        });
        break;
      default:
        console.error(`Unsupported method: ${event.httpMethod}`);
        return {
          statusCode: 400,
          body: JSON.stringify({ message: `Unsupported method: ${event.httpMethod}` }),
        };
    }

    const response = await docClient.send(command);
    console.log('DynamoDB Response:', response);

    //// Handle the case where the item is not found
    //if (!response.Item) {
    //  return {
    //    statusCode: 404,
    //    body: JSON.stringify({ message: 'Item not found' }),
    //  };
    //}

    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "OPTIONS,GET,POST,PUT",
      },
      body: JSON.stringify(response.Item),
    };
  } catch (error) {
    console.error('Lambda 함수 오류:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: '서버 오류가 발생했습니다.' }),
    };
  }
};
