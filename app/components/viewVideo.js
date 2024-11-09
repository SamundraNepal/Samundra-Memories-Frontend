import Sppiner from '@/Components/Spiner';
import Tick from './tick';
import { useEffect, useRef, useState } from 'react';

export default function ViewVideo({
  index,
  items,
  indexOne,
  viewImage,
  handleSelectedFiles,
  scrollPosition,
}) {
  const [isTick, setIsTicked] = useState(false);
  const [removeDuplicate, setIsDuplicate] = useState(false);
  const [showImage, setShowImage] = useState(false);
  const videoDiv = useRef(null);
  const videoTag = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

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

  //this is to optimize the images for example if they are not in view dont show them
  //this saves performance and images loades faster
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          //elemet is visisble so stop tracking it
          setIsVisible(true);
          observer.unobserve(entry.target);
        } else {
          setIsVisible(false);
          // Pause video when it’s out of view to free resources
          // Pause and unload the video to free resources
          if (videoTag.current) {
            videoTag.current.pause();
            videoTag.current.load(); // Unload video buffer
          }
        }
      },
      { threshold: 0.2 }
      // this is what % of the images should be visible before it stop tracking
    );

    if (videoDiv) {
      observer.observe(videoDiv.current);
    }

    // Cleanup observer on unmount
    return () => {
      if (videoDiv.current) observer.unobserve(videoDiv.current);
    };
  }, [scrollPosition]);

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
        className={`bg-slate-300`}
        ref={videoDiv}
        onClick={(e) => viewImage(items, indexOne, index)}
      >
        {isVisible ? (
          <div>
            <video
              ref={videoTag}
              className={`border-4 cursor-pointer transition-all duration-300 ${
                isTick ? 'p-2' : 'p-0'
              } hover:border-green-300`} // Using a more descriptive state name
              preload="auto"
              height={400}
              width={400}
            >
              <source
                src={items?.videoURL}
                type="video/mp4"
                alt={items?.videoName}
              />
            </video>
          </div>
        ) : (
          <div
            className="border-2 bg-slate-300"
            style={{ width: '100px', height: '400px' }}
          ></div>
        )}
      </div>
    </div>
  );
}
