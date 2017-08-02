import React from 'react';
import request from 'superagent';

class Search extends React.Component {

    constructor() {
        super();

        this.search.bind(this);
    }

    search(event) {
        request
			.get('/api/v1/tweet/'+event.target.value)
			.end((err, res) => {
				if (err) {
					console.log(err);
				}
				console.log("Berhasil Search");
			})
    }

    render() {
        return (
            <div className="row">
                <div className="col-md-4 col-md-offset-4">
                       
                     <div className="form-group">
                          <input type="text" onChange={this.search} className="form-control" placeholder="Search" />
                     </div>
                       
                </div>
            </div>
        )
    }

}

export default Search;