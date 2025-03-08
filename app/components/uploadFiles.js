import { apiLink, GetLogedUserData } from '@/API/API CALLS';
import U_Button from '@/Components/Button';
import U_input from '@/Components/Input';
import { useEffect, useState } from 'react';
import UploadFilesNotifications from './uploadingFiles';
import { TotalSize } from './storage';

export default function UploadFiles({
  setUploadBox,
  Type,
  albumName,
  viewAlbums,
}) {
  const [modelOpen, setModelOpen] = useState(false);
  const [uploadFiles, setUploadFiles] = useState([]);
  const [progress, setProgress] = useState(0); // Track upload progress
  const [progressTrue, setProgressTrue] = useState(false);
  const userCurrentSize = TotalSize();
  const [message, setMessage] = useState('');
  const [storage, setStorage] = useState('');

  useEffect(() => {
    setModelOpen(true);
    async function getStorage() {
      const storageData = await GetLogedUserData();
      setStorage(storageData.message.getUser?.storage);
    }

    getStorage();
  }, []);

  function ClosePopUp() {
    setModelOpen(false);

    setTimeout(() => {
      setUploadBox(false);
    }, [1000]);
  }

  async function UploadImagesandVideos() {
    let totalMb = 0;
    for (let index = 0; index < uploadFiles.length; index++) {
      const sizeCheck = uploadFiles[index].size;
      const convertToMb = (sizeCheck / 1024 / 1024).toFixed(2);
      totalMb += convertToMb / 1024;
    }

    if (Number(totalMb) >= Number(storage?.split('G')[0])) {
      setMessage('This file size exceeds the total storage');
      return console.log('Exceeds size');
    }

    if (
      Number(userCurrentSize?.split('G')[0]) >= Number(storage?.split('G')[0])
    ) {
      setMessage('Storage is Full. Contact the admin');
      return console.log('Strorage Full');
    }
    setProgressTrue(true);

    if (uploadFiles.length < 1) {
      return console.log('this is empty');
    }

   if(uploadFiles.length > 50){
      setMessage("Cannot upload files more than 50");
      console.log(message);
      return console.log('Cannot upload files more than 50');
    }
    const formData = new FormData();

    for (let index = 0; index < uploadFiles.length; index++) {
      formData.append('files', uploadFiles[index]);
    }

    if (viewAlbums) {
      formData.append('albumName', albumName);
    }

    const xhr = new XMLHttpRequest();

    if (Type === 'Photos') {
      xhr.open('POST', `${apiLink}/images/upload`, true);
    } else if (Type === 'Videos') {
      xhr.open('POST', `${apiLink}/videos/upload`, true);
    }

    xhr.timeout = 1000 * 60 * 600; //60 minute initial timeout timer.

    // Add the authorization token to the request headers
    const token = sessionStorage.getItem('cookies'); // Replace with the actual token

    xhr.setRequestHeader('Authorization', `Bearer ${token}`);

    // Track upload progress
    xhr.upload.onprogress = function (event) {
      if (event.lengthComputable) {
        const progressStatus = (event.loaded / event.total) * 100;
        setProgress(progressStatus);
      }
    };

    xhr.onload = function () {
      if (xhr.status === 200) {
        setProgressTrue(false);
        ClosePopUp();
      } else {
        setProgressTrue(false);
        console.error(xhr.responseText); // Log the error response
      }
    };

    xhr.onerror = function () {
      setProgressTrue(false);
      ClosePopUp();
      console.log(
        'Upload error occurred.',
        xhr.status,
        xhr.statusText,
        xhr.responseText
      );
      throw new Error(
        'Upload error occurred.',
        xhr.status,
        xhr.statusText,
        xhr.responseText
      );
    };

    xhr.send(formData);
  }

  return (
    <div
      className={`relative flex justify-center items-center h-4/5 w-full mt-20 ${
        modelOpen ? 'scale-100' : 'scale-0'
      } transition duration-500 ease-in-out max-sm:h-2/5  max-sm:mt-40`}
    >
      <div className=" w-full h-full rounded-[50px] bg-amber-300 flex flex-col items-center justify-center border-8 border-yellow-200">
        <span className="font-bold">
          {progress > 0 ? 'Uploading ' : 'Upload'} {Type}
        </span>
        {!progressTrue ? (
          <div className="flex flex-col gap-5 justify-center items-center">
            <U_input
              Type="file"
              accept={Type === 'Photos' ? '.jpg, .jpeg, .png, .heic, .HEIC, image/heic' : 'video/*'}
              OnChange={(e) => setUploadFiles(e.target.files)}
            />
            {uploadFiles.length > 0 &&  (
              <U_Button b_name={'Upload'} b_function={UploadImagesandVideos} />
            )}{' '}
            <U_Button b_name={'Cancel'} b_function={ClosePopUp} />

            <span className="font-bold text-red-600 uppercase">{message}</span>
          </div>
        ) : (
          <div className='text-center flex flex-col justify-center items-center'>
          <span className="font-bold text-red-600 uppercase">{message}</span>
{uploadFiles.length > 50 &&        <U_Button b_name={'Cancel'} b_function={ClosePopUp} />
}
            </div>
        )}

        <UploadFilesNotifications progress={progress} />
      </div>
    </div>
  );
}
