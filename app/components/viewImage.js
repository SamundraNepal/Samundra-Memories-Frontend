import Image from 'next/image';
import Tick from './tick';
import { useEffect, useRef, useState } from 'react';
import { base64Char } from '@/API/API CALLS';

export default function ViewImage({
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
  const imageDiv = useRef(null);
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
          setIsVisible(true);
          observer.unobserve(entry.target);
          //elemet is visisble so stop tracking it
        } else {
          setIsVisible(false);
        }
      },
      { threshold: 0.2 }
      // this is what % of the images should be visible before it stop tracking
    );

    if (imageDiv) {
      observer.observe(imageDiv.current);
    }

    // Cleanup observer on unmount
    return () => {
      if (imageDiv.current) observer.unobserve(imageDiv.current);
    };
  }, [scrollPosition]);

  return (
    <div
      key={index}
      className={`relative ${
        showImage ? 'scale-100' : 'scale-0'
      } transition-all duration-300`}
    >
      <Tick setIsTicked={setIsTicked} />
      {
        <div
          ref={imageDiv}
          key={index}
          onClick={(e) => viewImage(items, indexOne, index)}
        >
          {isVisible ? (
            <Image
              id="imageCheck"
              src={items?.imageURL}
              alt={items.imageName}
              placeholder="blur"
              blurDataURL={
                items.imageBase64 === null ? base64Char : items.imageBase64
              }
              width={400}
              height={400}
              quality={10}
              className={`border-4 hover:border-green-500  cursor-pointer transition-all duration-300 ${
                isTick ? 'p-2' : 'p-0'
              }`}
            />
          ) : (
            <div
              className="border-2 bg-slate-300"
              style={{ width: '100px', height: '400px' }}
            ></div>
          )}
        </div>
      }
    </div>
  );
}
