import { DocumentClient } from "aws-sdk/clients/dynamodb";
import { Author } from "../models";

export default class AuthorService {
  private Tablename: string = "Authors";

  constructor(private docClient: DocumentClient) {}

  async getAllAuthors(): Promise<Author[]> {
    const authors = await this.docClient
      .scan({
        TableName: this.Tablename,
      })
      .promise();
    return authors.Items as Author[];
  }

  async createAuthor(author: Author): Promise<Author> {
    await this.docClient
      .put({
        TableName: this.Tablename,
        Item: author,
      })
      .promise();
    return author as Author;
  }
}
