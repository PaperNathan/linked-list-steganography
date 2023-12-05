import "./App.scss";
import messageUtils from "./utils/messageUtils";

export default function App() {
  const { buildMessage, sortEncodedList } = messageUtils();
  const message = "Hello World!";

  const encoded = sortEncodedList(buildMessage(message));
  console.log(encoded);

  return (
    <>
      <div className="App">
        {
          encoded.map((char, i) => {
            return (
              <div key={i} className="App__char" style={{ backgroundColor: `rgb(${char.value}, ${char.prev}, ${char.next})`}}></div>
            )
          })
        }
      </div>
    </>
  )
}
