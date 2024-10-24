import React, {useEffect, useState} from "react";
import {auth, db} from "../firebase/init";
import {useAuthState} from "react-firebase-hooks/auth";
import {
  collection,
  query,
  orderBy,
  getDocs,
  deleteDoc,
  doc,
} from "firebase/firestore";
import {useNavigate} from "react-router-dom";
import mainLogo from "../assets/inkwise_logo.png";
import {toast} from "react-toastify";
import {TrashIcon} from "@heroicons/react/24/outline";

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
    return (
      <div className="text-center text-gray-500">Loading whiteboards...</div>
    );
  }

  if (error) {
    console.error("Error in useAuthState:", error);
    return (
      <div className="text-center text-red-500">Error: {error.message}</div>
    );
  }

  if (!user) {
    return (
      <div className="text-center">Please log in to view your whiteboards.</div>
    );
  }

  return (
    <div className="max-w-screen-lg mx-auto p-4">
      <h2 className="text-2xl mb-8 text-center">My Boards</h2>

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
          <div className="text-gray-500">No whiteboards found.</div>
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
    <div className="w-full border rounded-xl p-4 bg-white shadow-lg hover:shadow-xl transition-shadow hover:cursor-pointer">
      <div className="flex flex-col items-center">
        <div
          className="w-full rounded-lg border bg-gray-200 flex justify-center items-center"
          onClick={handleClick}>
          {image ? (
            <img
              className="h-full object-contain"
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
        <div className="py-3 text-center">
          <h1 className="text-sm sm:text-md font-semibold">
            Saved Date: {formattedDate}
          </h1>
        </div>
        {/* Add a delete button */}
        <button
          className="mt-4 flex items-center space-x-2 bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 transition"
          onClick={onDelete}>
          <TrashIcon className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}
