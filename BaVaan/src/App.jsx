import Introduction from "./components/Introduction"
import './App.css'
import Form from "./components/Form"
function App() {

  return (
    <div className="w-full h-screen flex flex-col items-center px-5">
      <div className="my-5 border-[2.5px] border-red-300 px-5 h-screen flex flex-col w-full">
        <Introduction />
        <Form />
      </div>
    </div>
  )
}

export default App
