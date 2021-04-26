import React from 'react';

/*
 * Chooses last image as they return from biggest to smallest
 */
const getLastImage = images => {
	return images.length ? (images[(images.length - 1)].url) : ('/default.png')
}

export default function Artist(props) {
	return (
		<li className="list-item stack-small">
			<div className="artist-profile">
				<div className='grid-item prof-img'>
					<img
						width="64"
						height="64"
						className="artist-image"
						alt={`Artist name: ${props.name}`}
						src={getLastImage(props.images)}/>
				</div>
				<div className='grid-item prof-info'>
					<div className="name">
						<span className="bold" >Name: </span>{props.name}
					</div>
					{props.genres.length ?
						(<div className="genres">
							<span className="bold" >Genres:</span> {props.genres.join(', ')}
						</div>)
						: (null)
					}
					<div className="followers">
						<span className="bold" >Followers:</span> {props.followers.total} 
					</div>
					<div className="spotify">
						<a href={props.external_urls.spotify}>Spotify Profile</a>
					</div>
				</div>
				<div className='grid-item prof-button'>
					{props.children}
				</div>
			</div>
		< /li>
	);
}