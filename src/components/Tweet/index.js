import React from 'react';
import Style from './style';
import TweetList from './tweetList';
import request from 'superagent';

class Tweet extends React.Component {

    constructor() {
        super();
        this.state = { items: []};
        this.search = this.search.bind(this);
        // this.paging = this.paging.bind(this);
    }

	componentDidMount() {
		request
			.get('/api/v1/tweet/sara/60')
			.end((err, res) => {
				if (err) {
					console.log(err);
				}
				const data = JSON.parse(res.text)
				this.setState({items:data.statuses});
			})
    }

    search(event) {
        request
			.get('/api/v1/tweet/'+event.target.value+'/60')
			.end((err, res) => {
				if (err) {
					console.log(err);
				}
                
                const data = JSON.parse(res.text)
				this.setState({items:data.statuses});
			})
    }

    // paging() {
    //     request
	// 		.get('/api/v1/tweet/'+event.target.value+'/24')
	// 		.end((err, res) => {
	// 			if (err) {
	// 				console.log(err);
	// 			}
    //             const data = JSON.parse(res.text)
	// 			this.setState({items:data.statuses});

    //             console.log("paging");
	// 		})
    // }

    render() {
        return(
            <div className="container-fluid" style={Style}>
                <div className="row">
                    <div className="col-md-4 col-md-offset-4">
                        <div className="form-group">
                            <input type="text" onChange={this.search} className="form-control" placeholder="Search" />
                        </div>
                    </div>
                </div>
                <div className="row">
                    { this.state.items.map(item=> { return <TweetList key={item.id_str} data={item} /> })}
                </div>
                {/*<div className="row">
                    <div className="col-md-4 col-md-offset-5">
                        <button onClick={this.paging} className="btn btn-primary"> Load More </button>
                    </div>
                </div>*/}
            </div>
        )
    }
}

export default Tweet;