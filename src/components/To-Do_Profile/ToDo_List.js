import ToDo from "./ToDo";

const ToDo_List = ({ props, onDelete }) => {
  return (
    <div>
      <ToDo todo_data={props} onDelete={onDelete} />
    </div>
  );
};

export default ToDo_List;
