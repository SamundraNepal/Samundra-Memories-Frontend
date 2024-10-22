import Image from 'next/image';
import Tick from './tick';
import { useEffect, useState } from 'react';

export default function TrashFilesVideo({
  index,
  item,
  viewVideos,
  viewImage,
  handleSelectedFiles,
}) {
  const [isTick, setIsTicked] = useState(false);
  const [removeDuplicate, setIsDuplicate] = useState(false);

  useEffect(() => {
    if (isTick) {
      handleSelectedFiles(index);
      setIsDuplicate(true);
    } else {
      if (removeDuplicate) {
        handleSelectedFiles(index);
        setIsDuplicate(false);
      }
    }
  }, [isTick]);
  return (
    <div>
      <div>
        <div className="relative">
          <div className="absolute z-10">
            <Tick setIsTicked={setIsTicked} />
          </div>
        </div>
        <div className="flex items-center justify-center font-bold text-slate-500">
          {/* Add dynamic year if available */}
        </div>
        <div
          className="flex items-center justify-center border-4 border-orange-500 hover:border-green-500 cursor-pointer  "
          onClick={() =>
            item.videoURL ? viewVideos(item, index) : viewImage(item, index)
          }
        >
          {/* Conditionally render video or image */}
          {item.videoURL ? (
            <video width="200" className="w-full">
              {/* Add controls for the video */}
              <source src={item.videoURL} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          ) : (
            <Image
              src={item?.imageURL}
              alt={item.imageName || 'Image'}
              width={200}
              height={200}
              quality={20}
              className="object-cover h-[300px] w-[300px]"
            />
          )}
        </div>
      </div>
    </div>
  );
}
