import React from 'react';
import Artist from "./Artist";

export default function Result(props) {
	return (
	  <>
			<Artist { ...props.artist } >
				<button 
					type="button" 
					className="btn btn_add"
					onClick= {() => props.addArtist(props.artist)}
				> 
					Add 
				</button>
			</Artist>
	  </>
	);
}