import logo from './logo.svg';
import './App.css';
import React, { useState } from 'react';

const App = () => {
  const [turn, setTurn] = useState('x');
  const [slide, setSlide] = useState('');
  const [isShowPlayBoard, setIsShowPlayBoard] = useState(false);
  const [isSelectboxActive, setIsSelectboxActive] = useState(false);
  const [winner, setWinner] = useState();
  //set cell
  const [cells, setCells] = useState(Array(40).fill(''));
  //cell
  const Cell = ({ num }) => {
    return <span onClick={() => handleClick(num)}>{cells[num]}</span>;
  };

  const TurnX = () => {
    setIsSelectboxActive(!isSelectboxActive);
    setIsShowPlayBoard(!isShowPlayBoard);
    setTurn('x');
    setSlide('players');
  };
  const TurnO = () => {
    setIsSelectboxActive(!isSelectboxActive);
    setIsShowPlayBoard(!isShowPlayBoard);
    setTurn('o');
    setSlide('players active player');
  };
  //  winnerCheck
  const checkforWinner = (squares) => {
    let combos = {
      across: [

        [0, 1, 2, 3], [1, 2, 3, 4], [2, 3, 4, 5], [3, 4, 5, 6], [4, 5, 6, 7],
        [8, 9, 10, 11], [9, 10, 11, 12], [10, 11, 12, 13], [11, 12, 13, 14], [12, 13, 14, 15],
        [16, 17, 18, 19], [17, 18, 19, 20], [18, 19, 20, 21], [19, 20, 21, 22], [0, 21, 22, 23],
        [24, 25, 26, 27], [25, 26, 27, 28], [26, 27, 28, 29], [27, 28, 29, 30], [28, 29, 30, 31],
        [35, 36, 37, 38], [32, 33, 34, 35], [33, 34, 35, 36], [34, 35, 36, 37],
      ],
      down: [
        [0, 8, 16, 24], [8, 16, 24, 32],
        [1, 9, 17, 25], [9, 17, 25, 33],
        [2, 10, 18, 26], [10, 18, 26, 34],
        [11, 19, 27, 35], 
        [4, 12, 20, 28], [12, 20, 28, 36],
        [5, 13, 21, 29], [13, 21, 29, 37],
        [6, 14, 22, 30], [14, 22, 30, 38],
        [7, 15, 23, 31], [15, 23, 31, 39],
      ],
      diagnol: [
        [3, 12, 21, 30], [12, 21, 30, 39], [2, 11, 20, 29], [11, 20, 29, 38],
        [4, 13, 22, 31], [1, 10, 19, 28], [10, 19, 28, 37], [0, 9, 18, 27],
        [9, 18, 27, 36], [8, 17, 26, 35], [3, 10, 17, 24], [4, 11, 18, 25],
        [11, 18, 25, 32], [5, 12, 19, 26], [12, 19, 26, 33], [6, 13, 20, 27],
        [13, 20, 27, 34], [7, 14, 21, 28], [14, 21, 28, 35], [15, 22, 29, 36],
      ],
    };
    for (let combo in combos) {
      combos[combo].forEach((pattern) => {
        // console.log(pattern);
        if (
          squares[pattern[0]] === '' ||
          squares[pattern[1]] === '' ||
          squares[pattern[2]] === '' ||
          squares[pattern[3]] === ''
        ) {
          //do nothing
        } else if (
          squares[pattern[0]] === squares[pattern[1]] &&
          squares[pattern[1]] === squares[pattern[2]] &&
          squares[pattern[2]] === squares[pattern[3]]
        )
        {
            setWinner(squares[pattern[0]]);
        }

      });
    }
  };

  //User click
  const handleClick = (num) => {
    if (cells[num] !== '') {
      alert('already clicked');
      return;
    }
    let squares = [...cells];

    if (turn === 'x') {
      squares[num] = 'X';
      setSlide('players active player');
      if (squares[num] === 'X' && squares[num - 8] === 'X' && squares[num + 8] === '') {
        squares[num + 8] = 'O';
      }
      else if (squares[num] === 'X' && squares[num - 1] === 'X' && squares[num + 1] === '') {
        squares[num + 1] = 'O';
      }
      else if (squares[num + 1] === 'X' && squares[num - 1] === '') {
        squares[num - 1] = 'O';
      }
      else if (squares[num - 7] === 'X' && squares[num - 14] === 'X' && squares[num + 7] === '') {
        squares[num + 7] = 'O';
      }
      else if (squares[num - 9] === 'X' && squares[num - 18] === 'X' && squares[num + 9] === '') {
        squares[num + 9] = 'O';
      }
      else {
        while (1) {
          let i = Math.floor(Math.random() * 41);
          if (squares[i] === '') {
            squares[i] = 'O';
            break;
          }

        }
      }

      setTimeout(
        () => { setSlide('players') },
        500
      );
    } else {
      squares[num] = 'O';

      setSlide('players');
      if (squares[num] === 'O' && squares[num - 8] === 'O' && squares[num + 8] === '') {
        squares[num + 8] = 'X';
      }
      else if (squares[num] === 'O' && squares[num - 1] === 'O' && squares[num + 1] === '') {
        squares[num + 1] = 'X';
      }
      else if (squares[num + 1] === 'O' && squares[num - 1] === '') {
        squares[num - 1] = 'X';
      }
      else if (squares[num - 7] === 'O' && squares[num - 14] === 'O' && squares[num + 7] === '') {
        squares[num + 7] = 'X';
      }
      else if (squares[num - 9] === 'O' && squares[num - 18] === 'O' && squares[num + 9] === '') {
        squares[num + 9] = 'X';
      }
      else {
        while (1) {
          let i = Math.floor(Math.random() * 41);
          if (squares[i] === '') {
            squares[i] = 'X';
            break;
          }

        }
      }
      setTimeout(
        () => { setSlide('players active player') },
        500
      );
    }
    checkforWinner(squares);
    setCells(squares);
    console.log(squares);
  };

  const handleRestart=()=>{
    setWinner(null);
    setCells(Array(40).fill(''));
    
  }

  return (
    <div className="App">
      {/* select box  */}
      <div className={isSelectboxActive ? " select-box hide " : "select-box"}>
        <header>Tic Tac Toe</header>
        <div className="content">
          <div className="title">Select which you want to be?</div>
          <div className="options">
            <button className="playerX" onClick={TurnX} >Player (X)</button>
            <button className="playerO" onClick={TurnO}>Player (O)</button>
          </div>
        </div>
      </div>
      {/* playBoard Section  */}
      <div className={isShowPlayBoard ? "play-board show" : "play-board"}>
        <div className="details">
          <div className={slide}>
            <span className="Xturn">X's Turn</span>
            <span className="Oturn">O's Turn</span>
            <div className="slider"></div>
          </div>
        </div>
        <div className="play-area">
          <section>
            <Cell num={0} />
            <Cell num={1} />
            <Cell num={2} />
            <Cell num={3} />
            <Cell num={4} />
            <Cell num={5} />
            <Cell num={6} />
            <Cell num={7} />
          </section>
          <section>
            <Cell num={8} />
            <Cell num={9} />
            <Cell num={10} />
            <Cell num={11} />
            <Cell num={12} />
            <Cell num={13} />
            <Cell num={14} />
            <Cell num={15} />
          </section>
          <section>
            <Cell num={16} />
            <Cell num={17} />
            <Cell num={18} />
            <Cell num={19} />
            <Cell num={20} />
            <Cell num={21} />
            <Cell num={22} />
            <Cell num={23} />
          </section>
          <section>
            <Cell num={24} />
            <Cell num={25} />
            <Cell num={26} />
            <Cell num={27} />
            <Cell num={28} />
            <Cell num={29} />
            <Cell num={30} />
            <Cell num={31} />
          </section>
          <section>
            <Cell num={32} />
            <Cell num={33} />
            <Cell num={34} />
            <Cell num={35} />
            <Cell num={36} />
            <Cell num={37} />
            <Cell num={38} />
            <Cell num={39} />
          </section>
        </div>
      </div>
      {/* result box  */}
      {winner && (
        <div className="result-box show">
          <div className="won-text"> {winner} is the winner!</div>
          <div className="btn"><button onClick={()=> handleRestart()}>Replay</button></div>
        </div>
      )}

    </div>
  );
}

export default App;
