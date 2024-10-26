'use client';
import U_Button from '@/Components/Button';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import UploadFiles from '../components/uploadFiles';
import { Base64Url, loadImages } from '@/API/API CALLS';
import { CiCircleInfo, CiCircleChevLeft } from 'react-icons/ci';
import { MdOutlineDelete } from 'react-icons/md';
import DeleteFiles from '../components/deleteFile';
import { FaChevronRight } from 'react-icons/fa6';
import Sppiner from '@/Components/Spiner';
import ViewImage from '../components/viewImage';
import DeleteMultipleFiles from '../components/deleteMultiple';
import dynamic from 'next/dynamic';
import { GoUpload } from 'react-icons/go';

// Dynamically import the VideoMapLocation component without SSR
const MapLocation = dynamic(() => import('../components/Maps'), {
  ssr: false,
});

/*export const metadata = {
  title: 'Images',
};*/

export default function Page() {
  const [loading, setLoading] = useState(true);

  const [uploadBox, setUploadBox] = useState(false);
  const [filesData, setFilesdata] = useState([]);
  const [viewImageFullScreen, setViewImageFullScreen] = useState({});
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentIndexOne, setCurrentIndexOne] = useState(0);
  const [page, setPage] = useState(10);
  const [scrollDiv, setScrollDiv] = useState();
  const data = filesData.slice(0, page);
  const [isSelected, setIsSelected] = useState([]);
  const [isDeleteAll, setIsDeleteAll] = useState(false);

  useEffect(() => {
    GetloadVideos();
    setTimeout(() => {
      setScrollDiv(document.getElementById('childDiv'));
    }, 500);
  }, []);

  scrollDiv?.addEventListener('scroll', (event) => {
    console.log('here');
    event.preventDefault();
    const scrollHeight = scrollDiv.scrollHeight;
    const totalHeight = scrollDiv.scrollTop + scrollDiv.clientHeight;

    if (totalHeight + 1 >= scrollHeight) {
      setPage((prev) => prev + 5);
    }
  });

  async function GetloadVideos() {
    try {
      setLoading(true);
      const data = await loadImages();
      const videoFiles = data.message.result;

      if (data.message.result.length > 0) {
        setFilesdata(videoFiles);
      }
    } catch (error) {
      console.error('Failed to load more videos:' + error.message);
    } finally {
      setLoading(false);
    }
  }

  function UploadImageBox() {
    setUploadBox(true);
  }

  function resizeFiles() {
    // Get the specific group from filesData
    const group = filesData[currentIndexOne];

    // Copy the fileDatas array and remove the item at currentIndex
    const updatedFileDatas = [...group.fileDatas];
    updatedFileDatas.splice(currentIndex, 1);

    // Create a new filesData array, updating only the group with modified fileDatas
    const updatedFiles = [...filesData];
    updatedFiles[currentIndexOne] = {
      ...group,
      fileDatas: updatedFileDatas,
    };

    // Update the state with the new filesData array
    setFilesdata(updatedFiles);

    // Exit full-screen mode if applicable
    setIsFullScreen(false);
  }

  function resizeAllDeletedFiles() {
    const updatedFiles = [...isSelected];
    const totalFiles = [...filesData];

    const newFiles = totalFiles.filter((items) =>
      items.fileDatas.every(
        (el) => !updatedFiles.some((sEl) => el._id === sEl._id)
      )
    );

    setFilesdata(newFiles);
    setIsSelected([]);
  }

  function viewImage(items, indexOne, index) {
    setCurrentIndexOne(indexOne);
    setCurrentIndex(index);
    setViewImageFullScreen(items);
    setIsFullScreen(true);
    setIsSelected([]);
  }

  function handleSelectedFiles(currentFile, currentIndex) {
    // Get the selected file data
    const selectedFile = filesData[currentFile]?.fileDatas[currentIndex];

    setIsSelected((prevData) => {
      // Check if the file is already in the state
      const alreadySelected = prevData.some((item) => item === selectedFile);

      if (!alreadySelected) {
        // Add the new file to the state if it's not selected
        return [...prevData, selectedFile];
      } else {
        // Remove the duplicate file if it already exists in the state
        console.log('duplicate removed');
        return prevData.filter((item) => item !== selectedFile);
      }
    });
  }

  return (
    <>
      {!loading ? (
        <div className="h-full w-full">
          {isDeleteAll && (
            <div className="absolute w-4/5 h-4/5 flex justify-center items-center">
              <DeleteMultipleFiles
                setDeleteFile={setIsDeleteAll}
                imageDetails={isSelected}
                resizeAllDeletedFiles={resizeAllDeletedFiles}
              />
            </div>
          )}
          {!isFullScreen ? (
            <div>
              {/* Header with gradient background */}
              <div className="p-4 border-b-2 border-amber-800 bg-gradient-to-r from-amber-50 via-amber-500 to-amber-50">
                <div className="flex justify-between items-center">
                  {isSelected.length > 0 && (
                    <div className="flex flex-row gap-4 text-slate-900 max-sm:flex-col">
                      <span className="font-bold">
                        Selected : {isSelected.length}
                      </span>
                      <div
                        className="text-4xl cursor-pointer hover:text-slate-100"
                        onClick={() => setIsDeleteAll(true)}
                      >
                        <MdOutlineDelete />
                      </div>
                    </div>
                  )}

                  {/* Title */}
                  <div className="uppercase font-bold text-l text-center flex-grow">
                    <span>Photos</span>
                  </div>
                  {/* Button */}
                  <div className="ml-4 text-3xl">
                    <div className="cursor-pointer border-4 border-amber-500 rounded-full p-1 text-black">
                      <GoUpload onClick={UploadImageBox} />
                    </div>
                  </div>
                </div>
              </div>

              <div className="relative flex justify-center">
                {uploadBox && (
                  <>
                    <div className="fixed inset-0 bg-black bg-opacity-50 z-40"></div>
                    {/* Overlay */}
                    <div className="absolute z-50 h-[550px] w-3/5">
                      <UploadFiles Type="Photos" setUploadBox={setUploadBox} />
                    </div>
                  </>
                )}
              </div>

              <ViewLoadImages
                data={data}
                viewImage={viewImage}
                handleSelectedFiles={handleSelectedFiles}
                isSelected={isSelected}
              />
            </div>
          ) : (
            <ImageFullScreen
              setIsFullScreen={setIsFullScreen}
              currentIndexOne={currentIndexOne}
              currentIndex={currentIndex}
              filesData={filesData}
              setCurrentIndex={setCurrentIndex}
              resizeFiles={resizeFiles}
              setCurrentIndexOne={setCurrentIndexOne}
            />
          )}
        </div>
      ) : (
        <Sppiner Size="p-20" />
      )}
    </>
  );
}

