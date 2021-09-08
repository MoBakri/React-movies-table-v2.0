import React, { Component } from "react";
import { getMovies, deleteMovie, likedMovie } from "./services/moviesService";
import { getGenres } from "./services/genreService";
import Table from "./table";
import ListGroup from "./listGroup";
import SearchField from "./searchField";
import Pagination from "./common/pagination";
import { Paginate } from "./misc/paginate";
import { Link } from "react-router-dom";
import _ from "lodash";
import { toast } from "react-toastify";
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
  async componentDidMount() {
    const { data: movies } = await getMovies();
    const { data: genre } = await getGenres();
    this.setState({
      movies,
      genre: [{ key: "All-Genre", name: "All Genres" }, ...genre],
    });
  }
  handleDelete = async (movie, dataLength) => {
    const originalMovies = this.state.movies;
    const movies = originalMovies.filter((m) => m._id !== movie._id);
    try {
      await deleteMovie(movie._id);
      this.setState({ movies });
    } catch (err) {
      if (err.response && err.response.status === 404) {
        toast.error("Something Bad Happend when deleted this movie");
        this.setState({ movies: originalMovies });
      }
    }
    const page = { ...this.state.page };
    const selectedPage = this.state.page.currentPage;
    const realLength = dataLength;
    if (realLength === 1) {
      page.currentPage = selectedPage - 1;
      this.setState({ page });
    }
  };
  handleLike = async (liked) => {
    const movies = [...this.state.movies];
    const index = movies.indexOf(liked);
    movies[index].like = !liked.like;
    this.setState({ movies });
    try {
      await likedMovie(liked); //
    } catch (error) {
      if (error.response) {
        console.log(error.response);
      } else if (error.request) {
        console.log(error.request);
        //do something else
      } else if (error.message) {
        console.log(error.message);
        //do something other than the other two
      }
    }
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
    const { user } = this.props;
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
          <div className="col-md-4">
            <ListGroup
              data={genre}
              handleGenre={this.handleGenre}
              selectedGenre={selectedGenre}
            />
          </div>
          <div className="col-md-8">
            {user && (
              <SearchField data={searchField} onSearch={this.onSearch} />
            )}

            {user && (
              <Link to="movies/new" className="btn btn-primary mb-3">
                add movie
              </Link>
            )}

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
