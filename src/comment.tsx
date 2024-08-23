import "./App.css";
import data from "./data.json";
import Post from "./Post";
import amyrobson from "./images/avatars/image-amyrobson.png";
import maxblagun from "./images/avatars/image-maxblagun.png";
import ramsesmiron from "./images/avatars/image-ramsesmiron.png";
import juliusomo from "./images/avatars/image-juliusomo.png";
import { Key, MouseEventHandler } from "react";
import plus from "./images/icon-plus.svg";
import minus from "./images/icon-minus.svg";

function Comment(props: {
  seteditingPostValue: (arg0: any) => void;
  importedData: {
    comments: {
      user: { image: any; username: any };
      createdAt: any;
      content: any;
      score: any;
      image: any;
      replies: any[];
    }[];
  };
  allowNewPost: (arg0: number) => void;
  setclickedReplyIndex: (arg0: any) => void;
  setNumber: (arg0: any) => void;
  setdatacount: (arg0: number) => void;
  datacount: number;
  setdeleteElement: (arg0: any[]) => void;
  editPost: (
    arg0: {
      user: { image: any; username: any };
      createdAt: any;
      content: any;
      score: any;
      image: any;
      replies: any[];
    },
    arg1: any
  ) => void;
  sendReply: (arg0: any) => void;
  setScore: (arg0: any) => void;
  deletePost: any;
  editingPostValue: string | number | readonly string[];
  sendNewPost: any;
}) {
  function handleEditUpdate(event: { target: { value: any } }) {
    props.seteditingPostValue(event.target.value);
  }

  return (
    <div className="App md:px-32 xl:px-80 bg-SCLightgray py-6 px-5 ">
      {/* Visible on loaded */}
      <div className="flex flex-col gap-4">
        {props.importedData.comments.map(
          (
            item: {
              user: {
                image: any;
                username: any;
              };
              createdAt: any;
              content: any;
              score: any;
              image: any;
              replies: any[];
            },
            index: Key | any | undefined
          ) => (
            <div key={index}>
              {/* Main post */}
              <Post
                name={item.user.username}
                ImageSrc={item.user.image.png}
                timeline={item.createdAt}
                post={item.content}
                number={item.score}
                allowNewPost={() => {
                  props.allowNewPost(index);
                  props.setclickedReplyIndex(index);
                }}
                increase={() => {
                  props.setNumber(item.score);
                  item.score++;
                  props.setdatacount(props.datacount + 1);
                }}
                decrease={() => {
                  props.setNumber(item.score);
                  item.score -= 1;
                  props.setdatacount(props.datacount - 1);
                }}
                deletePost={() => {
                  props.setdeleteElement([item, index]);
                  const deleteComment =
                    document.querySelector(".deleteComment");
                  deleteComment?.classList.remove("hidden");
                  deleteComment?.classList.add("flex");
                }}
                editPost={() => {
                  props.editPost(item, index);
                }}
              />
              {/* TO pop up on every clicking on reply to post */}
              {item.user.username != "juliusomo" && (
                <div className="comment hidden items-start gap-2 rounded-lg mt-4 bg-SCWhite px-4 py-4">
                  <img src={juliusomo} alt="" className="w-10" />
                  <textarea
                    placeholder="Add a comment..."
                    className="h-14 replytext rounded-md px-2 py-1 border-SCModerateblue border w-full"
                  ></textarea>
                  <button
                    onClick={() => {
                      props.sendReply(index);
                    }}
                    className=" text-SCWhite bg-SCModerateblue font-Rubik-V font-medium px-2 text-sm py-1 rounded-md"
                  >
                    REPLY
                  </button>
                </div>
              )}
              {/* Replies to the post  and editing of post*/}
              {item.replies.length > 0 && (
                <div className=" mt-4 lg:ml-8 lg:pl-7 pl-4 border-l border-SCGrayishBlue flex flex-col gap-4">
                  {item.replies.map((element, eindex) => (
                    <div key={eindex} className="">
                      <Post
                        name={element.user.username}
                        ImageSrc={element.user.image.png}
                        timeline={element.createdAt}
                        post={element.content}
                        number={element.score}
                        allowNewPost={() => {
                          props.allowNewPost(eindex + 2);
                          props.setclickedReplyIndex(index);
                        }}
                        increase={() => {
                          props.setScore(element.score);
                          element.score++;
                          props.setdatacount(props.datacount + 1);
                        }}
                        decrease={() => {
                          props.setScore(element.score);
                          element.score -= 1;
                          props.setdatacount(props.datacount - 1);
                        }}
                        deletePost={() => {
                          props.setdeleteElement([element, eindex]);
                          const deleteComment =
                            document.querySelector(".deleteComment");
                          deleteComment?.classList.remove("hidden");
                          deleteComment?.classList.add("flex");
                        }}
                        editPost={() => {
                          props.editPost(element, eindex);
                          props.deletePost();
                        }}
                      />
                      {/* TO allow new post be added to replies */}
                      {element.user.username != "juliusomo" && (
                        <div className="comment hidden items-start gap-2 rounded-lg mt-4 bg-SCWhite px-4 py-4">
                          <img src={juliusomo} alt="" className="w-10" />
                          <textarea
                            placeholder="Add a comment..."
                            className="replytext h-14 rounded-md px-2 py-1 border-SCModerateblue border w-full"
                          ></textarea>
                          <button
                            onClick={() => {
                              props.sendReply(
                                eindex + props.importedData.comments.length
                              );
                            }}
                            className=" text-SCWhite bg-SCModerateblue font-Rubik-V font-medium px-2 text-sm py-1 rounded-md"
                          >
                            REPLY
                          </button>
                        </div>
                      )}
                    </div>
                  ))}
                  {/* To edit post */}
                  <div className="hidden editing  items-start gap-2 rounded-lg bg-SCWhite px-4 py-4">
                    <div className="flex gap-2 items-start">
                      <img src={juliusomo} alt="" className="w-10" />
                      <textarea className="h-14 replytext rounded-md px-2 py-1 border-SCModerateblue border w-full"></textarea>
                      <button
                        onClick={() => {
                          props.sendReply(index);
                        }}
                        className=" text-SCWhite bg-SCModerateblue font-Rubik-V font-medium px-2 text-sm py-1 rounded-md"
                      >
                        UPDATE
                      </button>
                    </div>
                    <div className="flex items-center justify-between mt-4">
                      <div className="count flex  justify-center w-28 items-center gap-4 bg-SCLightgray text-SCModerateblue font-Rubik-B px-4 py-2 rounded-xl">
                        <img src={plus} alt="" />
                        <p className="score">1</p>
                        <img src={minus} alt="" />
                      </div>
                      <div className="replyoptions flex gap-4">
                        <div className="flex items-center gap-2">
                          <img
                            src="./images/icon-delete.svg"
                            alt="deleteIcon"
                          />
                          <p className=" text-SCSoftRed">Delete</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <img src="./images/icon-edit.svg" alt="editIcon" />
                          <p className=" text-SCModerateblue">Edit</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )
        )}
        {/* To edit main post */}
        <div className=" main-edit hidden items-start gap-2 rounded-lg bg-SCWhite px-4 py-4">
          <div className="flex gap-2 items-start">
            <img src={juliusomo} alt="" className="w-10" />
            <textarea
              value={props.editingPostValue}
              onChange={handleEditUpdate}
              className="h-14 replytext rounded-md px-2 py-1 border-SCModerateblue border w-full"
            ></textarea>
            <button
              onClick={() => {
                props.sendNewPost();
                document.querySelector(".main-edit")?.classList.add("hidden");
                document.querySelector(".main-edit")?.classList.remove("block");
              }}
              className=" text-SCWhite bg-SCModerateblue font-Rubik-V font-medium px-2 text-sm py-1 rounded-md"
            >
              UPDATE
            </button>
          </div>
          <div className="flex items-center justify-between mt-4">
            <div className="count flex  justify-center w-28 items-center gap-4 bg-SCLightgray text-SCModerateblue font-Rubik-B px-4 py-2 rounded-xl">
              <img src={plus} alt="" />
              <p className="score">1</p>
              <img src={minus} alt="" />
            </div>
            <div className="replyoptions flex gap-4">
              <div className="flex items-center gap-2">
                <img src="./images/icon-delete.svg" alt="deleteIcon" />
                <p className=" text-SCSoftRed">Delete</p>
              </div>
              <div className="flex items-center gap-2">
                <img src="./images/icon-edit.svg" alt="editIcon" />
                <p className=" text-SCModerateblue">Edit</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* To add a new main post */}
      <div className="px-4 bg-white mt-4 rounded-md py-4">
        <textarea
          placeholder="Add a comment..."
          className="newpost w-full border border-SCLightgrayishblue pt-2 pb-6 px-2 rounded-lg"
        ></textarea>
        <div className="flex justify-between mt-3 ">
          <img src={juliusomo} alt="" className="w-10" />
          <button
            onClick={props.sendNewPost}
            className=" bg-SCModerateblue text-white px-6 py-2 rounded-lg"
          >
            SEND
          </button>
        </div>
      </div>
      {/* To confirm post deletion */}
      <div className=" deleteComment bg-SCSDarkblue hidden items-center justify-center bg-sc fixed top-0 left-0 h-screen w-full">
        <div className=" bg-SCWhite py-6 px-6  mx-4 rounded-lg">
          <h1 className=" font-Rubik-B text-xl mb-2">Delete comment</h1>
          <p className=" font-Rubik-R text-SCGrayishBlue text-lg">
            Are you sure you want to delete this comment? This will remove the
            comment and can't be undone
          </p>
          <div className="flex gap-3 mt-2">
            <p
              onClick={() => {
                const deleteComment = document.querySelector(".deleteComment");
                deleteComment?.classList.add("hidden");
                deleteComment?.classList.remove("flex");
              }}
              className="  rounded-lg font-Rubik-V font-medium text-white bg-SCDarkblue py-4 px-4 text-center"
            >
              NO, CANCEL
            </p>
            <p
              className=" rounded-lg font-Rubik-V font-medium text-white bg-SCSoftRed py-4 px-4 text-center"
              onClick={props.deletePost}
            >
              YES, DELETE
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Comment;

/* SO basically for the edit side
I want on clicking on edit the reply is deleted and a box pops up below the whole replies and the user
is taking to that box immediately
The box will contain what the user previously has typed and allow more text to be added
and even his score
It will also contain a button to delete and edit post
ON clicking the delete it will delete that box and clicking the edit nothing willl happen
on clicking update it will update it will send the post as  a reply  */
