import * as React from 'react'

export const CodeHighlight: React.FC = () => {
  const [counter, setCounter] = React.useState(0)

  return (
    <div>
      Hello World {counter}
      <br />
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={() => setCounter(counter + 1)}
      >
        Click Me
      </button>
    </div>
  )
}
