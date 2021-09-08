import React from "react";
import { getGenres } from "./services/genreService";
import { saveMovie, getMovie } from "./services/moviesService";
import MainForm from "./common/mainForm";
import Joi from "joi-browser";

class NewTable extends MainForm {
  state = {
    data: {
      title: "",
      genreId: "",
      numberInStock: "",
      dailyRentalRate: "",
    },
    genres: [],
    errors: {},
  };
  async componentDidMount() {
    const { data: genres } = await getGenres();
    this.setState({ genres });
    const movieId = this.props.match.params.id;
    if (movieId === "new") {
      return this.setState({ new: true });
    }
    try {
      const { data: movie } = await getMovie(movieId);
      this.setState({ data: this.viewData(movie) });
    } catch (err) {
      return this.props.history.replace("/not-found");
    }
  }
  viewData = (movie) => ({
    _id: movie._id,
    title: movie.title,
    genreId: movie.genre._id,
    numberInStock: movie.numberInStock,
    dailyRentalRate: movie.dailyRentalRate,
  });

  schema = {
    _id: Joi.string(),
    title: Joi.string().label("Title").required(),
    genreId: Joi.string().label("Genre").required(),
    numberInStock: Joi.number().min(0).max(100).required(),
    dailyRentalRate: Joi.number().min(0).max(10).required(),
  };
  async onSubmitted() {
    // send to server
    await saveMovie(this.state.data);
    this.props.history.push("/movies");
  }

  render() {
    const { data, genres } = this.state;
    return (
      <form onSubmit={this.submitted} className="container">
        <div>
          {this.state.new === true ? (
            <h2>Add New Movie</h2>
          ) : (
            <h2>
              Edit{" "}
              <span
                className="badge badge-pill p-2"
                style={{ backgroundColor: "lightgray", color: "brown" }}
              >
                {data.title}
              </span>
            </h2>
          )}
        </div>
        {this.input("title", "Title")}
        {this.selectOption("genreId", "Genre", genres)}
        {this.input("numberInStock", "Number In Stock")}
        {this.input("dailyRentalRate", "Daily Rental Rate")}
        {this.submitBtn("Submit")}
      </form>
    );
  }
}

export default NewTable;
