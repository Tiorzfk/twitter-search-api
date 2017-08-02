import React, { Component } from 'react';

export default class NotFound extends Component {

  render() {

    const style = {
      error404 : {height: '240px', 'font-family': 'Roboto'},
      error404Container : {'margin-top': '60px'},
      page404Wrap : {padding: '72px 0 130px 0', 'text-align': 'center'},
      page404WrapImg : {'margin-bottom': '31px'},
      page404WrapP : {'line-height': '24px', 'margin-bottom': '43px', 'color': '#222222', 
                      'font-size': '14px','letter-spacing': '1px'}
    }

    return (
      <div style={style.error404}>
        <section style={style.error404Container}>
          <div style={style.page404Wrap}>
            <img src="/img/404.png" alt="Francoise img" style={style.page404WrapImg} />
            <p style={style.page404WrapP}>The requested page has <br /> not been found</p>
            <a href="/" class="homePageLink">homepage</a>
          </div>
        </section>
      </div>
    );
  }
}
