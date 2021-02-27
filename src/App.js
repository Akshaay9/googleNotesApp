import React, { useState, useEffect } from "react";
import "./app.scss";
import { SketchPicker } from "react-color";
function App() {
  const [bgColor, setbgColor] = useState("#fff");
  const [bgColor2, setbgColor2] = useState("#fff");
  const [showSketchPicker, setShowSketchPicker] = useState(false);
  const [showSketchPicker2, setShowSketchPicker2] = useState(false);
  const [notes, setNotes] = useState([]);
  const [tagValue, setTagValue] = useState("note");
  const [showUpdateModal, setShowUpdateModal] = useState(true)
    ;
  const [updateId,seUpdatetId]=useState()
  const [addNote, setAddNote] = useState({
    title: "",
    text: "",
    backgroundcolor: "#fff",
    tag: "note",
  });

  const [tags, setTags] = useState([
    {
      id: Math.random(),
      text: "note",
    },
    {
      id: Math.random(),
      text: "HTML",
    },
    {
      id: Math.random(),
      text: "CSS",
    },
    {
      id: Math.random(),
      text: "JS",
    },
  ]);
  const changeBGColorHandler = (color) => {
    setbgColor(color);

    setAddNote((ele) => ({
      ...ele,
      backgroundcolor: `${bgColor.hex}`,
    }));
  };
  const [addTag, setAddTag] = useState("");
  const addATag = () => {
    const newTag = tags.filter(
      (ele) => ele.text.toLowerCase() == addTag.toLowerCase()
    );
    if (newTag.length < 1) {
      const newOptionTag = {
        id: Math.random(),
        text: addTag,
      };

      setTags([...tags, newOptionTag]);
    }
  };
  const deleteTag = (id) => {
    setTags((ele) => {
      return [...ele.filter((obj) => obj.id != id)];
    });
  };
  useState(() => {
    
  },[notes])

  const addTodoNotes = () => {
    const newTodo = {
      id: Math.random(),
      title: addNote.title,
      text: addNote.text,
      backgroundcolor: addNote.backgroundcolor,
      tag: addNote.tag,
      pinned: false,
    };
    setNotes([...notes, newTodo]);
    setAddNote((ele) => ({
      ...ele,
      title: "",
      text: "",
      backgroundcolor: "#fff",
      tag: "note",
    }));
  };
  const pinnTheNoteHandler = (id) => {
    setNotes((ele) => [
      ...ele.map((obj) =>
        obj.id == id ? { ...obj, pinned: !obj.pinned } : obj
      ),
    ]);
  };
  const [updateNote, setUpdateNote] = useState({
    title: "",
    text: "",
    backgroundcolor: "",
    tag: "",
  });
  const updatedNote = (id) => {
    seUpdatetId(id)
    setShowUpdateModal(false);
    const updatedData = notes.find((ele) => ele.id == id);
    setUpdateNote((ele) => ({
      ...ele,
      title: updatedData.title,
      text: updatedData.text,
      backgroundcolor: updatedData.backgroundcolor,
      tag: updatedData.tag,
    }));
  };
  const changeBGColorHandler2 = (color) => {
    setbgColor2(color);
    setUpdateNote((ele) => ({
      ...ele,
      backgroundcolor: `${bgColor2.hex}`,
    }));
  };
  const finalUpdateTodo = () => {
    const updatedNewTodo = {
      id: Math.random(),
      title: updateNote.title,
      text: updateNote.text,
      backgroundcolor: updateNote.backgroundcolor,
      tag: updateNote.tag,
      pinned: false,
    };
    setNotes((ele) => [
      ...ele.map((obj) => (obj.id == updateId ? updatedNewTodo : obj)),
    ]);
    seUpdatetId()
    setShowUpdateModal(true)
    
  };
  useEffect(() => {
    const items = JSON.parse(localStorage.getItem('items'));
    if (items) {
      setNotes(items);
    }
  }, []);
  useEffect(() => {
    localStorage.setItem('items', JSON.stringify(notes));
  }, [notes]);
  
  return (
    <>
      <div className="notes">
        <div className="addNote">
          <h2>Add a Note</h2>
          <div
            className="card"
            style={{ backgroundColor: `${addNote.backgroundcolor}` }}
          >
            <label htmlFor="">Enter Title</label>
            <input
              type="text"
              value={addNote.title}
              placeholder="Enter the title of your note"
              onChange={(e) =>
                setAddNote({ ...addNote, title: e.target.value })
              }
            />
            <label htmlFor="">Enter text</label>
            <input
              className="textInput"
              type="text"
              placeholder="Enter the text of your note"
              value={addNote.text}
              onChange={(e) => setAddNote({ ...addNote, text: e.target.value })}
            />
            <h6>
              backGround color :{" "}
              <p
                style={{
                  width: "25px",
                  height: "18px",
                  border: "1px solid black",
                  backgroundColor: `${addNote.backgroundcolor}`,
                }}
                onClick={() => setShowSketchPicker(true)}
              ></p>
              <>
                {showSketchPicker ? (
                  <>
                    {" "}
                    <SketchPicker
                      color={bgColor}
                      onChangeComplete={changeBGColorHandler}
                    />{" "}
                    <i
                      onClick={() => setShowSketchPicker(false)}
                      class="far fa-window-close"
                    ></i>
                  </>
                ) : (
                  ""
                )}
              </>
            </h6>
            <select
              class="form-select"
              aria-label="Default select example"
              value={tagValue.tag}
              onClick={(e) =>
                setAddNote((ele) => ({
                  ...ele,
                  tag: e.target.value,
                }))
              }
            >
              s
              {tags.map((ele) => (
                <option value={ele.text}>{ele.text}</option>
              ))}
            </select>
            <button
              onClick={() => addTodoNotes()}
              type="button"
              disabled={addNote.title == "" || addNote.text == ""}
              class="btn btn-dark"
            >
              Add Todo
            </button>
          </div>
        </div>
        <div className="addTags">
          <h2>Add Tags</h2>
          <div className="card card2">
            <label htmlFor="">Add A Tag</label>
            <input
              type="text"
              placeholder="enter a tag"
              value={addTag}
              onChange={(e) => setAddTag(e.target.value)}
            />
            <button
              className="btn  btn-dark"
              onClick={() => addATag()}
              disabled={addTag == ""}
            >
              Add A tag
            </button>
          </div>
          <div className="deleteTag">
            {tags.map((ele) => (
              <div className="card card3">
                <span>
                  {ele.text}
                  <i
                    class="fas fa-trash-alt"
                    onClick={() => deleteTag(ele.id)}
                  ></i>
                </span>
              </div>
            ))}
          </div>
        </div>
        <div className="addTags">
          <h2>Pinned Notes</h2>
          <div className="pinnedCards">
            {notes.map((ele) =>
              ele.pinned ? (
                <div
                  className="card"
                  style={{ backgroundColor: `${ele.backgroundcolor}` }}
                >
                  <div
                    className="pin"
                    onClick={() => pinnTheNoteHandler(ele.id)}
                  >
                    {ele.pinned ? (
                      <img
                        className="big"
                        src="https://img.icons8.com/ios/50/000000/unpin.png"
                      />
                    ) : (
                      <i class="fas fa-thumbtack"></i>
                    )}
                  </div>
                  <div className="title">
                    <h3>Title:-{ele.title}</h3>
                  </div>
                  <div className="text">
                    {" "}
                    <h5>Text:-{ele.text}</h5>
                  </div>
                  <div className="tags">
                    {" "}
                    <p>Tag:-{ele.tag}</p>
                  </div>
                </div>
              ) : (
                ""
              )
            )}
          </div>
        </div>
      </div>

      <h2>Notes</h2>
      <div className="note">
        {notes.map((ele) => (
          <div
            className="card Note"
            style={{ backgroundColor: `${ele.backgroundcolor}` }}
          >
            <div className="pin" onClick={() => pinnTheNoteHandler(ele.id)}>
              {ele.pinned ? (
                <img src="https://img.icons8.com/ios/50/000000/unpin.png" />
              ) : (
                <i class="fas fa-thumbtack"></i>
              )}
            </div>
            <div className="title">
              <h3>Title:-{ele.title}</h3>
            </div>
            <div className="text">
              <h5>Text:-{ele.text}</h5>
            </div>
            <div className="tags">
              <p>Tag:-{ele.tag}</p>
            </div>
            <button class="btn btn-dark" onClick={() => updatedNote(ele.id)}>
              update Todo
            </button>
          </div>
        ))}
      </div>
      <div className={`updateTodo ${showUpdateModal ? "show" : ""}`}>
        <div className="addNote">
          <h2>Update Todo</h2>
          <div
            className="card"
            style={{ backgroundColor: `${updateNote.backgroundcolor}` }}
          >
            <label htmlFor="">Enter Title</label>
            <input
              type="text"
              value={updateNote.title}
              placeholder="Enter the title of your note"
              onChange={(e) =>
                setUpdateNote({ ...updateNote, title: e.target.value })
              }
            />
            <label htmlFor="">Enter text</label>
            <input
              className="textInput"
              type="text"
              placeholder="Enter the text of your note"
              value={updateNote.text}
              onChange={(e) =>
                setUpdateNote({ ...updateNote, text: e.target.value })
              }
            />
            <h6>
              backGround color :{" "}
              <p
                style={{
                  width: "25px",
                  height: "18px",
                  border: "1px solid black",
                  backgroundColor: `${updateNote.backgroundcolor}`,
                }}
                onClick={() => setShowSketchPicker2(true)}
              ></p>
              <>
                {showSketchPicker2 ? (
                  <>
                    {" "}
                    <SketchPicker
                      color={bgColor2}
                      onChangeComplete={changeBGColorHandler2}
                    />{" "}
                    <i
                      onClick={() => setShowSketchPicker2(false)}
                      class="far fa-window-close"
                    ></i>
                  </>
                ) : (
                  ""
                )}
              </>
            </h6>
            <select
              class="form-select"
              aria-label="Default select example"
              value={tagValue.tag}
              onClick={(e) =>
                setUpdateNote((ele) => ({
                  ...ele,
                  tag: e.target.value,
                }))
              }
            >
              s
              {tags.map((ele) => (
                <option value={ele.text}>{ele.text}</option>
              ))}
            </select>
            <button
              type="button"
              onClick={() => finalUpdateTodo()}
              class="btn btn-dark"
            >
              Update Todo
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
