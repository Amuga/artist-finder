import React, {
	useReducer,
	useState
} from 'react';
import Form from './components/Form';
import ListItem from './components/ListItem';
import Result from './components/Result';

const initialState = {
	loading: false,
	results: [], // Search Results
	artists: [], // Added Artists
	errorMessage: null
};

const reducer = (state, action) => {
	switch (action.type) {
		case "SEARCH_ARTISTS_REQUEST":
			return {
				...state,
				loading: true,
				errorMessage: null
			};
		case "SEARCH_ARTISTS_SUCCESS":
			return {
				...state,
				loading: false,
				results: action.payload
			};
		case "SEARCH_ARTISTS_FAILURE":
			return {
				...state,
				loading: false,
				errorMessage: action.error
			};
		default:
			return state;
	}
}


const App = (props) => {

	const [state, dispatch] = useReducer(reducer, initialState)

	const [artists, setArtists] = useState([]);

	const [genericError, setGenericError] = useState();

	const {
		results,
		errorMessage,
		loading
	} = state;


	const searchArtists = (searchValue, page) => {
		dispatch({
			type: "SEARCH_ARTISTS_REQUEST"
		});

		fetch(`https://dev-assignment.ew.r.appspot.com/search?q=${searchValue}&limit=5&offset=${(page-1) * 5}`)
		.then(response => response.json())
		.then(jsonResponse => {
			if (jsonResponse.artists) {
				dispatch({
					type: "SEARCH_ARTISTS_SUCCESS",
					payload: jsonResponse.artists
				})
			} else {
				dispatch({
					type: "SEARCH_ARTISTS_FAILURE",
					error: jsonResponse.error?.message
				})
			}
		});
	};
	//Call used for Load more (Pagination) functionality
	const updateArtists = (searchValue, page) => {
		dispatch({
			type: "SEARCH_ARTISTS_REQUEST"
		});

		fetch(`https://dev-assignment.ew.r.appspot.com/search?q=${searchValue}&limit=5&offset=${(page-1) * 5}`)
		.then(response => response.json())
		.then(jsonResponse => {
			if (jsonResponse.artists) {
				results.items.push(...jsonResponse.artists?.items)
				dispatch({
					type: "SEARCH_ARTISTS_SUCCESS",
					payload: results
				})
			} else {
				dispatch({
					type: "SEARCH_ARTISTS_FAILURE",
					error: jsonResponse.error?.message
				})
			}
		});
	};

	const addArtist = (artist) => {
		const newArtist = {
			id: artist.id,
			profile: artist
		};
		// Clears errors in case there were any
		setGenericError("");
		if (artists.find( _artist => _artist.id === artist.id)) {
			setGenericError("Can't add the same artist twice");
		} else if ( artists.length >= 5) {
			setGenericError("Can't add more than 5 artists to a release");
		} else {
			setArtists([...artists, newArtist]);
		}

	}

	const deleteArtist = (id) => {
		const remainingArtists = artists.filter(artist => id !== artist.id);
		setArtists(remainingArtists);
	}

	const resultList = results.items?.map( result => (
		<Result 
			key = { result.id }
			artist = { result }
			addArtist = { addArtist }
		/>
	));				

	const artistList = artists.map(artist => ( 
		<ListItem 
			id = { artist.id }
			profile = { artist.profile }
			key = { artist.id }
			deleteArtist = { deleteArtist }
		/>
	));
	//Known bug when emptying out search and re-searching still re-rendering "Load More" button due to state.total still holding values for some reason
	return ( 
		<div className = "artist-finder stack-large" >
			<ul className = "artists-list" >
			{ artistList.length ? (
				<span class="bold">Added Artists:</span>
				): (null)
			}
				{ artistList } 
			</ul>
			<Form 
				searchArtists = { searchArtists } 
				total = { results.total }
				updateArtists = { updateArtists }
			 >
				<span className = "error-msg"> {genericError} </span>
				<ul className = "search-result stack-large stack-exception">
					{ loading && !errorMessage ? ( 
						<span> loading... </span> )
						: errorMessage ? ( 
							<div className = "error-msg" > 
								{ errorMessage }
							< /div> )
						: (	<>
									<span>Search Results</span>
									{ resultList }
								</>
							)
					}
				</ul> 
			</Form>
		</div>
	);
}

export default App;