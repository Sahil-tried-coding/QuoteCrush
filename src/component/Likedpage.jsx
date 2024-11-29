import { useState } from "react";
import { FaRegHeart } from "react-icons/fa6";

function Likedpage({ likedSectionToggle, showLiked, savedQuotes, setSavedQuotes }) {
  const [quoteAtLeft, setQuoteAtLeft] = useState(
    "I attribute my success to this: I never gave or took any excuse."
  );

  // Display selected quote on the left side
  const quoteAtLeftSide = (item) => {
    setQuoteAtLeft(item);
  };

  // Remove the selected quote
  const removeQuote = (quoteToRemove) => {
    // Get quotes from localStorage
    const quotesFromStorage = JSON.parse(localStorage.getItem("likedQuotes")) || [];
    
    // Filter out the quote to remove
    const updatedQuotes = quotesFromStorage.filter((quote) => quote !== quoteToRemove);
    
    // Update localStorage with the new quotes list
    localStorage.setItem("likedQuotes", JSON.stringify(updatedQuotes));
    
    // Update the savedQuotes state
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
          className="z-10 text-red-600 font-bold text-4xl absolute top-9 left-9 cursor-pointer "
        />
        {showLiked ? (
          <div>
            {/* Liked Quotes List */}
            <div className="z-10 overflow-y-scroll h-[100vh] w-[50vw] absolute top-0 right-0 backdrop-blur-3xl bg-custom-gradient transition-all duration-300 ease-out">
              {savedQuotes.map((item, index) => (
                <div
                  key={index}
                  onClick={() => quoteAtLeftSide(item)}
                  className="cursor-pointer border-b-2 border-black p-2 rounded-md  hover:bg-black hover:text-white"
                >
                  {item}
                </div>
              ))}
            </div>

            {/* Quote Display and Remove Button */}
            <div className="h-screen w-[50vw] absolute top-0 left-0 flex flex-col items-center justify-center">
              <div className="bg-white text-xl max-w-max backdrop-blur-lg mx-8 max-h-max p-3 font-semibold">
                {quoteAtLeft}
              </div>
              <button
                onClick={() => removeQuote(quoteAtLeft)}
                className="bg-red-700 mt-[6rem] px-6 py-2 text-white font-semibold"
              >
                Remove
              </button>
            </div>
          </div>
        ) : (
          <div></div>
        )}
      </div>
    </div>
  );
}

export default Likedpage;
