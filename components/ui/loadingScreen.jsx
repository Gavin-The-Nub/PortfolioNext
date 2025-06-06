"use client";

export function LoadingScreen() {
  return (
    <div className="fixed inset-0 z-50 bg-black flex items-center justify-center">
      {/* Replace this div with your custom loading design */}
      <div className="text-white text-center">
        <div className="text-2xl font-bold mb-4">Loading...</div>
        <div className="text-blue-500">Preparing 3D Experience</div>
        {/* Add your custom loading animation/design here */}
      </div>
    </div>
  );
}
