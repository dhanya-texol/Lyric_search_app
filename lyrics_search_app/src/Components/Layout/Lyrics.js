import React, { Component } from 'react'
import axios from 'axios';
import Spinner from './Spinner';
import {Link} from 'react-router-dom';
import Moment from 'react-moment';
class Lyrics extends Component {
    state = {
        track: {},
        lyrics: {},
    }
    componentDidMount() {
        axios.get(
            `http://cors-anywhere.herokuapp.com/https://api.musixmatch.com/ws/1.1/track.lyrics.get?track_id=${this.props.match.params.id}&apikey=${process.env.REACT_APP_MM_KEY}
`
        )
            .then(res => {
                //console.log(res.data);
                this.setState({ lyrics: res.data.message.body.lyrics });
                return axios.get(
                    `http://cors-anywhere.herokuapp.com/https://api.musixmatch.com/ws/1.1/track.get?track_id=${this.props.match.params.id}&apikey=${process.env.REACT_APP_MM_KEY}
`
                )
                    .then(res => {
                        //console.log(res.data);
                        this.setState({ track: res.data.message.body.track });
                    })
            }

            )
            .catch(err => console.log(err));
    }
    render() {
        const { track, lyrics } = this.state;
 console.log(track);
        if (track === undefined||lyrics === undefined||
            track === Object.keys(track).length === 0
            || Object.keys(lyrics).length===0) {
return<Spinner/>
        }
else{
return(
<React.Fragment>
<Link to="/" className="btn btn-dark btn-sm mb-4">Go Back</Link>
<div className="card">
<h5 className="card-header">
{track.track_name}by <span className="text-secondary">{track.artist_name}</span>
</h5>
<div className="card-body">
<p className="card-text">{lyrics.lyrics_body}</p>
</div>
</div>
<ul className="list-group mt-3">
<li className="list-group-item">
<strong>
Album id
</strong>:{track.album_id}
</li>
<li className="list-group-item">
<strong>Explicit words</strong>:{track.explicit===0? 'no':'yes'}
</li>
<li className="list-group-item">
<strong>Release Date</strong>:<Moment format="MM/DD/YYYY">{track.updated_time}</Moment>
</li>
</ul>
</React.Fragment>
)
}
    }
}
export default Lyrics;
/*<li className="list-group-item">
<strong>
song genre
</strong>:{track.primary_genres.music_genre_list[0]
.music_genre.music_genre_name}
</li>*/