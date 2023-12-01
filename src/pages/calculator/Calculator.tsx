import { useRef, useState } from 'react';
import soundOff from '../../assets/sound_off.png';
import soundOn from '../../assets/sound_on.png';
import styles from './calculator.module.css';
const tickSound = require('../../assets/tick.mp3');
const Calculator = () => {
    const [soundState, setSoundState] = useState(false);
    const operators = ['+', '-', 'x', '÷'];
    let decimalAdded = false;
    const displayRef = useRef<HTMLInputElement>(null);
    const [displayValue, setDisplayValue] = useState<string>("0");
    const calc = (event: any) => {
        let btnVal = event.target.innerHTML;

        if (btnVal == 'C') {
            setDisplayValue("0");
            decimalAdded = false;
        } else if (btnVal == '=') {
            let equation = displayValue;
            let lastChar = equation[equation.length - 1];
            equation = equation.replace(/x/g, '*').replace(/÷/g, '/');
            if (operators.indexOf(lastChar) > -1 || lastChar == '.') {
                equation = equation.replace(/.$/, '');
            }
            if (equation) {
                try {
                    setDisplayValue(eval(equation));
                }
                catch (e) {
                    setDisplayValue("Error");
                }
            }
            decimalAdded = false;
        } else if (operators.indexOf(btnVal) > -1) {
            let lastChar = displayValue[displayValue.length - 1];

            if (displayValue != '' && operators.indexOf(lastChar) == -1) {
                setDisplayValue(displayValue + btnVal);
            }
            else if (displayValue == '' && btnVal == '-') {
                setDisplayValue(displayValue + btnVal);
            }
            if (operators.indexOf(lastChar) > -1 && displayValue.length > 1) {
                setDisplayValue(displayValue.replace(/.$/, btnVal));
            }
            decimalAdded = false;
        } else if (btnVal == '.') {
            if (!decimalAdded) {
                setDisplayValue(displayValue + btnVal);
                decimalAdded = true;
            }
        } else {
            let newDisplayValue = displayValue.replace(/^0+/, '') + btnVal;
            setDisplayValue(newDisplayValue);
        }
    }
    const randomNumber = () => { return Math.random() * 256 | 0; }

    const mouseOverEvent = (event: any) => {
        if (soundState) {
            try {
                const audio = new Audio(tickSound);
                audio.play();
            } catch (err) {
                console.log("🚀 ~ file: Calculator.tsx:60 ~ mouseOverEvent ~ err:", err);
            }
        }
        const color = "rgba(" + randomNumber() + "," + randomNumber() + "," + randomNumber() + ",0.2)";
        event.target.style.background = color;
    };
    const mouseOutEvent = (event: any) => {
        event.target.style.background = "";
    }

    const toggleSound = () => {
        setSoundState(!soundState);
    }

    return (
        <div className={styles.calculatorBackground}>
            <div className={styles.calculator} id='calc' >
                <div className={styles.flexbox}>
                    <div className={[styles.flexbox, styles.rowReverse].join(" ")}>
                        <span className={styles.soundButton}>
                            {soundState ? (
                                <>
                                    <img src={soundOn} width="30" height="30" onClick={toggleSound} alt="sound on" />
                                </>
                            ) : (
                                <>
                                    <img src={soundOff} width="30" height="30" onClick={toggleSound} alt="sound off" />
                                </>
                            )}
                        </span>

                    </div>
                    <div className={styles.result} ref={displayRef} >{displayValue}</div>
                    <span onClick={(event) => calc(event)} onMouseOver={(event) => mouseOverEvent(event)} onMouseOut={(event) => { mouseOutEvent(event) }} className={styles.btn}>C</span>
                    <span onClick={(event) => calc(event)} onMouseOver={(event) => mouseOverEvent(event)} onMouseOut={(event) => { mouseOutEvent(event) }} className={styles.btn}>%</span >
                    <span onClick={(event) => calc(event)} onMouseOver={(event) => mouseOverEvent(event)} onMouseOut={(event) => { mouseOutEvent(event) }} className={styles.btn}>÷</span >
                    <span onClick={(event) => calc(event)} onMouseOver={(event) => mouseOverEvent(event)} onMouseOut={(event) => { mouseOutEvent(event) }} className={styles.btn}>7</span>
                    <span onClick={(event) => calc(event)} onMouseOver={(event) => mouseOverEvent(event)} onMouseOut={(event) => { mouseOutEvent(event) }} className={styles.btn}>8</span>
                    <span onClick={(event) => calc(event)} onMouseOver={(event) => mouseOverEvent(event)} onMouseOut={(event) => { mouseOutEvent(event) }} className={styles.btn}>9</span>
                    <span onClick={(event) => calc(event)} onMouseOver={(event) => mouseOverEvent(event)} onMouseOut={(event) => { mouseOutEvent(event) }} className={styles.btn}>x</span>
                    <span onClick={(event) => calc(event)} onMouseOver={(event) => mouseOverEvent(event)} onMouseOut={(event) => { mouseOutEvent(event) }} className={styles.btn}>4</span>
                    <span onClick={(event) => calc(event)} onMouseOver={(event) => mouseOverEvent(event)} onMouseOut={(event) => { mouseOutEvent(event) }} className={styles.btn}>5</span>
                    <span onClick={(event) => calc(event)} onMouseOver={(event) => mouseOverEvent(event)} onMouseOut={(event) => { mouseOutEvent(event) }} className={styles.btn}>6</span>
                    <span onClick={(event) => calc(event)} onMouseOver={(event) => mouseOverEvent(event)} onMouseOut={(event) => { mouseOutEvent(event) }} className={styles.btn}>-</span>
                    <span onClick={(event) => calc(event)} onMouseOver={(event) => mouseOverEvent(event)} onMouseOut={(event) => { mouseOutEvent(event) }} className={styles.btn}>1</span>
                    <span onClick={(event) => calc(event)} onMouseOver={(event) => mouseOverEvent(event)} onMouseOut={(event) => { mouseOutEvent(event) }} className={styles.btn}>2</span>
                    <span onClick={(event) => calc(event)} onMouseOver={(event) => mouseOverEvent(event)} onMouseOut={(event) => { mouseOutEvent(event) }} className={styles.btn}>3</span>
                    <span onClick={(event) => calc(event)} onMouseOver={(event) => mouseOverEvent(event)} onMouseOut={(event) => { mouseOutEvent(event) }} className={styles.btn}>+</span>
                    <span onClick={(event) => calc(event)} onMouseOver={(event) => mouseOverEvent(event)} onMouseOut={(event) => { mouseOutEvent(event) }} className={styles.btn}>.</span>
                    <span onClick={(event) => calc(event)} onMouseOver={(event) => mouseOverEvent(event)} onMouseOut={(event) => { mouseOutEvent(event) }} className={styles.btn}>=</span>
                    <span onClick={(event) => calc(event)} onMouseOver={(event) => mouseOverEvent(event)} onMouseOut={(event) => { mouseOutEvent(event) }} className={[styles.zero, styles.btn].join(' ')}>0</span>
                </div >
            </div >
        </div>
    )
};

export default Calculator;