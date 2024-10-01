import { GenreModel } from "../../models";
import { IGenre } from "../../types";

class GenresService {
  constructor() {}

  async getAll() {
    const genres = await GenreModel.find();

    return genres;
  }

  async getById(_id: string) {
    const genre = await GenreModel.findById({ _id });

    if (!genre) {
      throw new Error("Genre not found");
    }

    return genre;
  }

  async create(body: Pick<IGenre, "name" & "description">) {
    const genre = await GenreModel.create(body);

    return genre;
  }

  async updateById(
    _id: string,
    body: Pick<IGenre, "name" & "description">
  ) {
    const genre = await GenreModel.findByIdAndUpdate({ _id }, body, {
      new: true,
    });

    if (!genre) {
      throw new Error("Genre not found");
    }

    return genre;
  }

  async deleteById(_id: string) {
    const genre = await GenreModel.findByIdAndDelete({ _id });

    if (!genre) {
      throw new Error("Genre not found");
    }

    return genre;
  }
}

export default GenresService;
