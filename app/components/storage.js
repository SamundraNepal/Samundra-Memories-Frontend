import { loadImages, loadVideos } from '@/API/API CALLS';
import { useEffect, useState } from 'react';
import { TiCloudStorageOutline } from 'react-icons/ti';

export default function StorageTotal() {
  const [sizes, setSizes] = useState(0);

  useEffect(() => {
    async function getAllFileSizes() {
      try {
        const imageSize = await loadImages();
        const videoSizes = await loadVideos();
        const totalSizes = (
          (videoSizes.message?.totalSize || 0) +
          (imageSize.message?.totalSize || 0)
        ).toFixed(2);

        //convert to gb
        if (totalSizes > 100) {
          const gbSize = (totalSizes / 1024).toFixed(2);
          setSizes(gbSize + 'GB');
        } else {
          setSizes(totalSizes + 'MB');
        }
      } catch (err) {
        throw new Error('Failed to get the size data');
      }
    }

    getAllFileSizes();
  }, []);

  return (
    <div className="flex">
      <TiCloudStorageOutline className="text-5xl" />
      <span className="text-black font-sm ">Storage: {sizes}/50GB</span>
    </div>
  );
}
