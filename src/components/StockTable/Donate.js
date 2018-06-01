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
          <div className="message">
            如果您喜歡這個小工具，可以留個言鼓勵一下<br/>
            若有幫助您賺到一些錢，不妨考慮贊助一下:D<br/><br/>
            使用「街口支付」掃描以下的 QRCode<br/>
            填入希望捐贈的金額送出即可<br/>
            捐多捐少不重要，有這心意我就非常感謝您了！
            <br/><br/>
          </div>
          <img src="./images/donate.jpg" />
        </div>
      </div>
    );
  }
}

Donate.defaultProps = {
  isActive: false
};


export default Donate;