function ViewLoadImages({ data, viewImage, handleSelectedFiles }) {
  function formatedate(dateString) {
    const date = new Date(dateString);
    const convertToString = String(date).slice(0, 15);
    return convertToString;
  }

  return (
    <div className="h-full w-full transition-all duration-300">
      {data?.length > 0 ? (
        <div
          className="h-[650px] w-full overflow-y-auto grid grid-cols-3 gap-1 max-sm:grid-cols-3 max-sm:h-[700px]"
          id="childDiv"
        >
          {/* Fixed height and vertical scroll */}

          {data.map((group, indexOne) => (
            <div
              key={group._id}
              className={`${
                !group._id ? 'scale-0' : 'scale-100'
              } transition-transform duration-300 flex flex-col p-2 ${
                group.fileDatas.length > 5 ? 'col-span-3' : 'max-sm:col-span-3'
              }`}
            >
              {/* Display group ID */}

              <div className="flex justify-start font-bold text-slate-500">
                <span>
                  {group.fileDatas.length > 0 && formatedate(group._id)}
                </span>
              </div>

              {/* First 5 images */}
              <div
                key={indexOne}
                className={`grid w-full ${
                  group.fileDatas.length >= 5
                    ? 'grid-cols-6 max-sm:grid-cols-3'
                    : group.fileDatas.length === 4
                    ? 'grid-cols-4'
                    : group.fileDatas.length === 3
                    ? 'grid-cols-3'
                    : group.fileDatas.length === 2
                    ? 'grid-cols-2'
                    : 'grid-cols-1'
                }`}
              >
                {group.fileDatas.map((items, index) => (
                  <div key={index} className="bg-slate-300">
                    <ViewImage
                      index={index}
                      items={items}
                      indexOne={indexOne}
                      viewImage={viewImage}
                      handleSelectedFiles={handleSelectedFiles}
                    />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className=" flex justify-center items-center w-full h-[600px] text-slate-300 text-6xl uppercase max-sm:text-xl">
          <span className="-rotate-45">Upload Images to view</span>
        </div>
      )}
    </div>
  );
}

function ImageFullScreen({
  setIsFullScreen,
  currentIndex,
  currentIndexOne,
  setCurrentIndexOne,
  filesData,
  setCurrentIndex,
  resizeFiles,
}) {
  const [loading, setLoading] = useState(true);
  const [imageDetails, setImageDetails] = useState({});
  const [details, setDetails] = useState(false);
  const [barAnimation, setBarAnimation] = useState(false);
  const [openAnim, setOpenAnim] = useState(false);
  const [deleteFile, setDeleteFile] = useState(false);
  const [imageChanged, setImageChanged] = useState(false);
  const [slider, setSlider] = useState(true);
  const [sliderL, setSliderL] = useState(true);

  //setting the image based on index
  useEffect(() => {
    setImageDetails(filesData[currentIndexOne].fileDatas[currentIndex]);
    setLoading(false);

    // this adds images fade in and out effect
    setTimeout(() => {
      if (imageChanged) {
        setImageChanged(false);
      }
    }, 200);
    if (!openAnim) {
      setOpenAnim(true);
    }
  }, [currentIndex, currentIndexOne]);

  function openDetailPage() {
    if (!details) {
      setDetails(true);

      setTimeout(() => {
        setBarAnimation((prev) => !prev);
      }, 300);
    } else {
      setBarAnimation((prev) => !prev);

      setTimeout(() => {
        setDetails((prev) => !prev);
      }, 300);
    }
  }

  function imageCarasouleForward() {
    setImageChanged(true);
    setSlider(false);

    setTimeout(() => {
      if (currentIndex < filesData[currentIndexOne].fileDatas.length - 1) {
        // Move to the next item in the current fileDatas array
        setCurrentIndex((cur) => cur + 1);
      } else if (
        currentIndex === filesData[currentIndexOne].fileDatas.length - 1 &&
        filesData[currentIndexOne + 1]?.fileDatas
      ) {
        // Move to the next group (next currentIndexOne)
        setCurrentIndexOne((cur) => cur + 1);

        setCurrentIndex(0); // Reset index for the new group
      }

      setSlider(true);
      setImageChanged(false);
    }, 1000);
  }

  function imageCarasouleBackward() {
    setImageChanged(true);
    setSliderL(false);

    setTimeout(() => {
      if (currentIndex > 0) {
        // Move to the previous item in the current fileDatas array
        setCurrentIndex((cur) => cur - 1);
      } else if (
        currentIndex === 0 &&
        filesData[currentIndexOne - 1]?.fileDatas
      ) {
        // Move to the previous group (previous currentIndexOne)
        setCurrentIndexOne((cur) => cur - 1);
        // Set currentIndex to the last item in the previous group's fileDatas array
        setCurrentIndex(filesData[currentIndexOne - 1].fileDatas.length - 1);
      }
      setImageChanged(false);
      setSliderL(true);
    }, 1000);
  }

  function close() {
    setDetails(false);
    setOpenAnim(false);
    setBarAnimation(false);

    setTimeout(() => {
      setIsFullScreen(false);
    }, 500);
  }

  return (
    <>
      {
        <div
          className={`h-full w-full transition-transform transform duration-300 ease-in-out ${
            openAnim ? 'scale-100' : 'scale-0'
          }`}
        >
          {!loading ? (
            <div className="w-full h-full bg-black flex">
              {details ? (
                <div className="flex items-start max-sm:z-50 relative">
                  <div
                    className={`text-black bg-slate-50 p-1 h-full rounded-[10px] gap-4 border-r-8 border-yellow-600 transition-transform duration-500 ease-in-out ${
                      barAnimation ? 'scale-100' : 'scale-0'
                    } max-sm:w-[410px] bg-opacity-90 z-20`}
                  >
                    <div className="flex flex-col gap-5">
                      <div>
                        <button
                          className="text-6xl flex justify-center hover:text-slate-500"
                          onClick={openDetailPage}
                        >
                          <CiCircleChevLeft />
                        </button>
                      </div>
                      <div className="flex flex-col mt-5 gap-4">
                        <span className="font-bold border-b-4 border-yellow-200">
                          Details
                        </span>
                        <span>Name : {imageDetails.imageName}</span>
                        <span>Back Up Date :{imageDetails.backUpDate} </span>
                        <span>
                          Original Date: {imageDetails.dateTimeOriginal}
                        </span>
                        <span>Size :{imageDetails.imageSize} Mb</span>
                        {imageDetails.make != 'Missing' && (
                          <span>Make :{imageDetails.make} </span>
                        )}
                        {imageDetails.model != 'Missing' && (
                          <span>Model :{imageDetails.model} </span>
                        )}
                      </div>

                      <div className="flex flex-col h-full w-full">
                        <span className="font-bold border-b-4 border-yellow-200">
                          Location
                        </span>
                        <div className="h-full w-full rounded-[10px]">
                          <MapLocation
                            latRef={imageDetails.gPSLatitudeRef}
                            lanRef={imageDetails.gPSLongitudeRef}
                            latCod={imageDetails.gPSLatitude}
                            lanCod={imageDetails.gPSLongitude}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="absolute flex items-center justify-center gap-5 mt-1 p-2 max-sm:absolute w-full z-10">
                  <div className="flex bg-slate-500 rounded-[10px] border-2 text-slate-50 w-full justify-center bg-opacity-20">
                    <button
                      className="text-6xl flex justify-center hover:text-slate-500"
                      onClick={close}
                    >
                      <CiCircleChevLeft />
                    </button>
                    <button
                      className="text-6xl flex justify-center hover:text-slate-500"
                      onClick={openDetailPage}
                    >
                      <CiCircleInfo />
                    </button>

                    <button
                      className="text-6xl flex justify-center hover:text-slate-500"
                      onClick={(e) => setDeleteFile(true)}
                    >
                      <MdOutlineDelete />
                    </button>
                  </div>
                </div>
              )}

              <div className="w-full flex flex-row">
                {!details && (
                  <div className=" z-10 h-full w-1/5 flex">
                    <button
                      className="text-white text-6xl rotate-180 hover:text-slate-50"
                      onClick={(e) => imageCarasouleBackward()}
                    >
                      {sliderL && <FaChevronRight />}
                    </button>
                  </div>
                )}

                <div className=" h-full w-full flex items-center justify-center">
                  {/* p-40 to view delete files*/}
                  {deleteFile && (
                    <div className=" w-full h-full flex items-center justify-center">
                      <DeleteFiles
                        setDeleteFile={setDeleteFile}
                        imageDetails={imageDetails}
                        resizeFiles={resizeFiles}
                        setImageChanged={setImageChanged}
                      />
                    </div>
                  )}

                  <div className="h-full">
                    <Image
                      src={imageDetails?.imageURL}
                      alt={'Image'}
                      fill
                      placeholder="blur"
                      blurDataURL={Base64Url}
                      className={`object-contain transition-opacity duration-500 ${
                        imageChanged ? 'opacity-0' : 'opacity-100'
                      }`}
                    />
                  </div>
                </div>

                {!details && (
                  <div className=" z-10 h-full w-1/5 flex">
                    <button
                      className="text-white text-6xl  hover:text-slate-500"
                      onClick={(e) => imageCarasouleForward()}
                    >
                      {slider && <FaChevronRight />}
                    </button>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <Sppiner />
          )}
        </div>
      }
    </>
  );
}
