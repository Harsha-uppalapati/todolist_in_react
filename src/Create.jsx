import React, { Fragment, useEffect, useState } from "react";

const Create = () => {
  let [create, setCreate] = useState([]);
  let [finalData, setFinalData] = useState([]);
  let [edit, setEdit] = useState();
  let [toggle, setToggle] = useState(false);

  // create data

  let createData = e => {
    let { name, value } = e.target;
    setCreate({
      ...create,
      id: new Date().getTime().toString(),
      [name]: value,
    });
    setEdit(value);
  };

  // set data to local storage
  useEffect(() => {
    let da = localStorage.getItem("todo");
    if (da) {
      setFinalData(JSON.parse(da));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("todo", JSON.stringify(finalData));
  });

  // add data to todo
  let addData = e => {
    e.preventDefault();
    setFinalData([...finalData, create]);
    setToggle(false);
  };

  // delete data fro todo
  let deleteToDo = e => {
    let a = [...finalData];
    a.splice(e, 1);
    setFinalData(a);
  };

  // edit to do
  let editTodo = e => {
    let b = [...finalData];
    setEdit(b.splice(e, 1)[0].data);
    setFinalData(b);
    console.log(b);
    setToggle(!toggle);
  };

  return (
    <section className="displayData">
      <article>
        <form>
          <input
            type="text"
            name="data"
            value={edit}
            onChange={createData}
            placeholder="create your todo"
          />
          <button onClick={e => addData(e)}>
            {toggle ? (
              <i class="fal fa-pencil">update</i>
            ) : (
              <i className="fal fa-plus-circle">create</i>
            )}
          </button>
        </form>
        <table>
          {finalData
            ? finalData.map((val, i) => (
                <Fragment key={i.toString()}>
                  <tbody>
                    <tr>
                      <td>{val.data}</td>
                      <td>
                        <i
                          className="far fa-edit"
                          onClick={() => editTodo(i)}
                        ></i>
                      </td>
                      <td>
                        <i
                          className="far fa-trash-alt"
                          style={{ color: "red" }}
                          onClick={e => deleteToDo(i)}
                        ></i>
                      </td>
                    </tr>
                  </tbody>
                </Fragment>
              ))
            : ""}
        </table>
      </article>
    </section>
  );
};

export default Create;
