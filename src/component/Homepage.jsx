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

  useEffect(()=>{
    const savedQutoesLocal = localStorage.getItem("likedQuotes")

    if(savedQutoesLocal){
      setSavedQuotes(JSON.parse(savedQutoesLocal))
    }
  },[])


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

    if(!savedQuotes.includes(quote)){
      const updatedQuotes = [...savedQuotes,quote]
      setSavedQuotes(updatedQuotes)
      localStorage.setItem("likedQuotes",JSON.stringify(updatedQuotes))
    }


    // console.log(savedQuotes)
  }
  return (
    <div className={`z-0   relative w-[100vw] h-[100vh] bg-black`}>
      <div
        className={` ${
          showLiked ? "blur-lg" : ""
        } z-0 w-[100vw] h-[100vh] flex flex-col justify-center items-center text-white `}
      >
        <div className="flex-col mx-auto">
          <div className="flex items-center gap-4">
            <div className="font-semibold  text-lg max-h-max min-w-[60%] max-w-[80%] border-2 border-purple-600 mx-auto text-white py-8 px-7">
              <div>{Qoute}</div>
            </div>
            {/* likeToggle */}
            {liked ? (
              <FaHeart
                onClick={likedQuotes(Qoute)}
                className="text-3xl cursor-pointer text-red-500"
              />
            ) : (
              <FaRegHeart
                onClick={likeToggle}
                className="text-3xl cursor-pointer"
              />
            )}
            {/* absolute bottom-[66%] left-[70%] */}
            <div className="flex items-center gap-3 ">
              <FaRegCopy
                onClick={copyToClipboard}
                className="   text-3xl cursor-pointer"
              />
              {copiedText && (
                <span className="text-white font-semibold rounded-2xl p-3 bg-purple-800 ">
                  Copied to clipboard!
                </span>
              )}
            </div>
          </div>

          <div className="  underline decoration-purple-800 decoration-2 text-end  mx-auto text-white py-8 px-7">
            <div>~ {Author}</div>
          </div>
        </div>
        <div className="flex justify-between gap-4">
          <button
            onClick={qouteFetch}
            
 className="rounded-2xl w-[250px] p-2 border-2 border-dashed border-white bg-purple-500 px-6 py-3 font-semibold uppercase text-white transition-all duration-300 hover:translate-x-[-4px] hover:translate-y-[-4px] hover:rounded-md hover:shadow-[4px_4px_0px_black] active:translate-x-[0px] active:translate-y-[0px] active:rounded-2xl active:shadow-none"
            // className="font-semibold p-2 border-2 bg-purple-500 w-[250px]"
          >
            Next Quote
          </button>
          <button className="font-semibold border-purple-600 justify-center gap-3 flex flex-row p-2 border-2 bg-white text-black  w-[250px]">
            Share on
            <img className="h-[30px] w-[30px] " src={img} alt="" />
          </button>
          {bigLike && (
            <FaHeart className="text-white text-9xl absolute animate-pulse top-[40%] left-[50%] " />
          )}
        </div>
      </div>
      <Likedpage setSavedQuotes={setSavedQuotes} likedSectionToggle={likedSectionToggle} showLiked={showLiked} savedQuotes={savedQuotes}/>
    </div>
  );
}

export default Homepage;
