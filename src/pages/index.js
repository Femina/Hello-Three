import React, { useState, useRef, useEffect } from "react"


import * as THREE from "three"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader"
import { Canvas, extend, useThree, useRender } from "react-three-fiber"
import { useSpring, a } from "react-spring/three"

import "./style.css"



extend({ OrbitControls })

const SpaceShip = () => {
  
  const [model, setModel] = useState()

  useEffect(() => {
    new GLTFLoader().load("/scene.gltf", setModel)
  })

  return model ? <primitive object={model.scene} /> : null
}

const Controls = () => {
  const orbitRef = useRef()
  const { camera, gl } = useThree()

  useRender(() => {
    orbitRef.current.update()
  })

  return (
    <orbitControls
      
      maxPolarAngle={Math.PI / 3}
      minPolarAngle={Math.PI / 3}
      args={[camera, gl.domElement]}
      ref={orbitRef}
      screenSpacePanning={true}
    />
  )
}

// const Plane = () => (
//   <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.5, 0]} receiveShadow>
//     <planeBufferGeometry attach="geometry" args={[100, 100]} />
//     <meshPhysicalMaterial attach="material" color="white" />
//   </mesh>
// )

// const Box = () => {
//   const [hovered, setHovered] = useState(false)
//   const [active, setActive] = useState(false)
//   const props = useSpring({
//     scale: active ? [1.5, 1.5, 1.5] : [1, 1, 1],
//     color: hovered ? "hotpink" : "gray",
//   })

//   return (
//     <a.mesh
//       onPointerOver={() => setHovered(true)}
//       onPointerOut={() => setHovered(false)}
//       onClick={() => setActive(!active)}
//       scale={props.scale}
//       castShadow
//     >
//       <boxBufferGeometry attach="geometry" args={[1, 1, 1]} />
//       <a.meshPhysicalMaterial attach="material" color={props.color} />
//     </a.mesh>
//   )
// }

export default () => {
  const isBrowser = typeof window !== "undefined"

  return (
    <>
      <div className="description">
        <h2 className="white-text">Tyrannosaurus Rex</h2>
        <span className="grey-text text-capitalize">
           Tyrannosaurus, is a genus of coelurosaurian theropod dinosaur. The species Tyrannosaurus rex (rex meaning "king" in Latin), often called <span className="red-text">T. Rex </span> is one of the most well-represented of the large theropods. Tyrannosaurus lived throughout what is now western North America, on what was then an island continent known as Laramidia. Tyrannosaurus had a much wider range than other tyrannosaurids. Fossils are found in a variety of rock formations dating to the Maastrichtian age of the upper Cretaceous Period, <span className="red-text">68 to 66 million years</span> ago. It was the last known member of the tyrannosaurids, and among the last non-avian dinosaurs to exist before the Cretaceous–Paleogene extinction event.
        </span><br/>
        <a className="reference" target="_blank" href="https://www.thoughtco.com/things-to-know-tyrannosaurus-1093804">Interesting Facts about T-Rex</a>
      </div>
      {isBrowser && (
        <Canvas
          camera={{ position: [0, 0, 5] }}
          onCreated={({ gl }) => {
            gl.shadowMap.enabled = true
            gl.shadowMap.type = THREE.PCFSoftShadowMap
          }}
        >
          <ambientLight intensity={0.5} />
          <spotLight position={[15, 20, 5]} penumbra={1} castShadow />
          <fog attach="fog" args={["black", 10, 25]} />
          <Controls />
          {/* <Box /> */}
          {/* <Plane /> */}
          <SpaceShip position={[20,15,20]} />
        </Canvas>
      )}
    </>
  )
}
