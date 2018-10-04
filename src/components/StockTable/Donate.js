import React from 'react';


class Donate extends React.Component {
  render() {
    let className = "tab-pane";
    if (this.props.isActive) {
      className += " active";
    }

    return (
      <div id={this.props.tabId} className={className}>
        <div className="donate">
          <div className="links">
            <a href="https://ystock.tw" target="_blank">官網 </a>
            |
            <a href="https://www.facebook.com/WuchaWeb" target="_blank"> 粉絲團</a>
            <div>wucha.tw@gmail.com</div>
          </div>
          <div className="message">
            <p>
              如果您喜歡這個小工具，可以留個言鼓勵一下<br/>
              若有幫助您賺到一些錢，不妨考慮贊助一下:D<br/>
            </p>

            <h4>贊助</h4>
            選擇使用「街口支付」或「LINE Pay」掃描以下的 QRCode<br/>
            填入希望捐贈的金額送出即可<br/>
            捐多捐少不重要，有這心意我就非常感謝您了！
            <br/>
          </div>

          <div className="qrcode">
            <ul className="nav nav-tabs">
              <li className="col-xs-6 active"><a href="#tab-jkos" data-toggle="tab">街口支付</a></li>
              <li className="col-xs-6"><a href="#tab-line" data-toggle="tab">LINE Pay</a></li>
            </ul>
            <hr/>
            <div className="tab-content">
              <div className="tab-pane active" id="tab-jkos">
                <img src="./images/donate-jkos.jpg" />
              </div>
              <div className="tab-pane" id="tab-line">
                <img src="./images/donate-line.jpg" />
              </div>
            </div>
          </div>

        </div>
      </div>
    );
  }
}

Donate.defaultProps = {
  isActive: false
};


export default Donate;