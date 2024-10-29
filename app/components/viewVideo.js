import Tick from './tick';
import { useEffect, useState } from 'react';

export default function ViewVideo({
  index,
  items,
  indexOne,
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
      <div
        onClick={(e) => viewImage(items, indexOne, index)}
        className="bg-slate-300"
      >
        <video 
          className={`border-4 cursor-pointer transition-all duration-300 w-full h-full ${
            isTick ? 'p-2' : 'p-0'
          } hover:border-green-500`} // Using a more descriptive state name
           preload='auto'>
          <source
            src={items?.videoURL}
            type="video/mp4"
            alt={items?.videoName}

            
          />
        </video>
      </div>
    </div>
  );
}
