import React, { useState, useEffect } from "react";
import TutorialDataService from "../services/tutorial.service";

const Tutorial = (props) => {
  console.log("Props:", props);
  const initialTutorialState = {
    id: null,
    title: "",
    description: "",
    published: false,
  };

  const [currentTutorial, setCurrentTutorial] = useState(initialTutorialState);

  useEffect(() => {
    console.log("Current Tutorial:", currentTutorial);
    if (props.match && props.match.params && props.match.params.id) {
      getTutorial(props.match.params.id);
    }
  }, [props.match, currentTutorial]);

  const onChangeTitle = (e) => {
    const title = e.target.value;
    console.log("Title Change:", title);
    setCurrentTutorial((prevState) => ({
      ...prevState,
      title: title,
    }));
  };

  const onChangeDescription = (e) => {
    const description = e.target.value;
    setCurrentTutorial((prevState) => ({
      ...prevState,
      description: description,
    }));
  };

  const getTutorial = (id) => {
    TutorialDataService.get(id)
      .then((response) => {
        console.log(response.data);
        setCurrentTutorial(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <div>
      {currentTutorial ? (
        <div className="edit-form">
          <h4>Tutorial</h4>
          <form>
            <div className="form-group">
              <label htmlFor="title">Title</label>
              <input
                type="text"
                className="form-control"
                id="title"
                value={currentTutorial.title}
                onChange={onChangeTitle}
              />
            </div>

            <div className="form-group">
              <label htmlFor="description">Description</label>
              <input
                type="text"
                className="form-control"
                id="description"
                value={currentTutorial.description}
                onChange={onChangeDescription}
              />
            </div>
          </form>
        </div>
      ) : (
        <div>
          <br />
          <p>Please Click on a Tutorial ....</p>
        </div>
      )}
    </div>
  );
};

export default Tutorial;
