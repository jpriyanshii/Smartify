import MindMaze from "./MindMaze";
import CarbonFreeJourney from "./Game";

function App() {
  return (
    <div>
      <nav className="bg-sky-300 pl-10 py-3 dark:text-white flex justify-center w-screen list-none m-0 p-0">
        <a
          href="#memo"
          className="mx-4 hover:cursor-pointer text-white hover:text-cyan-300 transition duration-300"
        >
          Memory Game
        </a>
        <a
          href="#des"
          className="mx-4 hover:cursor-pointer text-white hover:text-cyan-300 transition duration-300"
        >
          Decision Game
        </a>
      </nav>
      <section id="memo" className="my-12 flex justify-center items-center">
        <MindMaze />
      </section>
      <section id="des" className="my-12 flex justify-center items-center">
        <CarbonFreeJourney />
      </section>
    </div>
  );
}

export default App;