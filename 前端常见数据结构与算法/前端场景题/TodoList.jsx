import { useState } from "react";

export default function Todo() {
  const [list, setList] = useState([]);
  const [text, setText] = useState("");

  const addTodo = () => {
    setList([...list, { id: Date.now(), text }]);
    setText("");
  };

  const remove = (id) => {
    setList(list.filter(item => item.id !== id));
  };

  return (
    <div>
      <input
        value={text}
        onChange={e => setText(e.target.value)}
      />

      <button onClick={addTodo}>add</button>

      <ul>
        {list.map(item => (
          <li key={item.id}>
            {item.text}
            <button onClick={() => remove(item.id)}>x</button>
          </li>
        ))}
      </ul>
    </div>
  );
}