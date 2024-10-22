import Tick from './tick';
import { useEffect, useState } from 'react';

export default function ViewVideo({
  index,
  items,
  indexOne,
  setOnLoadCompleteVideo,
  onLoadCompleteVideo,
  viewImage,
  handleSelectedFiles,
}) {
  const [isTick, setIsTicked] = useState(false);
  const [removeDuplicate, setIsDuplicate] = useState(false);
  const [showImage, setShowImage] = useState(false);

  useEffect(() => {
    setShowImage(true);

    if (isTick) {
      handleSelectedFiles(indexOne, index);
      setIsDuplicate(true);
    } else {
      if (removeDuplicate) {
        handleSelectedFiles(indexOne, index);
        setIsDuplicate(false);
      }
    }
  }, [isTick]);
  return (
    <div
      key={index}
      className={`relative ${
        showImage ? 'scale-100' : 'scale-0'
      } transition-all duration-300`}
    >
      <div className="absolute z-10">
        <Tick setIsTicked={setIsTicked} />
      </div>
      {/* Position the Tick on top */}
      <div onClick={(e) => viewImage(items, indexOne, index)}>
        <video
          className={`border-4 hover:border-green-500 cursor-pointer transition-all duration-300  h-5/5 w-5/5 ${
            isTick ? 'p-2' : 'p-0'
          }`}
          style={{
            display: onLoadCompleteVideo ? 'block' : 'none', // Hide video until loaded
          }}
          onLoadedData={() => setOnLoadCompleteVideo(true)}
        >
          <source src={items?.videoURL} alt={items.viodeoName} />
        </video>
      </div>
    </div>
  );
}
