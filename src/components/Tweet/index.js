import React from 'react';
import Style from './style';
import TweetList from './tweetList';
import request from 'superagent';

class Tweet extends React.Component {

    constructor() {
        super();
        this.state = {
          items: [],
          region: '',
          regionName: '',
          btnSearch: 'Kirim',
          btnSearchDisabled: true,
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
                if(this.state.region != '') {
				    const data = JSON.parse(res.text)
				    this.setState({items:data.statuses});
                }
			})
    }

    search(event) {
        console.log("Region : "+this.state.region);
        this.setState({
          btnSearchDisabled: true,
          btnSearch: 'Loading..'
        });
        request
    		.get('/api/v1/tweet/'+this.state.valueSearch+'/'+this.state.region)
    		.end((err, res) => {
    			if (err) {
    				console.log(err);
    			}
                const data = JSON.parse(res.text);
                this.setState({
                        items:data.statuses,
                        btnSearchDisabled: false,
                        btnSearch: 'Kirim'
                    });
                // console.log(data.statuses);
  			});
    }

    changeSearch(event) {
      this.setState({valueSearch: event.target.value});
      if(this.state.valueSearch == '' || this.state.region == '') {
           this.setState({btnSearchDisabled: true});
      }else{
           this.setState({btnSearchDisabled: false});
      }
    }

    changeRegion(event) {
      var a = event.target.value.split("#");
      this.setState({region: a[0], regionName: a[1]});
      if(a[0] == '' || this.state.valueSearch == '') {
           this.setState({btnSearchDisabled: true});
      }else{
           this.setState({btnSearchDisabled: false});
      }
    }

    render() {
        return(
            <div className="container-fluid" style={Style}>
                <div className="row">
                    <div className="col-md-2">
                        <select id="pilihDaerah" onChange={this.changeRegion} className="form-control">
                            <option value="pilih">-Pilih-</option>
                            <option value="-6.92712,107.603112,60km#Jawa Barat">Jawa Barat</option>
                            <option value="-6.807228,110.518343,70km#Jawa Tengah">Jawa Tengah</option>
                            <option value="-7.743389,112.999674,120km#Jawa Timur">Jawa Timur</option>
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
                {((this.state.region == '') || (this.state.valueSearch == '')) ?
                <div className="row">
                    <h3>Silahkan Search Sendiri</h3> 
                </div> :
                <div className="row">
                    { this.state.items.map(item=> { return <TweetList key={item.id_str} data={item} regionName={this.state.regionName} /> })}
                </div>
                }
            </div>
        )
    }
}

export default Tweet;
