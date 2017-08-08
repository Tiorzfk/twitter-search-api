import React from 'react';
import request from 'superagent';
import SweetAlert from 'sweetalert-react';

class TweetList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            show : true,
            btnNegatif : 'Negative',
            btnPositif : 'Positive',
            disabledBtn : false
        };
        this.date.bind(this);
    }

    simpan(data) {
        if(data.status == 'negative'){
            this.setState({
                btnNegatif : 'Loading...',
                disabledBtn : true
            });
        }else{
            this.setState({
                btnPositif : 'Loading...',
                disabledBtn : true
            });
        }
        request
			.post('/api/v1/tweet')
            .send(data)
            .set('Content-Type','application/x-www-form-urlencoded')
			.end((err, res) => {
				if (err) {
					console.log(err);
				}

                if(data.status == 'negative'){
                    this.setState({
                        btnNegatif : 'Negatif',
                        disabledBtn : false
                    });
                }else{
                    this.setState({
                        btnPositif : 'Positif',
                        disabledBtn : false
                    });
                }
				
                alert("Berhasil");
			})
        {/*<SweetAlert
            show={this.state.show}
            title="Success"
            text="berhasil"
            onConfirm={() => this.setState({ show: false })}
        />*/}
    }

    date() {
        var today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth()+1; //January is 0!
        var yyyy = today.getFullYear();

        if(dd<10) {
            dd = '0'+dd
        } 

        if(mm<10) {
            mm = '0'+mm
        } 

        today = mm + '/' + dd + '/' + yyyy;
        return today;
    }

    render() {
        return (                
                    <div className="col-md-3">
                        <div className="card">
                            <img className="card-img-top" src={this.props.data.user.profile_banner_url ?this.props.data.user.profile_banner_url:'/img/banner.jpg'} alt="Divernity Image" />
                            <div className="card-block">
                            <h4 className="card-title">{this.props.data.user.name}</h4>
                            <p className="card-text">{this.props.data.text}</p>
                            <p className="card-text">
                                <button disabled={this.state.disabledBtn} onClick={this.simpan.bind(this,{
                                    id:this.props.data.id_str,
                                    username: this.props.data.user.screen_name,
                                    foto: this.props.data.user.profile_image_url,
                                    tgl: this.date(),
                                    latitude: 0,
                                    longitude: 0,
                                    lokasi: this.props.data.user.location,
                                    tweet: this.props.data.text,
                                    status: 'positive'
                                })} className="btn btn-info btn-md">{this.state.btnPositif}</button> 
                                <button disabled={this.state.disabledBtn} onClick={this.simpan.bind(this,{
                                    id:this.props.data.id_str,
                                    username: this.props.data.user.screen_name,
                                    foto: this.props.data.user.profile_image_url,
                                    tgl: this.date(),
                                    latitude: 0,
                                    longitude: 0,
                                    lokasi: this.props.data.user.location,
                                    tweet: this.props.data.text,
                                    status: 'negative'
                                })} className="btn btn-danger btn-md">{this.state.btnNegatif}</button></p>
                            </div>
                        </div>
                    </div>
        )
    }

}

export default TweetList;