import React from 'react';
import Style from './style';
import TweetList from './tweetList';
import request from 'superagent';

class Tweet extends React.Component {

    constructor() {
        super();
        this.state = {
          items: [],
          region: '-6.926356,107.663432,120km',
          btnSearch: 'Kirim',
          btnSearchDisabled: false,
          valueSearch: ''
        };
        this.search = this.search.bind(this);
        this.changeSearch = this.changeSearch.bind(this);
        this.changeRegion = this.changeRegion.bind(this);
        // this.paging = this.paging.bind(this);
    }

	componentDidMount() {
		request
			.get('/api/v1/tweet/unikom/'+this.state.region)
			.end((err, res) => {
				if (err) {
					console.log(err);
				}
				const data = JSON.parse(res.text)
				this.setState({items:data.statuses});
			})
    }

    search(event) {
        console.log("Region : "+this.state.region);
        this.setState({
          btnSearchDisabled: true,
          btnSearch: 'Loading..',
          region: event.target.value
        });
        request
    		.get('/api/v1/tweet/'+this.state.valueSearch+'/'+this.state.region)
    		.end((err, res) => {
    			if (err) {
    				console.log(err);
    			}
                console.log("Region "+this.state.region);
                const data = JSON.parse(res.text)
    			this.setState({
                    items:data.statuses,
                    btnSearchDisabled: false,
                    btnSearch: 'Kirim'
                });
  			});
    }

    changeSearch(event) {
      this.setState({valueSearch: event.target.value});
    }

    changeRegion(event) {
      this.setState({region: event.target.value});
    }

    // change(event){
    //     this.setState({
    //       btnSearchDisabled: true,
    //       btnSearch: 'Loading..',
    //       region: event.target.value
    //     });
    //     console.log(this.state.valueSearch);
    //     request
    // 		.get('/api/v1/tweet/'+this.state.valueSearch+'/'+event.target.value)
    // 		.end((err, res) => {
    // 			if (err) {
    // 				console.log(err);
    // 			}
    //             this.setState({
    //                 btnSearchDisabled: false,
    //                 btnSearch: 'Kirim'
    //             });
    //             const data = JSON.parse(res.text)
    //                 this.setState({items:data.statuses});
    //             })
    // }

    render() {
        return(
            <div className="container-fluid" style={Style}>
                <div className="row">
                    <div className="col-md-2">
                        <select id="pilihDaerah" onChange={this.changeRegion} className="form-control">
                            <option value="pilih">-Pilih-</option>
                            <option value="-6.926356,107.663432,120km">Jawa Barat</option>
                            <option value="-7.218152,110.118002,160km">Jawa Tengah</option>
                            <option value="-9.223029,112.488834,190km">Jawa Timur</option>
                        </select>
                    </div>
                    <div className="col-md-4">
                        <div className="form-group">
                            <input value={this.state.valueSearch} onChange={this.changeSearch} type="text" className="form-control" placeholder="Search" />
                        </div>
                    </div>
                    <div className="col-md-2">
                        <div className="form-group">
                          <button disabled={this.state.btnSearchDisabled} className="btn btn-primary" onClick={this.search}>{this.state.btnSearch}</button>
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
