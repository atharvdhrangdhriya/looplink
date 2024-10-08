import React from 'react';
import ImageUploading from 'react-images-uploading';

export function App() {
  const [images, setImages] = React.useState([]);
  const maxNumber = 69;

  const onChange = (imageList, addUpdateIndex) => {
    // data for submit
    console.log(imageList, addUpdateIndex);
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
            >
              Click or Drop here
            </button>
            &nbsp;
            <button onClick={onImageRemoveAll}>Remove all images</button>
            {imageList.map((image, index) => (
              <div key={index} className="image-item">
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

        {/* <div
                  style={{cursor:'pointer'}}
                    className="slim slim_profile_photo"
                    data-label=""
                    data-state="file-over" 
                    data-default-input-name="profile_pic"
                    data-size="100,100"
                    data-save-initial-image="true"
                    data-upload-base64="false"
                    data-did-save="imageUpload"
                    data-max-file-size={4}
                    data-instant-edit="true"
                    data-ratio="1:1"
                  >
                    <input type="file" id="profile_pic" />
                    <input type="hidden" name="profile_pic" />
                    <div className="slim-file-hopper"></div>
                    <div className="slim-area">
                      <div className="slim-loader">
                        <svg>
                          <path
                            className="slim-loader-background"
                            fill="none"
                            strokeWidth={3}
                            d="M 11.494659292840298 3.000001677832694 A 8.5 8.5 0 1 0 11.5 3"
                          />
                          <path
                            className="slim-loader-foreground"
                            fill="none"
                            strokeWidth={3}
                            d="M 11.5 20 A 8.5 8.5 0 0 0 11.5 3"
                          />
                        </svg>
                      </div>
                      <div className="slim-upload-status" />
                      <div className="slim-drip">
                        <span>
                        </span>
                      </div>
                      <div className="slim-status">
                        <div className="slim-label">
                          <p>Drop your image here</p>
                        </div>
                        <div className="slim-label-loading">
                          <p>Loading image...</p>
                        </div>
                      </div>
                      <div className="slim-result">
                        <img className="in" style={{ opacity: 0 }} />
                        <img />
                        <img style={{ opacity: 0 }} />
                      </div>
                    </div>
                    <div className="slim-btn-group" style={{ display: "none" }}>
                      <button
                        className="slim-btn slim-btn-remove"
                        title="Remove"
                        type="button"
                        data-action="remove">
                        Remove
                      </button>
                      <button
                        className="slim-btn slim-btn-edit"
                        title="Edit"
                        type="button"
                        data-action="edit">
                        Edit
                      </button>
                    </div>
                  </div> */}