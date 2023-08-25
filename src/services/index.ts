import dynamoDBClient from "../config/dynamoDBClient";
import AuthorService from "./authors.service";
import PersonService from "./people.service";
const authorService = new AuthorService(dynamoDBClient());
const personService = new PersonService();
export { authorService, personService };
