import Form from "./common/Form";
import Joi from "joi-browser";
import { getMovie, saveMovie } from "../services/movieService";
import { getGenres } from "../services/genreService";

class MovieForm extends Form {
   state = {
      data: {
         //_id: undefined, //is not shown in the form inputs. only for storing the id if the page is editing an existing movie.
         title: "",
         genreId: "",
         numberInStock: "",
         dailyRentalRate: ""
      },
      errors: {},
      genres: []
   };

   // genres = (async () => {
   //    const { data } = await getGenres();
   //    const genres = data.map(g => ({
   //       value: g._id,
   //       label: g.name
   //    }));
   //    return genres;
   // })();

   schema = {
      _id: Joi.string(), //in Joi, when an item is defined as 'not required', it has to either be totally undefined or defined and should have a value (not null or '').
      title: Joi.string().required().label("Title"),
      genreId: Joi.string().required().label("Genre"),
      numberInStock: Joi.number()
         .min(0)
         .max(1000)
         .required()
         .label("Number in Stock"),
      dailyRentalRate: Joi.number()
         .min(0)
         .max(10)
         .required()
         .label("Daily Rental Rate")
   };

   async populateGenres() {
      const { data: genres } = await getGenres();
      this.setState({ genres });
   }

   async populateMovie() {
      try {
         const { id } = this.props.match.params;
         if (id === "new") return;

         const { data: movie } = await getMovie(id);
         this.setState({ data: this.mapToViewModel(movie) });
      } catch (ex) {
         if (ex.response && ex.response.status === 404)
            this.props.history.replace("/not-found");
      }
   }

   async componentDidMount() {
      await this.populateGenres();
      await this.populateMovie();
   }

   mapToViewModel = movie => ({
      _id: movie._id,
      title: movie.title,
      genreId: movie.genre._id,
      numberInStock: movie.numberInStock,
      dailyRentalRate: movie.dailyRentalRate
   });

   doSubmit = async () => {
      await saveMovie(this.state.data);
      this.props.history.push("/movies");
   };

   render() {
      return (
         <div>
            <h1>Movie Form</h1>
            {!this.state.data._id && (
               <span className='badge badge-primary'>"Add a new movie"</span>
            )}
            <form className='mt-3' onSubmit={this.handleSubmit}>
               {this.renderInput("title", "Title")}
               {this.renderSelect("genreId", "Genre", this.state.genres)}
               {this.renderInput("numberInStock", "Number in Stock", "number")}
               {this.renderInput("dailyRentalRate", "Rate", "number")}
               {this.renderButton("Save")}
            </form>
         </div>
      );
   }
}

export default MovieForm;
