import React from 'react';
import Stock from './Stock';
import {
  SortableContainer,
  SortableElement,
  arrayMove,
} from 'react-sortable-hoc';


const SortableItem = SortableElement(Stock, {withRef: true});

const SortableList = SortableContainer(({stocks, onDelStock, onStockInfo}) => {
  let tbody = stocks.map(
    (obj, idx) => (<SortableItem stock={obj} key={obj.id} index={idx}
     id={obj.id} onDelStock={onDelStock} onStockInfo={onStockInfo} />)
  );
  return (
    <tbody>
      {tbody}
    </tbody>
  );
});

const Table = ({
  stocks,
  status,
  idx,
  onDelStock,
  onStockInfo
}) => {
  let tbody = null;
  if (status === 'loading') {
    tbody = (
      <tbody>
        <tr className="table-loading">
          <td colSpan="6" rowSpan="6">
            <center><img src="./images/ajax-loader.gif" /></center>
          </td>
        </tr>
      </tbody>
    );
  } else {
    tbody = <tbody><tr className="table-none"><td colSpan="6">No Data</td></tr></tbody>;
    if (stocks.length > 0) {
      // tbody = stocks.map(
      //           (obj) => <Stock stock={obj} key={obj.id} id={obj.id} onDelStock={onDelStock} onStockInfo={onStockInfo}/>
      //         );

    tbody = (<SortableList stocks={stocks} onSortEnd={({oldIndex, newIndex})=>{}} 
             useDragHandle={true} onDelStock={onDelStock}
             onStockInfo={onStockInfo} helperClass="ghost" lockAxis='y'/>);
    }
  }

  return (
    <div className="stock-table-list">
      <table className="table table-hover table-head-fixed">
        <thead>
          <tr>
            <th className="col1">個股</th>
            <th className="col2">今價</th>
            <th className="col3">漲跌</th>
            <th className="col4">最高</th>
            <th className="col5">最低</th>
            <th className="col6"></th>
          </tr>
        </thead>
        {/* <tbody>
          {tbody}
        </tbody> */}
        {tbody}
      </table>
    </div>
  );
}

// // Prop 預設值
// Table.defaultProps = {
//   stocks: [
//     {
//       'idx': 1001,
//       'stock': {
//         name: 'aaaa',
//         final: 100,
//         upDown: '+10',
//         max: 10,
//         min: 1
//       }
//     } 
//   ]
// }


export default Table;