import { useEffect, useState } from "react"
import { Link } from "react-router-dom";
import Checkauth from "./Check";
import ImageUploading from 'react-images-uploading';
import Quality from './quality';
import data from "./data";
import { NotificationContainer, NotificationManager } from "react-notifications";

export default function EditProfile() {
  // Check for user authentication
  Checkauth();

  // Session and state hooks
  let Session = JSON.parse(sessionStorage.getItem('user'));
  console.log('Session', Session);

  const [images, setImages] = useState([]);
  const [Profilename, setProfileName] = useState('');
  const [Fullname, setUsername] = useState('');
  const [Bio, setBio] = useState('');
  const [id, setId] = useState('');
  let [sociallinks, setSociallinks] = useState({
    instagram: '',
    snapchat: '',
    twitter: '',
    facebook: '',
    linkedin: '',
    phone: '',
    email: '',
    youtube: '',
    tiktok: '',
    suncloud: '',
    spotify: '',
    applemusic: '',
    veno: '',
    cashapp: '',
    paypal: '',
    whatsapp: '',
    twitch: '',
    customlink: '',
    websitelink: '',
    googleaddress: '',
    clubhouse: '',
    wifilink: '',
    menu: ''
  });
  let profileData = {
    Profilename,
    // images,
    Fullname,
    Bio,
    id,
    sociallinks
  }

  const maxNumber = 69;

  // Function to handle image uploads
  const onChange = (imageList) => {
    setImages(imageList);
    const storedUser = sessionStorage.getItem('user');
    let userData = storedUser ? JSON.parse(storedUser) : {};
    if (imageList.length > 0) {
      userData.image = imageList[0].file;
    }
    sessionStorage.setItem('user', JSON.stringify(userData));
  };

  // Function to handle input changes for text fields
  const handleInputChange = (setter) => (e) => {
    const { name, value } = e.target;
    // const trimvalue = value.trim()
    setter(value);
    const storedUser = sessionStorage.getItem('user');
    let userData = storedUser ? JSON.parse(storedUser) : {};
    userData[name] = value;
    sessionStorage.setItem('user', JSON.stringify(userData));
  };

  // UseEffect to initialize state from sessionStorage data
  useEffect(() => {
    const user = sessionStorage.getItem('user');
    if (user) {
      const userdata = JSON.parse(user);
      setProfileName(userdata.Profilename || '');
      setUsername(userdata.Fullname || '');
      setBio(userdata.Bio || '');
      setId(userdata.id || '');
      setSociallinks(userdata.social_media || {});

      if (userdata.social_media) {
        const socialMediaData = JSON.stringify(userdata.social_media);
        setSociallinks((prevState) => ({
          ...prevState,
          ...socialMediaData
        }));
      }

      if (userdata.filename) {
        setImages([{ data_url: 'http://localhost:5000/uploads/' + userdata.filename }]);
      }
    }
  }, []);

  // Call this function wherever you need to fetch data
  // Function to handle social media input updates
  const HandleSocialButton = (e) => {
    const { name, value } = e.target;
    const socialNetwork = name.match(/\[(.*?)\]/)[1];
    const trimvalue = value.trim()
    // console.log('trimvalue',trimvalue)
    const cleanedLinks = {};
    Object.entries(sociallinks).forEach(([key, value]) => {
      // Filter out keys that are numeric or unnecessary
      if (isNaN(key) && typeof value === 'string' && value.trim() !== '') {
        cleanedLinks[key] = value;
      }
    });
    setSociallinks({...cleanedLinks, [socialNetwork]: trimvalue });
    console.log('cleanedLinks',cleanedLinks)
    // console.log('sociallinks',sociallinks)
    sociallinks = cleanedLinks;
    console.log('sociallinks now is',sociallinks)
    // [socialNetwork]: value,
    // setSociallinks({
    //   ...sociallinks,
    //   [socialNetwork]: value, // Update the value for the specific social network
    // });
  };

  // Function to handle profile editing form submission
  const EditProfile = async (e) => {
    e.preventDefault();
    try {
      // Handle image upload if there are images
      if (images.length > 0) {
        console.log('images', images)
        // return 0
        const formData = new FormData();
        formData.append('file', images[0].file);
        formData.append('userid', id);
        console.log('formData', formData)
        console.log(formData.get('file'))
        const image = formData.get('file');
        //console.log('image', image);
        if (image == "undefined") {
          console.log('image is undefined or null');
        } else {
          const imageUploadResponse = await fetch('http://localhost:5000/upload', {
            method: 'POST',
            body: formData,  // No need to set Content-Type for FormData
          });

          // Check if the image upload was successful
          if (!imageUploadResponse.ok) {
            throw new Error('Image upload failed.');
          }
          console.log('imageUploadResponse', imageUploadResponse)
          const imageUploadResult = await imageUploadResponse.json();
          console.log('Image upload successful:', imageUploadResult);

          // Assuming the server returns the uploaded image URL, add it to the profileData
          profileData.profileImage = imageUploadResult.imageUrl; // Adjust based on your server response
          console.log(profileData.profileImage)
        }
      }
      console.log('profileData is', profileData);

      //console.log('profileData',JSON.parse(profileData));
      const response = await fetch('http://localhost:5000/upedateProfile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(profileData), // Corrected to stringify the profile data
        // body: profileData
      });

      if (!response.ok) {
        const errorResult = await response.json();
        throw new Error(errorResult.message || 'Profile update failed.');
      }

      const result = await response.json();
      console.log('Profile update successful:', result);

      // Notify user on successful profile update
      if (result.message) {
        // let Session = sessionStorage.getItem('user')
        console.log('Session', Session)
        let userdata = Session
        console.log('userdata',userdata)
        userdata.Fullname = profileData.Fullname;
        userdata.Profilename = profileData.Profilename;
        userdata.Bio = profileData.Bio;
        userdata.social_media = profileData.sociallinks;
        console.log('userdata is',userdata)
        // console.log('Session',Session)
        sessionStorage.setItem('user', JSON.stringify(userdata));
        NotificationManager.success('Profile updated successfully', 'Success');
      } else {
        NotificationManager.error('Failed to update profile.', 'Error');
      }
    } catch (error) {
      console.log('Error:', error.message);
      NotificationManager.error('An error occurred while updating the profile.', 'Error');
    }
  };

  return (
    <>
      <div className="main-body main-body-bg">
        <NotificationContainer />
        <div className="">
          <div className="top-menu">
            <div className="row">
              <div className="col-xs-12 text-center">
                <div className="col-xs-4">
                  <div className="top-menu-left">
                    <Link to='/setting'>
                      <p className="menu_icon">
                        <i className="fas fa-bars" />
                      </p>
                    </Link>
                  </div>
                </div>
                <div className="col-xs-4">
                  <div className="">
                    <a href="">
                      <img
                        src="https://looplink.me/public/assets/front/images/logo-white.png"
                        alt="logo"
                        style={{ maxWidth: 80, marginTop: 15 }}
                      />
                    </a>
                  </div>
                </div>
                <div className="col-xs-4">
                  <div className="top-menu-right">
                    <p className="m-0">
                      <span className="edit_profile" style={{ cursor: "pointer" }}>
                        Save
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <form name="edit_profile" method="post"
          onSubmit={EditProfile}
          id="edit_profile"
          className="form-horizontal"
          encType="multipart/form-data" >
          <div className="my-profile">
            <div className="">
              <div className="row">
                <div className="col-xs-12">
                  <div className="my-profile-photo">
                    <ImageUploading
                      multiple
                      value={images}
                      onChange={onChange}
                      maxNumber={maxNumber}
                      dataURLKey="data_url"
                    >
                      {({ imageList, onImageUpload, onImageRemove, onImageUpdate, isDragging, dragProps }) => (
                        <div className="slim slim_profile_photo">
                          <div
                            className="upload-button-wrapper"
                            style={isDragging ? { borderColor: 'red' } : undefined}
                            onClick={onImageUpload}
                            {...dragProps}
                          >
                            {imageList.length === 0 ? (
                              <div className="upload-placeholder">
                                <p>Drop your image here</p>
                              </div>
                            ) : (
                              <>
                                <img
                                  src={imageList[0].data_url}
                                  alt="Profile"
                                  className="uploaded-image"
                                />
                                <div className="icon-wrapper ">
                                  <i
                                    onClick={(e) => {
                                      e.stopPropagation(); // Prevent triggering the onImageUpload
                                      onImageUpdate(0);
                                    }}
                                    className="fa-solid fa-pen-to-square editbutton"
                                  ></i>
                                  <i
                                    onClick={(e) => {
                                      e.stopPropagation(); // Prevencht triggering the onImageUpload
                                      onImageRemove(0);
                                    }}
                                    className="fa-solid fa-trash deletebutton"
                                  ></i>
                                </div>
                              </>
                            )}
                          </div>
                        </div>
                      )}
                    </ImageUploading>
                  </div>
                  {/* <p className="text-center">Change Photo</p> */}
                  <div className="form-group">
                    <label htmlFor="">Profile Name</label>
                    <input
                      type="text"
                      className="form-control"
                      name="name"
                      value={Profilename}
                      onChange={handleInputChange(setProfileName)}
                      id="name" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="">Username</label>
                    <input
                      type="text"
                      value={Fullname}
                      onChange={handleInputChange(setUsername)}
                      className="form-control"
                      name="username"
                      id="username"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="">Bio</label>
                    <input
                      type="text"
                      value={Bio}
                      onChange={handleInputChange(setBio)}
                      className="form-control"
                      name="bio"
                      id="bio"
                    />
                  </div>
                  <input type='hidden'
                    value={id}
                    onChange={handleInputChange(setId)}
                    className="form-control"
                    name="id"
                    id="id" />

                </div>
              </div>
            </div>
          </div>
          <div className="grid-buttons">
            <div className="edit-box">
              <div>
                <table className="edit-table">
                  <tbody>
                    {data.map((social) => (
                      <tr key={social.name}>
                        <td className="first-box">
                          <img src={social.icon} alt={social.label} width="40" height="40" />
                        </td>
                        <td>
                          <input
                            type="text"
                            className="form-control"
                            placeholder={social.default_url}
                            name={`social_network[${social.name}]`} // Set name properly
                            value={sociallinks[social.name] || ''} // Use the corresponding value from state
                            onChange={HandleSocialButton}
                          />
                        </td>
                        <td>
                          <a
                            href="#"
                            data-id={social.name}
                            className="remove">
                            <i
                              className="fa-solid fa-xmark"
                              style={{
                                color: '#ff0000',
                                height: '40px',
                                display: 'block',
                                fontSize: '45px',
                                textDecoration: 'none'
                              }}
                            ></i>
                          </a>
                        </td>
                        <td>
                          <Quality name={social.label} msg={social.msg} />

                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <div className="text-center btn-custom-white" style={{ marginBottom: 20 }}>
            <button type="submit"
              className=" btn-custom-black register"
              style={{ width: "100%", height: '29px' }}>
              Save
            </button>
          </div>
        </form>
      </div>

    </>)
}