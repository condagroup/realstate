const avgWordsPerMin = 250;
function setReadingTime(text) {
    let count = getWordCount(text);
    let time = Math.ceil(count / avgWordsPerMin);
  
    time = time+ " min read";
    let detail= count + " words read at " + avgWordsPerMin + " words per minute.";

    return {time,detail};
  }
  
  function getWordCount(text) {
    return text.length;
  }


  const categories=[
    {id:1,title:"All"},
    {id:2,title:"Popular Areas"},
    {id:3,title:"Portfolio"},
    {id:4,title:"Agents"},
    {id:5,title:"Market"},
    {id:6,title:"Lifestyle"},
    {id:7,title:"Architecture"},
    {id:8,title:"Company news"}
  ]

  export {setReadingTime,categories}