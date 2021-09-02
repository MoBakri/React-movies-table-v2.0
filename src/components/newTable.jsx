import React from "react";
import { getGenres } from "./services/fakeGenreService";
import { getMovie, saveMovie } from "./services/fakeMovieService";
import MainForm from "./common/mainForm";
import Joi from "joi-browser";

class NewTable extends MainForm {
  state = {
    data: { title: "", genreId: "", numberInStock: "", dailyRentalRate: "" },
    genres: [],
    errors: {},
  };
  componentDidMount() {
    const genres = getGenres();
    this.setState({ genres });
    const movieId = this.props.match.params.id;
    if (movieId === "new") {
      return this.setState({ new: true });
    }
    const movie = getMovie(movieId);
    if (!movie) return this.props.history.replace("/not-found");
    this.setState({ data: this.viewData(movie) });
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
  onSubmitted() {
    // send to server
    const data = saveMovie(this.state.data);
    this.setState({ data });
    this.props.history.push("/movies");
    console.log("submitted");
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
