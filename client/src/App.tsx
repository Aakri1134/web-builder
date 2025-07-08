function App() {
  
  return <>
  <button onClick={() => {throw new Error("Trial Error")}}>Error</button>
  </>
}

export default App
