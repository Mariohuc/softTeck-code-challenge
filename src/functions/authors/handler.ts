import { APIGatewayProxyResult } from "aws-lambda";
import { ValidatedEventAPIGatewayProxyEvent } from "@libs/api-gateway";
import { middyfy } from "@libs/lambda";
import { v4 } from "uuid";
import { authorService } from "../../services/";
import schema from "./schema";

export const getAllAuthors = middyfy(
  async (): Promise<APIGatewayProxyResult> => {
    try {
      const authors = await authorService.getAllAuthors();
      return {
        statusCode: 200,
        body: JSON.stringify(authors, null, 2),
      };
    } catch (error) {
      return {
        statusCode: 500,
        body: JSON.stringify(error, null, 2),
      };
    }
  }
);

export const createAuthor = middyfy((async (event) => {
  try {
    const id = v4();
    const author = await authorService.createAuthor({
      authorId: id,
      firstName: event.body.firstName,
      lastName: event.body.lastName,
      email: event.body.email,
      createdAt: new Date().toISOString(),
    });
    return {
      statusCode: 201,
      body: JSON.stringify(author, null, 2),
    };
  } catch (e) {
    return {
      statusCode: 500,
      body: JSON.stringify(e, null, 2),
    };
  }
}) as ValidatedEventAPIGatewayProxyEvent<typeof schema>);
