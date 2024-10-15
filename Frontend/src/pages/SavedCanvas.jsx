import React, { useState, useEffect } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../firebase/init"; // Firestore instance
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase/init"; // Firebase authentication

const SavedCanvas = () => {
  const [canvases, setCanvases] = useState([]);
  const [user] = useAuthState(auth); // Hook to get the current user

  // Function to fetch saved canvases
  const fetchUserCanvases = async () => {


    try {
      const q = query(collection(db, "userCanvases"), where("userId", "==", user.uid));
      const querySnapshot = await getDocs(q);
      const fetchedCanvases = [];
      querySnapshot.forEach((doc) => {
        fetchedCanvases.push(doc.data());
      });

      setCanvases(fetchedCanvases); // Save the canvases in the state
    } catch (error) {
      console.error("Error fetching canvases:", error);
    }
  };

  // Fetch canvases when the component mounts
  useEffect(() => {
    fetchUserCanvases();
  }, [user]);

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">My Saved Canvases</h2>
      {canvases.length === 0 ? (
        <p>No saved canvases found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {canvases.map((canvas, index) => (
            <div key={index} className="bg-white shadow-lg p-4 rounded">
              <img src={canvas.canvasImage} alt={`Saved Canvas ${index + 1}`} className="w-full h-auto" />
              <p className="text-sm mt-2">Saved on: {canvas.createdAt.toDateString()}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SavedCanvas;
