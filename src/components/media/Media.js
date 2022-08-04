import React from 'react';
import ImageUploading from 'react-images-uploading';

export function App() {
  const [images, setImages] = React.useState([]);
  const maxNumber = 100;

  const onChange = (imageList, addUpdateIndex) => {
    // data for submit
    setImages(imageList);
  };

  return (
    <div className="App">
      <ImageUploading
        multiple
        value={images}
        onChange={onChange}
        maxNumber={maxNumber}
        dataURLKey="data_url"
      >
        {({
          imageList,
          onImageUpload,
          onImageRemoveAll,
          onImageUpdate,
          onImageRemove,
          isDragging,
          dragProps,
        }) => (
          // write your building UI
          <div className="upload__image-wrapper">
            <button
              style={isDragging ? { color: 'red' } : undefined}
              onClick={onImageUpload}
              {...dragProps}
              className="btn btn-primary"
            >
              Upload Image
            </button>
            &nbsp;
            <button onClick={onImageRemoveAll} className="btn btn-danger">Remove all images</button>
            {imageList.map((image, index) => (
              <div key={index} className="image-item">
                <h3>2022</h3>
                <hr />
                <img src={image['data_url']} alt="" width="100" />
                <div className="image-item__btn-wrapper">
                  <button onClick={() => onImageUpdate(index)}>Update</button>
                  <button onClick={() => onImageRemove(index)}>Remove</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </ImageUploading>
    </div>
  );
}