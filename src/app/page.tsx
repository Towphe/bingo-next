
export default function Home() {

  return (
    <main className="w-screen h-screen flex flex-col justify-center items-center gap-4">
        <h1 className="text-6xl">BinGO</h1>
        <p className="w-4/5 text-center">Easy and convenient Bingo with friends and family without having to buy cards</p>
        <div className="flex flex-col gap-2 w-3/5 sm:w-2/5 md:w-1/3 lg:w-1/4 xl:w-1/6">
          <a href="/card" className="text-center bg-blue-600 px-4 py-2 rounded-xl w-full hover:opacity-90">
            Create Card
          </a>
          <a href="/game" className="text-center bg-green-600 px-4 py-2 rounded-xl w-full hover:opacity-90">
            Start Game
          </a>
        </div>
    </main>
  );
}
