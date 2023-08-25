import axios from "axios";
import { Persona } from "../models";
import PersonDictionary from "src/helpers/PersonDictionary";

type PeopleResponseBody = {
  recuento: number;
  siguiente: string | null;
  anterior: string | null;
  resultados: Persona[];
};

export default class PersonService {
  constructor() {}

  async getAllPeople(page = "1"): Promise<PeopleResponseBody> {
    const { data } = await axios.get(
      "https://swapi.py4e.com/api/people?page=" + page
    );

    let new_people: PeopleResponseBody = {
      recuento: data["count"],
      siguiente: data["next"],
      anterior: data["previous"],
      resultados: [],
    };

    data["results"].forEach((element) => {
      new_people["resultados"].push(
        PersonDictionary.mapFromEnglishtoSpanish(element)
      );
    });
    return new_people;
  }

  async getPersonById(personId: number): Promise<Persona> {
    const { data } = await axios.get(
      "https://swapi.py4e.com/api/people/" + personId
    );

    return PersonDictionary.mapFromEnglishtoSpanish(data);
  }
}
