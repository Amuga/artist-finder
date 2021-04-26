import React, {useState, useEffect} from "react";

const Form = (props) => {
	const [searchValue, setSearchValue] = useState('');
	const [page, setPage] = useState(1);
	const [inputValue, setInputValue] = useState("");
	console.log("helo?",  props.total);

	const handleChange = (e) => { 
		setInputValue(e.target.value);
	}

	const handleSubmit = (e) => {
		e.preventDefault();
		setSearchValue(inputValue);
		setPage(1);
	}
 
	const loadMore = () => {
		setPage(page + 1);
	}

	useEffect(() => {
		props.searchArtists(searchValue ,page);
	},[searchValue]);

	useEffect(() => {
		props.updateArtists(searchValue ,page);

	},[page]);

	return (
		<>
		<form onSubmit={handleSubmit}>
			<h1> Add Artists to Release </h1>
			<h2 className="label-wrapper">
				<div htmlFor="search-input" className="label__lg">Maximum 5 Artists</div>
			</h2>
			<input
				type="text"
				id="search-input"
				className="input input__lg"
				onChange = { handleChange }
			/>
			<button type="submit" className="btn btn__primary btn__lg">Search Artists</button>
			{props.children}
		</form>


			{( props.total && (page * 5) < props.total ) ? (
				<button type="button" className= "btn load-more btn__primary" onClick= { loadMore }>
					Load more...
				</button> 
			) : (null) }
		</>
		);
}
export default Form;