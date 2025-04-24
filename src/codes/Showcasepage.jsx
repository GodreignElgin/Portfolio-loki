import React from "react";
import ModelViewer from "./ModelViewer";

const ShowcasePage = () => {
  return (
    <div className="w-full h-screen p-4 bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">3D Model Showcase</h1>
      <div className="border rounded-xl shadow-lg overflow-hidden h-[600px]">
        <ModelViewer modelPath="./models/shock_absorber_asm.glb" />
      </div>
    </div>
  );
};

export default ShowcasePage;
