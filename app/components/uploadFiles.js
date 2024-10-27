import { apiLink, GetLogedUserData } from '@/API/API CALLS';
import U_Button from '@/Components/Button';
import U_input from '@/Components/Input';
import { useEffect, useState } from 'react';
import UploadFilesNotifications from './uploadingFiles';
import { TotalSize } from './storage';

export default function UploadFiles({ setUploadBox, Type }) {
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
    if (
      Number(userCurrentSize.split('G')[0]) >= Number(storage.split('G')[0])
    ) {
      console.log(storage);
      console.log(
        Number(userCurrentSize.split('G')[0]),
        Number(storage.split('G')[0])
      );
      setMessage('Storage is Full. Contact the admin');
      return console.log('Strorage Full');
    }
    setProgressTrue(true);

    if (uploadFiles.length < 1) {
      return console.log('this is empty');
    }
    const formData = new FormData();
    for (let index = 0; index < uploadFiles.length; index++) {
      formData.append('files', uploadFiles[index]);
    }

    const xhr = new XMLHttpRequest();
    xhr.timeout = 1000 * 60 * 5; //5 minute initial timeout timer.

    if (Type === 'Photos') {
      xhr.open('POST', `${apiLink}/images/upload`, true);
    } else if (Type === 'Videos') {
      xhr.open('POST', `${apiLink}/videos/upload`, true);
    }

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
        console.log('Files uploaded successfully');
        setProgressTrue(false);
      } else {
        console.error('Upload failed');
        setProgressTrue(false);
        console.error(xhr.responseText); // Log the error response
      }
    };

    xhr.onerror = function () {
      setProgressTrue(false);

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
      className={`relative flex justify-center items-center h-4/5 w-full ${
        modelOpen ? 'scale-100' : 'scale-0'
      } transition duration-500 ease-in-out max-sm:h-full`}
    >
      <div className=" w-full h-full rounded-[50px] bg-amber-300 flex flex-col items-center justify-center border-8 border-yellow-200">
        <span className="font-bold">Upload {Type} </span>
        {!progressTrue ? (
          <div className="flex flex-col gap-5 justify-center items-center">
            <U_input
              Type="file"
              accept={Type === 'Photos' ? 'image/*' : 'video/*'}
              multiple
              OnChange={(e) => setUploadFiles(e.target.files)}
            />
            {uploadFiles.length > 0 && (
              <U_Button b_name={'Upload'} b_function={UploadImagesandVideos} />
            )}{' '}
            <U_Button b_name={'Cancle'} b_function={ClosePopUp} />
            <span className="font-bold text-red-600 uppercase">{message}</span>
          </div>
        ) : (
          ''
        )}

        <UploadFilesNotifications progress={progress} />
      </div>
    </div>
  );
}
