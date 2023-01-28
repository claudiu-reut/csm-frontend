import React from 'react';
import './Trofee.css';

const data = [
  { img: require('./images/cup.png'), campionat: 'Romanian Cup',an:'2022-2023',loc:'-'},
  { img: require('./images/diviziaA1.png'), campionat: 'Romanian Divizia A1',an:'2022-2023',loc:'-'},
  { img: require('./images/diviziaA2vest.png'), campionat: 'Romanian League A2 West',an:'2020-2021',loc:'-'},
  { img: require('./images/diviziaA2vest.png'), campionat: 'Romanian League A2 West',an:'2019-2020',loc:'4'},
  { img: require('./images/diviziaA2est.png'), campionat: 'Romanian League A2 East',an:'2018-2019',loc:'4'},
  { img: require('./images/diviziaA2est.png'), campionat: 'Romanian League A2 East',an:'2017-2018',loc:'4'},
  { img: require('./images/diviziaA2est.png'), campionat: 'Romanian League A2 East',an:'2016-2017',loc:'4'},
  { img: require('./images/diviziaA2est.png'), campionat: 'Romanian League A2 East',an:'2015-2016',loc:'6'},
  { img: require('./images/diviziaA2est.png'), campionat: 'Romanian League A2 East',an:'2014-2015',loc:'6'},
  { img: require('./images/diviziaA2est.png'), campionat: 'Romanian League A2 East',an:'2013-2014',loc:'6'},
  { img: require('./images/diviziaA2est.png'), campionat: 'Romanian League A2 East',an:'2012-2013',loc:'6'},
  { img: require('./images/diviziaA2est.png'), campionat: 'Romanian League A2 East',an:'2011-2012',loc:'1'},
  { img: require('./images/diviziaA1.png'), campionat: 'Romanian Divizia A1',an:'2010-2011',loc:'11'},
  { img: require('./images/diviziaA2est.png') , campionat: 'Romanian League A2 East',an:'2009-2010',loc:'2'}
];

const Trofee = () => {
  return (
    <div className='trofeu-divs'>
        {data.map(item => (
            <div className='trofeu-div'>
              <div className='trofeu-img'>
                <img src={item.img} alt='...'/>
              </div>
              <div className='trofeu-text'>
                <p >Campionat: {item.campionat}</p>
                <p >Anul: {item.an}</p>
                <p >Locul: {item.loc}</p>
             </div>
            </div>
        ))}
    </div>
  );
}

export default Trofee;
