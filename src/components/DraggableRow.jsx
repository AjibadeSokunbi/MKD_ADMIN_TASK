import React, { useRef } from "react";
import { useDrag, useDrop } from "react-dnd";
import Stack from "./Stack";
import { IoIosArrowRoundUp } from "react-icons/io";

const DraggableRow = ({ video, index, moveRow }) => {
  const [, drag] = useDrag({
    type: "ROW",
    item: { index },
  });

  const dropRef = useRef();
  const [, drop] = useDrop({
    accept: "ROW",
    hover(draggedItem) {
      if (!dropRef.current) {
        return;
      }

      const draggedIndex = draggedItem.index;
      const targetIndex = index;

      if (draggedIndex === targetIndex) {
        return;
      }

      moveRow(draggedIndex, targetIndex);
      draggedItem.index = targetIndex;
    },
  });

  drag(drop(dropRef));

  return (
    <div className="w-full" ref={(node) => (dropRef.current = node)}>
      <div
        key={video.id}
        className="w-full py-5 items-center mt-5  rounded-2xl border border-white border-opacity-10 flex flex-row justify-between "
      >
        <Stack margin="pl-4" gap={6} alignItems="center" width="w-full">
          <div className="text-stone-500 text-[14px] font-thin">{video.id}</div>
          <Stack width={"w-[80%]"} gap={2}>
            <div className="w-[27%] items-center flex justify-center">
              <img
                src={video.photo}
                alt=""
                className="w-full h-16 rounded-lg"
              />
            </div>

            <div className=" text-white text-xl font-thin w-[65%]">
              {video.title}
              sale
            </div>
          </Stack>
        </Stack>

        <Stack gap={2} alignItems="center" width="w-full">
          <img src={video.photo} alt="" className="w-6 h-6 rounded-full" />
          <div className="text-lime-300 text-base font-thin">
            {video.username}
          </div>
        </Stack>

        <Stack width="w-[10%]" alignItems={"center"}>
          <div className="text-white text-base font-thin">{video.like}</div>
          <IoIosArrowRoundUp color="#9BFF00" size={25} />
        </Stack>
      </div>
    </div>
  );
};

export default DraggableRow;
