"use client"

import { useEffect, useState } from "react";

export default function Game() {
    const [pickedNumbers, setPickedNumbers] = useState<number[]>([]);
    const [lastPickedNumber, setLastPickedNumber] = useState<number>(0);
    const [filteredNumbers, setFilteredNumbers] = useState<number[]>([]);
    const [searchedNumber, setSearchNumber] = useState<number>();
    const [isAllNumbersPicked, setAllNumbersAsPicked] = useState<boolean>(false);

    const pickNumber = () => {
        if (pickedNumbers.length === 75)
            return;

        let randomNumber = Math.round(74 * Math.random() + 1);

        while (pickedNumbers.includes(randomNumber)) {
            randomNumber = Math.round(74 * Math.random() + 1);   
        }

        setLastPickedNumber(randomNumber);

        const newPickedNumbers = pickedNumbers.concat([randomNumber]);

        setPickedNumbers(newPickedNumbers);
        setFilteredNumbers(newPickedNumbers);

        localStorage.setItem("savedPickedNumbers", JSON.stringify(newPickedNumbers));

        if (newPickedNumbers.length === 75)
            setAllNumbersAsPicked(true);
    }

    const resetPickedNumbers = () => {
        setLastPickedNumber(0);
        setPickedNumbers([]);
        setFilteredNumbers([]);
        setAllNumbersAsPicked(false);
        
        // clear numbers stored in local storage
        localStorage.removeItem("savedPickedNumbers");
    }

    const searchNumber = (number:string | undefined) => {
       
        
        if (number?.length === 0)  {
            setSearchNumber(undefined);
            setFilteredNumbers(pickedNumbers);
        }

        if (!number) {
            return;
        }

        let parsedNumber;

        // search number from list
        try {
            parsedNumber = parseInt(number);
            setFilteredNumbers(filteredNumbers.filter((fn) => fn.toString().indexOf(number) != -1))
        } catch(error) {
            console.log(number)
            return;
        }
    }

    useEffect(() => {
        const savedPickedNumbers = localStorage.getItem("savedPickedNumbers");

        if (savedPickedNumbers !== null) {
            const parsedNumbers = JSON.parse(savedPickedNumbers);
            setPickedNumbers(parsedNumbers);
            setFilteredNumbers(parsedNumbers)
            setLastPickedNumber(parsedNumbers[parsedNumbers.length - 1]);
        }
        
    }, []);

    useEffect(() => {
        if (isAllNumbersPicked) {
            console.log(pickedNumbers);
        }
    }, [isAllNumbersPicked]);

    return (
        <main className="w-screen min-h-screen overflow-y-scroll flex flex-col justify-center items-center">
            <h1 className="text-4xl font-semibold mb-4">BinGO Game</h1>
            <div className="w-4/5 sm:w-3/5 md:w-1/2 lg:w-2/5 xl:w-1/3 2xl:w-1/4 flex flex-col justify-center items-center text-center gap-7 rounded-md">
                <p className="text-8xl">{lastPickedNumber !== 0 ? lastPickedNumber : ""}</p>
                <div className="w-4/5 sm:w-3/5 md:w-1/2 lg:w-2/5 xl:w-1/3 2xl:w-1/4 flex justify-around">
                    <button onClick={() => resetPickedNumbers()} type="button" className="w-[48%] py-1 px-4 rounded-lg bg-red-500">Reset</button>
                    <button type="button" className="w-[48%] py-1 px-4 rounded-lg bg-green-500 disabled opacity-65 hover:cursor-not-allowed">Scan</button>
                </div>
                
            </div>
            <div className="w-4/5 sm:w-3/5 md:w-1/2 lg:w-2/5 xl:w-1/3 2xl:w-1/4 flex flex-col justify-center items-center gap-7 rounded-md">
                <p className="w-full text-lg mt-3 font-semibold">Previous Numbers</p>
                
                <div className="flex justify-around w-full text-center text-lg h-[43vh] overflow-y-scroll">
                    <div className="w-1/5 flex flex-col items-center gap-2">
                        <div className="w-full font-semibold text-3xl text-red-500">
                            B
                        </div>
                        {
                            filteredNumbers.map((p) => {
                                if (p > 0 && p <= 15) {
                                    return <div className="py-7 w-5/6 bg-[#F2F2F2] text-[#333333] text-2xl rounded-3xl" key={p}>{p}</div>
                                }
                            })
                        }
                    </div>
                    <div className="w-1/5 flex flex-col items-center gap-2">
                        <div className="w-full font-semibold text-3xl text-orange-500">
                            I
                        </div>
                        {filteredNumbers.map((p) => {
                                if (p > 15 && p <=30) {
                                    return <div className="py-7 w-5/6 bg-[#F2F2F2] text-[#333333] text-2xl rounded-3xl" key={p}>{p}</div>
                                }
                            })}
                    </div>
                    <div className="w-1/5 flex flex-col items-center gap-2">
                        <div className="w-full font-semibold text-3xl text-green-500">
                            N
                        </div>
                        {filteredNumbers.map((p) => {
                                if (p > 30 && p <=45) {
                                    return <div className="py-7 w-5/6 bg-[#F2F2F2] text-[#333333] text-2xl rounded-3xl" key={p}>{p}</div>
                                }
                            })}
                    </div>
                    <div className="w-1/5 flex flex-col items-center gap-2">
                        <div className="w-full font-semibold text-3xl text-blue-500">
                            G
                        </div>
                        {filteredNumbers.map((p) => {
                                if (p > 45 && p <=60) {
                                    return <div className="py-7 w-5/6 bg-[#F2F2F2] text-[#333333] text-2xl rounded-3xl" key={p}>{p}</div>
                                }
                            })}
                    </div>
                    <div className="w-1/5 flex flex-col items-center gap-2">
                        <div className="w-full font-semibold text-3xl text-purple-500">
                            O
                        </div>
                        {filteredNumbers.map((p) => {
                                if (p > 60 && p <=75) {
                                    return <div className="py-7 w-5/6 bg-[#F2F2F2] text-[#333333] text-2xl rounded-3xl" key={p}>{p}</div>
                                }
                            })}
                    </div>
                </div>
                <div className="w-full flex flex-col items-center justify-center gap-2">
                    <button onReset={() => console.log("Resetted")} onClick={() => pickNumber()} className={"w-full bg-blue-500 text-[#F2F2F2] font-medium py-1 px-4 rounded-xl" + (isAllNumbersPicked ? 'opacity-60 hover:cursor-not-allowed rounded-xl' : '')}>New Number</button>
                    {
                        isAllNumbersPicked ? (
                            <p className="px-2 py-1 bg-yellow-500 rounded-lg flex gap-1">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
                                </svg>
                                All numbers picked!
                            </p>
                        ) : <></>
                    }
                    <div className="w-full flex justify-around">
                    <input placeholder="Search number" onChange={(event) => searchNumber(event.target.value)} className="w-full px-4 py-1 text-[#333333] rounded-lg" type="number" />
                </div>
                </div>
            </div>
        </main>
    )
}