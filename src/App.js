import React, { Fragment, useEffect, useRef, useState } from 'react';

export const App = () => {

  const canvasRef = useRef(null)
  const contextRef = useRef(null)
  const [isDrawing, setIsDrawing] = useState(false)

  useEffect(() => {
    const canvas = canvasRef.current
    canvas.width = window.innerWidth * 1.4
    canvas.height = window.innerHeight * 1.4
    canvas.style.width = `${window.innerWidth * .7}px`
    canvas.style.height = `${window.innerHeight * .7}px`
    const context = canvas.getContext('2d')
    context.scale(2,2)
    context.lineCap = 'round'
    context.strokeStyle = 'black'
    context.lineWidth = 5
    contextRef.current = context
  }, [])

  const startDrawing = ({nativeEvent}) => {
    const {offsetX, offsetY} = nativeEvent
    contextRef.current.beginPath()
    contextRef.current.moveTo(offsetX, offsetY)
    setIsDrawing(true)
  }

  const endDrawing = () => {
    contextRef.current.closePath()
    setIsDrawing(false)
  }

  const draw = ({nativeEvent}) => {
    if(!isDrawing){
      return
    }
    const {offsetX, offsetY} = nativeEvent
    contextRef.current.lineTo(offsetX, offsetY)
    contextRef.current.stroke()
  }

  return (
    <Fragment>
      <div className="Theme">
        <canvas 
        onMouseDown={startDrawing}
        onMouseUp={endDrawing}
        onMouseMove={draw}
        ref={canvasRef}
        className="Canvas">
        </canvas>
      </div>
    </Fragment>
  );
}
