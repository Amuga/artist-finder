import React from 'react';
import Artist from './Artist'

export default function ListItem(props) {
	return (
		<Artist {...props.profile}>
			<button 
				type="button" 
				className="btn btn_delete btn__danger"
				onClick={() => props.deleteArtist(props.id)}
			>
				Remove
			</button>
		</Artist>
	);
}