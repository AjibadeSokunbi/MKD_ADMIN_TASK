import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import SubHeader from "../components/SubHeader";
import DraggableRow from "../components/DraggableRow";
import MkdSDK from "../utils/MkdSDK";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { IoIosArrowDown } from "react-icons/io";

const mkdSDK = new MkdSDK();
mkdSDK.setTable("video");

const AdminDashboardPage = () => {
  const [videos, setVideos] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [numPages, setNumPages] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        setLoading(true);

        const payload = {
          payload: {},
          page: currentPage,
          limit: 10,
        };

        const response = await mkdSDK.callRestAPI(payload, "PAGINATE");

        if (response.error) {
          console.error("Error fetching videos:", response.message);
        } else {
          setVideos(response.list);
          setNumPages(response.num_pages);
        }
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, [currentPage]);

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < numPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const moveRow = (fromIndex, toIndex) => {
    const updatedVideos = [...videos];
    const [movedVideo] = updatedVideos.splice(fromIndex, 1);
    updatedVideos.splice(toIndex, 0, movedVideo);
    setVideos(updatedVideos);
  };

  return (
    <>
      <div className="w-full flex flex-col justify-center h-full items-center px-20">
        <Header />
        <SubHeader />
        <div className="flex justify-between w-full  text-stone-500 text-base font-thin mt-4">
          <div className="flex flex-row gap-10 pl-4">
            <div>#</div>
            <div>Title</div>
          </div>
          <div>Author</div>
          <div className="flex flex-row items-center">
            Most Liked
            <IoIosArrowDown />
          </div>
        </div>
        <DndProvider backend={HTML5Backend}>
          {videos.map((video, index) => (
            <DraggableRow
              key={video.id}
              video={video}
              index={index}
              moveRow={moveRow}
            />
          ))}
            {loading && (
          <div
            className={`block text-white ${
              videos.length === 0 ? "h-screen"
            : ""}`}
          >
            Loading...
          </div>
        )}
        </DndProvider>

        <div className="text-white flex gap-5 pt-4 mb-4">
          <button
            onClick={handlePrevPage}
            className="hover:text-red-500"
            disabled={currentPage === 1 || loading}
          >
            Prev
          </button>
          <span>Page {currentPage}</span>
          <button
            onClick={handleNextPage}
            className="hover:text-green-500"
            disabled={currentPage === numPages || loading}
          >
            Next
          </button>
        </div>
      
      </div>
    </>
  );
};

export default AdminDashboardPage;
