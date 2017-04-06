import Grabber from './utils/Grabber';

var grabber = new Grabber();
grabber.getMarketData((err, rst) => {
  if (err) {
    let msg = 'yStock 找不到大盤資料';
    chrome.browserAction.setTitle({ title: msg });
    return;
  }

  let msg = '';
  let {tseRst, otcRst} = rst;
  msg = `${tseRst.name} ${tseRst.final} ${tseRst.upDown} ${tseRst.upDownVol} ${tseRst.volume}`;
  msg += '\r\n';
  msg += `${otcRst.name} ${otcRst.final} ${otcRst.upDown} ${otcRst.upDownVol} ${otcRst.volume}`;
  console.log(msg);
  console.log(tseRst.final);
  chrome.browserAction.setTitle({ title: msg });
});