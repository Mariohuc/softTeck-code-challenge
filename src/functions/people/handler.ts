import { APIGatewayProxyResult } from "aws-lambda";
import { middyfy } from "@libs/lambda";
import { personService } from "../../services/";

export const getAllPeople = middyfy(
  async (event): Promise<APIGatewayProxyResult> => {
    try {
      const page = event.queryStringParameters?.page || 1;
      const people = await personService.getAllPeople(page);
      return {
        statusCode: 200,
        body: JSON.stringify(people, null, 2),
      };
    } catch (error) {
      return {
        statusCode: 500,
        body: JSON.stringify(error, null, 2),
      };
    }
  }
);

export const getPersonById = middyfy(
  async (event): Promise<APIGatewayProxyResult> => {
    try {
      const personId = event.pathParameters.personId;
      const person = await personService.getPersonById(personId);
      return {
        statusCode: 200,
        body: JSON.stringify(person, null, 2),
      };
    } catch (e) {
      return {
        statusCode: 500,
        body: JSON.stringify(e, null, 2),
      };
    }
  }
);
