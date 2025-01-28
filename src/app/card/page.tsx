"use client"

import { useEffect, useState } from "react";

// TODO:
// - scan results using QR for easy confirmation
// - allow input where unnecessary numbers are allowed

interface PatternMap {
    blackout: string[];
    cross: string[];
    l: string[];
    x: string[];
}

export default function Card() {
    // function that generates a valid bingo card
    const generateNumbers = () => {
        const numbers = [];
        // iterate to every cell
        for (let i = 0; i < 5; i++) {
        const temp = [];
        for (let j = 0; j < 5; j++) {
            // generate num
            let num = (1 + j) * 15 - Math.floor(Math.random() * 15);
    
            // check if num already exists
            const flattenedNumbers = numbers.flat();
            while (flattenedNumbers.indexOf(num) > -1) {
            num = (1 + j) * 15 - Math.floor(Math.random() * 15);
            }
    
            temp.push(num);
        }
        // push temp array to main array
        numbers.push(temp);
        }
    
        // return flattened numbers
        return numbers.flat();
    };

    // function that creates a new bingo card
    const generateNewCard = () => {
        const nums = generateNumbers();
    
        localStorage.setItem("numbers", JSON.stringify(nums));
    
        return nums;
    };

    // initialize boolean status matrix
    const initializeBooleanMatrix = () => {
        return [
            false, false, false, false, false,
            false, false, false, false, false,
            false, false, true, false, false,
            false, false, false, false, false,
            false, false, false, false, false
        ]
    };
    
    const colorOptions: string[] = [
        "Blue", "Purple", "Orange", "Red", "Green"
    ];

    const patternOptions:string[] = [
        "Cross",
        "L",
        "X",
        "Blackout"
    ];

    const patternMap: PatternMap = {
        blackout: ["1111111111111111111111111"],
        cross: [
            "0010000100111110010000100"
        ],
        l: [
            "1000010000101001000011111",
            "0000100001001010000111111",
            "1111100001001010000100001",
            "1111110000101001000010000"
        ],
        x: ["1000101010001000101010001"]
    };

    const [numbers, setNumbers] = useState<number[]>([]);
    const [numberStatusMatrix, setNumberStatusMatrix] = useState<boolean[]>([]);
    const [color, setColor] = useState<string>("blue");
    const [pattern, setPattern] = useState<string>("blackout");
    const [isWinner, setAsWinner] = useState<boolean>(false);

    useEffect(() => {
        setNumbers(generateNewCard());
        setNumberStatusMatrix(initializeBooleanMatrix());

        const currentStatus = localStorage.getItem("currentStatus");
        if (currentStatus != null) {
            setNumberStatusMatrix(currentStatus.split("").map((b) => b === "1" ? true : false))
        }

        // use set color from local storage, if any
        setColor(localStorage.getItem("savedColor") ?? "green");

        // set pattern from local storage, if any
        setPattern(localStorage.getItem("savedPattern") ?? "blackout");
    }, []);

    const toggleNumber = (n:number, i:number) => {
        // mark number as toggled
        setNumberStatusMatrix(numberStatusMatrix.map((n,j) => {
            if (i === j) {
                if (numberStatusMatrix[i] === false) {
                    // check if already winner
                    const currentStatus = numberStatusMatrix.map((b,k) => {
                        if (i === k) {
                            return "1";
                        }
                        return b ? "1" : "0"
                    }).toString().replaceAll(",","");

                    localStorage.setItem("currentStatus", currentStatus);
                    
                    switch (pattern) {
                        case "blackout":
                            setAsWinner(patternMap.blackout.includes(currentStatus));
                        case "cross":
                            setAsWinner(patternMap.cross.includes(currentStatus));
                        case "L":
                            setAsWinner(patternMap.l.includes(currentStatus));
                        case "X":
                            setAsWinner(patternMap.x.includes(currentStatus));
                    }
                } else {
                    const currentStatus = numberStatusMatrix.map((b,k) => {
                        if (i === k) {
                            return "0";
                        }
                        return b ? "1" : "0"
                    }).toString().replaceAll(",","");

                    localStorage.setItem("currentStatus", currentStatus);
                }

                return !n;
            } else {
                return n;
            }
        }));
    };

    const createNewCard = () => {
        setNumbers(generateNewCard());
        setNumberStatusMatrix(initializeBooleanMatrix());
        setAsWinner(false);
    }

    const resetCard = () => {
        setNumberStatusMatrix(initializeBooleanMatrix());
        setAsWinner(false);
    };

    const changePattern = (inputPattern:string) => {
        setAsWinner(false);
        setPattern(inputPattern);
        
        const currentStatus = numberStatusMatrix.map((b) => b ? "1" : "0").toString().replaceAll(",","");

        switch (pattern) {
            case "blackout":
                setAsWinner(patternMap.blackout.includes(currentStatus));
            case "cross":
                setAsWinner(patternMap.cross.includes(currentStatus));
            case "L":
                setAsWinner(patternMap.l.includes(currentStatus));
            case "X":
                setAsWinner(patternMap.x.includes(currentStatus));
        }

        // save to local storage
        localStorage.setItem("savedPattern", inputPattern);
    }

    const changeColor = (inputColor:string) => {
        setColor(inputColor);

        // save to local storage
        localStorage.setItem("savedColor", inputColor);
    }

    const getColorCSS = () => {
        switch (color) {
            case "blue":
                return "bg-blue-500"
            case "purple":
                return "bg-purple-500";
            case "orange":
                return "bg-orange-500";
            case "red":
                return "bg-red-500";
            case "green":
                return "bg-green-500";
            default: 
                return "bg-blue-500";
        }
    }

    return (
        <main className="w-screen h-screen flex flex-col justify-center items-center">
            <h1 className="text-4xl font-semibold mb-4">BinGO Card</h1>
            {/* BinGO Card */}
            {
                isWinner ? 
                    <div className="w-4/5 sm:w-3/5 md:w-1/2 lg:w-2/5 xl:w-1/3 2xl:w-1/4 mb-2 flex justify-center items-center bg-yellow-600 text-[#F2F2F2] font-semibold rounded-xl gap-2">
                <p className="py-1 ">
                    Winner!
                </p>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 18.75h-9m9 0a3 3 0 0 1 3 3h-15a3 3 0 0 1 3-3m9 0v-3.375c0-.621-.503-1.125-1.125-1.125h-.871M7.5 18.75v-3.375c0-.621.504-1.125 1.125-1.125h.872m5.007 0H9.497m5.007 0a7.454 7.454 0 0 1-.982-3.172M9.497 14.25a7.454 7.454 0 0 0 .981-3.172M5.25 4.236c-.982.143-1.954.317-2.916.52A6.003 6.003 0 0 0 7.73 9.728M5.25 4.236V4.5c0 2.108.966 3.99 2.48 5.228M5.25 4.236V2.721C7.456 2.41 9.71 2.25 12 2.25c2.291 0 4.545.16 6.75.47v1.516M7.73 9.728a6.726 6.726 0 0 0 2.748 1.35m8.272-6.842V4.5c0 2.108-.966 3.99-2.48 5.228m2.48-5.492a46.32 46.32 0 0 1 2.916.52 6.003 6.003 0 0 1-5.395 4.972m0 0a6.726 6.726 0 0 1-2.749 1.35m0 0a6.772 6.772 0 0 1-3.044 0" />
                </svg>
            </div> : <></>
            }
            <div className="w-4/5 sm:w-3/5 md:w-1/2 lg:w-2/5 xl:w-1/3 2xl:w-1/4 grid grid-rows-5 grid-cols-5 text-center bg-[#F2F2F2] text-[#333333] rounded-md">
                {
                    numbers.map((n, i) => (
                        <button onClick={() => i === 12 ? console.log("") : toggleNumber(n, i)} className={`block text-2xl px-2 py-4 ${numberStatusMatrix[i] == true ? `text-[#f2f2f2] font-semibold ${getColorCSS()}` : ""}`} key={i}>
                            {i === 12 ? "FREE" : n}
                        </button>
                    ))
                }
            </div>
            <div className="w-4/5 sm:w-3/5 md:w-1/2 lg:w-2/5 xl:w-1/3 2xl:w-1/4 mt-2 flex justify-between">
                <button onClick={() => createNewCard()} type="button" className="text-[#F2F2F2] bg-blue-600 font-medium w-[15%] py-1 rounded-xl">New</button>
                <select value={color} onChange={(event) => changeColor(event.target.value)} className="py-1.5 w-[30%] rounded-xl text-[#333333] text-center">
                    {colorOptions.map((c, i) => (
                        <option key={i} value={c.toLowerCase()} >{c}</option>
                    ))}
                </select>
                <select value={pattern} onChange={(event) => changePattern(event.target.value)} className="w-[30%] py-1.5 rounded-xl text-[#333333] text-center">
                    {patternOptions.map((p, i) => <option key={i} value={p.toLowerCase()}>{p}</option>)}
                </select>
                <button type="button" onClick={() => resetCard()} className="bg-[#F2F2F2] text-red-600 font-medium w-[15%] py-1 rounded-xl">Clear</button>
            </div>
        </main>
    )
}