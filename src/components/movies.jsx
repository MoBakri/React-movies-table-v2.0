import React, { Component } from "react";
import { getMovies } from "./services/fakeMovieService";
import { getGenres } from "./services/fakeGenreService";
import Table from "./table";
import ListGroup from "./listGroup";
import SearchField from "./searchField";
import Pagination from "./common/pagination";
import { Paginate } from "./misc/paginate";
import { Link } from "react-router-dom";
import _ from "lodash";

class Movies extends Component {
  state = {
    movies: [],
    genre: [],
    page: {
      currentPage: 1,
      pageSize: 4,
    },
    searchField: { value: "" },
    sort: { path: "title", order: "asc" },
  };
  componentDidMount() {
    const movies = getMovies();
    const genre = getGenres();
    this.setState({
      movies,
      genre: [{ key: "All-Genre", name: "All Genres" }, ...genre],
    });
  }
  handleDelete = (movie, dataLength) => {
    const AllMovies = [...this.state.movies];
    const page = { ...this.state.page };
    const movies = AllMovies.filter((m) => m._id !== movie._id);
    this.setState({ movies });
    const selectedPage = this.state.page.currentPage;
    const realLength = dataLength;
    if (realLength === 1) {
      page.currentPage = selectedPage - 1;
      this.setState({ page });
    }
  };
  handleLike = (liked) => {
    const movies = [...this.state.movies];
    const index = movies.indexOf(liked);
    movies[index].like = !liked.like;
    this.setState({ movies });
  };
  handlePageSelected = (selected) => {
    let page = { ...this.state.page };
    page.currentPage = selected;
    this.setState({ page });
  };
  handleGenre = (genre) => {
    const page = { ...this.state.page };
    page.currentPage = 1;
    const selectedGenre = genre;
    this.setState({ selectedGenre, page });
  };
  handleHeadTable = (headItem) => {
    const sort = { ...this.state.sort };
    if (headItem.path === sort.path) {
      sort.order = sort.order === "asc" ? "desc" : "asc";
    } else {
      sort.order = "asc";
      sort.path = headItem.path;
    }
    this.setState({ sort });
  };
  onSearch = (search) => {
    const searchField = { ...this.state.searchField };
    const page = { ...this.state.page };
    page.currentPage = 1;
    searchField.value = search.trimStart();
    this.setState({ searchField, page, selectedGenre: undefined });
  };
  render() {
    const { movies, genre, page, sort, selectedGenre, searchField } =
      this.state;
    const filterMovies =
      selectedGenre && selectedGenre._id !== genre._id
        ? movies.filter((m) => m.genre._id === selectedGenre._id)
        : movies;

    const searchFilter =
      searchField.value !== ""
        ? movies.filter((m) => !m.title.toLowerCase().search(searchField.value))
        : filterMovies;

    const sortMovies = _.orderBy(searchFilter, [sort.path], [sort.order]);

    const allMovies = Paginate(sortMovies, page.currentPage, page.pageSize);

    return (
      <div className="container">
        <div className="row">
          <div className="col-sm-3">
            <ListGroup
              data={genre}
              handleGenre={this.handleGenre}
              selectedGenre={selectedGenre}
            />
          </div>
          <div className="col-sm">
            <SearchField data={searchField} onSearch={this.onSearch} />

            <Link to="movies/new" className="btn btn-primary mb-3">
              add movie
            </Link>

            <Table
              data={allMovies}
              handleDelete={this.handleDelete}
              handleLike={this.handleLike}
              sort={sort}
              handleHeadTable={this.handleHeadTable}
            />
            <Pagination
              data={searchFilter}
              page={page}
              handlePageSelected={this.handlePageSelected}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default Movies;
