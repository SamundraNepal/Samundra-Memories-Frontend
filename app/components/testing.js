<div className="h-[600px] w-full overflow-y-auto grid grid-cols-6 gap-2 p-2">
  {/* Combine video and image files */}
  {totalFiles.map((item, index) => (
    <div key={item._id}>
      <div>
        <div className="flex items-center justify-center font-bold text-slate-500">
          {/* Add dynamic year if available */}
        </div>
        <div
          className="flex items-center justify-center border-4 border-orange-500 hover:border-green-500 cursor-pointer "
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
            <div>
              <Image
                src={item?.imageURL}
                alt={item.imageName}
                width={200}
                height={200}
                quality={20}
                className="object-cover h-[300px] w-[300px]"
                blurDataURL="https://i.pinimg.com/736x/8a/b2/1b/8ab21b1edaa6d6d3405af14cd018a91b.jpg"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  ))}
</div>;
