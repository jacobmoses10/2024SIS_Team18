import React, { useEffect, useState } from "react";
import { auth, db } from "../firebase/init";
import { useAuthState } from "react-firebase-hooks/auth";
import {
  collection,
  query,
  orderBy,
  getDocs,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import mainLogo from "../assets/inkwise_logo.png";
import { toast } from "react-toastify";

const UserWhiteboards = () => {
  const [whiteboards, setWhiteboards] = useState([]);
  const [user, loading, error] = useAuthState(auth); // Get the current user

  useEffect(() => {
    const fetchWhiteboards = async () => {
      if (user) {
        try {
          const whiteboardsRef = collection(
            db,
            "users",
            user.uid,
            "whiteboards"
          );
          const q = query(whiteboardsRef, orderBy("createdAt", "desc"));
          const querySnapshot = await getDocs(q);

          const whiteboardsData = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));

          console.log("Fetched whiteboards:", whiteboardsData); // Log fetched data here
          setWhiteboards(whiteboardsData);
        } catch (error) {
          console.error("Error fetching whiteboards:", error);
        }
      }
    };

    fetchWhiteboards();
  }, [user]);

  const handleDeleteWhiteboard = async (whiteboardId) => {
    try {
      // Delete the whiteboard from Firestore
      const whiteboardDocRef = doc(
        db,
        "users",
        user.uid,
        "whiteboards",
        whiteboardId
      );
      await deleteDoc(whiteboardDocRef);

      // Remove the whiteboard from the state to update the UI
      setWhiteboards((prevWhiteboards) =>
        prevWhiteboards.filter((whiteboard) => whiteboard.id !== whiteboardId)
      );

      toast.success(`Whiteboard ${whiteboardId} deleted successfully.`);
    } catch (error) {
      toast.error("Error deleting whiteboard:", error);
    }
  };

  if (loading) {
    return <div>Loading whiteboards...</div>;
  }

  if (error) {
    console.error("Error in useAuthState:", error);
    return <div>Error: {error.message}</div>;
  }

  if (!user) {
    return <div>Please log in to view your whiteboards.</div>;
  }

  return (
    <div className="max-w-screen-lg mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-center sm:text-left">
        Whiteboards
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {whiteboards.length > 0 ? (
          whiteboards.map((whiteboard) => (
            <WhiteboardCard
              key={whiteboard.id}
              whiteboard={whiteboard}
              onDelete={() => handleDeleteWhiteboard(whiteboard.id)}
            />
          ))
        ) : (
          <div>No whiteboards found.</div>
        )}
      </div>
    </div>
  );
};

export default UserWhiteboards;

export function WhiteboardCard({whiteboard, onDelete}) {
  const {id, image, createdAt} = whiteboard;
  const navigate = useNavigate();

  const formattedDate = createdAt
    ? new Date(createdAt.seconds * 1000).toLocaleDateString()
    : "No date";

  const handleClick = () => {
    navigate(`/whiteboard/${id}`);
  };

  return (
    <div className="w-full h-[250px] border rounded-lg p-4 bg-white m-4 shadow-md hover:shadow-xl transition-shadow hover:cursor-pointer">
      <div className="flex flex-col items-center">
        <div
          className="w-full h-[150px] rounded-lg bg-gray-200 flex justify-center items-center"
          onClick={handleClick}>
          {image ? (
            <img
              className="p-2 h-full object-contain"
              src={image}
              alt="Whiteboard Preview"
            />
          ) : (
            <img
              className="p-2 h-full object-contain"
              src={mainLogo}
              alt="Whiteboard Preview"
            />
          )}
        </div>
        <div className="py-2 text-center">
          <h1 className="text-lg sm:text-xl font-bold">
            Saved Date: {formattedDate}
          </h1>
        </div>
        {/* Add a delete button */}
        <button
          className="mt-4 bg-red-500 text-white py-1 px-3 rounded hover:bg-red-700"
          onClick={onDelete}>
          Delete
        </button>
      </div>
    </div>
  );
}
