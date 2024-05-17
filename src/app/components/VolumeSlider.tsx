import App from "next/app"
import React, { useState } from "react"
import ReactDOM from "react-dom"


const VolumeSlider = () => {

        const [volume, setVolume] = useState(1)
        const [muted, setMuted] = useState(false)
        const finalVolume = muted ? 0 : volume ** 2
      
        return (
          <main>
            <section>
              <input
                type="range"
                min={0}
                max={1}
                step={0.02}
                value={volume}
                onChange={event => {
                  setVolume(event.target.valueAsNumber)
                }}
              />
              <button onClick={(audio) => setMuted(m => !m)}>
                {muted ? "muted" : "unmuted"}
              </button>
            </section>
            <section>
              <p>final volume: {finalVolume.toFixed(3)}</p>
            </section>
          </main>
        )
      }
      
     

export default VolumeSlider



