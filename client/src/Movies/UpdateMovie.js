import axios from "axios";
import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";

const initialValues = {
  title: '',
  director:'',
  metascore:''
}

const UpdateMovie = ({setMovieList }) => {
  const history = useHistory();
  const { id } = useParams();
  const [formValues, setFormValues] = useState(initialValues);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then((res) => {
       
        setFormValues(res.data);
      })
      .catch((err) => {
        console.log(err.response);
      });
  }, [id]);

  const handleChange = (e) => {
    e.preventDefault();
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .put(`http://localhost:5000/api/movies/${id}`, formValues)
      .then((res) => {
        setMovieList(res.data);
        history.push(`/movies/${id}`);
      })
      .catch((err) => console.log(err));
  };

  const deleteMovie = () => {
    axios.delete(`http://localhost:5000/api/movies/${id}`)
    .then(res => {
      setMovieList(res.data)
      history.push('/')
    })
  }

  return (
    <div>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="title"
            value={formValues.title}
            onChange={handleChange}
          />
          <input
            type="text"
            name="director"
            value={formValues.director}
            onChange={handleChange}
          />
          <input
            type="text"
            name="metascore"
            value={formValues.metascore}
            onChange={handleChange}
          />
          
          <button type='submit'>Submit</button>
          </form>
          <button onClick={deleteMovie}>Delete</button>
    </div>
  );
};
export default UpdateMovie;