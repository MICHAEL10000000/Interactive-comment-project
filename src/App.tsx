import { useState, useEffect, Key, SetStateAction } from "react";
import reactLogo from "./assets/react.svg";
import Comment from "./comment";
import "./App.css";
import data from "./data.json";
import Post from "./Post";
import amyrobson from "./images/avatars/image-amyrobson.png";
import maxblagun from "./images/avatars/image-maxblagun.png";
import ramsesmiron from "./images/avatars/image-ramsesmiron.png";
import juliusomo from "./images/avatars/image-juliusomo.png";
/* Have a plan when coding */

let content, createdAt, user, username;

function App() {
  /* clear */
  const [datacount, setdatacount] = useState(0);
  const [deleteElement, setdeleteElement] = useState<any[]>([]);
  const [commentImages, setcommentImages] = useState([amyrobson, maxblagun]);
  /* localStorage.clear(); */
  /*  localStorage.setItem("data", JSON.stringify(data)); */
  const [importedData, setimportedData] = useState(() => {
    const dataObjects: any = localStorage.getItem("data");
    if (dataObjects) {
      /*  console.log("returned"); */
      return JSON.parse(dataObjects);
    } else {
      return data;
    }
  });

  const [replyImage, setreplyImage] = useState([ramsesmiron, juliusomo]);
  const [number, setNumber] = useState({});
  const [score, setScore] = useState({});
  const [clickedReplyIndex, setclickedReplyIndex] = useState(0);
  const [replyElement, setreplyElement] = useState();
  const allowNewPost = (index: number) => {
    const comment = document.querySelectorAll(".comment");
    comment[index]?.classList.toggle("hidden");
    comment[index]?.classList.toggle("flex");
    /*    console.log("allowednewpost", comment, index); */
  };

  const sendNewPost = () => {
    const newPost: any = document.querySelector(".newpost");
    const postObject: any = {
      id: 3,
      content: newPost.value,
      createdAt: "1 month ago",
      score: 0,
      user: {
        image: {
          png: "./images/avatars/image-juliusomo.png",
          webp: "./images/avatars/image-juliusomo.webp",
        },
        username: "juliusomo",
      },
      replies: [],
    };
    const updatingImportedData = { ...importedData };
    updatingImportedData.comments.push(postObject);
    const updateCommentImage = [...commentImages, juliusomo];
    setcommentImages(updateCommentImage);
    setimportedData(updatingImportedData);
    console.log(updatingImportedData);
    localStorage.setItem("data", JSON.stringify(updatingImportedData));
    /* const updatingImportedData = { ...importedData, postObject }; */
    /* console.log(commentImages); */

    /* console.log(newPost.value);
    console.log(data.comments); */
    /* const postValue = newPost.value */
  };

  function deletePost() {
    seteditCount(0);
    console.log("hi", deleteElement[0]);
    const updateImportedData = { ...importedData };
    updateImportedData.comments.forEach((item: { replies: any[] }) => {
      if (item.replies.includes(deleteElement[0])) {
        let elementIndex = item.replies.indexOf(deleteElement[0]);
        item.replies.splice(elementIndex, 1);
      } else if (item === deleteElement[0]) {
        let elementindex = updateImportedData.comments.indexOf(
          deleteElement[0]
        );
        updateImportedData.comments.splice(elementindex, 1);
      }
      setimportedData(updateImportedData);
      localStorage.setItem("data", JSON.stringify(updateImportedData));

      const deleteComment = document.querySelector(".deleteComment");
      deleteComment?.classList.remove("flex");
      deleteComment?.classList.add("hidden");
    });
  }
  const [editingPostValue, seteditingPostValue] = useState("2");

  /* To allow immediate delete of post to be edited */
  const [editCount, seteditCount] = useState(0);

  function editPost(item: { content: SetStateAction<string> }, index: any) {
    seteditCount(1);
    console.log(editCount);
    setdeleteElement([item, index]);
    seteditingPostValue(item.content);
    console.log(editingPostValue, deleteElement);
    console.log(item.content, index);

    document.querySelector(".main-edit")?.classList.remove("hidden");
    document.querySelector(".main-edit")?.classList.add("block");
  }

  useEffect(() => {
    if (editCount > 0) {
      deletePost();
    }
  }, [deleteElement]);

  const sendReply = (index: number) => {
    /* console.log("hi"); */
    const updateImportedData = { ...importedData };
    const updateReplyImages = [...replyImage, juliusomo];
    setreplyImage(updateReplyImages);
    const replyText: any = document.querySelectorAll(".replytext");
    /* let a = replyText.forEach((reply: any) => {
      console.log(reply, reply.value);
    }); */
    /* console.log(replyText, replyText.value); */
    const newReply = {
      id: 3,
      content: replyText[index].value,
      createdAt: "1 week ago",
      score: 0,
      replyingTo: "maxblagun",
      user: {
        image: {
          png: "./images/avatars/image-juliusomo.png",
          webp: "./images/avatars/image-juliusomo.webp",
        },
        username: "juliusomo",
      },
    };
    updateImportedData.comments[clickedReplyIndex].replies.push(newReply);
    /*  if (index >= 2) {
      updateImportedData.comments[clickedReplyIndex].replies.push(newReply);
    } */
    /*
     */ /* console.log(updateImportedData, importedData, clickedReplyIndex); */
    setimportedData(updateImportedData);
    const comment = document.querySelectorAll(".comment");
    comment[index]?.classList.remove("flex");
    comment[index]?.classList.add("hidden");
    replyText[index].value = "";
  };
  function sortImporteddata() {
    const importedDataVariable = { ...importedData };
    //Sort Main Posts based on their scores
    importedDataVariable.comments.sort(
      (a: { score: number }, b: { score: number }) => b.score - a.score
    );
    //Sort Post replies based on their scores
    importedDataVariable.comments.forEach(
      (comment: { replies: { score: number }[] }) => {
        /*  console.log(comment); */
        comment.replies.sort(
          (a: { score: number }, b: { score: number }) => b.score - a.score
        );
      }
    );
    localStorage.setItem("data", JSON.stringify(importedDataVariable));
    setimportedData(importedDataVariable);
    /*   console.log(importedDataVariable); */
  }
  useEffect(() => {
    sortImporteddata();
  }, [datacount]);

  return (
    <div>
      <Comment
        importedData={importedData}
        allowNewPost={allowNewPost}
        setclickedReplyIndex={setclickedReplyIndex}
        setNumber={setNumber}
        setdatacount={setdatacount}
        setdeleteElement={setdeleteElement}
        editPost={editPost}
        sendReply={sendReply}
        setScore={setScore}
        datacount={datacount}
        sendNewPost={sendNewPost}
        deletePost={deletePost}
        editingPostValue={editingPostValue}
        seteditingPostValue={seteditingPostValue}
      />
    </div>
  );
}

//Do sth in the useffect that will make the data refresh on every changes
//commenting
/* DELETE FUNCTION, EDIT FUNCTION --  to be worked on */

export default App;
