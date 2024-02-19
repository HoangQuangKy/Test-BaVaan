import Introduction from "./components/Introduction"
import './App.css'
import Form from "./components/Form"
import Add from "./components/Add"
function App() {

  return (
    <div className="w-full h-screen flex flex-col items-center px-5">
      <div className="my-5 border-[2.5px] border-red-300 px-5 md:h-screen flex flex-col w-full">
        <Add />
        <Introduction />
        <Form />
      </div>
    </div>
  )
}

export default App
