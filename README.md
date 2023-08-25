# SoftTek Test

## Interviewee Notes

According to the specs:
- A REST API was built to perform the GET and POST operations on author resources . 
  - Authors resources handle that routes `/authors`.
- The API is integrated with DynamoDB (the author resources are stored here)
- The API is integrated with two endpoints of SWAPI:
  - GET https://swapi.py4e.com/api/people/
  - GET https://swapi.py4e.com/api/people/{id}
- A REST API was built to perform two GET operations regarding the two endpoints of SWAPI seen previously.
  - This API handle the route `/people`
  - This API is in charge of translating the people models retrieved from SWAPI
- The Serveless framework and Node.js were used to develop the API
- About the tests, there are some HTTP tests. The API endpoints were tested using the serverless-offline and serveless-dynamodb plugins to be able to emulate AWS Lamda, AWS DynamoDB and API Gateway locally and thus speed up the testing cycle. These tests are in `test/api/api.ts`
  - **SuperTest**, **Mocha** and **Chai** were used to test HTTP requests.
- Some scripts have been defined to run certain repetitive tasks
  - To start the application and emulate AWS Lambda and DynamoDB locally, use the command `yarn start`, it is assumed that you have installed all packages previously.
  - To run all tests, use the command `yarn test`, it is assumed that you have previously started the application with the previous command.

## Final notes

Below are all the endpoints deployed through AWS Lamda and API Gateway:
- GET - https://mjtrc3f9ra.execute-api.us-east-1.amazonaws.com/production/people
- GET - https://mjtrc3f9ra.execute-api.us-east-1.amazonaws.com/production/people/{personId}
- GET - https://mjtrc3f9ra.execute-api.us-east-1.amazonaws.com/production/authors
- POST - https://mjtrc3f9ra.execute-api.us-east-1.amazonaws.com/production/authors

Just to clarify, some paths have relative variables like `personId` which should be replace by an Id of a person.
Additionally in the GET `/people` endpoint you can add the page as query to walk through people data.

Finally to test the POST `/authors` endpoint, you can use this example:
```
curl -d '{"firstName":"Lester","lastName":"Rico", "email":"ler@example.com"}' -H 'Content-Type: application/json' https://mjtrc3f9ra.execute-api.us-east-1.amazonaws.com/production/authors
```

That would be all for now, thanks.