import { handlerPath } from "@libs/handler-resolver";

export const getAllPeople = {
  handler: `${handlerPath(__dirname)}/handler.getAllPeople`,
  events: [
    {
      http: {
        method: "get",
        path: "people",
      },
    },
  ],
};

export const getPersonById = {
  handler: `${handlerPath(__dirname)}/handler.getPersonById`,
  events: [
    {
      http: {
        method: "get",
        path: "people/{personId}",
      },
    },
  ],
};
