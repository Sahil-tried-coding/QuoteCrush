import { useEffect, useState } from "react";
import { FaRegCopy } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa6";
import img from "../assets/1729449055_twitter-logo-square shape-png.png";
import { FaHeart } from "react-icons/fa";
// import { FaHeart } from "react-icons/fa6";
import Likedpage from "./Likedpage";
function Homepage() {
  const [Qoute, setQoute] = useState(null);
  const [Author, setAuthor] = useState();
  const [liked, setLiked] = useState(false);
  const [copiedText, setCopiedText] = useState(false);
  const [bigLike, setBigLike] = useState(false);
  const [savedQuotes, setSavedQuotes] = useState([]);
  const [showLiked, setShowLiked] = useState(false);

  // savedQuotes.
  const qouteFetch = async () => {
    const data = await fetch("https://quotes-api-self.vercel.app/quote");
    const respones = await data.json();
    setAuthor(respones.author);
    setQoute(respones.quote);
    setLiked(false);
  };

  useEffect(() => {
    qouteFetch();
  }, []);

  useEffect(() => {
    const savedQutoesLocal = localStorage.getItem("likedQuotes");

    if (savedQutoesLocal) {
      setSavedQuotes(JSON.parse(savedQutoesLocal));
    }
  }, []);

  // ye function se big like toggle hota hai ❤️
  const likeToggle = () => {
    setLiked(!liked);
    if (!liked) {
      setBigLike(true);
    }
    setTimeout(() => setBigLike(false), 2000);
  };

  // ye function se quote copy hota hai

  const copyToClipboard = () => {
    try {
      navigator.clipboard.writeText(Qoute).then(() => {
        setCopiedText(true);
        setTimeout(() => setCopiedText(false), 2000);
      });
      // .catch(()=>console.log(error))
    } catch (error) {
      console.log(error);
    }
  };

  // ye function se hum like toggle karte hai
  const likedSectionToggle = () => {
    if (!showLiked) {
      setShowLiked(true);
    } else if (showLiked) {
      setShowLiked(false);
    } else {
      console.log("hey");
    }
  };

  // ${showLiked?"blur-lg":""}

  const likedQuotes = (quote) => {
    if (!savedQuotes.includes(quote)) {
      const updatedQuotes = [...savedQuotes, quote];
      setSavedQuotes(updatedQuotes);
      localStorage.setItem("likedQuotes", JSON.stringify(updatedQuotes));
    }

    // console.log(savedQuotes)
  };
  return (
    <div
      className={`w-screen h-screen overflow-y-hidden bg-black  sm:z-0 sm:relative sm:w-[100vw] sm:h-[100vh] sm:bg-black`}
    >
      <div
        className={`${
          showLiked ? "blur-lg sm:blur-lg" : ""
        } sm:z-0 sm:w-[100vw] sm:h-[100vh] sm:flex sm:flex-col sm:justify-center sm:items-center sm:text-white w-full h-full text-white flex flex-col items-center justify-center`}
      >
        <div className="sm:flex-col sm:mx-auto flex-col mx-auto">
          <div className="sm:flex sm:items-center sm:gap-4 gap-4 flex flex-col sm:flex-row items-center">
            <div
              className="sm:font-semibold sm:text-lg sm:max-h-max sm:min-w-[60%] sm:max-w-[80%] sm:border-2 sm:border-purple-600 sm:mx-auto sm:text-white sm:py-8 sm:px-7 
            font-semibold text-lg max-h-max border-2 border-purple-600 text-white py-8 px-7"
            >
              <div>{Qoute}</div>
            </div>
            {liked ? (
              <FaHeart
                onClick={() => {
                  likedQuotes(Qoute), likeToggle();
                }}
                className="sm:text-3xl sm:cursor-pointer sm:text-red-500 text-5xl
                text-red-500 cursor-pointer"
              />
            ) : (
              <FaRegHeart
                onClick={likeToggle}
                className="sm:text-3xl sm:cursor-pointer text-start  text-5xl 
                 cursor-pointer "
              />
            )}
            <div className="  sm:flex sm:items-center sm:gap-3 flex items-center  gap-3">
              <FaRegCopy
                onClick={copyToClipboard}
                className="hidden sm:block  sm:text-3xl sm:cursor-pointer text-3xl cursor-pointer  "
              />
              {copiedText && (
                <span className="hidden sm:block sm:text-white sm:font-semibold sm:rounded-2xl sm:p-3 sm:bg-purple-800 text-white font-semibold bg-purple-800 p-3 ">
                  Copied to clipboard!
                </span>
              )}
            </div>
          </div>

          <div className="sm:underline sm:decoration-purple-800 sm:decoration-2 sm:text-end sm:mx-auto sm:text-white sm:py-8 sm:px-7 underline decoration-purple-800 text-end decoration-2 py-8 px-7 ">
            <div>~ {Author}</div>
          </div>
        </div>
        <div className="sm:flex sm:justify-between sm:gap-4 flex justify-between gap-4">
          <button
            onClick={qouteFetch}
            className="w-[200px] h-[60px] rounded-2xl p-2 bg-purple-600 sm:rounded-2xl sm:w-[250px] sm:p-2 sm:border-2 sm:border-dashed sm:border-white sm:bg-purple-500 sm:px-6 sm:py-3 sm:font-semibold sm:uppercase sm:text-white sm:transition-all sm:duration-300 sm:hover:translate-x-[-4px] sm:hover:translate-y-[-4px] sm:hover:rounded-md sm:hover:shadow-[4px_4px_0px_black] sm:active:translate-x-[0px] sm:active:translate-y-[0px] sm:active:rounded-2xl sm:active:shadow-none ml-3
           "
          >
            Next Quote
          </button>
          <button
            className="sm:font-semibold sm:border-purple-600 sm:justify-center sm:gap-3 sm:flex sm:flex-row sm:p-2 sm:border-2 sm:bg-white sm:text-black sm:w-[250px] h-[50px] w-[200px] text-black bg-white font-semibold 
border-purple-600 
justify-center 
gap-3 
flex 
flex-row 
p-1 
border-2 items-center"
          >
            Share on
            <img
              className="sm:h-[30px] sm:w-[30px] w-[30px] h-[30px] "
              src={img}
              alt=""
            />
          </button>
          {bigLike && (
            <FaHeart className="text-white text-9xl absolute animate-pulse top-[40%] left-[40%] sm:text-white sm:text-9xl sm:absolute sm:animate-pulse sm:top-[40%] sm:left-[50%]" />
          )}
        </div>
      </div>
      <Likedpage
        setSavedQuotes={setSavedQuotes}
        likedSectionToggle={likedSectionToggle}
        showLiked={showLiked}
        savedQuotes={savedQuotes}
      />
    </div>
  );
}

export default Homepage;
