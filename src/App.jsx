import { useState } from "react";
import { BsFillPauseFill, BsFillDice5Fill } from "react-icons/bs";
import axios from "axios";
import { debounce } from "lodash";
import { TransitionGroup, CSSTransition } from "react-transition-group";

import "./App.css";

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState(null);
  const getAdivce = debounce(() => {
    axios
      .get("https://api.adviceslip.com/advice")
      .then((response) => {
        setData(response.data.slip);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      });
  }, 1000);

  return (
    <div className="bg-[#313a49] relative w-full sm:w-[25rem] shadow-2xl p-5 rounded-xl text-center">
      <p className="text-[#5cc69b] font-medium text-[12px] tracking-widest">
        ADVICE #{data?.id}
      </p>
      {data ? (
        <TransitionGroup>
          <CSSTransition key={data?.id} classNames="fade" timeout={200}>
            <p className="text-[#cee2eb] px-2 font-medium text-xl sm:text-2xl mt-5">
              “{data?.advice}”
            </p>
          </CSSTransition>
        </TransitionGroup>
      ) : (
        <p className="text-[#cee2eb] px-2 font-medium text-2xl mt-5">
          Press the button below
        </p>
      )}

      <div className="text-[#cee2eb] flex gap-2 items-center text-2xl mt-5 mb-5 mx-2">
        <div className="flex-1 border-t-[1px] border-[#4b5563]"></div>
        <BsFillPauseFill />
        <div className="flex-1 border-t-[1px] border-[#4b5563]"></div>
      </div>
      <div className="flex justify-center">
        <button
          onClick={() => {
            setIsLoading(true);
            getAdivce();
          }}
          disabled={isLoading}
          className={`absolute text-[#103031] bg-[#5cc69b] p-4 rounded-full ${
            isLoading ? " brightness-75" : ""
          }`}
        >
          {isLoading ? (
            <div role="status">
              <svg
                aria-hidden="true"
                className="w-4 h-4 text-[#5cc69b] animate-spin dark:text-[#5cc69b] fill-[#103031]"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="currentColor"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentFill"
                />
              </svg>
            </div>
          ) : (
            <BsFillDice5Fill />
          )}
        </button>
      </div>
    </div>
  );
}

export default App;
