const AWS = require('aws-sdk');

// Set the region where you want to create the table
AWS.config.update({ region: 'your-region' }); // Replace 'your-region' with the desired AWS region

// Create a DynamoDB service object
const dynamodb = new AWS.DynamoDB();

// Define your table parameters
const params = {
  TableName: 'User', // Replace 'YourTableName' with your desired table name
  KeySchema: [
    { AttributeName: 'primaryKey', KeyType: 'HASH' }, // Primary key attribute
    // Add more attributes or adjust KeyType as needed
  ],
  AttributeDefinitions: [
    { AttributeName: 'primaryKey', AttributeType: 'S' }, // Attribute type (S: String, N: Number, B: Binary)
    // Add more attributes as needed
  ],
  ProvisionedThroughput: {
    ReadCapacityUnits: 5, // Adjust read capacity units
    WriteCapacityUnits: 5, // Adjust write capacity units
  },
};

// Create the DynamoDB table
dynamodb.createTable(params, (err, data) => {
  if (err) {
    console.error('Unable to create table. Error JSON:', JSON.stringify(err, null, 2));
  } else {
    console.log('Created table. Table description JSON:', JSON.stringify(data, null, 2));
  }
});
