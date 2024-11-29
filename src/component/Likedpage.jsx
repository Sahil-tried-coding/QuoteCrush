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
          className="text-red-600 z-10 text-4xl absolute
top-9
left-9
cursor-pointer sm:z-10 sm:text-red-600 sm:font-bold sm:text-4xl sm:absolute sm:top-9 sm:left-9 sm:cursor-pointer"
        />
        {showLiked ? (
          <div>
            {/* Liked Quotes List */}
            <div className="z-10 overflow-y-scroll min-h-[50%] w-full absolute bottom-0 backdrop-blur-3xl
bg-custom-gradient
transition-all
duration-300
ease-out sm:z-10 sm:overflow-y-scroll sm:h-[100vh] sm:w-[50vw] sm:absolute sm:top-0 sm:right-0 sm:backdrop-blur-3xl sm:bg-custom-gradient sm:transition-all sm:duration-300 sm:ease-out">
              {savedQuotes.map((item, index) => (
                <div
                  key={index}
                  onClick={() => quoteAtLeftSide(item)}
                  className="sm:cursor-pointer sm:border-b-2 sm:border-black sm:p-2 sm:rounded-md sm:hover:bg-black sm:hover:text-white cursor-pointer
border-b-2
order-black
p-2
rounded-md
hover:bg-black
hover:text-white"
                >
                  {item}
                </div>
              ))}
            </div>

            {/* Quote Display and Remove Button */}
            <div className="max-h-[50%] w-full absolute top-[8.2rem]  flex flex-col items-center justify-center sm:h-screen sm:w-[50vw] sm:absolute sm:top-0 sm:left-0 sm:flex sm:flex-col sm:items-center sm:justify-center sm:mt-[12rem]">
              <div className=" bg-white text-xl max-w-max backdrop-blur-lg
mx-8
max-h-max
p-3
font-semibold sm:bg-white sm:text-xl sm:max-w-max sm:backdrop-blur-lg sm:mx-8 sm:max-h-max sm:p-3 sm:font-semibold">
                {quoteAtLeft}
              </div>
              <button
                onClick={() => removeQuote(quoteAtLeft)}
                className="bg-red-700 mt-[2rem] px-6 font-semibold text-white py-2 sm:bg-red-700 sm:mt-[6rem] sm:px-6 sm:py-2 sm:text-white sm:font-semibold"
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
