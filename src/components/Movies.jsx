import { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import _ from "lodash";
import MoviesTable from "./MoviesTable";
import Pagination from "./common/Pagination";
import ListGroup from "./common/ListGroup";
import SearchBox from "./common/SearchBox";
import { getMovies, deleteMovie, saveMovie } from "../services/movieService";
import { getGenres } from "../services/genreService";
import { paginate } from "../utils/paginate";

class Movies extends Component {
   state = {
      movies: [],
      genres: [],
      selectedGenre: { _id: "", name: "All Genres" },
      sortColumn: { path: "title", order: "asc" },
      currentPage: 1,
      pageSize: 4,
      searchQuery: ""
   };

   async componentDidMount() {
      const { data } = await getGenres();
      const genres = [this.state.selectedGenre, ...data];
      const { data: movies } = await getMovies();
      this.setState({ movies, genres });
   }

   handleDelete = async movie => {
      let {
         movies: originalMovies,
         currentPage,
         pageSize,
         selectedGenre: { _id }
      } = this.state;
      let pageChanged = false;

      const movies = originalMovies.filter(m => m._id !== movie._id);

      /////////(  jump to previous page, if the deleted movie was
      //the only one on the last page.
      const filteredMoviesCount = _id
         ? movies.filter(m => m.genre._id === _id).length
         : movies.length;
      if (currentPage > Math.ceil(filteredMoviesCount / pageSize)) {
         currentPage--;
         pageChanged = true;
      }
      /////////)

      this.setState({ movies, currentPage });

      try {
         await deleteMovie(movie._id);
      } catch (e) {
         if (e.response && e.response.status === 404)
            toast("has already been deleted");
         if (pageChanged) currentPage++;
         this.setState({ movies: originalMovies, currentPage });
      }
   };

   handleLike = async movie => {
      const original = this.state.movies;
      const movies = [...this.state.movies];
      const index = movies.indexOf(movie);
      movies[index] = { ...movies[index] };
      movies[index].liked = !movies[index].liked;
      this.setState({ movies });
      try {
         await saveMovie(movies[index]);
      } catch (e) {
         this.setState({ movies: original });
      }
   };

   handlePageChange = page => {
      this.setState({ currentPage: page });
   };

   handleGenreSelect = genre => {
      this.setState({ selectedGenre: genre, searchQuery: "", currentPage: 1 });
   };

   handleSearch = query => {
      this.setState({
         searchQuery: query,
         selectedGenre: this.state.genres[0], // = all genres
         currentPage: 1
      });
   };

   handleSort = sortColumn => {
      this.setState({ sortColumn });
   };

   getPagedData = () => {
      const {
         pageSize,
         currentPage,
         selectedGenre,
         sortColumn,
         searchQuery,
         movies: allMovies
      } = this.state;

      const filtered = selectedGenre._id
         ? allMovies.filter(m => m.genre._id === selectedGenre._id)
         : searchQuery
         ? allMovies.filter(m =>
              m.title.toLowerCase().startsWith(searchQuery.toLowerCase())
           )
         : allMovies;

      const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);

      return {
         filteredMoviesCount: filtered.length,
         currentPageMovies: paginate(sorted, currentPage, pageSize)
      };
   };

   render() {
      const {
         pageSize,
         currentPage,
         genres,
         selectedGenre,
         sortColumn,
         searchQuery
      } = this.state;

      const { filteredMoviesCount, currentPageMovies } = this.getPagedData();

      return (
         <div className='row'>
            <div className='col-2'>
               <ListGroup
                  items={genres}
                  selectedItem={selectedGenre}
                  onItemSelect={this.handleGenreSelect}
               />
            </div>
            <div className='col'>
               {this.props.user && (
                  <Link to='/movies/new' className='btn btn-primary mb-3'>
                     New Movie
                  </Link>
               )}
               <SearchBox value={searchQuery} onChange={this.handleSearch} />
               {filteredMoviesCount ? (
                  <Fragment>
                     <p>
                        Showing {filteredMoviesCount} movies in the database.
                     </p>
                     <MoviesTable
                        movies={currentPageMovies}
                        sortColumn={sortColumn}
                        onSort={this.handleSort}
                        onLike={this.handleLike}
                        onDelete={this.handleDelete}
                     />
                     <Pagination
                        itemsCount={filteredMoviesCount}
                        pageSize={pageSize}
                        currentPage={currentPage}
                        onPageChange={this.handlePageChange}
                     />
                  </Fragment>
               ) : (
                  <p>No movies in Database.</p>
               )}
            </div>
         </div>
      );
   }
}

export default Movies;
