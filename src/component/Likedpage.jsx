import { useState } from "react";
import { FaRegHeart } from "react-icons/fa6";

function Likedpage({ likedSectionToggle, showLiked, savedQuotes, setSavedQuotes }) {
  const [quoteAtLeft, setQuoteAtLeft] = useState("No quote selected!");

  // Display selected quote on the left side
  const quoteAtLeftSide = (item) => {
    setQuoteAtLeft(item);
  };

  // Remove the selected quote
  const removeQuote = (quoteToRemove) => {
    const quotesFromStorage = JSON.parse(localStorage.getItem("likedQuotes")) || [];
    const updatedQuotes = quotesFromStorage.filter(
      (quote) => quote.toLowerCase() !== quoteToRemove.toLowerCase()
    );

    localStorage.setItem("likedQuotes", JSON.stringify(updatedQuotes));
    setSavedQuotes(updatedQuotes);

    // Reset the left-side quote if it was removed
    if (quoteToRemove === quoteAtLeft) {
      setQuoteAtLeft("No quote selected!");
    }
  };

  return (
    <div>
      <div>
        {/* Toggle Liked Section */}
        <FaRegHeart
          onClick={likedSectionToggle}
          className="text-red-600 z-10 text-4xl absolute top-9 left-9 cursor-pointer sm:text-4xl sm:top-9 sm:left-9"
        />
        {showLiked && (
          <div>
            {/* Liked Quotes List */}
            <div className="z-10 overflow-y-scroll sm:overflow-y-scroll max-h-[50%] w-full absolute bottom-0 backdrop-blur-3xl bg-custom-gradient transition-all duration-300 ease-out sm:min-h-[100vh] sm:w-[50vw] sm:top-0 sm:right-0 ">
              {savedQuotes.map((item, index) => (
                <div
                  key={index}
                  onClick={() => quoteAtLeftSide(item)}
                  className="cursor-pointer  border-b-2 border-black p-2  hover:bg-black hover:text-white"
                >
                  {item}
                </div>
              ))}
            </div>

            {/* Quote Display and Remove Button */}
            <div className="max-h-[50%] l w-full absolute top-[8.2rem] flex flex-col items-center justify-center sm:h-screen sm:w-[50vw] sm:top-0 sm:left-0 sm:mt-[12rem]">
              <div className="bg-white text-xl max-w-max backdrop-blur-lg mx-8 p-3 font-semibold">
                {quoteAtLeft}
              </div>
              {/* {quoteAtLeft !== "No quote selected!" && (
                <button
                  onClick={() => removeQuote(quoteAtLeft)}
                  className="bg-red-700 mt-[2rem] px-6 font-semibold text-white py-2 sm:mt-[6rem]"
                >
                  Remove
                </button>
              )} */}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Likedpage;
